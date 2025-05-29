import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Platform,
  KeyboardAvoidingView,
  Modal,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';

interface AddCultureItemModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
}

interface FormData {
  title: string;
  category: string;
  region: string;
  era: string;
  description: string;
  historicalBackground?: string;
  culturalSignificance?: string;
  modernRelevance?: string;
  image?: string;
}

const categories = [
  'Festivals',
  'Art Forms',
  'Dance Forms',
  'Music',
  'Architecture',
  'Scriptures',
  'Cuisine',
  'Clothing',
  'Philosophy',
  'Heritage Sites',
  'Folk Life & Traditions',
];

const FormField = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  required = false,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
  required?: boolean;
}) => {
  const translateX = React.useRef(new Animated.Value(-20)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.fieldContainer,
        {
          transform: [{ translateX }],
          opacity,
        },
      ]}
    >
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
      />
    </Animated.View>
  );
};

const AddCultureItemModal = ({
  isVisible,
  onClose,
  onSubmit,
}: AddCultureItemModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    category: '',
    region: '',
    era: '',
    description: '',
    historicalBackground: '',
    culturalSignificance: '',
    modernRelevance: '',
  });
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 0.9,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFormData({ ...formData, image: result.assets[0].uri });
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.category || !formData.description) {
      // Show error
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Add Cultural Item</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="x" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form}>
            <TouchableOpacity
              style={styles.imageUpload}
              onPress={pickImage}
              activeOpacity={0.8}
            >
              {image ? (
                <Image source={{ uri: image }} style={styles.previewImage} />
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <Icon name="image" size={32} color="#666" />
                  <Text style={styles.uploadText}>Upload Image</Text>
                </View>
              )}
            </TouchableOpacity>

            <FormField
              label="Title"
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
              placeholder="Enter title"
              required
            />

            <FormField
              label="Category"
              value={formData.category}
              onChangeText={(text) => setFormData({ ...formData, category: text })}
              placeholder="Select category"
              required
            />

            <FormField
              label="Region"
              value={formData.region}
              onChangeText={(text) => setFormData({ ...formData, region: text })}
              placeholder="Enter region"
            />

            <FormField
              label="Era"
              value={formData.era}
              onChangeText={(text) => setFormData({ ...formData, era: text })}
              placeholder="Enter historical era"
            />

            <FormField
              label="Description"
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              placeholder="Enter description"
              multiline
              required
            />

            <FormField
              label="Historical Background"
              value={formData.historicalBackground || ''}
              onChangeText={(text) => setFormData({ ...formData, historicalBackground: text })}
              placeholder="Enter historical background"
              multiline
            />

            <FormField
              label="Cultural Significance"
              value={formData.culturalSignificance || ''}
              onChangeText={(text) => setFormData({ ...formData, culturalSignificance: text })}
              placeholder="Enter cultural significance"
              multiline
            />

            <FormField
              label="Modern Relevance"
              value={formData.modernRelevance || ''}
              onChangeText={(text) => setFormData({ ...formData, modernRelevance: text })}
              placeholder="Enter modern relevance"
              multiline
            />
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={[styles.buttonText, styles.submitButtonText]}>
                  Submit
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    maxHeight: '90%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  form: {
    padding: 16,
  },
  imageUpload: {
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  uploadPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    marginTop: 8,
    color: '#666',
    fontSize: 14,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: '#FF7F00',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  submitButton: {
    backgroundColor: '#FF7F00',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  submitButtonText: {
    color: '#fff',
  },
});

export default AddCultureItemModal;
