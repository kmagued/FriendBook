import React from "react";
import { View, StyleSheet, Text, ImageBackground, Button } from "react-native";
import Photo from "../components/Photo";
import Box from "../components/Box";

const ProfileHeader = (props) => {
  return (
    <View>
      <ImageBackground
        source={{
          uri:
            "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_600,q_75,w_1000/v1/clients/napavalley/Chappellet_Vineyard_Sunset_in_Fall_42eaa7cf-a1f1-4f6b-a260-b6890a6762db.jpg",
        }}
        style={styles.image}
        blurRadius={10}
      >
        <View
          style={{
            alignItems: "center",
            paddingTop: 50,
            paddingBottom: 10,
          }}
        >
          {props.userProfile ? (
            <View
              style={{
                width: "100%",
                alignItems: "flex-end",
                paddingRight: 5,
              }}
            >
              <Button
                title="Sign Out"
                color="white"
                onPress={props.onSignout}
              />
            </View>
          ) : (
            <View />
          )}
          <Photo src={props.user.image} />
          <Text style={styles.title}>
            {props.user.firstname} {props.user.lastname}
          </Text>
          <Text
            style={{
              color: "white",
              fontWeight: "300",
              fontSize: 18,
            }}
          >
            @{props.user.username}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Box
            num={props.numOfPosts}
            text="POSTS"
            style={{
              flex: 0.5,
              borderRightWidth: 1,
              borderRightColor: "white",
            }}
          />
          <Box num={0} text="FRIENDS" style={{ flex: 0.5 }} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "500",
  },
  topContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginRight: 20,
    marginBottom: 20,
  },
  box: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 7,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  box: {
    flex: 0.5,
    paddingVertical: 7,
  },
});

export default ProfileHeader;
