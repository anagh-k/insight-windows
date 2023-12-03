import {View, Text} from 'react-native';
import React from 'react';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {parse} from 'search-params';
import {Linking} from 'react-native-windows';

export default function OAuth({onLoginSuccess, authUrl}: any) {
  Linking.addEventListener('url', resp => {
    console.log('resp from event listner:', resp);
    let params = parse(resp.url);
    let accessToken = params['code'];
    onLoginSuccess(accessToken);
    // onLoginSuccess(resp);
  });
  Linking.openURL(authUrl);
  const onNavigationStateChange = (event: WebViewNavigation) => {
    if (event && event.url && event.url.includes('access_token')) {
      let params = parse(event.url.split('#')[1]);
      let accessToken = params['access_token'];
      onLoginSuccess(accessToken);
    }
  };
  return (
    <>
      {/* <WebView
        onNavigationStateChange={onNavigationStateChange}
        source={{uri: authUrl}}
        style={{marginTop: 5, width: 1000, height: 1000}}
      /> */}
    </>
  );
}
