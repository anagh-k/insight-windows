// import {google} from 'googleapis';

import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import authStore, {UserCredentials} from '../../store/AuthEnticationStore';
import {Box, Pressable, Text, ScrollView} from 'native-base';

function Example({name}: any) {
  return (
    <Box alignItems="center">
      <Pressable maxW="200">
        {({isHovered, isFocused, isPressed}) => {
          return (
            <Box
              bg={
                isPressed
                  ? 'coolGray.200'
                  : isHovered
                  ? 'coolGray.200'
                  : 'coolGray.100'
              }
              style={{
                transform: [
                  {
                    scale: isPressed ? 0.96 : 1,
                  },
                ],
              }}
              p="5"
              rounded="8"
              shadow={3}
              borderWidth="1"
              borderColor="coolGray.300"
              width={500}>
              <Text
                color="coolGray.800"
                mt="3"
                fontWeight="medium"
                fontSize="xl">
                {name}
              </Text>
            </Box>
          );
        }}
      </Pressable>
    </Box>
  );
}

export default function CalenderEvents() {
  console.log('loadung');
  const [userDetails, setUserDetails] = useState(UserCredentials);
  const [eventDetails, setEventDetails] = useState([]);

  if (userDetails.accessToken !== '') {
    // Format dates according to RFC3339
  }
  useEffect(() => {
    let user: UserCredentials = authStore.getState();
    setUserDetails(user);
    const url =
      'https://www.googleapis.com/calendar/v3/calendars/c_glscvgeems1nqm7tfhce276jm0%40group.calendar.google.com/events?timeMax=2023-11-19T22%3A00%3A00-07%3A00&timeMin=2023-11-19T00%3A00%3A00-07%3A00&key=AIzaSyCPKrZqSllcWqfcyDavmo-PFbgiFgz2Cdg';
    const token = user.accessToken;

    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Encoding': 'gzip', // If necessary, depending on your server's requirements
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setEventDetails(data.items);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  authStore.subscribe(() => {});
  return (
    <ScrollView>
      {eventDetails.map((x: any) => (
        <Example name={x.summary} key={x.summary} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tableItems: {
    padding: 35,
    color: 'black',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
