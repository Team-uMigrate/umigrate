import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

const CommentBar = () => {
    return(
        <View style={styles.container}>
            <TextInput />
        </View>
    )
}

export default CommentBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    }
});
