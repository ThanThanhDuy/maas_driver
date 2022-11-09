import {
  Alert,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { styles } from "./style";
import { Ionicons, AntDesign, FontAwesome, Feather } from "@expo/vector-icons";
import { Dropdown, HeaderBack } from "../../components";
import { appTheme, colors, fontSize } from "../../constants";
import StepIndicator from "react-native-step-indicator";
import routeService from "../../services/route";
import { getDistance } from "../../utils/getDistance";
import moment from "moment";
import { ActivityIndicator, Dialog } from "react-native-paper";
import { IMAGES } from "../../assets";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import stationService from "../../services/station";
import { useSetRecoilState } from "recoil";
import { routeSelected } from "../../store";
import { FORMAT } from "../../constants/format";

const labels = ["Choose route", "Setting"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: colors.primary,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: colors.primary,
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: colors.primary,
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: colors.primary,
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: colors.primary,
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: colors.primary,
};

export const CreateRouteRoutine = ({ navigation }) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [_listRoute, _setListRoute] = React.useState(null);
  const [_openModal, _setOpenModal] = useState(false);
  const [_isShow, _setIsShow] = useState(false);
  const [_routeSelected, _setRouteSelected] = useState({});
  const [_dateFrom, _setDateFrom] = useState(
    moment(new Date()).add(1, "days").toDate()
  );
  const [_dateTo, _setDateTo] = useState(
    moment(new Date()).add(8, "days").toDate()
  );
  const [_time, _setTime] = useState(new Date());
  const bottomSheetModalRef = useRef(null);
  const snapPoints = [420, 120];
  const [selectedItem, setSelectedItem] = useState(null);
  const [_listStation, _setListStation] = useState([]);
  const [indexBottomSheet, setIndexBottomSheet] = useState(1);
  const [_loadingConfirm, _setLoadingConfirm] = useState(false);
  const [_loadingRoute, _setLoadingRoute] = useState(false);
  const [textWrong, setTextWrong] = useState(
    "Ops! Route list is being updated"
  );
  const dropdownController = useRef(null);
  const _setRouteSelectedState = useSetRecoilState(routeSelected);

  const handleGetRoute = async (routeCode, text) => {
    _setLoadingRoute(true);
    const res = await routeService.getRouteByCodeStation(routeCode);
    if (res && res.StatusCode === 200) {
      if (res.Data.length > 0) {
        _setListRoute(res.Data);
      } else {
        _setListRoute(null);
        setTextWrong(text);
      }
    }
    setTimeout(() => {
      _setLoadingRoute(false);
    }, 1000);
  };

  useEffect(() => {
    const handleGetStation = async () => {
      const res = await stationService.getAllStation();
      if (res && res.StatusCode === 200) {
        const newListStation = res?.Data.map(item => {
          return {
            id: item.Code,
            title: item.Name,
            address: item.Address,
          };
        });
        _setListStation(newListStation);
      }
    };
    handleGetRoute("", "Ops! Route list is being updated");
    handleGetStation();
  }, []);

  const handleFilter = () => {
    if (!_openModal) {
      bottomSheetModalRef.current?.present();
      _setOpenModal(!_openModal);
    } else {
      bottomSheetModalRef.current?.close();
      _setOpenModal(!_openModal);
    }
  };

  const handleSheetChanges = useCallback(index => {
    if (index < 0) {
      _setOpenModal(false);
    }
  }, []);

  const handleConfirm = async () => {
    Alert.alert(
      "Add new route rountine",
      "Are you sure you want to cancel this trip?",
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            _setLoadingConfirm(true);
            const res = await routeService.createRouteRoutine(
              _routeSelected.Code,
              moment(_dateFrom).format(FORMAT.DATE),
              moment(_dateTo).format(FORMAT.DATE),
              moment(_time).format(FORMAT.TIME) + ":00"
            );
            if (res && res.StatusCode === 200) {
              _setIsShow(true);
              setTimeout(() => {
                _setIsShow(false);
                navigation.navigate("DriverSetting");
              }, 2000);
            } else {
              Alert.alert("Error", res?.Message);
            }
            _setLoadingConfirm(false);
          },
        },
      ]
    );
  };

  const handleSelectedItem = item => {
    if (item) {
      setSelectedItem(item);
      setIndexBottomSheet(1);
      handleGetRoute(item.id, "Ops! There are no routes matching station");
    }
  };

  const handlePressSearch = async () => {
    setIndexBottomSheet(0);
  };

  const handleCloseBottomSheet = () => {
    bottomSheetModalRef.current?.close();
  };

  const handleSubmit = () => {
    bottomSheetModalRef.current?.close();
    handleGetRoute("", "Ops! Route list is being updated");
  };

  const handleViewDetail = item => {
    _setRouteSelectedState(item);
    navigation.navigate("DetailRoute", {
      fromScreen: "Choose route",
    });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <SafeAreaView>
              <HeaderBack
                style={{ color: colors.text }}
                iconColor={colors.text}
                navigation={navigation}
              />
            </SafeAreaView>
            <SafeAreaView style={{ flex: 1 }}>
              <StepIndicator
                customStyles={customStyles}
                currentPosition={currentPosition}
                labels={labels}
                stepCount={2}
              />
              <View
                style={[
                  styles.slide1,
                  { display: currentPosition === 0 ? "flex" : "none" },
                ]}
              >
                {_loadingRoute ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ActivityIndicator size={24} color={colors.primary} />
                  </View>
                ) : (
                  <View style={{ flex: 1 }}>
                    {_listRoute ? (
                      <FlatList
                        style={{
                          marginTop: 10,
                          paddingHorizontal: 15,
                          paddingTop: 20,
                        }}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        data={_listRoute}
                        renderItem={({ item, index }) => (
                          <TouchableOpacity
                            activeOpacity={0.9}
                            style={styles.boxItemRow}
                            onPress={() => _setRouteSelected(item)}
                          >
                            <View style={styles.iconRadio}>
                              {item?.Code === _routeSelected.Code ? (
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
                            </View>
                            <View>
                              <View>
                                <View style={styles.lineAddress}>
                                  <View
                                    style={{
                                      width: 20,
                                      flexDirection: "row",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <FontAwesome
                                      name="circle-o"
                                      size={16}
                                      color={colors.primary}
                                    />
                                  </View>
                                  <Text
                                    numberOfLines={1}
                                    style={styles.textAddress}
                                  >
                                    {item.Stations[0].Name}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    height: 15,
                                    borderLeftWidth: 1,
                                    marginLeft: 8,
                                    borderColor: colors.gray,
                                    marginVertical: 3,
                                  }}
                                ></View>
                                <View style={styles.lineAddress}>
                                  <View
                                    style={{
                                      width: 20,
                                      flexDirection: "row",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <FontAwesome
                                      name="map-marker"
                                      size={20}
                                      color={colors.orange}
                                    />
                                  </View>

                                  <Text
                                    style={styles.textAddress}
                                    numberOfLines={1}
                                  >
                                    {
                                      item.Stations[item.Stations.length - 1]
                                        .Name
                                    }
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  marginTop: 20,
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: appTheme.WIDTH - 30 - 30 - 30,
                                }}
                              >
                                <View style={{ alignItems: "center" }}>
                                  <FontAwesome
                                    name="map-o"
                                    size={14}
                                    color={colors.text}
                                    style={{ marginBottom: 10 }}
                                  />
                                  <Text>{getDistance(item.Distance)}</Text>
                                </View>
                                <View
                                  style={{
                                    height: 40,
                                    width: 1,
                                    backgroundColor: "#ccc",
                                    margin: 0,
                                  }}
                                ></View>
                                <View style={{ alignItems: "center" }}>
                                  <AntDesign
                                    name="clockcircleo"
                                    size={16}
                                    color="black"
                                    style={{ marginBottom: 10 }}
                                  />
                                  <Text>
                                    Estimate {Math.floor(item.Duration / 60)}{" "}
                                    minutes
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    height: 40,
                                    width: 1,
                                    backgroundColor: "#ccc",
                                    margin: 0,
                                  }}
                                ></View>
                                <TouchableOpacity
                                  style={{ alignItems: "center" }}
                                  activeOpacity={0.7}
                                  onPress={() => handleViewDetail(item)}
                                >
                                  <Feather
                                    name="more-horizontal"
                                    size={24}
                                    color="black"
                                  />
                                  <Text>View</Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </TouchableOpacity>
                        )}
                      />
                    ) : (
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text>{textWrong}</Text>
                      </View>
                    )}
                  </View>
                )}
                <View style={styles.bottomControl}>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={handleFilter}
                      style={styles.boxFilter}
                    >
                      <FontAwesome
                        name="filter"
                        size={24}
                        color={colors.text}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      style={[
                        styles.boxNext,
                        {
                          backgroundColor:
                            Object.keys(_routeSelected).length === 0
                              ? "#ccc"
                              : colors.primary,
                        },
                      ]}
                      disabled={
                        Object.keys(_routeSelected).length === 0 ? true : false
                      }
                      onPress={() => setCurrentPosition(1)}
                    >
                      <Text style={styles.textStart}>Next</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <BottomSheetModalProvider>
                  <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={indexBottomSheet}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    enablePanDownToClose={true}
                    style={{
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 0,
                      },
                      shadowOpacity: 0.3,
                      shadowRadius: 15,
                      elevation: 0,
                    }}
                  >
                    <AutocompleteDropdown
                      controller={controller => {
                        dropdownController.current = controller;
                      }}
                      containerStyle={{ marginHorizontal: 20 }}
                      inputContainerStyle={{
                        backgroundColor: "#eee",
                      }}
                      textInputProps={{
                        placeholder: "Type name station",
                        placeholderTextColor: "#aaa",
                        autoCorrect: false,
                        autoCapitalize: "none",
                        style: {
                          paddingLeft: 18,
                        },
                      }}
                      clearOnFocus={true}
                      showClear={true}
                      showChevron={false}
                      onSelectItem={item => handleSelectedItem(item)}
                      dataSet={_listStation}
                      suggestionsListMaxHeight={
                        indexBottomSheet === 0 ? 300 : 50
                      }
                      renderItem={(item, text) => (
                        <Text style={{ color: colors.text, padding: 15 }}>
                          {item.title}
                        </Text>
                      )}
                      onFocus={() => handlePressSearch()}
                      onSubmit={() => handleSubmit()}
                    />
                    <View
                      style={{
                        height: indexBottomSheet === 0 ? 300 : 0,
                      }}
                    ></View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 15,
                        justifyContent: "center",
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          borderRadius: 100,
                          borderWidth: 1,
                          padding: 5,
                          borderColor: colors.text,
                        }}
                        activeOpacity={0.8}
                        onPress={() => handleCloseBottomSheet()}
                      >
                        <AntDesign name="close" size={24} color={colors.text} />
                      </TouchableOpacity>
                    </View>
                  </BottomSheetModal>
                </BottomSheetModalProvider>
              </View>
              <View
                style={[
                  styles.slide2,
                  { display: currentPosition === 1 ? "flex" : "none" },
                ]}
              >
                <View
                  style={{
                    flex: 1,
                    marginTop: 10,
                    width: appTheme.WIDTH,
                    paddingHorizontal: 15,
                  }}
                >
                  <Text style={styles.textlabelSetting}>
                    Setting date and time
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 20,
                    }}
                  >
                    <Dropdown
                      label="From"
                      mode="date"
                      date={_dateFrom}
                      onDoneValue={date => {
                        _setDateFrom(date);
                      }}
                      IconFront={
                        <AntDesign
                          name="calendar"
                          size={24}
                          color={colors.text}
                        />
                      }
                      styleBox={{
                        backgroundColor: colors.transparent,
                        width: 160,
                      }}
                    />
                    <Dropdown
                      label="To"
                      mode="date"
                      date={_dateTo}
                      onDoneValue={date => {
                        _setDateTo(date);
                      }}
                      IconFront={
                        <AntDesign
                          name="calendar"
                          size={24}
                          color={colors.text}
                        />
                      }
                      styleBox={{
                        backgroundColor: colors.transparent,
                        width: 160,
                      }}
                    />
                  </View>
                  <Dropdown
                    label="Time start"
                    mode="time"
                    date={_time}
                    onDoneValue={date => {
                      _setTime(date);
                    }}
                    IconFront={
                      <AntDesign
                        name="clockcircleo"
                        size={24}
                        color={colors.text}
                      />
                    }
                    styleBox={{
                      backgroundColor: colors.transparent,
                      width: 160,
                      marginTop: 30,
                    }}
                  />
                </View>
                <View style={styles.bottomControl}>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => setCurrentPosition(0)}
                      style={styles.boxFilter}
                    >
                      <AntDesign name="back" size={22} color={colors.text} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      style={[
                        styles.boxNext,
                        { backgroundColor: colors.primary },
                      ]}
                      onPress={() => handleConfirm()}
                    >
                      <Text style={styles.textStart}>Confirm</Text>
                      {_loadingConfirm && (
                        <ActivityIndicator
                          size={24}
                          color={colors.white}
                          style={{ position: "absolute", right: 15 }}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </SafeAreaView>
            <Dialog visible={_isShow} onDismiss={() => _setIsShow(false)}>
              <Dialog.Content>
                <View style={{ alignItems: "center" }}>
                  <Image source={IMAGES.success_green} />
                  <Text
                    style={{
                      marginTop: 20,
                      fontFamily: "Roboto_500",
                      fontSize: fontSize.large,
                      color: colors.text,
                    }}
                  >
                    Add route routine successfully
                  </Text>
                </View>
              </Dialog.Content>
            </Dialog>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};
