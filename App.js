import React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DataProvider } from './DataContext';
import HomeScreen from './screens/HomeScreen';
import AddPerson from './screens/AddPerson';
import IdeaScreen from './screens/IdeaScreen';
import AddIdea from './screens/AddIdea';

const Stack = createStackNavigator();

const App = () => {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: "Home",
              headerRight: () => (
                <View style={{ paddingRight: 10 }}>  
                  <Button 
                    title="Add Person"
                    onPress={() => navigation.navigate('AddPerson')}
                  />
                </View>
              ),
            })}
          />
          <Stack.Screen 
            name="AddPerson"
            component={AddPerson}
            options={{ title: "Add Person" }}
          />
          <Stack.Screen 
            name="IdeaScreen"
            component={IdeaScreen}
            options={{ title: "Idea Screen" }}
          />
          <Stack.Screen 
            name="AddIdea"
            component={AddIdea}
            options={{ title: "Add Idea" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
};

export default App;
