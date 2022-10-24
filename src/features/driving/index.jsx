import { SafeAreaView, StyleSheet, View, ScrollView } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { appTheme, colors } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { Easing } from "react-native-reanimated";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  useBottomSheetTimingConfigs,
} from "@gorhom/bottom-sheet";
import SwipeButton from "rn-swipe-button";
import { StepDriving } from "../../components";
import { ActivityIndicator } from "react-native-paper";
import { styles } from "./style";
import { bookingSelected } from "../../store";
import { useRecoilValue } from "recoil";
import tripStatusService from "../../services/tripStatus";

const _stepDriving = [
  {
    StartStation: {
      Index: 1,
      Name: "A AI InnovationHub",
      Code: "...",
      Address: "Đường D1, Tân Phú, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
    },
    EndStation: {
      Index: 5,
      Name: "E AI InnovationHub",
      Code: "...",
      Address: "Đường D1, Tân Phú, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
    },
    User: {
      Code: "",
      Name: "Than Thanh Duy",
      PhoneNumber: "1234",
      ChattingRoomCode: "",
    },
    status: 0,
  },
  {
    StartStation: {
      Index: 2,
      Name: "B AI InnovationHub",
      Code: "...",
      Address: "Đường D1, Tân Phú, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
    },
    EndStation: {
      Index: 3,
      Name: "C AI InnovationHub",
      Code: "...",
      Address: "Đường D1, Tân Phú, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
    },
    User: {
      Code: "123",
      Name: "Nguyen Dang Khoa",
      PhoneNumber: "1234",
      ChattingRoomCode: "",
    },
    status: 0,
  },
  {
    StartStation: {
      Index: 4,
      Name: "D AI InnovationHub",
      Code: "...",
      Address: "Đường D1, Tân Phú, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
    },
    EndStation: {
      Index: 6,
      Name: "F AI InnovationHub",
      Code: "...",
      Address: "Đường D1, Tân Phú, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
    },
    User: {
      Code: "123",
      Name: "Quach Dai Loi",
      PhoneNumber: "1234",
      ChattingRoomCode: "",
    },
    status: 0,
  },
];

let result = [];
for (const step of _stepDriving) {
  result.push({
    index: step.StartStation.Index,
    name: step.StartStation.Name,
    address: step.StartStation.Address,
    user: step.User,
    position: "start",
  });
  result.push({
    index: step.EndStation.Index,
    name: step.EndStation.Name,
    address: step.EndStation.Address,
    user: step.User,
    position: "end",
  });
}

result = result.sort((step1, step2) => step1.index - step2.index);
// {
//   "address": "Đường D1, Tân Phú, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
//   "index": 6,
//   "name": "F AI InnovationHub",
//   "position": "end",
//   "user": Object {
//     "ChattingRoomCode": "",
//     "Code": "123",
//     "Name": "Quach Dai Loi",
//     "PhoneNumber": "1234",
//   },
// },
export const Driving = ({ navigation }) => {
  const _bookingSelected = useRecoilValue(bookingSelected);
  const [region, setRegion] = useState({
    latitude: 10.841626311529279,
    latitudeDelta: 0.01793054891924406,
    longitude: 106.81133564102572,
    longitudeDelta: 0.009999999999990905,
  });
  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 250,
    easing: Easing.exp,
  });
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => [370, "80%"], []);
  const [_listStep, _setListStep] = useState(null);
  const [_isLoadingChangeStep, _setIsLoadingChangeStep] = useState(false);
  const [_statusSwipe, _setStatusSwipe] = useState({});

  const handleStep = () => {
    let result = [];
    let array = _bookingSelected.Steps;
    for (const [index, step] of array.entries()) {
      let bookingDetailDriverCode = step.BookingDetailDriverCode;
      let itemFound = _bookingSelected.Schedules.find(
        item => item.BookingDetailDriverCode === bookingDetailDriverCode
      );
      let stationCode = step.StationCode;
      // address and position
      let StationAddress = "";
      let StationPosition = "start";
      if (itemFound["StartStation"].Code === stationCode) {
        StationAddress = itemFound["StartStation"].Address;
      } else {
        StationAddress = itemFound["EndStation"].Address;
        StationPosition = "end";
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
      text: `Pick up ${result[0].UserName}`,
      color: colors.primary,
    });
  };

  useEffect(() => {
    // handle data
    const handleData = async () => {
      bottomSheetModalRef.current?.present();
      handleStep();
    };
    handleData();
  }, []);

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
        tripStatus = 1;
      } else {
        tripStatus = 2;
      }
      const res = await tripStatusService.updateTripStatus(
        itemDeleted.BookingDetailDriverCode,
        tripStatus
      );
      console.log(res);
      if (res.StatusCode === 200) {
        stepTmp.shift();
      }
    }
    // check finish
    if (stepTmp.length > 0) {
      _setListStep(stepTmp.length > 0 ? stepTmp : []);
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
      forceResetLastButton && forceResetLastButton();
      _setIsLoadingChangeStep(false);
    } else {
      _setListStep(stepTmp.length > 0 ? stepTmp : []);
      let tripStatus = 3;
      let count = 0;
      for (const item of _bookingSelected.Schedules) {
        const res = await tripStatusService.updateTripStatus(
          item.BookingDetailDriverCode,
          tripStatus
        );
        if (res.StatusCode === 200) {
          count++;
        }
      }
      if (count === _bookingSelected.Schedules.length) {
        navigation.navigate("Success");
        _setStatusSwipe({
          text: `Finish`,
          color: colors.primary,
        });
        forceResetLastButton && forceResetLastButton();
        _setIsLoadingChangeStep(false);
      } else {
        _setStatusSwipe({
          text: `Something wrong`,
          color: colors.red,
        });
        forceResetLastButton && forceResetLastButton();
        _setIsLoadingChangeStep(false);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <MapView
        style={[
          StyleSheet.absoluteFill,
          { height: appTheme.HEIGHT - 200 - 100 },
        ]}
        initialRegion={region.latitude ? region : null}
        onRegionChange={onRegionChange}
      />
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={false}
          animationConfigs={animationConfigs}
        >
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
        {/* </View> */}
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
