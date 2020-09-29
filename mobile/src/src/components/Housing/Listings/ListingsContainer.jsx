import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ListingView from "./ListingView"
import { ListingsEndpoint } from "../../../utils/endpoints";

class ListingContainer extends Component{

    state = {
        listings: [],
        extendListings: (newListings) => {
            this.setState({
                listings: this.state.listings.concat(newListings),
            });
        },
        page: 1,
        hasMoreListings: true
    };

    constructor(props) {
        super(props);
        this.state.listings = [];
        this.fetchListings(1, {});
    }

    fetchListings = (page, filters) => {

        ListingsEndpoint.list(
            page,
            filters,             //TODO add filter functionality and proper failure handling
            (response) => {
                if (response.data.next === null){
                    this.state.hasMoreListings = false;
                }

                let newListings = response.data.results;

                for (let i in newListings){
                    newListings[i].key = newListings[i].id.toString();
                }

                this.state.extendListings(newListings);
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
                    // keyExtractor={(item) => {item.id} /* Tell react native to use the id field as the key prop */}
                    renderItem={this.renderItem}
                    onEndReached={ () => {
                            if (this.state.hasMoreListings) {
                                this.state.page += 1;
                                this.fetchListings(this.state.page, {});
                            }
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
