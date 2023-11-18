import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { auth } from "./src/firebase/config";
import Register from './src/screens/Register/Register';
import Login from './src/screens/Login/Login';
import Home from './src/screens/Home/Home.js';
import Menu from './src/components/Menu/Menu';
import Perfil from './src/screens/Perfil/Perfil';
import Comentar from './src/screens/Comentar/Comentar';
const Stack = createNativeStackNavigator();


export default function App() {


  return (
    
      <NavigationContainer style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name='Registro' component={Register} options={ { headerShown: false } }/>
          <Stack.Screen name='Login' component={Login} options={ { headerShown: false } }/>
          <Stack.Screen name='Menu' component={Menu} options={ { headerShown: false } }/> 
        </Stack.Navigator>

      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
