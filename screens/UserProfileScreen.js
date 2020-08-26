import React from "react";
import { StatusBar, FlatList, View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import ProfileHeader from "../components/ProfileHeader";
import Post from "../components/Post";
import Colors from "../constants/Colors";

class UserProfileScreen extends React.Component {
  renderHeader = () => {
    const id = this.props.navigation.getParam("userId");
    const userprofile = this.props.users.filter((user) => user.id === id);

    const postsNumber = this.props.posts.filter((post) => post.userId === id)
      .length;
    return (
      <View>
        <ProfileHeader
          user={userprofile[0]}
          numOfPosts={postsNumber}
          numOfFriends={userprofile[0].friends}
        />
        <View style={styles.feedTitleContainer}>
          <Text style={styles.feedTitle}>Feed</Text>
        </View>
      </View>
    );
  };

  render() {
    const id = this.props.navigation.getParam("userId");
    const userPosts = this.props.posts.filter((post) => post.userId === id);
    const userprofile = this.props.users.filter((user) => user.id === id);

    return (
      <FlatList
        style={{ backgroundColor: "#e6e6e6" }}
        data={userPosts}
        keyExtractor={(item) => item.postId}
        renderItem={(itemData) => {
          return <Post user={userprofile[0]} post={itemData.item} />;
        }}
        ListHeaderComponent={this.renderHeader}
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

const mapStateToProps = (state) => ({
  users: state.users.usersList,
  posts: state.post.posts,
});

export default connect(mapStateToProps)(UserProfileScreen);
