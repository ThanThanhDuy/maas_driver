import React from "react";
import { BarChart } from "react-native-chart-kit";
import { appTheme, colors } from "../../../constants";

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43, 0],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 0) => `rgba(37,40,43,${opacity})`,
  barPercentage: 1,
  fillShadowGradient: colors.primary,
  fillShadowGradientOpacity: 1,
  fillShadowGradientFrom: colors.primary,
  fillShadowGradientTo: colors.primary,
};

export const Chart = () => {
  return (
    <BarChart
      // style={graphStyle}
      data={data}
      width={appTheme.WIDTH - 0}
      height={220}
      chartConfig={chartConfig}
      withHorizontalLabels={false}
      withInnerLines={false}
      style={{
        paddingRight: 0,
        borderRadius: 20,
      }}
    />
  );
};
