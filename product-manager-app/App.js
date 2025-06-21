import React from "react";
import LoginPage from "./components/LoginPage.js";
import HomePage from "./components/HomePage.js";
import AddProductPage from "./components/AddProductPage.js";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack=createStackNavigator();

const App=()=>{

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"
      screenOptions={{headerShown:false}} >

      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="AddProduct" component={AddProductPage} />
    
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;