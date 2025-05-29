import { Platform, PermissionsAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';

// Camera permission
export const requestCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === 'granted';
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs access to your camera to take photos of cultural items.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.error('Error requesting camera permission:', err);
    return false;
  }
};

// Location permission
export const requestLocationPermission = async (): Promise<boolean> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (err) {
    console.error('Error requesting location permission:', err);
    return false;
  }
};

// Media library permission
export const requestMediaLibraryPermission = async (): Promise<boolean> => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  } catch (err) {
    console.error('Error requesting media library permission:', err);
    return false;
  }
};

// Storage permission (Android only)
export const requestStoragePermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') return true;

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to your storage to save cultural items offline.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.error('Error requesting storage permission:', err);
    return false;
  }
};

// Check and request all required permissions
export const checkAndRequestPermissions = async (): Promise<{
  camera: boolean;
  location: boolean;
  mediaLibrary: boolean;
  storage: boolean;
}> => {
  const camera = await requestCameraPermission();
  const location = await requestLocationPermission();
  const mediaLibrary = await requestMediaLibraryPermission();
  const storage = await requestStoragePermission();

  return {
    camera,
    location,
    mediaLibrary,
    storage,
  };
};

// Check if device has location enabled
export const isLocationEnabled = async (): Promise<boolean> => {
  try {
    const enabled = await Location.hasServicesEnabledAsync();
    return enabled;
  } catch (err) {
    console.error('Error checking location services:', err);
    return false;
  }
};

// Get current location
export const getCurrentLocation = async (): Promise<Location.LocationObject | null> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return null;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    return location;
  } catch (err) {
    console.error('Error getting current location:', err);
    return null;
  }
};

// Check if device has camera
export const hasCameraFeature = async (): Promise<boolean> => {
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === 'granted';
  } catch (err) {
    console.error('Error checking camera feature:', err);
    return false;
  }
}; 