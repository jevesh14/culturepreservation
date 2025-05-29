import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import type { RootStackParamList } from '../App';

// Sample options for dropdowns
const categoryOptions = [
  "Scriptures", "Dance Forms", "Art Forms", "Sculptures", 
  "Festivals", "Music", "Costumes & Textiles", "Folktales"
];

const eraOptions = [
  "Ancient", "Vedic Period", "Epic Period", "Classical",
  "Medieval", "Mughal Era", "Colonial", "Modern", "Contemporary"
];

const regionOptions = [
  "North India", "South India", "East India", "West India",
  "Northeast India", "Central India", "Andhra Pradesh", "Assam",
  "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand",
  "Uttar Pradesh", "West Bengal"
];

const styleOptions = [
  "Classical", "Folk", "Tribal", "Religious", "Royal Court", 
  "Fusion", "Contemporary", "Temple", "Rural", "Urban"
];

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    era: '',
    region: '',
    style: '',
    author: '',
  });
  
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission needed',
        'Please grant camera roll permissions to upload images.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setThumbnail(result.assets[0].uri);
    }
  };

  const clearThumbnail = () => {
    setThumbnail(null);
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.title || !formData.description || !formData.category) {
      Alert.alert(
        'Missing Information',
        'Please fill in all required fields (Title, description, and category are required).'
      );
      return;
    }

    // Show submitting state
    setIsSubmitting(true);

    // Simulate API submission
    setTimeout(() => {
      console.log('Submitted data:', { ...formData, thumbnail });
      Alert.alert(
        'Success',
        'Your contribution will be reviewed and published soon.',
        [
          {
            text: 'OK',
            onPress: () => setSubmitted(true),
          },
        ]
      );
      setIsSubmitting(false);
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      era: '',
      region: '',
      style: '',
      author: '',
    });
    setThumbnail(null);
    setSubmitted(false);
  };

  const SelectionModal = ({ title, options, value, onSelect }: any) => (
    <View style={styles.selectContainer}>
      <Text style={styles.label}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {options.map((option: string) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              value === option && styles.optionButtonSelected
            ]}
            onPress={() => onSelect(option)}
          >
            <Text style={[
              styles.optionText,
              value === option && styles.optionTextSelected
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  if (submitted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
          <Feather name="camera" size={24} color="black" />
          </View>
          <Text style={styles.successTitle}>Thank You for Your Contribution!</Text>
          <Text style={styles.successText}>
            Your submission has been received and will be reviewed by our team.
            You'll receive a notification once it's published to the Cultural Hub.
          </Text>
          <View style={styles.successButtons}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={resetForm}
            >
              <Text style={styles.primaryButtonText}>Upload Another Item</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.secondaryButtonText}>Return to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Feather name="camera" size={24} color="black" />
              <Text style={styles.backButtonText}>Back to home</Text>
            </TouchableOpacity>

            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Upload Cultural Content</Text>
              <Text style={styles.headerSubtitle}>
                Share your cultural knowledge with the community
              </Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.formTitle}>Content Information</Text>

            {/* Title */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Title <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={formData.title}
                onChangeText={(value) => handleInputChange('title', value)}
                placeholder="Enter a descriptive title for your content"
              />
            </View>

            {/* Description */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Description <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(value) => handleInputChange('description', value)}
                placeholder="Provide detailed information about this cultural item"
                multiline
                numberOfLines={4}
              />
            </View>

            {/* Category Selection */}
            <SelectionModal
              title="Category"
              options={categoryOptions}
              value={formData.category}
              onSelect={(value: string) => handleInputChange('category', value)}
            />

            {/* Era Selection */}
            <SelectionModal
              title="Era"
              options={eraOptions}
              value={formData.era}
              onSelect={(value: string) => handleInputChange('era', value)}
            />

            {/* Region Selection */}
            <SelectionModal
              title="Region"
              options={regionOptions}
              value={formData.region}
              onSelect={(value: string) => handleInputChange('region', value)}
            />

            {/* Style Selection */}
            <SelectionModal
              title="Style"
              options={styleOptions}
              value={formData.style}
              onSelect={(value: string) => handleInputChange('style', value)}
            />

            {/* Author */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Author/Creator</Text>
              <TextInput
                style={styles.input}
                value={formData.author}
                onChangeText={(value) => handleInputChange('author', value)}
                placeholder="Name of the creator or author (leave blank if unknown)"
              />
            </View>

            {/* Thumbnail Upload */}
            <View style={styles.thumbnailSection}>
              <Text style={styles.label}>Thumbnail Image</Text>
              {thumbnail ? (
                <View style={styles.thumbnailPreview}>
                  <Image
                    source={{ uri: thumbnail }}
                    style={styles.thumbnailImage}
                  />
                  <TouchableOpacity
                    style={styles.clearThumbnail}
                    onPress={clearThumbnail}
                  >
                    <Feather name="camera" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={pickImage}
                >
                  <Feather name="camera" size={24} color="black" />
                  <Text style={styles.uploadButtonText}>Choose Image</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                isSubmitting && styles.submitButtonDisabled
              ]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Submitting...' : 'Submit Content'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff9f5',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButtonText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  headerContent: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    padding: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  required: {
    color: '#FF4444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  selectContainer: {
    marginBottom: 20,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
    marginTop: 8,
  },
  optionButtonSelected: {
    backgroundColor: '#FF7F00',
  },
  optionText: {
    color: '#666',
    fontSize: 14,
  },
  optionTextSelected: {
    color: '#fff',
  },
  thumbnailSection: {
    marginBottom: 20,
  },
  thumbnailPreview: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  thumbnailImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  clearThumbnail: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
  },
  uploadButton: {
    borderWidth: 2,
    borderColor: '#FF7F00',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonText: {
    color: '#FF7F00',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: '#FF7F00',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#22C55E20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  successText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  successButtons: {
    gap: 12,
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#FF7F00',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Upload;
