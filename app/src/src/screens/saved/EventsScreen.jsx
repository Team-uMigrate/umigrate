import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import {Appbar} from 'react-native-paper';

import Header from '../../components/views/Header';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { routes } from '../../utils/routes';
import { EventsEndpoint } from '../../utils/endpoints';
import EventView from '../../components/views/EventView';
import SavedContainer from "../../components/containers/SavedContainer";

// A screen that renders saved posts of user
const EventsScreen = ({ navigation }) => {

    // function to go navigate back to savedHome screen from savedEvents screen
    const savedHomeRedirect = () => {
        navigation.navigate(routes.savedHome);
    };

    const endpoints = [EventsEndpoint];
    const itemViews = [(item) => <EventView {...item} />]

    return (
        <View style={styles.container}>
            {/*<Header title="EventsScreen" isSavedPostsPage={true} />*/}
            <Appbar.Header style={{backgroundColor: '#ffffff'}} statusBarHeight={getStatusBarHeight(true)}>
                <Appbar.Action
                    color="#555555"
                    icon={'arrow-left'}
                    onPress={savedHomeRedirect}
                />
                <Text style={styles.title}>Saved Events</Text>
            </Appbar.Header>

            <SavedContainer
                name='events'
                endpoints={endpoints}
                itemViews={itemViews}
            />
        </View>
    );
};

export default EventsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
    },
    title: {
        fontSize: 17,
    },
});