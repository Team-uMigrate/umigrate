import React, { useState, useEffect, useContext } from "react";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import AuthContext from "../contexts/AuthContext";
import TabNavigator from "./TabNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "../components/Login";
import RegistrationPage from "../components/Register";
import MessagingPage from "../components/Messaging";
import { NavContextProvider } from "../contexts/NavContext";
import NotificationPage from "../components/Notifications/NotificationsPage";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const auth = useContext(AuthContext);
  const [expoPushToken, setExpoPushToken] = useState("");

  if (auth.isAuthenticated === true) {
    useEffect(() => {
      registerForPushNotificationsAsync().then((token) =>
        setExpoPushToken(token)
      );
    }, []);

    return (
      <NavContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            gestureDirection={"horizontal-inverted"}
          >
            <Stack.Screen name="Tabs" component={TabNavigator} />
            <Stack.Screen name="Messaging" component={MessagingPage} />
            <Stack.Screen
              name="Notifications"
              options={{
                gestureDirection: "horizontal-inverted",
              }}
              component={NotificationPage}
            />
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

registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};
