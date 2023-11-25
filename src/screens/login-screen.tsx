import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Login from '../components/non-auth/login';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Login></Login>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
