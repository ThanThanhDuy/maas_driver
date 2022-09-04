import { colors } from "../theme/color";

const colorActiveIcon = colors.tabBarAcitve;
const colorInActiveIcon = colors.tabBarInAcitve;
const colorActiveText = colors.text;
const colorInActiveText = "#ccc";
const fontFamilyActive = "Roboto_700";
const fontFamilyInActive = "Roboto_400";
const fontSizeIcon = 24;
const fontSizeLabel = 12;

import { Home } from "../../features";

const getNavigation = () => {
  let listNav = [
    {
      nameNavigation: "Home",
      nameIcom: "home",
      nameLabel: "Home",
      component: Home,
    },
    {
      nameNavigation: "Income",
      nameIcom: "wallet",
      nameLabel: "Income",
      component: Home,
    },
    {
      nameNavigation: "MailBox",
      nameIcom: "chatbox",
      nameLabel: "MailBox",
      component: Home,
    },
  ];
  let listNavBottom = [];
  for (const item of listNav) {
    listNavBottom.push({
      nameNavigation: item.nameNavigation,
      component: item.component,
      options: {
        icon: {
          name: item.nameIcom,
          colorActiveIcon,
          colorInActiveIcon,
          size: fontSizeIcon,
        },
        label: {
          name: item.nameLabel,
          colorActiveText,
          colorInActiveText,
          fontFamilyActive,
          fontFamilyInActive,
          fontSize: fontSizeLabel,
        },
      },
    });
  }
  return listNavBottom;
};

export const NAVIGATION_BOTTOM = getNavigation();
