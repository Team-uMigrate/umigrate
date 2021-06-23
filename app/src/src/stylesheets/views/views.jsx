
/* Used in AdView, EventView, ListingView, PollView */
import { StyleSheet } from "react-native";

const commonViewStyles = StyleSheet.create({
    container: {
      display: 'flex',
      marginTop: '2.5%',
      padding: 3,
      flexDirection: 'column',
      backgroundColor: '#ffffff',
    },
    cardContent: {
      paddingTop: '1.5%',
      paddingBottom: '2.5%',
    },
    row: {
      flexDirection: 'row',
      marginBottom: '2.5%',
    },
    column: {
      flex: 5,
      marginLeft: '4%',
      flexDirection: 'column',
      alignSelf: 'center',
    },
    title: {
      alignSelf: 'flex-start',
      letterSpacing: 0.5,
    },
    bodyText: {
      marginBottom: 0,
      letterSpacing: 0.5,
      fontSize: 15,
    },
    name: {
      fontWeight: '500',
      fontSize: 16,
    },
    bold: {
      fontWeight: 'bold',
    },
    date: {
      color: 'grey',
    },
  });

  export {commonViewStyles}