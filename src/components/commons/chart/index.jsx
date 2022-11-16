import React from "react";
import { BarChart } from "react-native-chart-kit";
import { appTheme, colors } from "../../../constants";

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

export const Chart = (props) => {
  const { data = [], label = [] } = props;
  return (
    <BarChart
      // style={graphStyle}
      data={{
        labels: label,
        datasets: [
          {
            data: data,
          },
        ],
      }}
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
