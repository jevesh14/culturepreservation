import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import type { RootStackParamList } from '../App';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showProfile?: boolean;
  showSearch?: boolean;
}

const HeaderButton = ({ 
  onPress, 
  icon, 
  testID 
}: { 
  onPress: () => void; 
  icon: string;
  testID?: string;
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.7}
      testID={testID}
    >
      <Animated.View
        style={[
          styles.iconButton,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Icon name={icon} size={24} color="#333" />
      </Animated.View>
    </TouchableOpacity>
  );
};

const Header = ({
  title = 'भारत संस्कृति',
  showBack = false,
  showProfile = true,
  showSearch = true,
}: HeaderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const translateY = React.useRef(new Animated.Value(-50)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
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
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.safeArea}>
        <Animated.View 
          style={[
            styles.container,
            {
              transform: [{ translateY }],
              opacity,
            },
          ]}
        >
          <View style={styles.content}>
            {/* Left Section */}
            <View style={styles.leftSection}>
              {showBack && (
                <HeaderButton
                  icon="arrow-left"
                  onPress={() => navigation.goBack()}
                  testID="back-button"
                />
              )}
              <Text style={styles.title} numberOfLines={1}>{title}</Text>
            </View>

            {/* Right Section */}
            <View style={styles.rightSection}>
              {showSearch && (
                <HeaderButton
                  icon="search"
                  onPress={() => {
                    // Implement search functionality
                  }}
                  testID="search-button"
                />
              )}
              {showProfile && (
                <HeaderButton
                  icon="user"
                  onPress={() => navigation.navigate('Profile')}
                  testID="profile-button"
                />
              )}
            </View>
          </View>
        </Animated.View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
});

export default Header;
