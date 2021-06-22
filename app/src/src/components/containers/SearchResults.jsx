import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import _ from 'lodash';
import { IconButton } from 'react-native-paper';
import {
  EventsEndpoint,
  PostsEndpoint,
  PollsEndpoint,
  ListingsEndpoint,
  AdsEndpoint,
  UsersEndpoint,
} from '../../utils/endpoints';
import SearchPageView from '../views/SearchPageView';

// a functional component letting the user search across all endpoints for given text
const SearchResults = ({ setIsSearching }) => {
  const [queried_text, setText] = useState('');
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);

  // debounce callback used to delay calls to the api until after the user has stopped typing in the search bar
  const delayedQuery = useCallback(
    _.debounce((filter) => text_filter(filter), 1000),
    []
  );

  // endpoints with information we want to display
  const endpoints = [
    EventsEndpoint,
    PostsEndpoint,
    PollsEndpoint,
    ListingsEndpoint,
    AdsEndpoint,
    UsersEndpoint,
  ];

  const endpoints_text = {
    EventsEndpoint: 'Events',
    PostsEndpoint: 'Posts',
    PollsEndpoint: 'Polls',
    ListingsEndpoint: 'Listings',
    AdsEndpoint: 'Market',
    UsersEndpoint: 'Profiles',
  };

  // populate the initial results (5 most recent results from each endpoint)
  useEffect(() => {
    this.text_filter_default();
  }, []);

  // envoked upon mounting of component, or when no text in search bar

  // TODO: RANDOMIZE THIS !!! Dont display the same data each default time
  text_filter_default = async () => {
    // Fetch a list of items from each endpoint
    setData([]);
    // Necessary to cover the case of going from 1 typed character -> 0 typed characters,
    // as the default filter call would get overriden by the delayed 1 char function call.
    // by clearing the query, we ensure this override does not occur
    delayedQuery.cancel();

    // Using a dictonary so that the view component doesn't have to worry about knowing correct index
    // each endpoint will hold two key pieces of info:
    // the first is how many pages are to be rendered/are available to render
    // the second is a list of all the info (ie 2 pages = 20 + 20 items)
    let responseDataList = {
      PostsEndpoint: [-1, []],
      EventsEndpoint: [-1, []],
      PollsEndpoint: [-1, []],
      ListingsEndpoint: [-1, []],
      AdsEndpoint: [-1, []],
      UsersEndpoint: [-1, []],
    };

    // iterate all endpoints and grab the 5 most recent results (or if less than 5, all results)
    for (let i = 0; i < endpoints.length; i++) {
      try {
        // gets the first page as initial search results
        retrieved = (await endpoints[i].list(1)).data;

        // if no info at all, continue
        if (retrieved == undefined || retrieved['count'] == 0) continue;

        if (retrieved['count'] > 5) {
          // tells view that there is info to display
          responseDataList[endpoints[i].name][0] = 1;
          // populates the info to display
          responseDataList[endpoints[i].name][1] = retrieved['results'].splice(
            0,
            5
          );
        } else {
          // tells view that there is info to display
          responseDataList[endpoints[i].name][0] = 1;
          // populates the info to display
          responseDataList[endpoints[i].name][1] = retrieved['results'];
        }
      } catch (error) {
        // Append error messages to state
        setErrors([...errors, JSON.stringify(error)]);
      }
    }
    // save final response to state, envoking the rerender of the search view
    setData(responseDataList);
  };

  // similar to text_filter_default, except searches for results with the passed text
  text_filter = async (text) => {
    // Using a dictonary so that the view component doesn't have to worry about knowing correct index
    // each endpoint will hold two key pieces of info:
    // the first is how many pages are to be rendered/are available to render
    // the second is a list of all the info (ie 2 pages = 20 + 20 items)

    // set the queried text just incase the user wants to get more results
    setText(text);
    // set data to empty list so the user sees the loading message in the view
    setData([]);

    let responseDataList = {
      PostsEndpoint: [-1, []],
      EventsEndpoint: [-1, []],
      PollsEndpoint: [-1, []],
      ListingsEndpoint: [-1, []],
      AdsEndpoint: [-1, []],
      UsersEndpoint: [-1, []],
    };

    for (let i = 0; i < endpoints.length; i++) {
      try {
        // gets the first page as initial search results
        retrieved = (await endpoints[i].list(1, { search: text })).data;

        // if no info at all, continue
        if (retrieved == undefined || retrieved['count'] == 0) continue;

        responseDataList[endpoints[i].name] = [1, retrieved['results']];
      } catch (error) {
        // Append error messages to state
        setErrors([...errors, JSON.stringify(error)]);
      }
    }
    setData(responseDataList);
  };

  // when triggered, attempts to get more data.
  get_more = async (endpoint_name, current_page) => {
    // get copy of current data
    let temp = data;
    try {
      // attempts to get the next page of results if it exists.
      // to check, see if there is a next page to the current page
      let endpoint_index = -1;

      // get endpoint's index in endpoints array
      for (i = 0; i < endpoints.length; i++) {
        if (endpoints[i].name == endpoint_name) {
          endpoint_index = i;
        }
      }
      retrieved = (
        await endpoints[endpoint_index].list(current_page, {
          search: queried_text,
        })
      ).data;

      if (retrieved['next'] == null) {
        // signify no more results
        temp[endpoint_name][0] = -2;
        setData(temp);
        throw 'update';
      } else {
        retrieved = (
          await endpoints[endpoint_index].list(current_page + 1, {
            search: queried_text,
          })
        ).data;
        temp[endpoint_name][0] = current_page + 1;
        temp[endpoint_name][1] = [
          ...temp[endpoint_name][1],
          ...retrieved['results'],
        ];
        setData(temp);
        throw 'update';
      }
    } catch (error) {
      // Append error messages to state
      setErrors([...errors, JSON.stringify(error)]);
    }
  };

  collapse = async (endpoint_name) => {
    // get copy of current data
    let temp = data;
    try {
      // attempts to get the next page of results if it exists.
      // to check, see if there is a next page to the current page
      let endpoint_index = -1;

      // get endpoint's index in endpoints array
      for (i = 0; i < endpoints.length; i++) {
        if (endpoints[i].name == endpoint_name) {
          endpoint_index = i;
        }
      }
      retrieved = (
        await endpoints[endpoint_index].list(1, {
          search: queried_text,
        })
      ).data;

      if (retrieved == undefined || retrieved == null)
        throw 'endpoint error: ' + endpoint_index;

      temp[endpoint_name][1] = retrieved['results'];
      temp[endpoint_name][0] = 1;
      // TODO: Fix janky update
      throw 'update';
    } catch (error) {
      // Append error messages to state
      setErrors([...errors, JSON.stringify(error)]);
    }
  };

  return (
    <View>
      <View style={styles.row}>
        <IconButton
          icon="arrow-left"
          style={{ alignSelf: 'flex-start', flex: 1, backgroundColor: 'white' }}
          color={'#AAAAAA'}
          size={25}
          onPress={setIsSearching}
        />
        <Searchbar
          onChangeText={(typed) => {
            if (typed.length == 0) {
              this.text_filter_default();
            } else {
              delayedQuery(typed);
            }
          }}
          style={{ flex: 10 }}
        ></Searchbar>
        <View style={{ flex: 1 }}></View>
      </View>
      <SearchPageView
        data={data}
        endpoints={endpoints}
        endpoints_text={endpoints_text}
        get_more={this.get_more}
        collapse={this.collapse}
      ></SearchPageView>
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
});
