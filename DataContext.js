import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from 'expo-crypto';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const storedData = await AsyncStorage.getItem("people");
    if (storedData) {
      setPeople(JSON.parse(storedData));
    }
  };

  const addPerson = async (person) => {
    const uuid = await Crypto.randomUUID();
    const newPeople = [...people, { ...person, id: uuid }];
    setPeople(newPeople);
    await AsyncStorage.setItem("people", JSON.stringify(newPeople));
};

  const deletePerson = async (id) => {
    const updatedPeople = people.filter(p => p.id !== id);
    setPeople(updatedPeople);
    await AsyncStorage.setItem("people", JSON.stringify(updatedPeople));
  };

  const getIdeasForPerson = (personId) => {
    const person = people.find(p => p.id === personId);
    return person ? person.ideas : [];
  };

  const addIdea = async (personId, idea) => {
    const updatedPeople = people.map(person => {
      if (person.id === personId) {
        return { ...person, ideas: [...person.ideas, idea] };
      }
      return person;
    });
    setPeople(updatedPeople);
    await AsyncStorage.setItem("people", JSON.stringify(updatedPeople));
  };

  const deleteIdea = async (personId, ideaId) => {
    const updatedPeople = people.map(person => {
      if (person.id === personId) {
        const filteredIdeas = person.ideas.filter(idea => idea.id !== ideaId);
        return { ...person, ideas: filteredIdeas };
      }
      return person;
    });
    setPeople(updatedPeople);
    await AsyncStorage.setItem("people", JSON.stringify(updatedPeople));
  };

  return (
    <DataContext.Provider value={{ people, addPerson, deletePerson, getIdeasForPerson, addIdea, deleteIdea }}>
      {children}
    </DataContext.Provider>
  );
};
