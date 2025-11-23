import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AddExcursionScreen from './src/screens/AddExcursionScreen';
import { Excursion } from './src/types';

export type RootStackParamList = {
  Home: {
    newExcursion?: Excursion;
    updatedExcursion?: Excursion;
  } | undefined;
  AddExcursion: {
    editExcursion?: Excursion;
  } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddExcursion" component={AddExcursionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
