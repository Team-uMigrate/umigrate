import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";

const CommentBarButtons = ({ sendButtonVisible }) => {

    const [liked, setLiked] = useState(false);

    const likePost = () => {
        setLiked(!liked);

    };

    if(sendButtonVisible) {
        return(
                <View style={ styles.sendButtonView }>
                    <IconButton icon={"send"} style={styles.sendButton}/>
                </View>
        )
    }
    else{
        return(
            <>
                <View style={styles.buttonView}>
                    <IconButton icon={"heart"} color={liked? "red":"black"} style={styles.button} onPress={likePost}/>
                </View>
                <View style={styles.buttonView}>
                    <IconButton icon={"comment"} color={"black"} style={styles.button}/>
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
    sendButtonView: {
        flex: 2,
        marginLeft: 10,
        marginRight: 5,
        alignContent: "center",
        backgroundColor: "#47e9ff",
        borderRadius: 20,
    },
    button: {
        height: 20
    },
    sendButton: {
        color: "white",
        alignSelf: "center",
        height: 20,
        padding: 5
    }
});

