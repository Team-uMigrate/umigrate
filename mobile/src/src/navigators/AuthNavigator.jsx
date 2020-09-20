import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import AuthContext from "../contexts/AuthContext";
import TabNavigator from "./TabNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "../components/Login";
import RegistrationPage from "../components/Register";
import MessagingPage from "../components/Messaging";
import { NavContextProvider } from "../contexts/NavContext";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const auth = useContext(AuthContext);

  if (auth.isAuthenticated === true) {
    return (
      <NavContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            gestureDirection={"horizontal-inverted"}
          >
            <Stack.Screen name="Tabs" component={TabNavigator} />
            <Stack.Screen name="Messaging" component={MessagingPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </NavContextProvider>
    );
  } else if (auth.isAuthenticated === false) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Register" component={RegistrationPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <View style={styles.waitContainer}>
        <Text>Please Wait</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
};

export default AuthNavigator;

const styles = StyleSheet.create({
  tabNavigator: {
    backgroundColor: "#ffffff",
  },
  waitContainer: {
    flex: 1,
    backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "center",
  },
});
