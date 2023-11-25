import {createSlice, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export let UserCredentials: UserCredentials = {
  accessToken: 'null',
  refreshToken: '',
  userName: '',
  isLoggedIn: false,
};

var cred = AsyncStorage.getItem('@usercreedentials:key').then((res: any) => {
  if (res) {
    UserCredentials = <UserCredentials>JSON.parse(res);
  }
});

const authentication = createSlice({
  name: 'Authentication',
  initialState: UserCredentials,
  reducers: {
    signIn: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log(action);
      state.accessToken = action.payload;
      state.isLoggedIn = true;
      AsyncStorage.setItem(
        '@usercreedentials:key',
        JSON.stringify(UserCredentials),
      );

      // state.value += 1;
    },
    signOut: state => {
      state.accessToken = '';
      state.isLoggedIn = false;
      console.log(state);
    },
  },
});

export const {signIn, signOut} = authentication.actions;

const authStore = configureStore({
  reducer: authentication.reducer,
});

export default authStore;
// Can still subscribe to the store
authStore.subscribe(() => console.log('stroeee changed', authStore.getState()));

console.log('runnin');

// Still pass action objects to `dispatch`, but they're created for us
// store.dispatch(signIn((token = 'hello')));
// {value: 1}
