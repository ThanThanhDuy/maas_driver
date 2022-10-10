import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { vehicle } from "../../constants/vehicle";
import { appTheme, colors, fontSize } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import numberWithCommas from "../../utils/numberWithCommas";
import { BoxBooking, HeaderBack, WrapperContent } from "../../components";
import Modal from "react-native-modal";
import { useRecoilValue } from "recoil";
import { bookingSelected } from "../../store/booking";
import { ArrowButton } from "../../components/commons/ArrowButton";
import RadioGroup from "react-native-radio-buttons-group";
import { getDistanceArray } from "../../utils/getDistance";
import { styles } from "./style";

const radioButtonsData = [
  {
    id: "1",
    label: "Unable to contact customer",
    value: "option1",
    color: "#31B057",
    borderColor: "#ccc",
    labelStyle: {
      color: colors.text,
      fontFamily: "Roboto_400",
      fontSize: fontSize.medium,
    },
  },
  {
    id: "2",
    label: "Wrong address",
    value: "option2",
    color: "#31B057",
    borderColor: "#ccc",
    labelStyle: {
      color: colors.text,
      fontFamily: "Roboto_400",
      fontSize: fontSize.medium,
    },
  },
  {
    id: "4",
    label: "Damaged vehicle, unable to complete the trip",
    value: "option4",
    color: "#31B057",
    borderColor: "#ccc",
    labelStyle: {
      color: colors.text,
      fontFamily: "Roboto_400",
      fontSize: fontSize.medium,
    },
  },
];

export const BookingReceive = ({ navigation }) => {
  const _bookingSelected = useRecoilValue(bookingSelected);
  const [_openModal, _setOpenModal] = useState(false);
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  function onPressRadioButton(radioButtonsArray) {
    console.log(radioButtonsArray);
    setRadioButtons(radioButtonsArray);
  }

  const callNumber = phone => {
    if (phone) {
      let phoneNumber = `tel:${phone}`;
      Linking.openURL(phoneNumber);
    }
  };

  const handleCancel = () => {
    _setOpenModal(true);
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
        <HeaderBack navigation={navigation} title="Back" />
        <View style={styles.typeVehicle}>
          <Image source={vehicle["ViBike"]} style={styles.imgVehicle} />
          <Text style={styles.textVehicle}>ViBike</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          {_bookingSelected?.Schedules.map((item, index) => (
            <BoxBooking item={item} index={index} key={index} />
          ))}

          {/* Distance */}
          <WrapperContent
            text={getDistanceArray(_bookingSelected?.Schedules)}
            label="Total Distance"
          />
          {/* money */}
          <WrapperContent
            label="Total"
            text={
              numberWithCommas(
                _bookingSelected?.Schedules.reduce(
                  (prev, cur) => prev + cur.Price,
                  0
                )
              ) + " VND"
            }
          />
          {/* total Income */}
          <WrapperContent
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
          />
        </ScrollView>
      </View>

      <View style={styles.bottomControl}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={handleCancel}
            style={styles.boxClose}
          >
            <Ionicons name="close" size={32} color={colors.red} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.boxStart}
            onPress={() => navigation.navigate("Driving")}
          >
            <Text style={styles.textStart}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        isVisible={_openModal}
        animationInTiming={400}
        animationOutTiming={1000}
        backdropOpacity={0}
        coverScreen={false}
        deviceHeight={120}
        style={styles.boxModal}
      >
        <View style={styles.boxRadio}>
          <RadioGroup
            containerStyle={{ alignItems: "flex-start", padding: 10 }}
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
          />
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.boxConfirm}
              onPress={() => {
                _setOpenModal(false);
              }}
            >
              <Text style={styles.textConfirm}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ArrowButton
          style={styles.buttonClose}
          onPress={() => {
            _setOpenModal(false);
          }}
          type="close"
        />
      </Modal>
    </SafeAreaView>
  );
};
