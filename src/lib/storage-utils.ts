import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER_PREFERENCES: 'user_preferences',
  CACHED_IMAGES: 'cached_images',
  FAVORITES: 'favorites',
  RECENT_VIEWS: 'recent_views',
  THEME: 'app_theme',
  LANGUAGE: 'app_language'
};

// User Preferences
export const saveUserPreferences = async (preferences: Record<string, any>): Promise<void> => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.USER_PREFERENCES,
      JSON.stringify(preferences)
    );
  } catch (error) {
    console.error('Error saving user preferences:', error);
    throw error;
  }
};

export const getUserPreferences = async (): Promise<Record<string, any>> => {
  try {
    const preferences = await AsyncStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return preferences ? JSON.parse(preferences) : {};
  } catch (error) {
    console.error('Error getting user preferences:', error);
    return {};
  }
};

// Favorites Management
export const toggleFavorite = async (itemId: string): Promise<boolean> => {
  try {
    const favorites = await getFavorites();
    const isFavorite = favorites.includes(itemId);
    
    if (isFavorite) {
      const newFavorites = favorites.filter(id => id !== itemId);
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(newFavorites));
      return false;
    } else {
      const newFavorites = [...favorites, itemId];
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(newFavorites));
      return true;
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
};

export const getFavorites = async (): Promise<string[]> => {
  try {
    const favorites = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

// Recent Views
export const addRecentView = async (itemId: string): Promise<void> => {
  try {
    const recentViews = await getRecentViews();
    const newRecentViews = [
      itemId,
      ...recentViews.filter(id => id !== itemId)
    ].slice(0, 20); // Keep only last 20 items
    
    await AsyncStorage.setItem(STORAGE_KEYS.RECENT_VIEWS, JSON.stringify(newRecentViews));
  } catch (error) {
    console.error('Error adding recent view:', error);
    throw error;
  }
};

export const getRecentViews = async (): Promise<string[]> => {
  try {
    const recentViews = await AsyncStorage.getItem(STORAGE_KEYS.RECENT_VIEWS);
    return recentViews ? JSON.parse(recentViews) : [];
  } catch (error) {
    console.error('Error getting recent views:', error);
    return [];
  }
};

// Theme Management
export const setTheme = async (theme: 'light' | 'dark' | 'system'): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (error) {
    console.error('Error setting theme:', error);
    throw error;
  }
};

export const getTheme = async (): Promise<string> => {
  try {
    const theme = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
    return theme || 'system';
  } catch (error) {
    console.error('Error getting theme:', error);
    return 'system';
  }
};

// Language Management
export const setLanguage = async (language: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
  } catch (error) {
    console.error('Error setting language:', error);
    throw error;
  }
};

export const getLanguage = async (): Promise<string> => {
  try {
    const language = await AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE);
    return language || 'en';
  } catch (error) {
    console.error('Error getting language:', error);
    return 'en';
  }
};

// Clear specific storage
export const clearStorage = async (key: keyof typeof STORAGE_KEYS): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS[key]);
  } catch (error) {
    console.error(`Error clearing ${key}:`, error);
    throw error;
  }
};

// Clear all app storage
export const clearAllStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  } catch (error) {
    console.error('Error clearing all storage:', error);
    throw error;
  }
}; 