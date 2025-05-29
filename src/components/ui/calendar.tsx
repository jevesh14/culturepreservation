import React from 'react';
import { StyleSheet, ViewStyle, Platform } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { format } from 'date-fns';

interface CalendarProps {
  selected?: Date | null;
  onSelect?: (date: Date) => void;
  style?: ViewStyle;
  minDate?: Date;
  maxDate?: Date;
  initialDate?: Date;
}

const Calendar = ({
  selected,
  onSelect,
  style,
  minDate,
  maxDate,
  initialDate,
}: CalendarProps) => {
  const markedDates = selected
    ? {
        [format(selected, 'yyyy-MM-dd')]: {
          selected: true,
          selectedColor: '#FF7F00',
        },
      }
    : {};

  return (
    <RNCalendar
      style={[styles.calendar, style]}
      markedDates={markedDates}
      onDayPress={(day) => {
        onSelect?.(new Date(day.timestamp));
      }}
      minDate={minDate ? format(minDate, 'yyyy-MM-dd') : undefined}
      maxDate={maxDate ? format(maxDate, 'yyyy-MM-dd') : undefined}
      initialDate={
        initialDate ? format(initialDate, 'yyyy-MM-dd') : undefined
      }
      theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#333333',
        selectedDayBackgroundColor: '#FF7F00',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#FF7F00',
        dayTextColor: '#333333',
        textDisabledColor: '#d9e1e8',
        dotColor: '#FF7F00',
        selectedDotColor: '#ffffff',
        arrowColor: '#FF7F00',
        monthTextColor: '#333333',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 14,
      }}
    />
  );
};

const styles = StyleSheet.create({
  calendar: {
    borderRadius: 8,
    backgroundColor: '#fff',
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
});

export default Calendar;
