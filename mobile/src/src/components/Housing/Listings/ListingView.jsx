import React from "react";
import { StyleSheet, Dimensions, Image, View, Text } from "react-native";
import { Card, Title, Paragraph, Avatar } from 'react-native-paper';
import ProfilePhoto from "../../common/ProfilePhoto";
import { Choices } from "../../../utils/endpoints";

const ListingView = (props) => {

    const {width, height} = Dimensions.get('window');

    return (
        <Card style={styles.container}>
            <Card.Content>
                <View style={{ flexDirection: "row" }}>
                    <View style={{flex: 1}}>
                        <ProfilePhoto photo={props.creator.photo}></ProfilePhoto>
                    </View>
                    <View style={{flex: 5, flexDirection: "column"}}>
                        <Text>{props.creator.preferred_name}</Text>
                        <Text style={{color: "grey"}}>{props.datetime_created.substring(0, "YYYY-MM-DD".length)}</Text>
                    </View>
                </View>
                <Title style={styles.title}>{props.title}</Title>
                <Paragraph style={styles.bodyText}>{props.content}</Paragraph>
                <Paragraph style={styles.bodyText}>{"Region: " + Choices.regions[props.region]}</Paragraph>
                <Paragraph style={styles.bodyText}>{"Price: $" + props.price}</Paragraph>
                <Paragraph style={styles.bodyText}>{"Term: " + Choices.seasons[props.season] + " " + props.year}</Paragraph>
                <Paragraph style={styles.bodyText}>{"Category: " + Choices.listingCategories[props.category]}</Paragraph>
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
    },
    bodyText: {
        marginBottom: 0
    }
});