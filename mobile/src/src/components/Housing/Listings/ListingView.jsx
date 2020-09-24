import React from "react";
import { StyleSheet, Dimensions, Image} from "react-native";
import { Card, Title, Paragraph } from 'react-native-paper';

const ListingView = (props) => {

    const {width, height} = Dimensions.get('window');

    return (
        <Card style={styles.container}>
            <Card.Content>
                <Title style={styles.title}>{props.title}</Title>
                <Paragraph>{props.content}</Paragraph>
                <Paragraph>{"$" + props.price}</Paragraph>
                <Image source={{uri: props.photo}}
                       style={ (props.photo===null)?
                           {width: 0, height:0} : {width: 0.88*width, height: 300}
                       }
                />
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