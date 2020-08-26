import React from "react";
import { View, StyleSheet, Text } from "react-native";
import IconWithBadge from "../components/IconBadge";

class NotificationScreen extends React.Component {
  state = { notifications: 6 };

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      tabBarIcon: (tabInfo) => {
        return (
          <IconWithBadge
            name="ios-notifications"
            size={25}
            color={tabInfo.tintColor}
            badgeCount={params.notifications}
          />
        );
      },
    };
  };

  componentDidMount = () => {
    this.props.navigation.setParams({
      notifications: this.state.notifications,
    });
  };

  render() {
    return (
      <View style={styles.screen}>
        <Text>Notifications: {this.state.notifications}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NotificationScreen;
