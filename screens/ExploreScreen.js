import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Colors from "../constants/Colors";
import SearchInput from "../components/SearchInput";
import { connect } from "react-redux";
import { searchUsers } from "../store/actions/users";

class ExploreScreen extends React.Component {
  state = { searchContent: "" };

  renderSearchItem = (itemData) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this.props.navigation.navigate("Profile", {
            userId: itemData.item.id,
          });
        }}
      >
        <View style={styles.img}>
          <Image
            resizeMode="cover"
            style={{
              justifyContent: "center",
              flex: 1,
            }}
            source={{ uri: itemData.item.image }}
          />
        </View>
        <Text style={styles.user}>
          {itemData.item.firstname + " " + itemData.item.lastname}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.screen}>
          <SafeAreaView style={{ width: "90%" }}>
            <SearchInput
              placeholder="Search..."
              value={this.state.searchContent}
              onChangeText={(text) => {
                this.setState({ searchContent: text });
                this.props.search(text);
              }}
            />
            <FlatList
              data={this.props.users}
              renderItem={this.renderSearchItem}
              keyExtractor={(user) => user.id}
            />
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  user: {
    color: Colors.primaryColor,
    fontSize: 18,
    fontWeight: "700",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "lightgrey",
    overflow: "hidden",
    marginRight: 7,
  },
});

const mapStateToProps = (state) => {
  return {
    users: state.users.searchList,
  };
};

const mapDispatchToProps = {
  search: searchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen);
