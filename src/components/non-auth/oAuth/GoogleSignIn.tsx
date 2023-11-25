import {View, Text, Button} from 'react-native';
import React, {useState} from 'react';
import OAuth from './oAuth';
import authStore, {signIn} from '../../../store/AuthEnticationStore';

export default function GoogleSignIn() {
  const [showOAuth, enableShowOAuth] = useState(false);
  const [OAuthUrl, setOAuthUrl] = useState('');
  const onLoginSuccess = (accessToken: string) => {
    console.log('google login success', accessToken);
    authStore.dispatch(signIn(accessToken));
  };
  const handleLogin = () => {
    const CLIENT_ID =
      '113637307366-88ko6t9g72motabmlobinabul8ep5jdg.apps.googleusercontent.com';
    const REDIRECT_URI = 'http://localhost/';
    const SCOPE =
      'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly';
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${SCOPE}`;
    enableShowOAuth(true);
    setOAuthUrl(authUrl);
  };
  return (
    <View>
      <Text>Sign In Via Google</Text>
      <Button title="Login via google" onPress={handleLogin}></Button>
      {showOAuth && (
        <OAuth onLoginSuccess={onLoginSuccess} authUrl={OAuthUrl}></OAuth>
      )}
    </View>
  );
}
