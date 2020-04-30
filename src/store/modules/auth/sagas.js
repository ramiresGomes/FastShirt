import { call, put, all, takeLatest } from 'redux-saga/effects';
import Toast from 'react-native-tiny-toast';

import api from '~/services/api';

import { signInSuccess, signFailure } from '~/store/modules/auth/actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {
    console.tron.log('aqui');

    const response = yield call(api.post, 'auth/login', { email, password });
    console.tron.log('aqui2');

    const { token, user } = response.data;
    console.tron.log(response.data);
    console.tron.log(`token: ${token}`);

    api.defaults.headers.Authorization =
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvY2x1YmVkb2NhdmFsby5zaG9wXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNTg4MTY3MzY1LCJuYmYiOjE1ODgxNjczNjUsImp0aSI6IkZZcVM0Z2I2cjFHS2RPU0oiLCJzdWIiOjQ3MSwicHJ2IjoiNDZlZGQxMDkyOTRmYzBkOGMwMTkyZjNjM2YxODVjNDhiMDM2ZjNhNyJ9.7mEowA-4YSGFyj7PMzfyYZZXsaddNNiXAB0D1Olh3Kk';

    yield put(signInSuccess(token, user));
  } catch (error) {
    Toast.show('Houve um erro no login, verifique seus dados.');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', { name, email, password });
    Toast.show('Seu cadastro foi realizado com sucesso, faça o login.');
  } catch (error) {
    Toast.show('Houve um erro no login, verifique seus dados.');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
