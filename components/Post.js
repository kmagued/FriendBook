import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const Post = (props) => {
  var today = Date.now();

  timeElapsed = (postTime, date) => {
    var time = Math.floor((today - postTime) / 1000);
    if (time < 60) {
      return time + " seconds ago";
    }
    if (time < 3599) {
      time = Math.floor(time / 60);
      return time + " mins";
    }
    if (time < 86399) {
      time = Math.floor(time / 3600);
      return time + " hrs";
    }
    return date;
  };

  return (
    <View style={styles.postContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.container}>
          <TouchableOpacity onPress={props.visitProfile}>
            <View style={styles.img}>
              <Image
                resizeMode="cover"
                style={{
                  justifyContent: "center",
                  flex: 1,
                }}
                source={{ uri: props.user.image }}
              />
            </View>
          </TouchableOpacity>
          <View style={{ marginLeft: 10 }}>
            <TouchableOpacity>
              <Text style={styles.user} onPress={props.visitProfile}>
                {props.user.firstname + " " + props.user.lastname}
              </Text>
            </TouchableOpacity>
            <Text style={{ color: "#696969" }}>
              {timeElapsed(props.post.posted, props.post.date)}
            </Text>
          </View>
        </View>
        <View>
          <Ionicons name="ios-more" color="grey" size={25} />
        </View>
      </View>

      {/* Body */}
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 20, marginHorizontal: 25, marginBottom: 10 }}>
          {props.post.content}
        </Text>
        {props.post.image !== " " ? (
          <View>
            <Image
              resizeMode="cover"
              source={{ uri: props.post.image }}
              style={{ width: "100%", height: 400 }}
            />
          </View>
        ) : (
          <View></View>
        )}
      </View>

      {/* Footer */}
      <View style={styles.bottomContainer}>
        <View style={styles.container}>
          <Ionicons name="ios-share-alt" color="#c0c0c0" size={25} />
          <Text style={styles.iconText}>{props.post.shares}</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.container}>
            {!props.liked ? (
              <Ionicons
                name="ios-heart"
                color="#c0c0c0"
                size={20}
                onPress={props.onLike}
              />
            ) : (
              <Ionicons
                name="ios-heart"
                color={Colors.primaryColor}
                size={20}
              />
            )}
            <Text style={styles.iconText}>{props.post.likes}</Text>
          </View>
          <View style={{ ...styles.container, marginHorizontal: 20 }}>
            <FontAwesome name="comment" color="#c0c0c0" size={20} />
            <Text style={styles.iconText}>{props.post.comments}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginVertical: 8,
    paddingBottom: 10,
    borderColor: "#ccc",
    backgroundColor: "white",
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "lightgrey",
    overflow: "hidden",
  },
  user: {
    color: Colors.primaryColor,
    fontSize: 18,
    fontWeight: "700",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 25,
  },
  iconText: {
    marginLeft: 7,
    color: Colors.primaryColor,
    fontWeight: "700",
  },
});

export default Post;
