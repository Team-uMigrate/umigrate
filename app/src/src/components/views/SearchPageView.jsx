import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

const SearchPageView = ({ data, endpoints }) => {
  if (data == undefined || data == null || data.length == 0) {
    return <Text>Loading...</Text>;
  }

  let display = [];
  let names = [];
  let count = 0;

  // Determines endpoints with data to be displayed
  for (var x = 0; x < Object.keys(data).length; x++) {
    if (data[endpoints[x].name] != 0) {
      display = [...display, endpoints[x]];
      names = [...names, endpoints[x].name];
      count++;
    }
  }
  if (count == 0) {
    return <Text>No available data...</Text>;
  } else {
    return (
      <ScrollView>
        <View>
          {names.map((endpointName) => {
            return (
              <View>
                <Text style={{ fontSize: 25 }}>{endpointName}</Text>
                {data[endpointName].map((obj) => {
                  if (
                    obj == undefined ||
                    obj == null ||
                    obj['title'] == undefined ||
                    obj['title'] == null ||
                    obj['creator']['preferred_name'] == undefined ||
                    obj['creator']['preferred_name'] == null
                  ) {
                    return;
                  } else {
                    return (
                      <View style={{ marginVertical: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>
                          {obj['creator']['preferred_name']} {'>'}
                        </Text>
                        <Text style={{ flexDirection: 'row' }}>
                          {obj['title']}
                        </Text>
                      </View>
                    );
                  }
                })}
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
};
export default SearchPageView;

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  subHeader: {
    fontSize: 17,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  content: {
    marginLeft: 10,
    flex: 1,
    flexDirection: 'column',
  },
});
