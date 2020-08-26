import firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const verifyPermissions = async () => {
  const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (result.status !== "granted") {
    Alert.alert(
      "Insufficient Permission!",
      "You need to grant camera permissions to use this app.",
      [{ text: "Okay" }]
    );
    return false;
  }
  return true;
};

export const AddImageHandler = async () => {
  const hasPermission = await verifyPermissions();
  if (!hasPermission) {
    return;
  }
  const image = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "Images",
  });
  if (!image.cancelled) {
    return image;
  } else {
    return " ";
  }
};

export const downloadImage = async (filepath, img) => {
  return firebase
    .storage()
    .ref()
    .child(filepath + img)
    .getDownloadURL();
};

export const uploadImage = async (uri, photo, filepath) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  var ref = firebase
    .storage()
    .ref()
    .child(filepath + photo);
  return ref.put(blob);
};
