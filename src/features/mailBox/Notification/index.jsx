import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LOGO } from "../../../assets";
import { HeaderBack, TabItem } from "../../../components";
import { useIsFocused } from "@react-navigation/native";
import driverService from "../../../services/driver";
import moment from "moment";
import { FORMAT } from "../../../constants/format";
// import { DATE_TIME_FORMAT } from "../../../constants/date";

export const Notification = ({ navigation }) => {
  const [_isLoading, _setIsLoading] = useState(false);
  const [_page, _setPage] = useState(1);
  const [_totalPagesCount, _setTotalPagesCount] = useState(0);
  const [_notifications, _setNotifications] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    _loadData();
  }, [isFocused]);

  const _loadData = async () => {
    _setIsLoading(true);
    const response = await driverService.getNotifications(1);
    console.log(response);
    if (response && response.StatusCode === 200) {
      _setNotifications(response?.Data?.Items);
      _setTotalPagesCount(response.Data.TotalPagesCount);
    }
    _setIsLoading(false);
  };

  const _loadMore = async () => {
    _setIsLoading(true);

    if (_page < _totalPagesCount) {
      const response = await driverService.getNotifications(_page + 1);

      if (response && response.StatusCode === 200) {
        _setNotifications(_notifications.concat(response.Data.Items));
        _setPage(_page + 1);
      } else {
        Alert.alert("Error", response?.Message);
      }
    }
    _setIsLoading(false);
  };
  return (
    <View>
      <SafeAreaView>
        <HeaderBack title="Notifications" navigation={navigation} />
      </SafeAreaView>
      <ScrollView
        onMomentumScrollEnd={_loadMore}
        showsVerticalScrollIndicator={false}
      >
        {_notifications?.map((notification, index) => (
          <TabItem
            iconLeft={
              <Image
                style={{
                  width: 40,
                  height: 40,
                }}
                source={LOGO.logo}
              />
            }
            iconRight={<View />}
            key={index}
            label={notification.Title}
            description={`${notification.Content} \n${moment(
              notification.DateTime
            ).format(FORMAT.DATE_TIME)}`}
          />
        ))}
        {_isLoading ? <ActivityIndicator /> : null}
      </ScrollView>
      <View></View>
    </View>
  );
};
