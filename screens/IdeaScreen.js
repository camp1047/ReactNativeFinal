import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { DataContext } from '../DataContext';
import { useRoute, useNavigation } from '@react-navigation/native';

export default IdeaScreen = () => {
  const { getIdeasForPerson, deleteIdea } = useContext(DataContext);
  const [ideas, setIdeas] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();
  const personId = route.params.personId;

  useEffect(() => {
    const personIdeas = getIdeasForPerson(personId);
    setIdeas(personIdeas);
  }, [personId]);

  const handleDeleteIdea = (ideaId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this idea?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion cancelled"),
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            await deleteIdea(personId, ideaId);
            setIdeas(currentIdeas => currentIdeas.filter(idea => idea.id !== ideaId));
          },
          style: 'destructive'
        }
      ],
      { cancelable: false }
    );
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.ideaItem}>
      <Image source={{ uri: item.img }} style={styles.thumbnail} />
      <Text style={styles.text}>{item.text}</Text>
      <Button title="Delete" onPress={() => handleDeleteIdea(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ideas for {route.params.personName}</Text>
      <FlatList
        data={ideas}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No ideas yet. Add some!</Text>}
      />
      <TouchableOpacity 
      onPress={() => navigation.navigate('AddIdea', { personId })}
    >
        <Text>Add Idea</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ideaItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  text: {
    flex: 1,
  }
});

