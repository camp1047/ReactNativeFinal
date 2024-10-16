import React, { useState, useContext, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { DataContext } from '../DataContext';
import Calendar from '../calendar.js';

export default function AddPerson({ navigation }) {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [isValidDate, setIsValidDate] = useState(true); // State for date validation
    const timer = useRef(null); // Ref for timer

    const { addPerson } = useContext(DataContext);

    const handleDateSelected = (date) => {
        const formattedDate = formatDateString(date);
        setDob(formattedDate);
        validateDate(formattedDate); 
    };

    const formatDateString = (date) => {
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    }; // Function to format date as "dd/mm/yyyy"

    const handleDobChange = (text) => {
        setDob(text);
        setIsValidDate(true);
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            if (text.split('/').length === 3) { // Check if date is complete
                validateDate(text);
            }
        }, 700); 
    };

    const validateDate = (dateStr) => {
        const parts = dateStr.split('/'); 
        if (parts.length === 3) { // Check if date is complete
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10);
            const year = parseInt(parts[2], 10);
            if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1970 || year > new Date().getFullYear()) { // Check if date is valid
                Alert.alert("Invalid Date", "Please enter a valid date.");
                setIsValidDate(false); 
            } else {
                setIsValidDate(true);  
            }
        } else {
            setIsValidDate(false);  // State set to false if date is incomplete
        }
    };

    const handleAddPerson = () => {
        if (!name || !dob || !isValidDate) {
            Alert.alert('Validation', 'Please fill out all fields correctly.');
            return;
        }
        const newPerson = { name, dob, ideas: [] };
        addPerson(newPerson);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter name"
            />
            <Text style={styles.label}>Date of Birth (dd/mm/yyyy):</Text>
            <TextInput
                style={styles.input}
                value={dob}
                onChangeText={handleDobChange}
                placeholder="Enter date of birth"
                keyboardType="numeric"
            />
            <Calendar onDateSelected={handleDateSelected} />
            <Button title="Add Person" onPress={handleAddPerson} color={isValidDate ? "#007AFF" : "#ccc"} />
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});
