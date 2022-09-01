import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import numberWithCommas from "../../../utils/numberWithCommas";
import { fontSize } from "../../../constants";
import createStyle from "./style";

export const Button = props => {
  const {
    title,
    isPrimary = true,
    width = 200,
    height = 50,
    opacity = 0.8,
    fontSize_p = fontSize.large,
    fontFamily_p = "Roboto_700",
    round = 50,
    onPress = null,
    marginTop = 5,
    marginBottom = 5,
    marginLeft = 5,
    marginRight = 5,
    iconFront = null,
    iconBehind = null,
    isPayment = false,
    sizeIconPay = 20,
    price = null,
    backgroundColor = null,
  } = props;

  const styles = createStyle(
    width,
    height,
    fontSize_p,
    fontFamily_p,
    round,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    sizeIconPay,
    backgroundColor
  );

  return (
    <>
      {/* primary */}
      {!isPayment && isPrimary && (
        <TouchableOpacity
          style={styles.containerPrimary}
          activeOpacity={opacity}
          onPress={onPress}
        >
          {iconFront && <View style={styles.iconFront}>{iconFront}</View>}
          <Text style={styles.textPrimary}>{title}</Text>
          {iconBehind && <View style={styles.iconBehind}>{iconBehind}</View>}
        </TouchableOpacity>
      )}
      {/* secondary */}
      {!isPayment && !isPrimary && (
        <TouchableOpacity
          style={styles.containerSecondary}
          activeOpacity={opacity}
          onPress={onPress}
        >
          {iconFront && <View style={styles.iconFront}>{iconFront}</View>}
          <Text style={styles.textSecondary}>{title}</Text>
          {iconBehind && <View style={styles.iconBehind}>{iconBehind}</View>}
        </TouchableOpacity>
      )}
      {/* payment */}
      {isPayment && (
        <TouchableOpacity
          style={styles.containerPayment}
          activeOpacity={opacity}
          onPress={onPress}
        >
          <View>
            <Text style={styles.titlePayment}>{title}</Text>
          </View>
          {price && (
            <View style={styles.boxPayment}>
              <Text style={styles.titlePaymentPrice}>
                {numberWithCommas(price)}đ
              </Text>
              <View style={styles.iconPayment}>
                {/* <View style={styles.iconLeft}>
                  <AntDesign name="right" size={12} color="#08AB4B" />
                </View>
                <View style={styles.iconRight}>
                  <AntDesign name="right" size={12} color="#08AB4B" />
                </View> */}
                <FontAwesome name="arrow-right" size={12} color="#0F752E" />
              </View>
            </View>
          )}
        </TouchableOpacity>
      )}
    </>
  );
};

// example:
//   1. button primary don't have icon
//       <Button title="Order" />
//   2. button primary have icon front
//       <Button
//         title="Order"
//         iconFront={<AntDesign name="heart" size={16} color="white" />}
//       />
//   3. button primary have icon front and icon behind
//       <Button
//         title="Order"
//         iconFront={<AntDesign name="heart" size={16} color="white" />}
//         iconBehind={<AntDesign name="arrowright" size={20} color="white" />}
//       />
//   4. Button secondary have same props primary but change isPrimary={false}
//       <Button title="Order" isPrimary={false} />
//   5. Button payment
//       <Button
//         title="Order GoCar"
//         isPayment={true}
//         width={350}
//         price={350000}
//       />
// props:
//   title - type: string
//   isPrimary - type: boolean - default: true,
//   width - type: number - default: 200,
//   height - type: number - default: 50,
//   opacity - type: number - default: 0.8,
//   fontSize_p - type: number - default: FontSize.medium(15),
//   fontFamily_p - type: string - default: "Roboto_700",
//   isRounded - type: boolean - default: true,
//   rounded - type: number - default: 5,
//   handleClicked - type: function - default: null,
//   marginTop - type: number - default: 5,
//   marginBottom - type: number - default: 5,
//   marginLeft - type: number - default: 5,
//   marginRight - type: number - default: 5,
//   iconFront - type: element - default: null,
//   iconBehind - type: element - default: null,
//   isPayment - type: boolean - default: false,
//   sizeIconPay - type: number - default: 20,
//   price - type: number - default: null
