import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, Text, View, ActivityIndicator } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as tensorflow from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';

import { styles } from './styles';
import { Button } from './components/Button';
import { Classification } from './components/Classification';

export default function App() {
  const [selectedImageUri, setSelectedImageUri] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSelectImage() {
    setIsLoading(true);

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true
      });

      if(!result.canceled){
        const { uri } = result.assets[0];
        setSelectedImageUri(uri);
        await imageClassification(uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function imageClassification(imageUri: string) {
    await tensorflow.ready();
    const model = await mobilenet.load();

    const imageBase64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64
    });

    const imgBuffer = tensorflow.util.encodeString(imageBase64, 'base64').buffer;
    const raw = new Uint8Array(imgBuffer);
    const imageTensor = decodeJpeg(raw);

    const classificationResult = await model.classify(imageTensor);
    console.log( classificationResult);
  }

  return (
    <View style={styles.container}>
      <StatusBar 
        style="light"
        backgroundColor="transparent"
        translucent 
      />
      <View style={styles.header}>
        <Text style={styles.title}>Tensorflow</Text>
      </View>

      <Image 
        source={{ uri: selectedImageUri ? selectedImageUri: 'https://teddytennis.com/usa/wp-content/uploads/sites/88/2017/11/placeholder.png' }} 
        style={styles.image}
      />

      <View style={styles.results}>
        <Classification data={{ className: 'teste', probability: 3 }} />
      </View>

      {
        isLoading
          ? <ActivityIndicator color="#f97316" style={{ marginBottom: 18 }} />
          : <Button title="Selecionar imagem" onPress={handleSelectImage} />
      }
    </View>
  );
}
