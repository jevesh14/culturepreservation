import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import type { RootStackParamList } from '../App';

const Profile = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            // Clear auth token from secure storage (implement this)
            navigation.replace('MobileAuth');
          },
        },
      ]
    );
  };

  const MenuItem = ({ icon, title, subtitle, onPress }: any) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
    >
      <View style={styles.menuIcon}>
      <Feather name="camera" size={24} color="black" />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      <Feather name="camera" size={24} color="black" />
    </TouchableOpacity>
  );

  const NotificationItem = ({ title, subtitle, value, onValueChange }: any) => (
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{title}</Text>
        <Text style={styles.notificationSubtitle}>{subtitle}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#ddd', true: '#FF7F00' }}
        thumbColor="#fff"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>BJ</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Bhavika Jain</Text>
              <Text style={styles.userPhone}>+91 98765 43210</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => Alert.alert('Edit Profile', 'This feature is coming soon!')}
          >
            <Feather name="camera" size={24} color="black" />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <MenuItem
            icon="user"
            title="Personal Information"
            subtitle="Manage your profile details"
            onPress={() => Alert.alert('Profile', 'View and edit your profile information')}
          />
          <MenuItem
            icon="map-pin"
            title="Location"
            subtitle="Delhi, India"
            onPress={() => Alert.alert('Location', 'Update your location')}
          />
          <MenuItem
            icon="globe"
            title="Language"
            subtitle="English"
            onPress={() => Alert.alert('Language', 'Choose your preferred language')}
          />
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <NotificationItem
            title="Email Notifications"
            subtitle="Get updates about cultural content"
            value={emailNotifications}
            onValueChange={setEmailNotifications}
          />
          <NotificationItem
            title="SMS Notifications"
            subtitle="Receive alerts via SMS"
            value={smsNotifications}
            onValueChange={setSmsNotifications}
          />
        </View>

        {/* Cultural Interests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cultural Interests</Text>
          <View style={styles.interestsGrid}>
                      {['Scriptures', 'Dance Forms', 'Art Forms', 'Festivals', 'Music', 'Architecture'].map((interest) => (
              <TouchableOpacity
                key={interest}
                style={[
                  styles.interestTag,
                  ['Scriptures', 'Art Forms', 'Festivals'].includes(interest) && styles.interestTagActive
                ]}
              >
                <Text
                  style={[
                    styles.interestText,
                    ['Scriptures', 'Art Forms', 'Festivals'].includes(interest) && styles.interestTextActive
                  ]}
                >
                            {interest}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* More Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More</Text>
          <MenuItem
            icon="help-circle"
            title="Help & Support"
            onPress={() => Alert.alert('Help', 'Contact our support team')}
          />
          <MenuItem
            icon="info"
            title="About"
            onPress={() => Alert.alert('About', 'Learn more about our app')}
          />
          <MenuItem
            icon="shield"
            title="Privacy Policy"
            onPress={() => Alert.alert('Privacy', 'Read our privacy policy')}
          />
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleLogout}
        >
          <Feather name="camera" size={24} color="black" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF7F00',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#FF7F00',
    borderRadius: 20,
  },
  editButtonText: {
    color: '#FF7F00',
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF7F00/10',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  notificationContent: {
    flex: 1,
    marginRight: 16,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  notificationSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  interestTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    margin: 4,
  },
  interestTagActive: {
    backgroundColor: '#FF7F00/10',
  },
  interestText: {
    color: '#666',
    fontSize: 14,
  },
  interestTextActive: {
    color: '#FF7F00',
    fontWeight: '600',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 16,
    marginBottom: 32,
    padding: 16,
  },
  signOutText: {
    marginLeft: 8,
    color: '#FF4444',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Profile;
