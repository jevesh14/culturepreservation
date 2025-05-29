import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import type { RootStackParamList } from '../App';

const tabs = [
  {
    name: 'Home',
    icon: 'home',
    route: 'Home',
  },
  {
    name: 'Library',
    icon: 'book',
    route: 'Library',
  },
  {
    name: 'Upload',
    icon: 'plus-circle',
    route: 'Upload',
  },
  {
    name: 'Discuss',
    icon: 'message-circle',
    route: 'Discussion',
  },
];

const TabButton = ({ 
  icon, 
  label, 
  isActive, 
  onPress 
}: { 
  icon: string; 
  label: string; 
  isActive: boolean; 
  onPress: () => void;
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const translateY = React.useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.9,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: -4,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity
      style={styles.tab}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.7}
    >
      <Animated.View
        style={[
          styles.tabContent,
          {
            transform: [
              { scale: scaleAnim },
              { translateY },
            ],
          },
        ]}
      >
        <Icon
          name={icon}
          size={24}
          color={isActive ? '#FF7F00' : '#666'}
        />
        <Text
          style={[
            styles.tabText,
            isActive && styles.tabTextActive,
          ]}
        >
          {label}
        </Text>
        {isActive && <View style={styles.activeIndicator} />}
      </Animated.View>
    </TouchableOpacity>
  );
};

const Footer = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const translateY = React.useRef(new Animated.Value(100)).current;
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

  const isActive = (tabRoute: string) => route.name === tabRoute;

  return (
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
        {tabs.map((tab) => (
          <TabButton
            key={tab.name}
            icon={tab.icon}
            label={tab.name}
            isActive={isActive(tab.route)}
            onPress={() => navigation.navigate(tab.route as keyof RootStackParamList)}
          />
        ))}
      </Animated.View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const tabWidth = width / tabs.length;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingBottom: Platform.OS === 'ios' ? 0 : 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tab: {
    flex: 1,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: tabWidth,
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  tabTextActive: {
    color: '#FF7F00',
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FF7F00',
  },
});

export default Footer;
