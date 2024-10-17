import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';

const Calendar = ({ onDateSelected }) => {
    const currentYear = new Date().getFullYear();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
    const [monthContainerVisible, setMonthContainerVisible] = useState(false);
    const [yearModalVisible, setYearModalVisible] = useState(false);

    //did it this way because I wanted to have the years from 1970 to current year. I wouldn't think anyone would choose a year so recent but yeah
    // also made the calendar cause i didn't like how the default react ones looked an wanted to try making it look like the demo
    const years = Array.from({ length: currentYear - 1970 + 1 }, (_, i) => 1970 + i);
    const months = Array.from({ length: 12 }, (_, index) => new Date(0, index).toLocaleString('default', { month: 'long' }));
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const updateDate = (year, month) => {
        setCurrentDate(new Date(year, month, 1));
    };

    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const startDay = new Date(selectedYear, selectedMonth, 1).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const handleDayPress = (day) => {
        const date = new Date(selectedYear, selectedMonth, day);
        onDateSelected(date);
    };

    return (
        
        <View style={styles.container}>
            <View style={styles.options}>
            <TouchableOpacity style={styles.dropdown} onPress={() => setMonthContainerVisible(!monthContainerVisible)}>
                <Text>{months[selectedMonth]}</Text>
            </TouchableOpacity>
            {monthContainerVisible && (
                <View style={styles.monthContainer}>
                    {months.map((month, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.monthItem}
                            onPress={() => {
                                setSelectedMonth(index);
                                updateDate(selectedYear, index);
                                setMonthContainerVisible(false);
                            }}
                        >
                            <Text>{month}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
            <TouchableOpacity style={styles.dropdown} onPress={() => setYearModalVisible(true)}>
                <Text>{selectedYear}</Text>
            </TouchableOpacity>
            <Modal
                visible={yearModalVisible}
                transparent={true}
                onRequestClose={() => setYearModalVisible(false)}
            >
                <View style={styles.modalContentContainer}>
                <FlatList
                    data={years}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.modalItem}
                            onPress={() => {
                                setSelectedYear(item);
                                updateDate(item, selectedMonth);
                                setYearModalVisible(false);
                            }}
                        >
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
                </View>
            </Modal>
            </View>
            <View style={styles.weekDaysContainer}>
                {daysOfWeek.map(day => (
                    <Text key={day} style={styles.day}>{day}</Text>
                ))}
            </View>
            <View style={styles.daysContainer}>
                {Array.from({ length: startDay }).map((_, index) => (
                    <Text key={index} style={styles.day}></Text>
                ))}
                {days.map(day => (
                    <TouchableOpacity
                        key={day}
                        style={styles.day}
                        onPress={() => handleDayPress(day)}
                    >
                        <Text>{day}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        
    },
    options: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 10,
        
    },
    dropdown: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        backgroundColor: '#ccc',
        marginBottom: 10,
        borderRadius: 5,
    },
    monthContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: '#f0f0f0',
        // borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
    monthItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#e0e0e0',
    },
    modalItem: {
        padding: 10,
        backgroundColor: '#ddd',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    modalContentContainer: {
        backgroundColor: 'white',
        // padding: 10,
    },
    weekDaysContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: -5,
        width: 345,
        // justifyContent: 'space-between',
    },
    daysContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 335,
        
    },
    day: {
        width: '14.28%',
        padding: 9,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Calendar;
