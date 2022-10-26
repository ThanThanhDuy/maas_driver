import { View, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import createStyle from "./style";
import { colors } from "../../../constants";

export const Search = props => {
  const {
    value = "",
    width = 280,
    height = 40,
    round = 100,
    isClear = true,
    borderColor = colors.border,
    backgroundColor = colors.white,
    onChangeText = () => {},
    onSubmitEditing = () => {},
  } = props;

  const handleOnChangeText = value => {
    onChangeText(value);
  };

  const handleOnSubmitEditing = value => {
    onSubmitEditing(value);
  };

  const styles = createStyle(
    width,
    height,
    round,
    borderColor,
    backgroundColor
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <AntDesign
          style={styles.iconFront}
          name="search1"
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <TextInput
        {...props}
        selectionColor={colors.primary}
        style={styles.input}
        onChangeText={text => handleOnChangeText(text)}
        onSubmitEditing={handleOnSubmitEditing}
        clearButtonMode={"while-editing"}
      />
    </View>
  );
};
