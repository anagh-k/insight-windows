import {View, Text, Button} from 'react-native';
import React, {useState} from 'react';
import OAuth from './oAuth';
import authStore, {signIn} from '../../../store/AuthEnticationStore';

export default function GoogleSignIn() {
  const [showOAuth, enableShowOAuth] = useState(false);
  const [OAuthUrl, setOAuthUrl] = useState('');
  const onLoginSuccess = (code: string) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var details: any = {
      client_id:
        '243041670066-5vsv7jbehn867b13rpomrnt539pufuc6.apps.googleusercontent.com',
      code: code,
      redirect_uri: 'com.windowsinsights:/oauth2redirect',
      grant_type: 'authorization_code',
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    var encodedBody = formBody.join('&');

    fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      body: encodedBody,
      headers: myHeaders,
    })
      .then(response => response.text())
      .then(res => JSON.parse(res))
      .then(result => {
        console.log('recieved access token', result);
        authStore.dispatch(signIn(result['access_token']));
      });
  };
  const handleLogin = () => {
    const CLIENT_ID =
      '243041670066-5vsv7jbehn867b13rpomrnt539pufuc6.apps.googleusercontent.com';
    const REDIRECT_URI = 'com.windowsinsights:/oauth2redirect';
    const SCOPE =
      'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly';
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;
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
