import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
  grayBackground: {
    backgroundColor: 'gray',
    padding: 5,
    marginBottom: 5,
  },
  pinkBackground: {
    backgroundColor: 'pink',
    padding: 5,
  },
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginTop: 5,
    marginBottom: 5,
  },
});

const PDFGenerator = ({ items }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <img src="" alt=".." />
      <Text style={{ fontSize: 48, marginTop: 10 }}>Tourizz</Text>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Group Booking Details</Text>
        {items.map((item, index) => (
          <View key={index} style={styles.text}>
            <Text>{item.type}: {item.name}</Text>
            {item.city && (
              <View style={styles.grayBackground}>
                <Text>City: {item.city}</Text>
              </View>
            )}
            {item.type === 'Transport' && (
              <View style={styles.grayBackground}>
                <Text>Mode: {item.mode}</Text>
                <Text>From: {item.from} → To: {item.to}</Text>
              </View>
            )}
            {item.type === 'City' && (
              <View style={styles.pinkBackground}>
                <Text>No of Days: {item.No}</Text>
              </View>
            )}
            <View style={styles.borderLine} />
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default PDFGenerator;
