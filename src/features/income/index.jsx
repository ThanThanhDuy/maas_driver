import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import createStyle from "./style";
import { Chart, JourneyTab, Title } from "../../components/index";
import { AntDesign } from "@expo/vector-icons";
import { useRecoilState } from "recoil";
import { incomeState } from "../../store";
import moment from "moment";
import { FORMAT } from "../../constants/format";
import driverService from "../../services/driver";
import numberWithCommas from "../../utils/numberWithCommas";
import { useIsFocused } from "@react-navigation/native";
import { getWeekDay } from "../../utils/getDate";

export const Income = ({ navigation }) => {
  const styles = createStyle();
  const [income, setIncome] = useRecoilState(incomeState);
  const [_isLoading, _setIsLoading] = useState(false);
  //load Data
  useEffect(() => {
    _loadData();
  }, [isFocused]);
  const isFocused = useIsFocused();

  const _loadData = async () => {
    const response = await driverService.getIncomes(
      income.StartAt,
      income.EndAt
    );
    let newIncome = { ...income };
    let count = 0;
    let total = 0;
    let label = [];
    let data = [];
    response.Data.forEach((income) => {
      count += income.Incomes.length;
      total += income.TotalIncome;
      label.push(getWeekDay(income.Date));
      data.push(income.TotalIncome);
    });

    newIncome.Incomes = response.Data;
    newIncome.Count = count;
    newIncome.Total = total;
    newIncome.Label = label;
    newIncome.Data = data;
    setIncome(newIncome);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Title
        title="Income"
        level="h2"
        style={{ marginHorizontal: 20, marginBottom: 20 }}
      />
      <ScrollView
        style={{ backgroundColor: "#fff" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.lineBreak}></View>
        <View>
          <View
            style={{
              paddingTop: 20,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.textWeek}>Total in week</Text>
              <View style={{ flexDirection: "row", marginRight: 20 }}>
                <TouchableOpacity
                  onPress={async () => {
                    let newIncome = { ...income };
                    newIncome.StartAt = moment(newIncome.StartAt).subtract(
                      7,
                      "days"
                    );
                    newIncome.EndAt = moment(newIncome.EndAt).subtract(
                      7,
                      "days"
                    );
                    _setIsLoading(true);
                    const response = await driverService.getIncomes(
                      newIncome.StartAt,
                      newIncome.EndAt
                    );
                    console.log(response);
                    let count = 0;
                    let total = 0;
                    let label = [];
                    let data = [];
                    response.Data.forEach((income) => {
                      count += income.Incomes.length;
                      total += income.TotalIncome;
                      label.push(getWeekDay(income.Date));
                      data.push(income.TotalIncome);
                    });
                    newIncome.Incomes = response.Data;
                    newIncome.Count = count;
                    newIncome.Total = total;
                    newIncome.Label = label;
                    newIncome.Data = data;
                    setIncome(newIncome);
                    _setIsLoading(false);
                  }}
                  activeOpacity={0.7}
                >
                  <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    let newIncome = { ...income };
                    newIncome.StartAt = moment(newIncome.StartAt).add(
                      7,
                      "days"
                    );
                    newIncome.EndAt = moment(newIncome.EndAt).add(7, "days");
                    _setIsLoading(true);
                    const response = await driverService.getIncomes(
                      newIncome.StartAt,
                      newIncome.EndAt
                    );
                    let count = 0;
                    let total = 0;
                    let label = [];
                    let data = [];
                    response.Data.forEach((income) => {
                      count += income.Incomes.length;
                      total += income.TotalIncome;
                      label.push(getWeekDay(income.Date));
                      data.push(income.TotalIncome);
                    });
                    newIncome.Incomes = response.Data;
                    newIncome.Count = count;
                    newIncome.Total = total;
                    newIncome.Label = label;
                    newIncome.Data = data;
                    setIncome(newIncome);
                    _setIsLoading(false);
                  }}
                  activeOpacity={0.7}
                >
                  <AntDesign name="right" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Title
                title={numberWithCommas(income.Total ? income.Total : 0)}
                level="h2"
                style={{ marginLeft: 20, marginTop: 5 }}
              />
              <Text style={{ fontFamily: "Roboto_500", marginLeft: 5 }}>
                VND
              </Text>
            </View>
            <Chart label={income.Label} data={income.Data} />
            <View style={styles.wrappDate}>
              <Text style={styles.textDate}>{`${moment(income.StartAt).format(
                FORMAT.DATE
              )}  ${moment(income.EndAt).format(FORMAT.DATE)}`}</Text>
            </View>
          </View>
        </View>
        <View style={styles.lineBreak}></View>
        {/* history */}
        {_isLoading ? (
          <ActivityIndicator />
        ) : (
          <View>
            <Text style={styles.wrappComplete}>
              {income.Count} journey completed
            </Text>
            {income.Incomes.map((item, index) => {
              if (item.TotalIncome !== 0)
                return (
                  <JourneyTab
                    item={item}
                    onPress={() => {
                      let newIncome = { ...income };
                      newIncome.SelectedIncome = item;
                      setIncome(newIncome);
                      navigation.navigate("History");
                    }}
                    key={index}
                    navigation={navigation}
                  />
                );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
