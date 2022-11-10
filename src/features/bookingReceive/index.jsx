import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  RefreshControl,
  Alert,
  Animated,
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { vehicle } from "../../constants/vehicle";
import { appTheme, colors, fontSize } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import numberWithCommas from "../../utils/numberWithCommas";
import { BoxBooking, HeaderBack, WrapperContent } from "../../components";
import Modal from "react-native-modal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { bookingSelected } from "../../store/booking";
import { ArrowButton } from "../../components/commons/ArrowButton";
import RadioGroup from "react-native-radio-buttons-group";
import { getDistanceArray } from "../../utils/getDistance";
import { styles } from "./style";
import { compareDate, compareTime } from "../../utils/compareTime";
import { isUserWorking, showToastCancel } from "../../store";
import tripStatusService from "../../services/tripStatus";
import { STATUS_TRIP } from "../../constants/status";
import moment from "moment";
import { FORMAT } from "../../constants/format";
import { REASON } from "../../constants/reason";
import { ActivityIndicator } from "react-native-paper";

export const BookingReceive = ({ navigation }) => {
  const _bookingSelected = useRecoilValue(bookingSelected);
  const isUserWorkingState = useRecoilValue(isUserWorking);
  const [_openModal, _setOpenModal] = useState(false);
  const [_radioButtonsSelected, _setRadioButtonsSelected] = useState(0);
  const [_startButton, _setStartButton] = useState(false);
  const [_refreshing, _setRefreshing] = useState(false);
  const [_canCancel, _setCanCancel] = useState(false);
  const [_loadingCancel, _setLoadingCancel] = useState(false);
  const [_reasonOther, _setReasonOther] = useState("");
  const modalMotion = useRef(new Animated.Value(-350)).current;
  const setShowToastCancelState = useSetRecoilState(showToastCancel);

  const compareTimeStart = (
    _dayBeforeApproveCancel,
    _timeBeforeApproveCancel,
    loading = true
  ) => {
    loading && _setRefreshing(true);
    const minutes = compareTime(
      _bookingSelected.Date,
      _bookingSelected.Schedules[0].Time
    );
    const day = compareDate(_bookingSelected.Date);
    setTimeout(() => {
      loading && _setRefreshing(false);
    }, 1000);
    if (minutes <= 60 && minutes > 0) {
      _setStartButton(true);
    }
    if (day <= _dayBeforeApproveCancel * -1) {
      if (day === -1) {
        const minutes = compareTime(
          moment(moment(_bookingSelected.Date, FORMAT.DATE))
            .subtract(1, "days")
            .format(FORMAT.DATE),
          _timeBeforeApproveCancel
        );
        // check time to cancel
        if (minutes <= 0) {
          _setCanCancel(false);
          return "You only can cancel before 19:30";
        } else {
          _setCanCancel(true);
        }
      } else {
        // before more days
        _setCanCancel(true);
      }
    }
  };

  useEffect(() => {
    const day = 1;
    const time = "19:30:00";
    compareTimeStart(day, time);
  }, []);

  function onPressRadioButton(index) {
    _setRadioButtonsSelected(index);
  }

  const callNumber = phone => {
    if (phone) {
      let phoneNumber = `tel:${phone}`;
      Linking.openURL(phoneNumber);
    }
  };

  const handleCancel = () => {
    if (_canCancel) {
      _setOpenModal(true);
      Animated.timing(modalMotion, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      const day = 1;
      const time = "19:30:00";
      const result = compareTimeStart(day, time, false);
      if (result) {
        Alert.alert("Can't cancel trip", result, [
          { text: "OK", onPress: () => {} },
        ]);
      }
    }
  };

  const handleConfirmCancel = () => {
    Alert.alert("Cancel trip", "Are you sure you want to cancel this trip?", [
      {
        text: "No",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          _setLoadingCancel(true);
          handleClose();
          const listBookingDetailDriverCode = _bookingSelected.Schedules.map(
            item => item.BookingDetailDriverCode
          );
          const reason =
            _radioButtonsSelected === REASON.length - 1
              ? `${REASON[_radioButtonsSelected].reason}: ${_reasonOther}`
              : REASON[_radioButtonsSelected].reason;
          const response = await tripStatusService.cancelTrip(
            listBookingDetailDriverCode,
            reason
          );
          if (response.StatusCode === 200) {
            setShowToastCancelState(true);
            navigation.navigate("Schedule");
            _setLoadingCancel(false);
            setTimeout(() => {
              setShowToastCancelState(false);
            }, 3000);
          } else {
            Alert.alert("Something went wrong", "Please try again", [
              { text: "OK", onPress: () => {} },
            ]);
            _setOpenModal(true);
            Animated.timing(modalMotion, {
              toValue: 0,
              duration: 500,
              useNativeDriver: false,
            }).start();
            _setLoadingCancel(false);
          }
        },
      },
    ]);
  };

  const onRefresh = () => {
    compareTimeStart();
  };

  const handleStart = async () => {
    // if (_startButton && isUserWorkingState) {
    const listCode = _bookingSelected.Schedules.map(
      item => item.BookingDetailDriverCode
    );
    const response = await tripStatusService.startTrip(listCode);
    console.log(response);
    if (response && response.StatusCode === 200) {
      navigation.navigate("Driving");
    } else {
      Alert.alert("Can't start trip", "Something went wrong", [
        { text: "OK", onPress: () => {} },
      ]);
    }
    // } else {
    //   Alert.alert("Can't start trip", "Please turn on the active status", [
    //     {
    //       text: "Back Home",
    //       onPress: () => navigation.navigate("Home"),
    //     },
    //     { text: "OK", onPress: () => {} },
    //   ]);
    // }
  };

  const handleClose = () => {
    _setOpenModal(false);
    Animated.timing(modalMotion, {
      toValue: -350,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{ opacity: _openModal ? 0.5 : 1 }}
        activeOpacity={1}
        onPress={() => {
          _setOpenModal(false);
        }}
      >
        <HeaderBack navigation={navigation} title="Schedule" />
        <View style={styles.typeVehicle}>
          <Image source={vehicle["ViBike"]} style={styles.imgVehicle} />
          <Text style={styles.textVehicle}>ViBike</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={_refreshing} onRefresh={onRefresh} />
          }
        >
          {_bookingSelected?.Schedules.map((item, index) => (
            <BoxBooking
              item={item}
              index={index}
              key={index}
              navigation={navigation}
              _startButton={_startButton}
            />
          ))}

          {/* Distance */}
          <WrapperContent
            text={getDistanceArray(_bookingSelected?.Schedules)}
            label="Total Distance"
          />
          {/* money */}
          {/* <WrapperContent
            label="Total"
            text={
              numberWithCommas(
                _bookingSelected?.Schedules.reduce(
                  (prev, cur) => prev + cur.Price,
                  0
                )
              ) + " VND"
            }
          /> */}
          {/* total Income */}
          {/* <WrapperContent
            label="Total Income"
            text={
              numberWithCommas(
                _bookingSelected?.Schedules.reduce(
                  (prev, cur) => prev + cur.Price,
                  0
                ) -
                  _bookingSelected?.Schedules.reduce(
                    (prev, cur) => prev + cur.Price,
                    0
                  ) *
                    (20 / 100)
              ) + " VND"
            }
          /> */}
        </ScrollView>
      </View>

      <View style={styles.bottomControl}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={handleCancel}
            style={[
              styles.boxClose,
              {
                backgroundColor: _canCancel ? "#FBFCFE" : "#ccc",
                borderColor: _canCancel ? colors.red : "#ccc",
              },
            ]}
          >
            {_loadingCancel ? (
              <ActivityIndicator
                color={colors.red}
                size={32}
                style={{ opacity: 0.8 }}
              />
            ) : (
              <Ionicons
                name="close"
                size={32}
                color={_canCancel ? colors.red : colors.white}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.boxStart,
              {
                backgroundColor:
                  _startButton && isUserWorkingState ? colors.primary : "#ccc",
              },
            ]}
            onPress={() => handleStart()}
          >
            <Text style={styles.textStart}>
              {_bookingSelected.Schedules[0].TripStatus ===
              STATUS_TRIP["NotYet"]
                ? "Start"
                : "Continue"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View
        style={[
          styles.boxModal,
          {
            bottom: modalMotion,
          },
        ]}
      >
        <View>
          <View style={styles.boxRadio}>
            <View style={{ marginHorizontal: 30, marginVertical: 20 }}>
              {REASON.map((item, index) => (
                <TouchableOpacity
                  activeOpacity={0.6}
                  key={index}
                  onPress={() => onPressRadioButton(index)}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 15,
                    }}
                  >
                    {_radioButtonsSelected === index ? (
                      <Ionicons
                        name="radio-button-on"
                        size={24}
                        color={colors.primary}
                      />
                    ) : (
                      <Ionicons
                        name="radio-button-off"
                        size={24}
                        color={colors.gray}
                      />
                    )}
                    <Text
                      style={{
                        fontFamily: "Roboto_400",
                        fontSize: fontSize.medium,
                        marginLeft: 5,
                      }}
                    >
                      {item.reason}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
              {_radioButtonsSelected === REASON.length - 1 && (
                <View>
                  <TextInput
                    style={{
                      backgroundColor: "#eee",
                      height: 45,
                      borderRadius: 5,
                      paddingHorizontal: 10,
                      fontFamily: "Roboto_400",
                    }}
                    autoFocus={true}
                    placeholder="Enter reason"
                    onChangeText={_setReasonOther}
                    value={_reasonOther}
                  />
                </View>
              )}
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.boxConfirm}
                onPress={handleConfirmCancel}
              >
                <Text style={styles.textConfirm}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ArrowButton
            style={styles.buttonClose}
            onPress={() => handleClose()}
            type="close"
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};
