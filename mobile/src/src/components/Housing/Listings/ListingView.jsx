import React from "react";
import { StyleSheet, Dimensions, Image, View, Text } from "react-native";
import { Card, Title, Paragraph } from 'react-native-paper';

const ListingView = (props) => {

    const {width, height} = Dimensions.get('window');

    return (
        <Card style={styles.container}>
            <Card.Content>
                <View style={{ flexDirection: "row" }}>
                    {/* The below grey view is a placeholder for the profile photo */}
                    <View style={{ backgroundColor: "#eeeeee", borderRadius: 50, flex: 1, marginRight: 5 }} />
                    <View style={{flex: 6, flexDirection: "column"}}>
                        <Text>User Name</Text>
                        <Text>{props.datetime_created}</Text>
                    </View>
                </View>
                <Title style={styles.title}>{props.title}</Title>
                <Paragraph>{props.content}</Paragraph>
                <Paragraph>{"Region: " + props.region}</Paragraph>
                <Paragraph>{"Price: $" + props.price}</Paragraph>
                <Paragraph>{"Season " + props.season + " of " + props.year}</Paragraph>
                <Paragraph>{"Category: " + props.category}</Paragraph>
                <Image source={{uri: props.photo}}
                       style={ (props.photo===null)?
                           {width: 0, height: 0} : {width: 0.88*width, height: 300}
                       }
                />
                <View style={{ flexDirection: "row" }}>
                    <Paragraph style={{ flex: 1, alignSelf: "center" }}>{"Likes: " + props.likes}</Paragraph>
                    <Paragraph style={{ flex: 1, alignSelf: "center" }}>{"Comments: " + props.comments}</Paragraph>
                </View>
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