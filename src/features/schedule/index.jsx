import { View, SafeAreaView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Agenda, Dropdown, Title } from "../../components";
import { colors } from "../../constants";
import scheduleService from "../../services/Schedule";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useSetRecoilState } from "recoil";
import { tabSelected } from "../../store/navigation";
import { FORMAT } from "../../constants/format";

export const Schedule = ({ navigation }) => {
  const [_listSchedule, _setListSchedule] = useState([]);
  const [_page, _setPage] = useState(1);
  const [_totalCountPage, _setTotalCountPage] = useState(1);
  const [_isLoading, _setIsLoading] = useState(false);
  const [_checkChangeTime, _setCheckChangeTime] = useState(true);
  const [_dateFrom, _setDateFrom] = useState(new Date());
  const [_dateTo, _setDateTo] = useState(
    moment(new Date()).add(14, "days").toDate()
  );
  const isFocused = useIsFocused();
  const _setTabSelected = useSetRecoilState(tabSelected);
  const [_refreshing, _setRefreshing] = useState(false);
  const [_haveData, _setHaveData] = useState(true);

  useEffect(() => {
    const getSchedule = async () => {
      _setRefreshing(true);
      const respone = await scheduleService.getScheduleByDate(
        1,
        5,
        moment(_dateFrom).format(FORMAT.DATE),
        moment(_dateTo).format(FORMAT.DATE)
      );
      if (respone.Data && respone.Data.Items && respone.Data.Items.length > 0) {
        _setListSchedule(respone?.Data.Items);
        _setTotalCountPage(respone?.Data.TotalPagesCount);
        _setHaveData(true);
      } else {
        _setHaveData(false);
      }
      _setRefreshing(false);
      _setIsLoading(false);
      _setPage(1);
      _setCheckChangeTime(false);
    };
    getSchedule();
  }, [isFocused]);

  useEffect(() => {
    const getSchedule = async () => {
      if (_page <= _totalCountPage && _checkChangeTime) {
        _setIsLoading(true);
        const respone = await scheduleService.getScheduleByDate(
          _page,
          5,
          moment(_dateFrom).format(FORMAT.DATE),
          moment(_dateTo).format(FORMAT.DATE)
        );

        if (
          respone.Data &&
          respone.Data.Items &&
          respone.Data.Items.length > 0
        ) {
          _setListSchedule(
            _listSchedule.length === 0
              ? [].concat(respone?.Data.Items)
              : _listSchedule.concat(respone?.Data.Items)
          );
          _setTotalCountPage(respone?.Data.TotalPagesCount);
          _setIsLoading(false);
          _setHaveData(true);
        } else {
          _setHaveData(false);
        }
      }
    };
    getSchedule();
  }, [_page]);

  useEffect(() => {
    isFocused && _setTabSelected("Schedule");
    const getScheduleTime = async () => {
      _setIsLoading(true);
      _setCheckChangeTime(false);
      _setPage(1);
      _setRefreshing(true);
      console.log(
        moment(_dateFrom).format(FORMAT.DATE),
        moment(_dateTo).format(FORMAT.DATE)
      );
      const respone = await scheduleService.getScheduleByDate(
        1,
        5,
        moment(_dateFrom).format(FORMAT.DATE),
        moment(_dateTo).format(FORMAT.DATE)
      );
      _setRefreshing(false);
      if (respone.Data && respone.Data.Items && respone.Data.Items.length > 0) {
        _setListSchedule(respone?.Data.Items);
        _setTotalCountPage(respone?.Data.TotalPagesCount);
        _setIsLoading(false);
        _setHaveData(true);
      } else {
        _setHaveData(false);
      }
    };
    getScheduleTime();
  }, [_dateFrom, _dateTo]);

  const handleLoadMore = () => {
    _setCheckChangeTime(true);
    _setPage(_page + 1);
  };

  const onRefresh = async () => {
    _setRefreshing(true);
    _setCheckChangeTime(false);
    _setPage(1);
    const respone = await scheduleService.getScheduleByDate(
      1,
      5,
      moment(_dateFrom).format(FORMAT.DATE),
      moment(_dateTo).format(FORMAT.DATE)
    );
    if (respone.Data && respone.Data.Items && respone.Data.Items.length > 0) {
      _setListSchedule(respone?.Data.Items);
      _setTotalCountPage(respone?.Data.TotalPagesCount);
      _setRefreshing(false);
      _setHaveData(true);
    } else {
      _setHaveData(false);
    }
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
            if (moment(date).isSameOrAfter(moment(_dateTo), "day")) {
              _setDateTo(moment(date).add(14, "days").toDate());
            }
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
      {_listSchedule && _haveData ? (
        <View>
          {/* list schedule */}
          <Agenda
            _listSchedule={_listSchedule}
            navigation={navigation}
            handleLoadMore={handleLoadMore}
            _isLoading={_isLoading}
            _refreshing={_refreshing}
            onRefresh={onRefresh}
          />
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Ops! Looks like you don't have any trips during this time</Text>
        </View>
      )}
    </SafeAreaView>
  );
};
