import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, Text, View, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { styles } from './styles';
import { Button } from './components/Button';

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
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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

      <View style={styles.results}></View>

      {
        isLoading
          ? <ActivityIndicator color="#f97316" style={{ marginBottom: 18 }} />
          : <Button title="Selecionar imagem" onPress={handleSelectImage} />
      }
    </View>
  );
}
