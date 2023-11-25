import {View, Text} from 'react-native';
import React from 'react';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {parse} from 'search-params';

export default function OAuth({onLoginSuccess, authUrl}: any) {
  const onNavigationStateChange = (event: WebViewNavigation) => {
    if (event && event.url && event.url.includes('access_token')) {
      let params = parse(event.url.split('#')[1]);
      let accessToken = params['access_token'];
      onLoginSuccess(accessToken);
    }
  };
  return (
    <>
      <WebView
        onNavigationStateChange={onNavigationStateChange}
        source={{uri: authUrl}}
        style={{marginTop: 5, width: 1000, height: 1000}}
      />
    </>
  );
}
