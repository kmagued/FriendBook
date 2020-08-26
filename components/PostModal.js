import React from "react";
import { TouchableOpacity, Text, Modal, ActivityIndicator } from "react-native";
import CreatePost from "../components/CreatePost";

const PostModal = (props) => {
  return (
    <Modal visible={props.visible} animationType="slide">
      <CreatePost
        onClose={props.onClose}
        image={props.image}
        content={props.content}
        onChange={props.onChange}
        onPost={props.onPost}
        disabled={props.disabled}
        loading={props.loading}
        onAddImage={props.onAddImage}
        closeImage={props.closeImage}
      />
    </Modal>
  );
};

export default PostModal;
