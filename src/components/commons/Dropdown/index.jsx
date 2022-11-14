import { View, Text, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import createStyle from "./style";
import { colors } from "../../../constants/index";
import { FORMAT } from "../../../constants/format";

export const Dropdown = props => {
  const {
    height = 50,
    width = 160,
    borderRadius = 16,
    isShadown = true,
    fontSizeSelect = "medium",
    fontSizeLabel = "tiny",
    colorLabel = colors.primary,
    label = null,
    IconFront = null,
    items = null,
    placeholder = null,
    onValueChange = () => {},
    onDoneValue = () => {},
    mode = "normal",
    styleBox = {},
    minimumDate = new Date(),
    maximumDate,
    date = new Date(),
    minuteInterval = 1,
  } = props;

  const [_date, _setDate] = useState(new Date());
  const [_open, _setOpen] = useState(false);
  const [_itemSelected, _setItemSelected] = useState(
    items ? items[0].value : ""
  );

  const styles = createStyle(
    height,
    width,
    borderRadius,
    fontSizeSelect,
    fontSizeLabel,
    colorLabel,
    label,
    IconFront,
    mode
  );

  const handleOnValueChange = value => {
    onValueChange(value);
    _setItemSelected(value);
  };

  const handleDoneValueChange = () => {
    onDoneValue(_itemSelected);
  };

  const handleDoneValueChangeDate = date => {
    onDoneValue(date);
  };

  return (
    <TouchableOpacity onPress={() => _setOpen(true)}>
      <View style={{ ...styles.containerWithShadown, ...styleBox }}>
        {IconFront}
        <View>
          {label && <Text style={styles.label}>{label}</Text>}
          {mode === "normal" && (
            <>
              <RNPickerSelect
                placeholder={
                  items
                    ? placeholder
                      ? {
                          label: placeholder,
                          value: null,
                          color: "#9EA0A4",
                        }
                      : {}
                    : {
                        label: "Select a item",
                        value: null,
                        color: "#9EA0A4",
                      }
                }
                onValueChange={handleOnValueChange}
                onDonePress={handleDoneValueChange}
                items={items ? items : []}
                useNativeAndroidPickerStyle={false}
                style={styles}
                Icon={() => (
                  <Entypo
                    style={styles.icon}
                    name="chevron-down"
                    size={24}
                    color={colors.text}
                  />
                )}
              />
            </>
          )}
          {mode === "time" && (
            <>
              <Text style={styles.textTime}>
                {moment(date).format("HH:mm")}:00
              </Text>
              <DatePicker
                modal={true}
                open={_open}
                date={date}
                mode="time"
                minuteInterval={minuteInterval}
                onConfirm={date => {
                  _setOpen(false);
                  _setDate(date);
                  handleDoneValueChangeDate(date);
                }}
                onCancel={() => {
                  _setOpen(false);
                }}
              />
            </>
          )}
          {mode === "date" && (
            <>
              <Text style={styles.textTime}>
                {moment(date).format(FORMAT.DATE)}
              </Text>
              <DatePicker
                modal={true}
                open={_open}
                date={date}
                mode="date"
                onConfirm={date => {
                  _setOpen(false);
                  _setDate(date);
                  handleDoneValueChangeDate(date);
                }}
                onCancel={() => {
                  _setOpen(false);
                }}
                minimumDate={minimumDate}
                maximumDate={maximumDate ? maximumDate : null}
              />
            </>
          )}
        </View>
        {(mode === "time" || mode === "date") && (
          <>
            <Entypo
              style={styles.iconSelectTime}
              name="chevron-down"
              size={24}
              color={colors.text}
            />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};
