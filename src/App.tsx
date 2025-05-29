import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';

// Import pages
import Index from './pages/Index';
import Library from './pages/Library';
import CultureItemDetail from './pages/CultureItemDetail';
import CategoryDetail from './pages/CategoryDetail';
import Upload from './pages/Upload';
import Discussion from './pages/Discussion';
import DiscussionDetail from './pages/DiscussionDetail';
import MobileAuth from './pages/MobileAuth';
import Profile from './pages/Profile';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export type RootStackParamList = {
  Home: undefined;
  Library: undefined;
  CultureItemDetail: { id: string };
  CategoryDetail: { id: string };
  Upload: undefined;
  Discussion: undefined;
  DiscussionDetail: { id: string };
  MobileAuth: undefined;
  Profile: undefined;
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#fff',
              },
              headerTintColor: '#FF7F00',
              headerLargeTitle: true,
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={Index}
              options={{
                title: 'भारत संस्कृति',
                headerLargeTitle: true,
              }}
            />
            <Stack.Screen 
              name="Library" 
              component={Library}
              options={{
                title: 'Cultural Library',
              }}
            />
            <Stack.Screen 
              name="CultureItemDetail" 
              component={CultureItemDetail}
              options={{
                title: 'Culture Details',
              }}
            />
            <Stack.Screen 
              name="CategoryDetail" 
              component={CategoryDetail}
              options={{
                title: 'Category Details',
              }}
            />
            <Stack.Screen 
              name="Upload" 
              component={Upload}
              options={{
                title: 'Upload Content',
              }}
            />
            <Stack.Screen 
              name="Discussion" 
              component={Discussion}
              options={{
                title: 'Discussion Portal',
              }}
            />
            <Stack.Screen 
              name="DiscussionDetail" 
              component={DiscussionDetail}
              options={{
                title: 'Discussion',
              }}
            />
            <Stack.Screen 
              name="MobileAuth" 
              component={MobileAuth}
              options={{
                title: 'Sign In',
              }}
            />
            <Stack.Screen 
              name="Profile" 
              component={Profile}
              options={{
                title: 'Profile',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
