import React, { useEffect, useState, useContext } from "react";
import {
  View,Text,TouchableOpacity,Image,StyleSheet,TextInput,Alert,KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback
} from "react-native";
import { Camera, CameraView } from "expo-camera";
import { DataContext } from "../DataContext";

export default function AddIdea({ navigation, route }) {
  const { personId } = route.params;
  const { addIdea } = useContext(DataContext);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [ideaText, setIdeaText] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera, please allow access</Text>;
  }

  const takePicture = async () => {
    if (cameraRef) {
      const data = await cameraRef.takePictureAsync();
      setPhoto(data.uri);
    }
  };

  const saveIdea = async () => {
    if (!ideaText || !photo) {
      Alert.alert("Error", "Please provide an idea name and take a photo.");
      return;
    }
    const newIdea = {
      id: new Date().getTime().toString(),
      text: ideaText,
      img: photo,
      width: 500,
      height: 500,
    };
    await addIdea(personId, newIdea);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
        <Text style={styles.disclaimer} >
            Tap anywhere to dismiss keyboard
            </Text>
          <TextInput
            style={styles.input}
            placeholder=" Enter idea name"
            value={ideaText}
            onChangeText={setIdeaText}
          />
          {!photo ? (
            <CameraView style={styles.camera} facing="back" ref={setCameraRef}>
              <TouchableOpacity style={styles.firstButton} onPress={takePicture}>
                <Text style={styles.buttonText}>Take Picture</Text>
              </TouchableOpacity>
            </CameraView>
          ) : (
            <View style={styles.previewContainer}>
              <Image source={{ uri: photo }} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.secondButton}
                onPress={() => setPhoto(null)}
              >
                <Text style={styles.buttonText}>Retake</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondButton} onPress={saveIdea}>
                <Text style={styles.buttonText}>Save Idea</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    width: "100%",
    flex: 1,
    top: 25,  
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 5,
  },
  disclaimer: {
    fontSize: 12,
    top: -40,
    marginBottom: 8,
    color: '#666',
    textAlign: 'center',
},
  camera: {
    width: "80%",
    height: 400,
  },
  previewContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  imagePreview: {
    width: 300,
    height: 450,
    marginBottom: 10,
  },
  secondButton: {
    padding: 15,
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: 10,
    marginBottom: 5,
  },
  firstButton: {
    top: 410,
    width: 150,
    padding: 20,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});
