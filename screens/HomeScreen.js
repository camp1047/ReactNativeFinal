import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { DataContext } from '../DataContext';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

export default function HomeScreen() {
  const { people } = useContext(DataContext);
  const navigation = useNavigation(); // Hook for navigation

  // Function to format date and sort people by date
  const sortPeopleByDate = (people) => {
    return people.sort((a, b) => {
      const [dayA, monthA, yearA] = a.dob.split('/');
      const [dayB, monthB, yearB] = b.dob.split('/');
      return monthA - monthB || dayA - dayB;
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item}
      onPress={() => navigation.navigate('IdeaScreen', { personId: item.id, personName: item.name })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.dob}>{formatDate(item.dob)}</Text>
    </TouchableOpacity>
  );

  // Function to format date as "Day/Month"
  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${month}/${day}/${year}`;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={sortPeopleByDate(people)}
          keyExtractor={(item) => item.id ? item.id.toString() : 'default-id'}
          renderItem={renderItem}
          ListEmptyComponent={<Text>No people added yet. Please add some.</Text>}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    fontSize: 18,
  },
  dob: {
    fontSize: 16,
    color: '#666666',
  },
});
