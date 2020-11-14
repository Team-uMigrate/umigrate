import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProfileComponents = ({ label, val, row }) => {
  if (row) {
    if (val == '' || val === null) {
      return (
        <View>
          <Text style={styles.textLabelRow}>{label}</Text>
          <Text style={styles.textValRowValNull}>
            Edit to add your
            {label}
          </Text>
        </View>
      );
    }
    return (
      <View>
        <Text style={styles.textLabelRow}>{label}</Text>
        <Text style={styles.textValRow}>{val}</Text>
      </View>
    );
  }
  if (val == '' || val === null) {
    return (
      <View>
        <Text style={styles.textLabel}>{label}</Text>
        <Text style={styles.textValNull}>
          Edit to add your
          {label}
        </Text>
      </View>
    );
  }
  return (
    <View>
      <Text style={styles.textLabel}>{label}</Text>
      <Text style={styles.textVal}>{val}</Text>
    </View>
  );
};

export default ProfileComponents;

const styles = StyleSheet.create({
  textLabel: {
    fontSize: 12,
    textAlign: 'left',
    marginLeft: '5%',
    marginBottom: '1%',
    color: '#6C6A6A',
  },
  textVal: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 'bold',
    marginLeft: '5%',
    marginBottom: '3%',
  },
  textValNull: {
    fontSize: 14,
    textAlign: 'left',
    fontStyle: 'italic',
    marginLeft: '5%',
    marginBottom: '3%',
  },
  textLabelRow: {
    fontSize: 12,
    textAlign: 'left',
    marginLeft: '50%',
    marginBottom: '1%',
    color: '#6C6A6A',
  },
  textValRow: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 'bold',
    marginLeft: '50%',
    marginBottom: '3%',
  },
  textValRowValNull: {
    fontSize: 14,
    textAlign: 'left',
    fontStyle: 'italic',
    marginLeft: '50%',
    marginBottom: '3%',
  },
});
