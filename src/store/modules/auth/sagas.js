import { call, put, all, takeLatest } from 'redux-saga/effects';
import Toast from 'react-native-tiny-toast';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import api from '~/services/api';

import { signInSuccess, signFailure } from '~/store/modules/auth/actions';

import tShirtFront from '~/assets/t-shirt-front.png';
import tShirtBack from '~/assets/t-shirt-back.png';

import babylookFront from '~/assets/babylook-front.png';
import babylookBack from '~/assets/babylook-back.png';

import moletomFront from '~/assets/models/moletom-front.png';
import moletomBack from '~/assets/models/moletom-back.png';

import tShirtRed from '~/assets/models/tshirt1.png';
import tShirtBlue from '~/assets/models/tshirt2.png';
import tShirtGreen from '~/assets/models/tshirt3.png';
import tShirtPink from '~/assets/models/tshirt4.png';
import tShirtYellow from '~/assets/models/tshirt5.png';

import tShirtRedBack from '~/assets/models/back/tshirtback1.png';
import tShirtBlueBack from '~/assets/models/back/tshirtback2.png';
import tShirtGreenBack from '~/assets/models/back/tshirtback3.png';
import tShirtPinkBack from '~/assets/models/back/tshirtback4.png';
import tShirtYellowBack from '~/assets/models/back/tshirtback5.png';

import babylookRed from '~/assets/models/babylook1.png';
import babylookBlue from '~/assets/models/babylook2.png';
import babylookGreen from '~/assets/models/babylook3.png';
import babylookPink from '~/assets/models/babylook4.png';
import babylookYellow from '~/assets/models/babylook5.png';

import babylookRedBack from '~/assets/models/back/babylookback1.png';
import babylookBlueBack from '~/assets/models/back/babylookback2.png';
import babylookGreenBack from '~/assets/models/back/babylookback3.png';
import babylookPinkBack from '~/assets/models/back/babylookback4.png';
import babylookYellowBack from '~/assets/models/back/babylookback5.png';

import hoodieRed from '~/assets/models/hoodie1.png';
import hoodieBlue from '~/assets/models/hoodie2.png';
import hoodieGreen from '~/assets/models/hoodie3.png';
import hoodiePink from '~/assets/models/hoodie4.png';
import hoodieYellow from '~/assets/models/hoodie5.png';

import hoodieRedBack from '~/assets/models/back/hoodieback1.png';
import hoodieBlueBack from '~/assets/models/back/hoodieback2.png';
import hoodieGreenBack from '~/assets/models/back/hoodieback3.png';
import hoodiePinkBack from '~/assets/models/back/hoodieback4.png';
import hoodieYellowBack from '~/assets/models/back/hoodieback5.png';

export function* signIn({ payload }) {
  let tFronts = [];
  let tBacks = [];
  let bFronts = [];
  let bBacks = [];
  let hFronts = [];
  let hBacks = [];

  const { email, password } = payload;

  const tFront = resolveAssetSource(tShirtFront);
  const tBack = resolveAssetSource(tShirtBack);
  const bFront = resolveAssetSource(babylookFront);
  const bBack = resolveAssetSource(babylookBack);
  const hFront = resolveAssetSource(moletomFront);
  const hBack = resolveAssetSource(moletomBack);

  tFronts.push(resolveAssetSource(tShirtRed));
  tFronts.push(resolveAssetSource(tShirtBlue));
  tFronts.push(resolveAssetSource(tShirtGreen));
  tFronts.push(resolveAssetSource(tShirtPink));
  tFronts.push(resolveAssetSource(tShirtYellow));

  tBacks.push(resolveAssetSource(tShirtRedBack));
  tBacks.push(resolveAssetSource(tShirtBlueBack));
  tBacks.push(resolveAssetSource(tShirtGreenBack));
  tBacks.push(resolveAssetSource(tShirtPinkBack));
  tBacks.push(resolveAssetSource(tShirtYellowBack));

  bFronts.push(resolveAssetSource(babylookRed));
  bFronts.push(resolveAssetSource(babylookBlue));
  bFronts.push(resolveAssetSource(babylookGreen));
  bFronts.push(resolveAssetSource(babylookPink));
  bFronts.push(resolveAssetSource(babylookYellow));

  bBacks.push(resolveAssetSource(babylookRedBack));
  bBacks.push(resolveAssetSource(babylookBlueBack));
  bBacks.push(resolveAssetSource(babylookGreenBack));
  bBacks.push(resolveAssetSource(babylookPinkBack));
  bBacks.push(resolveAssetSource(babylookYellowBack));

  hFronts.push(resolveAssetSource(hoodieRed));
  hFronts.push(resolveAssetSource(hoodieBlue));
  hFronts.push(resolveAssetSource(hoodieGreen));
  hFronts.push(resolveAssetSource(hoodiePink));
  hFronts.push(resolveAssetSource(hoodieYellow));

  hBacks.push(resolveAssetSource(hoodieRedBack));
  hBacks.push(resolveAssetSource(hoodieBlueBack));
  hBacks.push(resolveAssetSource(hoodieGreenBack));
  hBacks.push(resolveAssetSource(hoodiePinkBack));
  hBacks.push(resolveAssetSource(hoodieYellowBack));

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

  // console.tron.log(models);

  // const filtered = models.map((model) => model.uri);

  try {
    const response = yield call(api.post, 'login', { email, password });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(
      signInSuccess(
        token,
        user,
        tshirt,
        bshirt,
        hoodie,
        tFronts,
        tBacks,
        bFronts,
        bBacks,
        hFronts,
        hBacks
      )
    );
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
