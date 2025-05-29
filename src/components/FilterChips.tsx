import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterChipsProps {
  title: string;
  options: FilterOption[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
  scrollable?: boolean;
  style?: any;
}

const FilterChip = ({
  label,
  isActive,
  onPress,
}: {
  label: string;
  isActive: boolean;
  onPress: () => void;
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
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
    >
      <Animated.View
        style={[
          styles.chip,
          isActive && styles.chipActive,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
          {label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const FilterChips = ({
  title,
  options,
  selectedOptions,
  onChange,
  scrollable = true,
  style,
}: FilterChipsProps) => {
  const ChipsContainer = scrollable ? ScrollView : View;

  const toggleOption = (id: string) => {
    if (selectedOptions.includes(id)) {
      onChange(selectedOptions.filter((item) => item !== id));
    } else {
      onChange([...selectedOptions, id]);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}:</Text>
      <ChipsContainer
        horizontal={scrollable}
        showsHorizontalScrollIndicator={false}
        style={[styles.container, style]}
        contentContainerStyle={scrollable ? styles.scrollContent : styles.gridContent}
      >
        {options.map((option) => (
          <FilterChip
            key={option.id}
            label={option.label}
            isActive={selectedOptions.includes(option.id)}
            onPress={() => toggleOption(option.id)}
          />
        ))}
      </ChipsContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  container: {
    marginVertical: 8,
  },
  scrollContent: {
    paddingRight: 16,
  },
  gridContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  chipActive: {
    backgroundColor: '#FF7F00',
    ...Platform.select({
      ios: {
        shadowColor: '#FF7F00',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  chipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default FilterChips;
