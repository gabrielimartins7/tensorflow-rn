import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, View } from 'react-native';

import { styles } from './styles';
import { Button } from './components/Button';

export default function App() {
  const [selectedImageUri, setSelectedImageUri] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar 
        style="light"
        backgroundColor="transparent"
        translucent 
      />

      <Image 
        source={{ uri: selectedImageUri ? selectedImageUri: 'https://teddytennis.com/usa/wp-content/uploads/sites/88/2017/11/placeholder.png' }} 
        style={styles.image}
      />
      <Button title="Selecionar imagem" />
    </View>
  );
}
