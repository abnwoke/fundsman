import { Fragment } from 'react';
import {LogBox} from 'react-native';
import Providers from './src/libs/redux/providers'
import Main from './src/Main'
//import 'expo-dev-client';
import 'react-native-gesture-handler';

LogBox.ignoreLogs([
    'ImmutableStateInvariantMiddleware',
    'SerializableStateInvariantMiddleware',
    'The new TextField implementation does not support the',
    'VirtualizedLists should never be nested inside plain ScrollViews',
    'ViewPropTypes will be removed from React Native',

    '[expo-notifications] Error thrown while updating the device push token', // remove later
]);


export default function App() {



  return (
      <Providers>
          <Main />
      </Providers>
  );
}
