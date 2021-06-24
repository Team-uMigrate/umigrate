import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import toMonthDayYearInWords from '../common/FormatDate/toMonthDayYearInWords';
// May be used for education/jobs section of edit profile page
// Basic outline for displaying the individual work of the edit profile page
const IndividualWork = ({ job, isEdit, setVisible, isLast }) => {
  // useStates for job data
  const [company, setCompany] = useState(job.company);
  const [position, setPosition] = useState(job.position);
  const [start, setStart] = useState(job.start_date);
  const [end, setEnd] = useState(job.end_date);
  const [city, setCity] = useState(job.location);
  const [info, setInfo] = useState(job.content);
  const getMonthYear = (date) => {
    const result = toMonthDayYearInWords({ date: date }).split(' ');
    return result[1] + ' ' + result[2];
  };
  return (
    <View style={{ alignItems: 'center' }}>
      {isEdit && (
        <View style={styles.xButton}>
          <IconButton
            icon={'close'}
            size={24}
            color={'#DADADA'}
            style={styles.xBtn}
            onPress={() => {
              console.log(isLast);
            }}
          />
        </View>
      )}
      <View style={{ bottom: '18%', alignItems: 'center' }}>
        <Text style={{ ...styles.text, fontWeight: 'bold' }}>{position}</Text>
        <Text style={styles.text}>
          {company} - {city}
        </Text>
        <Text style={styles.textDate}>
          {getMonthYear(start)} - {end ? getMonthYear(end) : 'PRESENT'}
        </Text>
        <TouchableOpacity>
          {isEdit ? (
            <Text style={{ ...styles.text, color: '#1A5BBB' }}>Edit</Text>
          ) : (
            <IconButton
              icon={'chevron-down'}
              size={24}
              color={'#DADADA'}
              style={styles.xBtn}
              // TODO: on profile view, onPress should display the additional info
            />
          )}
        </TouchableOpacity>
        {!isLast && (
          <View style={styles.greyLineView}>
            <View style={styles.greyLine} />
          </View>
        )}
      </View>
    </View>
  );
};
export default IndividualWork;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
  },
  textDate: {
    fontSize: 12,
    color: '#404040',
    fontWeight: '300',
  },
  xButton: {
    alignSelf: 'flex-end',
    marginEnd: '8%',
  },
  xBtn: {
    alignSelf: 'center',
    margin: 0,
  },
  greyLineView: {
    flexDirection: 'row',
    alignItems: 'center',
    top: '3%',
  },
  greyLine: {
    backgroundColor: '#DADADA',
    height: 1,
    width: '80%',
  },
});
