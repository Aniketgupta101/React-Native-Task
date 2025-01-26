import { View, Text, StyleSheet, ImageBackground, Pressable, Vibration } from 'react-native';
import bird1 from '@/assets/images/bird1.jpg';
import bottle1 from '@/assets/images/bottle1.jpg';
import sampleMusic from '@/assets/musics/sample-tone.mp3';
import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import Toast from 'react-native-toast-message';
import * as DocumentPicker from 'expo-document-picker';
import React from 'react';

const App = () => {
  const [backgroundImage, setBackgroundImage] = useState(bird1);
  const [localSound, setLocalSound] = useState(null);
  const [isLocalPlaying, setIsLocalPlaying] = useState(false);
  const [urlSound, setUrlSound] = useState(null);
  const [isUrlPlaying, setIsUrlPlaying] = useState(false);
  const [isVibrating, setIsVibrating] = useState(false);
  const musicUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  const toggleBackground = () => {
    setBackgroundImage((prevImage) =>
      prevImage === bottle1 ? bird1 : bottle1
    );
  };

  const stopAllMusic = async () => {
    if (localSound && isLocalPlaying) {
      await localSound.pauseAsync();
      setIsLocalPlaying(false);
    }
    if (urlSound && isUrlPlaying) {
      await urlSound.pauseAsync();
      setIsUrlPlaying(false);
    }
  };

  const toggleLocalMusic = async () => {
    if (localSound) {
      if (isLocalPlaying) {
        await localSound.pauseAsync();
        setIsLocalPlaying(false);
      } else {
        await stopAllMusic();
        await localSound.playAsync();
        setIsLocalPlaying(true);
      }
    }
  };

  const toggleUrlMusic = async () => {
    if (urlSound) {
      if (isUrlPlaying) {
        await urlSound.pauseAsync();
        setIsUrlPlaying(false);
      } else {
        await stopAllMusic();
        await urlSound.playAsync();
        setIsUrlPlaying(true);
      }
    } else {
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: musicUrl });
      setUrlSound(newSound);
      await stopAllMusic();
      await newSound.playAsync();
      setIsUrlPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsUrlPlaying(false);
        }
      });
    }
  };

  const loadLocalSound = async () => {
    const { sound } = await Audio.Sound.createAsync(sampleMusic);
    setLocalSound(sound);
  };

  const toggleVibration = () => {
    if (isVibrating) {
      Vibration.cancel();
    } else {
      Vibration.vibrate([500, 500], true);
    }
    setIsVibrating(!isVibrating);
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Toast Message',
      text2: 'Hey This is sample toast notifcation!!',
      visibilityTime: 2000,
    });
  };

  const handleFileUpload = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      });
  
      Toast.show({
        type: 'info',
        text1: 'File Selected',
        text2: `You selected: ${file.assets[0].name}`,
        visibilityTime: 3000,
      });
      
      // console.log(file);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'File Selection Cancelled',
        text2: 'No file was selected.',
        visibilityTime: 2000,
      });
    }
  };
  
  

  useEffect(() => {
    loadLocalSound();

    return () => {
      if (localSound) {
        localSound.unloadAsync();
      }
      if (urlSound) {
        urlSound.unloadAsync();
      }
      Vibration.cancel();
    };
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
        <View style={styles.overlay}>
          <Text style={styles.title}>My App</Text>

          

          <Pressable style={styles.toggleButton} onPress={toggleBackground}>
            <Text style={styles.toggleButtonText}>Toggle Background</Text>
          </Pressable>

          <Pressable style={styles.musicButton} onPress={toggleLocalMusic}>
            <Text style={styles.musicButtonText}>
              {isLocalPlaying ? 'Pause Local Music' : 'Play Local Music'}
            </Text>
          </Pressable>

          <Pressable style={styles.musicButton} onPress={toggleUrlMusic}>
            <Text style={styles.musicButtonText}>
              {isUrlPlaying ? 'Pause URL Music' : 'Play URL Music'}
            </Text>
          </Pressable>

          <Pressable style={styles.vibrationButton} onPress={toggleVibration}>
            <Text style={styles.vibrationButtonText}>
              {isVibrating ? 'Stop Vibration' : 'Start Vibration'}
            </Text>
          </Pressable>

          

          <Pressable style={styles.uploadButton} onPress={handleFileUpload}>
            <Text style={styles.uploadButtonText}>Upload File</Text>
          </Pressable>

          <Pressable style={styles.toastButton} onPress={showToast}>
            <Text style={styles.toastButtonText}>Show Toast</Text>
          </Pressable>

          <Link href="/explore" style={styles.linkButton}>
  <Text style={styles.linkButtonText}>Go to Video Player</Text>
</Link>
        </View>
      </ImageBackground>

      {/* Add the Toast component */}
      <Toast />
    </View>
  );  
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  link: {
    marginBottom: 20,
  },
  linkText: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  toggleButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  musicButton: {
    backgroundColor: '#28A745',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  musicButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  vibrationButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  vibrationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  toastButton: {
    backgroundColor: '#FF4500',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  toastButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: '#6A5ACD', // Slate blue for upload button
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkButton: {
    backgroundColor: '#87CEEB', // Sky blue color
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  
  linkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
});
