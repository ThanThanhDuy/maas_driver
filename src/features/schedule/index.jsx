import { View, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { Agenda, Dropdown, Title } from "../../components";
import { colors } from "../../constants";
import scheduleService from "../../services/Schedule";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";

export const Schedule = ({ navigation }) => {
  const [_listSchedule, _setListSchedule] = useState(null);
  const [_page, _setPage] = useState(1);
  const [_totalCountPage, _setTotalCountPage] = useState(1);
  const [_isLoading, _setIsLoading] = useState(true);
  const [_checkChangeTime, _setCheckChangeTime] = useState(true);
  const [_dateFrom, _setDateFrom] = useState(new Date());
  const [_dateTo, _setDateTo] = useState(
    moment(new Date()).add(14, "days").toDate()
  );

  useEffect(() => {
    const getSchedule = async () => {
      if (_page <= _totalCountPage && _checkChangeTime) {
        _setIsLoading(true);
        const respone = await scheduleService.getScheduleByDate(
          _page,
          5,
          moment(_dateFrom).format("DD-MM-YYYY"),
          moment(_dateTo).format("DD-MM-YYYY")
        );
        if (
          respone.Data &&
          respone.Data.Items &&
          respone.Data.Items.length > 0
        ) {
          _setListSchedule(
            _listSchedule === null
              ? [].concat(respone?.Data.Items)
              : _listSchedule.concat(respone?.Data.Items)
          );
          _setTotalCountPage(respone?.Data.TotalPagesCount);
          _setIsLoading(false);
        }
      }
    };
    getSchedule();
  }, [_page]);

  useEffect(() => {
    const getSchedule = async () => {
      _setIsLoading(true);
      _setCheckChangeTime(false);
      _setPage(1);
      const respone = await scheduleService.getScheduleByDate(
        1,
        5,
        moment(_dateFrom).format("DD-MM-YYYY"),
        moment(_dateTo).format("DD-MM-YYYY")
      );
      if (respone.Data && respone.Data.Items && respone.Data.Items.length > 0) {
        _setListSchedule(respone?.Data.Items);
        _setTotalCountPage(respone?.Data.TotalPagesCount);
        _setIsLoading(false);
      }
    };
    getSchedule();
  }, [_dateFrom, _dateTo]);

  const handleLoadMore = () => {
    _setCheckChangeTime(true);
    _setPage(_page + 1);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          paddingLeft: 10,
          paddingVertical: 10,
        }}
      >
        <Title level="h2" title="Schedule" />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
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
            <AntDesign name="calendar" size={24} color={colors.text} />
          }
          styleBox={{ backgroundColor: colors.transparent, width: 160 }}
        />
        <Dropdown
          label="To"
          mode="date"
          date={_dateTo}
          onDoneValue={date => {
            _setDateTo(date);
          }}
          IconFront={
            <AntDesign name="calendar" size={24} color={colors.text} />
          }
          styleBox={{ backgroundColor: colors.transparent, width: 160 }}
        />
      </View>
      {_listSchedule && (
        <View>
          {/* list schedule */}
          <Agenda
            _listSchedule={_listSchedule}
            navigation={navigation}
            handleLoadMore={handleLoadMore}
            _isLoading={_isLoading}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
