import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Keyboard,
} from "react-native";

// Redux Actions
import {
  addPost,
  fetchPosts,
  likePost,
  updatePost,
} from "../store/actions/post";
import { connect } from "react-redux";

// Components
import Header from "../components/Header";
import Post from "../components/Post";
import PostModal from "../components/PostModal";

// Constants and methods
import Colors from "../constants/Colors";
import {
  AddImageHandler,
  downloadImage,
  uploadImage,
} from "../methods/ImageHandler";

class HomeScreen extends React.Component {
  state = {
    pressed: false,
    content: "",
    pickedImage: " ",
    isLoading: false,
    isRefreshing: false,
    disabled: true,
    ImageLoading: false,
    liked: [],
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.loadPosts().then(() => {
      this.setState({ isLoading: false });
    });
  }

  addImage = () => {
    AddImageHandler().then((img) => {
      this.setState({ pickedImage: img });
    });
  };

  addPostHandler = () => {
    Keyboard.dismiss();
    if (this.state.pickedImage !== " ") {
      this.setState({ ImageLoading: true });
      const ref = Date.now();
      uploadImage(this.state.pickedImage.uri, ref, "post-images/")
        .then(() => {
          console.log("Image uploaded successfully");
          downloadImage("post-images/", ref)
            .then((url) => {
              console.log("Image downloaded successfully");
              this.setState({
                pickedImage: url,
                ImageLoading: false,
                pressed: false,
              });
              this.props
                .add(
                  this.props.user.id,
                  this.state.content,
                  this.state.pickedImage
                )
                .then(() => {
                  console.log("Post added");
                  this.setState({
                    content: "",
                    pickedImage: " ",
                    disabled: true,
                  });
                })
                .catch(() => {
                  console.log("Couldn't add post");
                });
            })
            .catch(() => {
              console.log("Unable to download image");
            });
        })
        .catch(() => {
          console.log("Unable to upload image");
        });
    } else {
      this.props
        .add(this.props.user.id, this.state.content, this.state.pickedImage)
        .then(() => {
          console.log("Post added");
          this.setState({
            pressed: false,
            content: "",
            disabled: true,
          });
        });
    }
  };

  renderPost = (itemData) => {
    const id = this.props.users.findIndex(
      (user) => user.id === itemData.item.userId
    );

    const index = this.props.posts.indexOf(itemData.item);

    const likePostHandler = () => {
      this.props.like(itemData.item.postId, itemData.item.likes).then(() => {
        this.props.update(
          itemData.item.postId,
          this.props.likes[index],
          itemData.item.comments,
          itemData.item.shares
        );
      });
    };

    return (
      <Post
        user={this.props.users[id]}
        post={itemData.item}
        onLike={likePostHandler}
        liked={itemData.item.likes}
        visitProfile={() => {
          this.props.navigation.navigate("Profile", {
            userId: this.props.users[id].id,
          });
        }}
      />
    );
  };

  loadPosts = async () => {
    this.setState({ isRefreshing: true });
    await this.props.fetch();
    this.setState({ isRefreshing: false });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* CREATE POST MODAL */}
        <PostModal
          visible={this.state.pressed}
          image={this.state.pickedImage}
          content={this.state.content}
          loading={this.state.ImageLoading}
          onPost={this.addPostHandler}
          onAddImage={this.addImage}
          onClose={() => {
            this.setState({ pressed: false, content: "", pickedImage: " " });
          }}
          onChange={(text) => {
            text.length !== 0
              ? this.setState({ disabled: false })
              : this.setState({ disabled: true });
            this.setState({ content: text });
          }}
          disabled={this.state.disabled}
          closeImage={() => {
            this.setState({ pickedImage: " " });
          }}
        />
        {/* END OF CREATE POST MODAL */}

        {/* HEADER */}
        <SafeAreaView>
          <Header
            title="FriendBook"
            onNewPost={() => {
              this.setState({ pressed: true });
            }}
          />
        </SafeAreaView>
        {/* END OF HEADER */}

        {/* POSTS */}
        {this.state.isLoading ? (
          <ActivityIndicator
            size="large"
            style={styles.loading}
            color={Colors.primaryColor}
          />
        ) : (
          <FlatList
            data={this.props.posts}
            keyExtractor={(item) => item.postId}
            onRefresh={this.loadPosts}
            refreshing={this.state.isRefreshing}
            renderItem={this.renderPost}
          />
        )}
        {/* END OF POSTS */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    users: state.users.usersList,
    user: state.users.loggedUser,
    posts: state.post.posts,
    likes: state.post.likes,
  };
};

const mapDispatchToProps = {
  add: addPost,
  fetch: fetchPosts,
  like: likePost,
  update: updatePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
