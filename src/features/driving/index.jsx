import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Animated,
  TouchableOpacity,
  Text,
  RefreshControl,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { appTheme, colors, fontSize } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { Easing } from "react-native-reanimated";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  useBottomSheetTimingConfigs,
} from "@gorhom/bottom-sheet";
import SwipeButton from "rn-swipe-button";
import { HeaderBack, StepDriving } from "../../components";
import { ActivityIndicator } from "react-native-paper";
import { styles } from "./style";
import { bookingSelected } from "../../store";
import { useRecoilValue, useSetRecoilState } from "recoil";
import tripStatusService from "../../services/tripStatus";
import MapViewDirections from "react-native-maps-directions";
import scheduleService from "../../services/Schedule";
import { COMMONS } from "../../constants";
import { STATUS_TRIP } from "../../constants/status";
import { REASON_HELP } from "../../constants/reasonHelp";
import { Ionicons } from "@expo/vector-icons";
import { ArrowButton } from "../../components/commons/ArrowButton";
import * as Location from "expo-location";

export const Driving = ({ navigation }) => {
  const _bookingSelected = useRecoilValue(bookingSelected);
  const [region, setRegion] = useState({});

  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 250,
    easing: Easing.exp,
  });

  const bottomSheetModalRef = useRef(null);
  const ggmap = useRef(null);
  const snapPoints = useMemo(() => [410, "80%"], []);
  const [_listStep, _setListStep] = useState(null);
  const [_isLoadingChangeStep, _setIsLoadingChangeStep] = useState(false);
  const [_statusSwipe, _setStatusSwipe] = useState({});
  const [_wayPoints, _setWayPoints] = useState([]);
  const _setBookingSelected = useSetRecoilState(bookingSelected);
  const modalMotion = useRef(new Animated.Value(-350)).current;
  const [_radioButtonsSelected, _setRadioButtonsSelected] = useState(0);
  const [_openModal, _setOpenModal] = useState(false);
  const [_refresh, _setRefresh] = useState(false);
  const [_refreshingControl, _setRefreshingControl] = useState(false);

  const handleStep = () => {
    let result = [];
    let array = [];
    // type 0 : pick up,
    // type 1 : drop off
    for (const item of _bookingSelected.Steps) {
      if (
        (item.Type === 0 && item.TripStatus !== STATUS_TRIP["PickedUp"]) ||
        (item.Type === 1 && item.TripStatus !== STATUS_TRIP["Completed"])
      ) {
        array.push(item);
      }
    }
    // console.log(_bookingSelected);
    for (const [index, step] of array.entries()) {
      let bookingDetailDriverCode = step.BookingDetailDriverCode;
      let itemFound = _bookingSelected.Schedules.find(
        item => item.BookingDetailDriverCode === bookingDetailDriverCode
      );
      let stationCode = step.StationCode;
      // address and position
      let StationPosition = step.Type === 0 ? "start" : "end";
      if (itemFound["StartStation"].Code === stationCode) {
        StationAddress = itemFound["StartStation"].Address;
      } else {
        StationAddress = itemFound["EndStation"].Address;
      }
      // phone and message room
      let PhoneNumber = "";
      let ChattingRoomCode = "";
      PhoneNumber = itemFound.User.PhoneNumber;
      ChattingRoomCode = itemFound.User.ChattingRoomCode;
      let Time = itemFound.Time;
      result.push({
        ...step,
        StationAddress,
        StationPosition,
        PhoneNumber,
        ChattingRoomCode,
        Time,
      });
    }
    _setListStep(result);
    _setStatusSwipe({
      text: `${result[0].Type === 0 ? "Pick up" : "Drop off"} ${
        result[0].UserName
      }`,
      color: result[0].Type === 0 ? colors.primary : colors.orange,
    });
  };

  useEffect(() => {
    // handle data
    const handleData = async () => {
      bottomSheetModalRef.current?.present();
      handleStep();
    };
    handleData();
    if (_bookingSelected.Steps.length > 2) {
      let listPoint = [];
      for (let index = 1; index < _bookingSelected.Steps.length - 2; index++) {
        listPoint.push({
          latitudeDelta: 0.01793054891924406,
          longitudeDelta: 0.009999999999990905,
          latitude: _bookingSelected.Steps[index].Latitude,
          longitude: _bookingSelected.Steps[index].Longitude,
        });
      }
      _setWayPoints(listPoint);
    }
  }, [_bookingSelected]);

  const handleSheetChanges = useCallback(index => {
    // console.log("handleSheetChanges", index);
  }, []);

  const onRegionChange = region => {
    // console.log(region);
    setRegion({ region });
  };

  const handleSwipeSuccess = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        'Turn on location services to allow "ViGo" to determine your location',
        "",
        [{ text: "OK", onPress: () => {} }]
      );
      return;
    } else {
      let location = await Location.getCurrentPositionAsync({});
      _setIsLoadingChangeStep(true);
      let stepTmp = [..._listStep];
      // remove step
      let itemDeleted = stepTmp[0];
      if (itemDeleted) {
        let tripStatus;
        if (itemDeleted.StationPosition === "start") {
          tripStatus = STATUS_TRIP["PickedUp"];
        } else {
          tripStatus = STATUS_TRIP["Completed"];
        }
        console.log(itemDeleted.BookingDetailDriverCode, tripStatus);
        const res = await tripStatusService.updateTripStatus(
          itemDeleted.BookingDetailDriverCode,
          tripStatus,
          location.coords.latitude,
          location.coords.longitude
        );
        console.log(res);
        if (res.StatusCode === 200) {
          stepTmp.shift();
          if (stepTmp.length > 0) {
            let statusSwipe = {};
            if (stepTmp[0].StationPosition === "start") {
              statusSwipe = {
                text: `Pick up ${stepTmp[0].UserName}`,
                color: colors.primary,
              };
            } else {
              statusSwipe = {
                text: `Drop off ${stepTmp[0].UserName}`,
                color: colors.orange,
              };
            }
            _setStatusSwipe(statusSwipe);
            _setListStep(stepTmp.length > 0 ? stepTmp : []);
            handleRefresh();
            _setIsLoadingChangeStep(false);
            forceResetLastButton && forceResetLastButton();
          } else {
            navigation.navigate("Success");
            _setStatusSwipe({
              text: `Finish`,
              color: colors.primary,
            });
            _setListStep(stepTmp.length > 0 ? stepTmp : []);
            _setIsLoadingChangeStep(false);
            forceResetLastButton && forceResetLastButton();
          }
        } else if (
          res.StatusCode === 500 &&
          res?.Message.includes("Your location must be within")
        ) {
          Alert.alert(
            "Location is too far",
            "Your location is too far from the drop off point, please approach the drop off point",
            [
              {
                text: "OK",
                onPress: () => {
                  _setIsLoadingChangeStep(false);
                  forceResetLastButton && forceResetLastButton();
                },
              },
            ]
          );
        } else {
          _setIsLoadingChangeStep(false);
          forceResetLastButton && forceResetLastButton();
          Alert.alert("Error", "Ops! Something went wrong");
        }
      }
    }
  };

  const handleRefresh = async (isLoading = false, refreshingControl) => {
    // console.log(_bookingSelected.Schedules[0].BookingDetailDriverCode);
    // console.log(_bookingSelected.Date);
    // console.log(_bookingSelected.Time);
    isLoading && _setRefresh(true);
    refreshingControl && _setRefreshingControl(true);
    const respone = await scheduleService.getScheduleByDate(
      1,
      1,
      _bookingSelected.Date,
      _bookingSelected.Date
    );
    if (respone.StatusCode === 200 && respone.Data) {
      for (const item of respone.Data.Items[0].RouteRoutines) {
        for (const itemSchedule of item.Schedules) {
          if (itemSchedule.Time === _bookingSelected.Time) {
            _setBookingSelected({
              ...item,
              Date: respone.Data.Items[0].Date,
              Time: itemSchedule.Time,
            });
          }
        }
      }
    }
    isLoading && _setRefresh(false);
    refreshingControl && _setRefreshingControl(false);
  };

  function onPressRadioButton(index) {
    _setRadioButtonsSelected(index);
  }

  const handleHelp = () => {
    if (_listStep[0].TripStatus === 1) {
      _setOpenModal(true);
      Animated.timing(modalMotion, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Alert.alert("Feature is being updated, please try again later", "", [
        { text: "OK", onPress: () => {} },
      ]);
    }
  };

  const handleClose = () => {
    _setOpenModal(false);
    Animated.timing(modalMotion, {
      toValue: -350,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleConfirm = async () => {
    if (_listStep[0].TripStatus === 1) {
      Alert.alert(
        "Confirm",
        `Are you sure the customer is not coming? ${_listStep[0].UserName}'s trip will be completed after you press YES`,
        [
          {
            text: "No",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: async () => {
              if (_radioButtonsSelected === 0) {
                let { status } =
                  await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                  Alert.alert(
                    'Turn on location services to allow "ViGo" to determine your location',
                    "",
                    [{ text: "OK", onPress: () => {} }]
                  );
                  return;
                } else {
                  let location = await Location.getCurrentPositionAsync({});
                  // console.log(_listStep[0]);
                  // complete when customer don't arrive
                  const res = await tripStatusService.updateTripStatus(
                    _listStep[0].BookingDetailDriverCode,
                    STATUS_TRIP["Completed"],
                    location.coords.latitude,
                    location.coords.longitude
                  );
                  // console.log("🚀 ~ DRIVING ~ ", res);
                  if (res && res.StatusCode === 200) {
                    handleRefresh();
                  } else if (
                    res.StatusCode === 500 &&
                    res?.Message.includes("Your location must be within")
                  ) {
                    Alert.alert(
                      "Location is too far",
                      "Your location is too far from the pick up point, please approach the pick up point",
                      [{ text: "OK", onPress: () => {} }]
                    );
                  }
                }
              } else {
                Alert.alert(
                  "Feature is being updated, please try again later",
                  "",
                  [{ text: "OK", onPress: () => {} }]
                );
              }
            },
          },
        ]
      );
    } else {
      Alert.alert("Feature is being updated, please try again later", "", [
        { text: "OK", onPress: () => {} },
      ]);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        position: "relative",
      }}
    >
      <MapView
        style={[
          StyleSheet.absoluteFill,
          {
            height: appTheme.HEIGHT - 200 - 200,
            opacity: _openModal ? 0.3 : 1,
          },
        ]}
        showsUserLocation={true}
        loadingEnabled={true}
        ref={ggmap}
        onMapReady={() =>
          ggmap.current.fitToCoordinates(
            _bookingSelected.Steps.map(item => {
              return { latitude: item.Latitude, longitude: item.Longitude };
            }),
            {
              edgePadding: { top: 100, right: 30, bottom: 50, left: 30 },
              animated: false,
            }
          )
        }
      >
        {_bookingSelected.Steps.map((item, index) => (
          <Marker
            key={index}
            coordinate={{
              latitudeDelta: 0.01793054891924406,
              longitudeDelta: 0.009999999999990905,
              latitude: item.Latitude,
              longitude: item.Longitude,
            }}
            title={item.StationName}
          />
        ))}
        <MapViewDirections
          origin={{
            latitudeDelta: 0.01793054891924406,
            longitudeDelta: 0.009999999999990905,
            latitude: _bookingSelected.Steps[0].Latitude,
            longitude: _bookingSelected.Steps[0].Longitude,
          }}
          destination={{
            latitudeDelta: 0.01793054891924406,
            longitudeDelta: 0.009999999999990905,
            latitude:
              _bookingSelected.Steps[_bookingSelected.Steps.length - 1]
                .Latitude,
            longitude:
              _bookingSelected.Steps[_bookingSelected.Steps.length - 1]
                .Longitude,
          }}
          // apikey={COMMONS.GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor={colors.primary}
          waypoints={_wayPoints}
        />
      </MapView>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={false}
          animationConfigs={animationConfigs}
          containerStyle={{ opacity: _openModal ? 0.3 : 1 }}
        >
          <HeaderBack
            navigation={navigation}
            isRefresh={true}
            onRefresh={handleRefresh}
            isWarning={true}
            onWarning={handleHelp}
            refresh={_refresh}
          />
          <View
            style={{
              width: appTheme.WIDTH,
              height: 1,
              backgroundColor: "#ccc",
              marginBottom: 5,
            }}
          ></View>
          <View style={styles.contentContainer}>
            <ScrollView
              style={{ flex: 1, marginBottom: 100 }}
              refreshControl={
                <RefreshControl
                  refreshing={_refreshingControl}
                  onRefresh={() => handleRefresh(false, true)}
                />
              }
            >
              {_listStep?.map((item, index) => (
                <StepDriving
                  index={index}
                  key={index}
                  step={item}
                  maxLength={_listStep.length - 1}
                />
              ))}
            </ScrollView>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>

      <View style={styles.boxSwipe}>
        <SwipeButton
          disableResetOnTap
          forceReset={reset => {
            forceResetLastButton = reset;
          }}
          railBackgroundColor={
            _statusSwipe.color ? _statusSwipe.color : colors.primary
          }
          railBorderColor={
            _statusSwipe.color ? _statusSwipe.color : colors.primary
          }
          railStyles={{ borderRadius: 5 }}
          containerStyles={{ borderRadius: 5 }}
          height={50}
          titleColor={colors.white}
          titleStyles={{ fontFamily: "Roboto_400" }}
          titleFontSize={16}
          thumbIconWidth={50}
          thumbIconStyles={{
            borderRadius: 5,
          }}
          thumbIconBorderColor={
            _statusSwipe.color ? _statusSwipe.color : colors.primary
          }
          thumbIconBackgroundColor={colors.white}
          railFillBackgroundColor={colors.transparent}
          railFillBorderColor={colors.transparent}
          thumbIconComponent={() => (
            <View>
              {!_isLoadingChangeStep ? (
                <AntDesign name="arrowright" size={24} color={colors.text} />
              ) : (
                <ActivityIndicator size={24} color={colors.text} />
              )}
            </View>
          )}
          title={_statusSwipe.text ? _statusSwipe.text : "Loading..."}
          onSwipeSuccess={handleSwipeSuccess}
        />
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
              {REASON_HELP.map((item, index) => (
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
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.boxConfirm}
                onPress={handleConfirm}
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
