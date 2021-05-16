import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { routes } from '../../utils/routes';
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

const SearchResults = ({ searchingState }) => {
  const [text, setText] = useState('');
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);

  const endpoints = [
    EventsEndpoint,
    PostsEndpoint,
    PollsEndpoint,
    ListingsEndpoint,
    AdsEndpoint,
    UsersEndpoint,
  ];

  useEffect(() => {
    this.text_filter_default();
  }, []);

  text_filter_default = async () => {
    // Fetch a list of items from each endpoint
    // Using a dictonary so that the child component doesn't have to worry about knowing correct index
    let responseDataList = {
      EventsEndpoint: [],
      PostsEndpoint: [],
      PollsEndpoint: [],
      ListingsEndpoint: [],
      AdsEndpoint: [],
      UsersEndpoint: [],
    };
    for (let i = 0; i < endpoints.length; i++) {
      try {
        // gets the first page as initial search results
        responseDataList[endpoints[i].name] = (await endpoints[i].list(1)).data[
          'results'
        ].splice(0, 5);
      } catch (error) {
        // Append error messages to state
        setErrors([...errors, JSON.stringify(error)]);
        return () => {};
      }
    }
    setData(responseDataList);
  };

  debounce = (func, timeout = 1000) => {
    let timer;
    console.log('ninja');

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  text_filter = async (text) => {
    let responseDataList = {
      PostsEndpoint: [],
      EventsEndpoint: [],
      PollsEndpoint: [],
      ListingsEndpoint: [],
      AdsEndpoint: [],
      UsersEndpoint: [],
    };

    for (let i = 0; i < endpoints.length; i++) {
      try {
        // gets the first page as initial search results
        retrieved = (await endpoints[i].list(1, { search: text })).data;
        responseDataList[endpoints[i].name] = retrieved['results'];
        page = 2;
        while (retrieved != null) {
          responseDataList[endpoints[i].name] = [
            ...responseDataList[endpoints[i].name],
            retrieved['results'],
          ];
          retrieved = (await endpoints[i].list(page, { search: text })).data;
          page++;
        }
      } catch (error) {
        // Append error messages to state
        setErrors([...errors, JSON.stringify(error)]);
      }
      setData(responseDataList);
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
          onPress={searchingState}
        />
        <Searchbar
          onChangeText={(typed) => {
            if (typed.length == 0) {
              this.text_filter_default();
            } else {
              this.debounce(() => {
                console.log('executing');
                this.text_filter(typed);
              });
            }
          }}
          style={{ flex: 10 }}
        ></Searchbar>
        <View style={{ flex: 1 }}></View>
      </View>
      <SearchPageView data={data} endpoints={endpoints}></SearchPageView>
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
