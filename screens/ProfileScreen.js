import React from "react";
import {
  StatusBar,
  FlatList,
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

//Redux Actions
import { connect } from "react-redux";
import { signout } from "../store/actions/users";

//Components
import ProfileHeader from "../components/ProfileHeader";
import Post from "../components/Post";

//Constants
import Colors from "../constants/Colors";

class ProfileScreen extends React.Component {
  componentDidMount() {
    StatusBar.setBarStyle("dark-content");
  }

  signoutHandler = () => {
    this.props.signout().then(() => {
      if (!this.props.login) {
        Alert.alert("", "Are you sure you want to sign out?", [
          { text: "Cancel", style: "cancel" },
          {
            text: "Sign out",
            style: "destructive",
            onPress: () => {
              this.props.navigation.navigate("Login");
            },
          },
        ]);
      }
    });
  };

  renderHeader = () => {
    const postsNumber = this.props.posts.filter(
      (post) => post.userId === this.props.user.id
    ).length;
    return (
      <View>
        <ProfileHeader
          user={this.props.user}
          numOfPosts={postsNumber}
          numOfFriends={this.props.user.friends}
          userProfile={true}
          onSignout={this.signoutHandler}
        />
        <View style={styles.feedTitleContainer}>
          <Text style={styles.feedTitle}>Feed</Text>
        </View>
      </View>
    );
  };

  render() {
    const userPosts = this.props.posts.filter(
      (post) => post.userId === this.props.user.id
    );
    return (
      <FlatList
        ListHeaderComponent={this.renderHeader}
        style={{ backgroundColor: "#e6e6e6" }}
        data={userPosts}
        keyExtractor={(item) => item.postId}
        renderItem={(itemData) => {
          return <Post user={this.props.user} post={itemData.item} />;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  feedTitleContainer: {
    paddingHorizontal: 15,
    backgroundColor: Colors.primaryColor,
    opacity: 0.8,
    paddingVertical: 7,
  },
  feedTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
});

const mapDispatchToProps = {
  signout: signout,
};
const mapStateToProps = (state) => ({
  users: state.users.usersList,
  login: state.users.loggedIn,
  user: state.users.loggedUser,
  posts: state.post.posts,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
