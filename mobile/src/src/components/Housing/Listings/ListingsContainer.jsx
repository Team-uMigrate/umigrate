import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ListingView from "./ListingView"
import {ListingsEndpoint} from "../../../utils/endpoints";

class ListingContainer extends Component{

    state = {
        listings: [],
        extendListings: (newListings) => {
            this.setState({
                listings: this.state.listings.concat(newListings),
            });
        },
        page: 1
    };

    constructor(props) {
        super(props);
        this.setState({listings: []})
        this.fetchListings(1, {});
    }

    fetchListings(page, filters) {

        ListingsEndpoint.list(
            page,
            filters,             //TODO add filter functionality and proper success/failure handling
            (response) => {
                console.log(response.data);
                this.state.extendListings(response.data.results);
            },
            (error) => {console.log("error: ", error)}
        );
    }

    renderItem({item}) {
        return(<ListingView {...item}/>);
    }

    render () {
        return (
            <View style={styles.listingContainer}>
                <FlatList
                    data={this.state.listings}
                    keyExtractor={(item) => {item.id} /* Tell react native to use the id field as the key prop */}
                    renderItem={this.renderItem}
                    onEndReached={ () => {
                            console.log("end reached!");
                            this.state.page += 1;
                            this.fetchListings(this.state.page, {});
                        }
                    }
                />
            </View>
        )
    }
}

export default ListingContainer;

const styles = StyleSheet.create({
    listingContainer: {
        flexDirection: "column",
        marginBottom: "15%" // To make sure a bit of the bottom post isn't cut off
    }
});