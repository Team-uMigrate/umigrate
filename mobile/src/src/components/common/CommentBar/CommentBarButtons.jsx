import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

const CommentBarButtons = ({ sendButtonVisible }) => {

    if(sendButtonVisible) {

        return(
            <View style={ [styles.buttonView] }>
                <Button icon={"send"} style={styles.sendButton}/>
            </View>
        )
    }
    else{
        return(
            <>
                <View style={styles.buttonView}>
                    <Button icon={"heart"} color={"red"} />
                </View>
                <View style={styles.buttonView}>
                    <Button icon={"comment"} color={"black"} />
                </View>
            </>
        )
    }
};

export default CommentBarButtons;

const styles = StyleSheet.create({
    buttonView:{
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        alignContent: "center"
    },
    likeButton: {
        color: "red"
    },
    sendButton: {
        color: "white",
    }
});

