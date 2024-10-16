import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, Alert, KeyboardAvoidingView } from 'react-native';
import { Camera } from 'expo-camera';
import { DataContext } from '../DataContext';

const screenWidth = Dimensions.get('window').width;
const imageWidth = screenWidth * 0.6; 
const imageHeight = imageWidth * (3 / 2); 

export default function AddIdeaScreen({ navigation, route }) {
    const { personId } = route.params;
    const { addIdea } = useContext(DataContext);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [ideaName, setIdeaName] = useState('');
    const [photoUri, setPhotoUri] = useState('');

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleTakePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true, aspect: [2, 3] };
            const photo = await this.camera.takePictureAsync(options);
            setPhotoUri(photo.uri);
        }
    };

    const handleSave = () => {
        if (!ideaName || !photoUri) {
            Alert.alert("Error", "Please provide an idea name and take a photo.");
            return;
        }
        const idea = { id: Math.random().toString(), name: ideaName, imgUri: photoUri };
        addIdea(personId, idea);
        navigation.goBack();
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <TextInput
                style={styles.input}
                placeholder="Enter idea name"
                value={ideaName}
                onChangeText={setIdeaName}
            />
            <Camera
                style={{ width: imageWidth, height: imageHeight }}
                type={type}
                ref={ref => {
                    this.camera = ref;
                }}
            >
                <Button title="Take Photo" onPress={handleTakePicture} />
            </Camera>
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={handleCancel} />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    }
});

