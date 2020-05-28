import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

import { DEBUG_HOST } from 'react-native-dotenv';

if (__DEV__) {
  const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({ host: DEBUG_HOST })
    .useReactNative()
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

  tron.clear();

  console.tron = tron;
}
