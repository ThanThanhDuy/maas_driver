import { View, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { Agenda, Title } from "../../components";
import { colors } from "../../constants";

export const Schedule = ({ navigation }) => {
  const [_listSchedule, _setListSchedule] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const respone = {
        Items: [
          {
            Date: "15-10-2022",
            Routes: [
              {
                RouteCode: "123",
                Schedules: [
                  {
                    Time: "08:30:00",
                    StartStation: {
                      Name: "Trường đại học FPT",
                      Code: "...",
                      Address: `Đường D1, Long Thạnh Mỹ, Thành phố Thủ Đức, Thành phố Hồ Chí Minh`,
                    },
                    EndStationCode: {
                      Name: "VBN",
                      Code: "...",
                      Address: `Đường D1, Long Thạnh Mỹ, Thành phố Thủ Đức, Thành phố Hồ Chí Minh`,
                    },
                    Price: 35000,
                    PaymentMethod: 1,
                    PaymentStatus: 1,
                    Distance: 2349,
                    User: {
                      Code: "",
                      Name: "Than Thanh Duy",
                      PhoneNumber: "0376826328",
                      Gender: 1,
                      ChattingRoomCode: "",
                    },
                  },
                  {
                    Time: "09:00:00",
                    StartStation: {
                      Name: "QWE",
                      Code: "...",
                      Address: `Đường D1, Long Thạnh Mỹ, Thành phố Thủ Đức, Thành phố Hồ Chí Minh`,
                    },
                    EndStationCode: {
                      Name: "Công ty Cổ phần Hàng không VietJet",
                      Code: "...",
                      Address: `Đường D1, Long Thạnh Mỹ, Thành phố Thủ Đức, Thành phố Hồ Chí Minh`,
                    },
                    Price: 35000,
                    Distance: 1000,
                    PaymentMethod: 1,
                    PaymentStatus: 0,
                    User: {
                      Code: "",
                      Name: "Nguyen Dang Khoa",
                      PhoneNumber: "",
                      Gender: 1,
                      ChattingRoomCode: "",
                    },
                  },
                  {
                    Time: "09:00:00",
                    StartStation: {
                      Name: "QWE",
                      Code: "...",
                      Address: `Đường D1, Long Thạnh Mỹ, Thành phố Thủ Đức, Thành phố Hồ Chí Minh`,
                    },
                    EndStationCode: {
                      Name: "LKJ",
                      Code: "...",
                      Address: `Đường D1, Long Thạnh Mỹ, Thành phố Thủ Đức, Thành phố Hồ Chí Minh`,
                    },
                    Price: 35000,
                    PaymentMethod: 1,
                    Distance: 456,
                    PaymentStatus: 0,
                    User: {
                      Code: "",
                      Name: "Quach Dai Loi",
                      PhoneNumber: "",
                      Gender: 1,
                      ChattingRoomCode: "",
                    },
                  },
                ],
              },
            ],
          },
          {
            Date: "16-10-2022",
            Routes: [
              {
                RouteCode: "456",
                Schedules: [
                  {
                    Time: "08:30:00",
                    StartStation: {
                      Name: "ABC",
                      Code: "...",
                      Address: `Đường D1, Long Thạnh Mỹ, Thành phố Thủ Đức, Thành phố Hồ Chí Minh`,
                    },
                    EndStationCode: {
                      Name: "XYZ",
                      Code: "...",
                      Address: `Đường D1, Long Thạnh Mỹ, Thành phố Thủ Đức, Thành phố Hồ Chí Minh`,
                    },
                    Price: 35000,
                    PaymentMethod: 1,
                    Distance: 234,
                    PaymentStatus: 0,
                    User: {
                      Code: "",
                      Name: "...",
                      PhoneNumber: "",
                      Gender: 1,
                      ChattingRoomCode: "",
                    },
                  },
                ],
              },
            ],
          },
        ],
      };

      if (respone && respone.Items && respone.Items.length > 0) {
        _setListSchedule(respone?.Items);
      }
    }, 1000);
  }, []);

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
      {_listSchedule && (
        <View>
          {/* list schedule */}
          <Agenda _listSchedule={_listSchedule} navigation={navigation} />
          {/* navigation */}
          <View></View>
        </View>
      )}
    </SafeAreaView>
  );
};
