import React,  {useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainPage from "./pages/MainPage";
import DrawerPage from "./pages/DrawerPage";
import DrawerPicture from "./pages/DrawerPicture";
import Profile from "./pages/profilePage/Profile";
import Login from "./pages/profilePage/Login";

import CaptureSign from "./components/CaptureSign";

// import FontsList from "./assets/fonts/FontsList";

import ExLine from "./pages/ExLine";
import ExWord from "./pages/ExWord";
import ExLiterature from "./pages/ExLiterature";
import SubLiter from "./pages/SubLiter";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MAIN"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="MAIN" component={MainPage} />
        <Stack.Screen name="LITER" component={ExLiterature} />
        <Stack.Screen name="DRAWER" component={DrawerPage} />
        <Stack.Screen name="DRAWERPICTURE" component={DrawerPicture} />
        <Stack.Screen name="SUBLITER" component={SubLiter} />

        <Stack.Screen name="PROFILE" component={Profile} />
        <Stack.Screen name="LOGIN" component={Login} />
        {/* <Stack.Screen name="FONTSLIST" component={FontsList} /> */}

        <Stack.Screen name="LINE" component={ExLine} />
        <Stack.Screen name="WORD" component={ExWord} />

        <Stack.Screen name="CAPTURESIGN" component={CaptureSign} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
