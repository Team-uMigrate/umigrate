import React, { useContext } from "react"
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View, Text } from "react-native";
import AuthContext from "../contexts/AuthContext";
import TabNavigator from "./TabNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "../components/login/LoginPage";
import RegistrationPage from "../components/register/RegistrationPage";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const auth = useContext(AuthContext);

  if (auth.isAuthenticated === true) {
    return (
      <NavigationContainer>
        <TabNavigator/>
      </NavigationContainer>
    );
  }

  else if (auth.isAuthenticated === false) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginPage}/>
          <Stack.Screen name="Register" component={RegistrationPage}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  else {
    return (
      <View style={styles.waitContainer}>
        <Text>Please Wait</Text>
      </View>
    );
  }

};

export default AuthNavigator;

const styles = StyleSheet.create({
  tabNavigator: {
    backgroundColor: "#ffffff"
  },
  waitContainer: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
