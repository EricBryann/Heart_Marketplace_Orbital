import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import ImageInput from "./ImageInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

function ImageInputList({ imageUris = [], onRemoveImage, onAddImage }) {
  const scrollView = useRef();
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        ref={scrollView}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.imageListContainer}>
          {imageUris.map((imageUri) => (
            <View key={imageUri} style={styles.imageContainer}>
              <ImageInput
                style={styles.imageInput}
                imageUri={imageUri}
                onPress={() => onRemoveImage(imageUri)}
              />
            </View>
          ))}
        </View>
        <View style={styles.addImage}>
          <TouchableWithoutFeedback onPress={onAddImage}>
            <MaterialCommunityIcons name="camera" size={80} />
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  imageListContainer: {
    flexDirection: "row",
  },
  imageContainer: {
    margin: 10,
  },
  imageInput: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  addImage: {
    margin: 10,
    width: 100,
    height: 100,
    backgroundColor: colors.lightgrey,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});

export default ImageInputList;
