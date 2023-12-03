import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Login from '../components/non-auth/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authStore, {signIn} from '../store/AuthEnticationStore';

const LoginScreen = () => {
  useEffect(() => {
    AsyncStorage.getItem('@usercreedentials:key').then(accessToken => {
      if (accessToken) {
        console.log('async storage :', accessToken);
        authStore.dispatch(signIn(accessToken));
      }
    });
  }, []);

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
