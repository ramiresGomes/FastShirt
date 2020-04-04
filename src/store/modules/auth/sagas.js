import { call, put, all, takeLatest } from 'redux-saga/effects';
import Toast from 'react-native-tiny-toast';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import api from '~/services/api';

import { signInSuccess, signFailure } from '~/store/modules/auth/actions';

import tShirtFront from '~/assets/t-shirt-front.png';
import tShirtBack from '~/assets/t-shirt-back.png';

import babylookFront from '~/assets/babylook-front.png';
import babylookBack from '~/assets/babylook-back.png';

import moletomFront from '~/assets/moletom-front.png';
import moletomBack from '~/assets/moletom-back.png';

export function* signIn({ payload }) {
  const { email, password } = payload;

  const tFront = resolveAssetSource(tShirtFront);
  const tBack = resolveAssetSource(tShirtBack);
  const bFront = resolveAssetSource(babylookFront);
  const bBack = resolveAssetSource(babylookBack);
  const hFront = resolveAssetSource(moletomFront);
  const hBack = resolveAssetSource(moletomBack);

  const tshirt = {
    front: tFront.uri,
    back: tBack.uri,
  };

  const bshirt = {
    front: bFront.uri,
    back: bBack.uri,
  };

  const hoodie = {
    front: hFront.uri,
    back: hBack.uri,
  };

  try {
    const response = yield call(api.post, 'login', { email, password });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user, tshirt, bshirt, hoodie));
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
