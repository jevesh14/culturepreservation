import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

interface ItemNotFoundProps {
  itemId?: string;
}

// Define the navigation param list type
type RootStackParamList = {
  Home: undefined;
  Library: undefined;
  Upload: undefined;
};

const ItemNotFound: React.FC<ItemNotFoundProps> = ({ itemId }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (itemId) {
      // Show alert when component mounts
      Alert.alert(
        'Item Not Found',
        `We couldn't find an item with ID: ${itemId}`,
        [{ text: 'OK' }]
      );
      
      // Log error for debugging
      console.error(`404 Error: Item with ID "${itemId}" not found in the database`);
    }
  }, [itemId]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Decorative background circles */}
        <View style={[styles.circle, styles.topRightCircle]} />
        <View style={[styles.circle, styles.bottomLeftCircle]} />
        
        <View style={styles.content}>
          {/* Error Icon */}
          <View style={styles.iconContainer}>
            <Icon name="book-x" size={40} color="#EF4444" />
          </View>
          
          <Text style={styles.title}>Item Not Found</Text>
          
          <Text style={styles.description}>
            {itemId ? 
              `The item "${itemId}" doesn't exist or hasn't been added to our database yet.` :
              "This item doesn't exist or hasn't been added to our database yet."
            }
          </Text>
          
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.primaryButton]}
              onPress={() => navigation.navigate('Library')}
              android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
            >
              <Icon name="search" size={16} color="#fff" />
              <Text style={styles.primaryButtonText}>Browse Library</Text>
            </Pressable>
            
            <Pressable
              style={[styles.button, styles.secondaryButton]}
              onPress={() => navigation.navigate('Home')}
              android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
            >
              <Icon name="home" size={16} color="#374151" />
              <Text style={styles.secondaryButtonText}>Back to Home</Text>
            </Pressable>
          </View>
          
          <View style={styles.divider} />
          
          <Text style={styles.contributionText}>
            Would you like to contribute this item to our database?
          </Text>
          <Pressable
            onPress={() => navigation.navigate('Upload')}
            android_ripple={{ color: 'rgba(255, 127, 0, 0.1)' }}
          >
            <Text style={styles.contributionLink}>Add this cultural item</Text>
          </Pressable>
        </View>
      </View>
      
      <View style={styles.technicalDetails}>
        <Text style={styles.technicalTitle}>Technical Details</Text>
        <Text style={styles.technicalText}>
          Item ID: {itemId || 'No ID provided'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 24,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  circle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 127, 0, 0.05)',
  },
  topRightCircle: {
    top: -100,
    right: -100,
  },
  bottomLeftCircle: {
    bottom: -100,
    left: -100,
  },
  content: {
    alignItems: 'center',
    zIndex: 1,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#FF7F00',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 24,
  },
  contributionText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  contributionLink: {
    fontSize: 14,
    color: '#FF7F00',
    fontWeight: '600',
    marginTop: 8,
  },
  technicalDetails: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
  },
  technicalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#991B1B',
    marginBottom: 4,
  },
  technicalText: {
    fontSize: 12,
    color: '#B91C1C',
  },
});

export default ItemNotFound;
