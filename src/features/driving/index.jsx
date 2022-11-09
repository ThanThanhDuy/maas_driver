import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Alert,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { appTheme, colors } from "../../constants";
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
  const _setBookingSelected = useSetRecoilState(bookingSelected);

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
      result.push({
        ...step,
        StationAddress,
        StationPosition,
        PhoneNumber,
        ChattingRoomCode,
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
  }, [_bookingSelected]);

  const handleSheetChanges = useCallback(index => {
    // console.log("handleSheetChanges", index);
  }, []);

  const onRegionChange = region => {
    // console.log(region);
    setRegion({ region });
  };

  const handleSwipeSuccess = async () => {
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
        tripStatus
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
      } else {
        _setIsLoadingChangeStep(false);
        forceResetLastButton && forceResetLastButton();
        Alert.alert("Error", "Ops! Something went wrong");
      }
    }
  };

  const handleRefresh = async () => {
    // console.log(_bookingSelected.Schedules[0].BookingDetailDriverCode);
    // console.log(_bookingSelected.Date);
    // console.log(_bookingSelected.Time);
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
            console.log(itemSchedule.BookingDetailDriverCode);
            _setBookingSelected({
              ...item,
              Date: respone.Data.Items[0].Date,
              Time: itemSchedule.Time,
            });
          }
        }
      }
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
          { height: appTheme.HEIGHT - 200 - 200 },
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
        >
          <HeaderBack
            navigation={navigation}
            isRefresh={true}
            onRefresh={handleRefresh}
            isWarning={true}
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
            <ScrollView style={{ flex: 1, marginBottom: 100 }}>
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
    </SafeAreaView>
  );
};
