import React from 'react';
import { StyleSheet, View, Text, ScrollView, Button } from 'react-native';

const SearchView = ({
  data,
  endpoints,
  endpoints_text,
  get_more,
  collapse,
}) => {
  if (!data || data.length == 0) {
    return (
      <View
        style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}
      >
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Loading...</Text>
      </View>
    );
  }

  let display = [];
  let names = [];
  let count = 0;

  // Determines endpoints with data to be displayed
  for (let x = 0; x < Object.keys(data).length; x++) {
    // if this is not -1, this means we have info to display!
    if (data[endpoints[x].name][0] !== -1) {
      display = [...display, endpoints[x]];
      names = [...names, endpoints[x].name];
      count++;
    }
  }

  if (count === 0) {
    return (
      <View
        style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          No results to show.
        </Text>
      </View>
    );
  } else {
    return (
      <ScrollView>
        <View>
          {names.map((endpointName) => {
            if (endpointName !== 'UsersEndpoint') {
              return (
                <View style={styles.content} key={endpointName}>
                  <View
                    style={{
                      borderBottomColor: 'lightgrey',
                      borderBottomWidth: 2,
                      marginVertical: 10,
                    }}
                  />
                  <Text style={{ fontSize: 25 }}>
                    {endpoints_text[endpointName]}
                  </Text>
                  {data[endpointName][1].map((obj, i) => {
                    if (
                      obj &&
                      obj['title'] &&
                      obj['creator']['preferred_name']
                    ) {
                      return (
                        <View style={{ marginVertical: 5 }} key={i.toString()}>
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
                  {data[endpointName][0] != -2 ? (
                    data[endpointName][0] != 1 ? (
                      <View style={styles.viewStyle}>
                        <Button
                          title="More"
                          onPress={() =>
                            get_more(endpointName, data[endpointName][0])
                          }
                        ></Button>
                        <Button
                          title="Collapse"
                          onPress={() => collapse(endpointName)}
                        ></Button>
                      </View>
                    ) : (
                      <View style={styles.viewStyle}>
                        <Button
                          title="More"
                          onPress={() =>
                            get_more(endpointName, data[endpointName][0])
                          }
                        ></Button>
                      </View>
                    )
                  ) : (
                    <View style={styles.viewStyle}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 15,
                          padding: 10,
                        }}
                      >
                        All results shown.
                      </Text>
                      <Button
                        title="Collapse"
                        onPress={() => collapse(endpointName)}
                      ></Button>
                    </View>
                  )}
                </View>
              );
            } else {
              return (
                <View style={styles.content} key={endpointName}>
                  <View
                    style={{
                      borderBottomColor: 'lightgrey',
                      borderBottomWidth: 2,
                      marginVertical: 10,
                    }}
                  />
                  <Text style={{ fontSize: 25 }}>
                    {endpoints_text[endpointName]}
                  </Text>
                  {data[endpointName][1].map((obj, i) => {
                    if (obj && obj['preferred_name']) {
                      return (
                        <View style={{ marginVertical: 5 }} key={i.toString()}>
                          <Text style={{ fontWeight: 'bold' }}>
                            {obj['preferred_name']} {'>'}
                          </Text>
                          <Text style={{ flexDirection: 'row' }}>
                            {obj['bio']}
                          </Text>
                        </View>
                      );
                    }
                  })}
                  {data[endpointName][0] !== -2 ? (
                    data[endpointName][0] !== 1 ? (
                      <View style={styles.viewStyle}>
                        <Button
                          title="More"
                          onPress={() =>
                            get_more(endpointName, data[endpointName][0])
                          }
                        />
                        <Button
                          title="Collapse"
                          onPress={() => collapse(endpointName)}
                        />
                      </View>
                    ) : (
                      <View style={styles.viewStyle}>
                        <Button
                          title="More"
                          onPress={() =>
                            get_more(endpointName, data[endpointName][0])
                          }
                        />
                      </View>
                    )
                  ) : (
                    <View style={styles.viewStyle}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 15,
                          padding: 10,
                        }}
                      >
                        All results shown.
                      </Text>
                      <Button
                        title="Collapse"
                        onPress={() => collapse(endpointName)}
                      />
                    </View>
                  )}
                </View>
              );
            }
          })}
        </View>
      </ScrollView>
    );
  }
};
export default SearchView;

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    flexDirection: 'row',
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
    marginRight: 10,
    flex: 1,
    flexDirection: 'column',
  },
});
