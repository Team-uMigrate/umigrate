import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import CommentBarButtons from "./CommentBarButtons";

const CommentBar = () => {
    const [text, setText] = useState("");
    const [sendButtonVisible, setSendButtonVisible] = useState(false);

    return(
        <View style={styles.commentBarContainer}>
            <TextInput
                value={text}
                clearTextOnFocus={true}
                autoCorrect={true}
                multiline={true}
                scrollEnabled={true}
                onChangeText={setText}
                placeholder={"Comment..."}
                placeholderTextColor={"#636363"}
                backgroundColor={"#EBEBEB"}
                onFocus={() => { setSendButtonVisible(true) }}
                onEndEditing={() => { setSendButtonVisible(false); }}
                style={styles.textInput}
            />
            <CommentBarButtons sendButtonVisible={sendButtonVisible}/>
        </View>
    )
}

export default CommentBar;

const styles = StyleSheet.create({
    commentBarContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10
    },
    textInput: {
        flex: 9,
        borderRadius: 30,
        paddingLeft: 16,
        paddingRight: 6,
        paddingTop: 2,
        paddingBottom: 2
    },

});
