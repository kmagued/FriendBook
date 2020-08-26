import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

import HomeScreen from "../screens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
// import CreateAccount from "../screens/CreateAccount";
import UserProfileScreen from "../screens/UserProfileScreen";
// import CA from "../screens/CA";
import Name from "../screens/CreateAccount/Name";
import Username from "../screens/CreateAccount/Username";
import UserInfo from "../screens/CreateAccount/UserInfo";
import UserImage from "../screens/CreateAccount/UserImage";

const CreateAccountNav = createStackNavigator(
  {
    Name: Name,
    Username: Username,
    UserInfo: UserInfo,
    UserImage: UserImage,
  },
  {
    headerMode: "none",
  }
);

const HomeNav = createStackNavigator(
  {
    Home: HomeScreen,
    Profile: UserProfileScreen,
  },
  { headerMode: "none" }
);

const ExploreNav = createStackNavigator(
  {
    Explore: ExploreScreen,
    Profile: UserProfileScreen,
  },
  { headerMode: "none" }
);

const tabConfig = {
  Home: {
    screen: HomeNav,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-home" size={25} color={tabInfo.tintColor} />;
      },
    },
  },
  Explore: {
    screen: ExploreNav,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-search" size={25} color={tabInfo.tintColor} />
        );
      },
    },
  },
  Notifications: {
    screen: NotificationScreen,
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="md-person" size={25} color={tabInfo.tintColor} />
        );
      },
    },
  },
};

const tabNav = createBottomTabNavigator(tabConfig, {
  tabBarOptions: {
    activeTintColor: Colors.primaryColor,
  },
});

const Navigator = createSwitchNavigator(
  {
    Login: LoginScreen,
    CreateAccount: CreateAccountNav,
    LoggedIn: tabNav,
  },
  {
    initialRouteName: "Login",
  }
);

export default createAppContainer(Navigator);
