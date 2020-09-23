import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Title, Paragraph } from 'react-native-paper';

const ListingView = (props) => {

    return (
        <Card style={styles.container}>
            <Card.Content>
                <Title style={styles.title}>{props.title}</Title>
                <Paragraph>{props.content}</Paragraph>
                <Paragraph>{"$" + props.price}</Paragraph>
            </Card.Content>
        </Card>
    )
}

export default ListingView;

const styles = StyleSheet.create({
    container: {
        marginTop: "2.5%",
        padding: 5,
        flexDirection: "column",
        backgroundColor: "#ffffff",
    },
    title: {
        alignSelf: "flex-start"
    }
});