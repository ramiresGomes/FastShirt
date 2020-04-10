import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'kepy',
      storage: AsyncStorage,
      whitelist: ['auth', 'user', 'shirts'],
    },
    reducers
  );

  return persistedReducer;
};
