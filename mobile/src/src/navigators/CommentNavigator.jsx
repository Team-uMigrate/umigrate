import React from "react";
import { NavContextProvider } from "../contexts/NavContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CommentsContainer from "../components/common/Comments/CommentsContainer";

const Stack = createStackNavigator();

const CommentNavigator = ({ postComponent }) => {
  return (
    <NavContextProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName={"Posts"} headerMode={"none"}>
          <Stack.Screen name={"Posts"} component={postComponent} />
          <Stack.Screen name={"Comments"} component={CommentsContainer} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavContextProvider>
  );
};

export default CommentNavigator;
