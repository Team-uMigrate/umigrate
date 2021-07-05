import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import IndividualWork from '../common/IndividualWork';
/* May be used for education/jobs section of edit profile page
   Basic outline for the add education and add work sections of the edit profile page */

const WorkEduSection = ({ type, jobs }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: type === 'work' ? '10%' : null,
        }}
      >
        <View style={{ ...styles.PurpleLine, marginStart: '5%' }} />
        <TouchableOpacity
          style={{
            ...styles.WorkEduButtons,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <IconButton
            icon={type === 'edu' ? 'school' : 'briefcase'}
            color={'#483FAB'}
            style={styles.iconBtn}
            size={type === 'edu' ? 22 : 21}
          />
          <IconButton
            icon={'plus'}
            color={'#FF0000'}
            style={styles.iconBtn}
            size={18}
          />
        </TouchableOpacity>
        <View style={{ ...styles.PurpleLine, marginEnd: '5%' }} />
      </View>
      {type === 'work' &&
        jobs.map((job, i) => (
          <IndividualWork
            key={i}
            job={job}
            isEdit={true}
            setVisible={false}
            isLast={jobs.length === i + 1}
          />
        ))}
    </View>
  );
};
export default WorkEduSection;

const styles = StyleSheet.create({
  iconBtn: {
    alignSelf: 'center',
    margin: 0,
  },
  PurpleLine: {
    backgroundColor: '#483FAB',
    height: 1,
    flex: 1,
  },
  WorkEduButtons: {
    borderRadius: 16,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
});
