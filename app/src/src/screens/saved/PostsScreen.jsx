import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import {Appbar} from 'react-native-paper';

import Header from '../../components/views/Header';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { routes } from '../../utils/routes';
import { PostsEndpoint } from '../../utils/endpoints';
import PostView from '../../components/views/PostView';
import SavedContainer from "../../components/containers/SavedContainer";

// A screen that renders saved posts of user
const PostsScreen = ({ navigation }) => {

    // function to go navigate back to savedHome screen from savedPosts screen
    const savedHomeRedirect = () => {
        navigation.navigate(routes.savedHome);
    };

    const endpoints = [PostsEndpoint];
    const itemViews = [(item) => <PostView {...item} />]

    return (
        <View style={styles.container}>
            {/*<Header title="PostsScreen" isSavedPostsPage={true} />*/}
            <Appbar.Header style={{backgroundColor: '#ffffff'}} statusBarHeight={getStatusBarHeight(true)}>
                <Appbar.Action
                    color="#555555"
                    icon={'arrow-left'}
                    onPress={savedHomeRedirect}
                />
                <Text style={styles.title}>Saved Posts</Text>
            </Appbar.Header>

            <SavedContainer
                name='posts'
                endpoints={endpoints}
                itemViews={itemViews}
            />
        </View>
    );
};

export default PostsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
    },
    title: {
        fontSize: 17,
    },
});