import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PeopleContext = createContext();

export const usePeople = () => useContext(PeopleContext);

export const PeopleProvider = ({ children }) => {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        const loadPeople = async () => {
            const storedPeople = await AsyncStorage.getItem('people');
            if (storedPeople) setPeople(JSON.parse(storedPeople));
        };
        loadPeople();
    }, []);

    const addPerson = async (person) => {
        const newPeople = [...people, person];
        setPeople(newPeople);
        await AsyncStorage.setItem('people', JSON.stringify(newPeople));
    };

    const removePerson = async (id) => {
        const newPeople = people.filter(p => p.id !== id);
        setPeople(newPeople);
        await AsyncStorage.setItem('people', JSON.stringify(newPeople));
    };

    return (
        <PeopleContext.Provider value={{ people, addPerson, removePerson }}>
            {children}
        </PeopleContext.Provider>
    );
};
