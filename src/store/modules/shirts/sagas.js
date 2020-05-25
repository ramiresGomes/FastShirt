import { all, takeLatest, put } from 'redux-saga/effects';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import tShirtFront from '~/assets/models/new/t-shirt-front.png';
import babylookFront from '~/assets/models/new/babylook-front.png';
import moletomFront from '~/assets/models/moletom-front.png';

import tShirtAsh from '~assets/models/new/tshirt1.png';
import tShirtBlack from '~assets/models/new/tshirt2.png';
import tShirtBlue from '~assets/models/new/tshirt3.png';
import tShirtGreen from '~assets/models/new/tshirt4.png';
import tShirtRed from '~assets/models/new/tshirt5.png';

import babylookAsh from '~assets/models/new/babylook1.png';
import babylookBlack from '~assets/models/new/babylook2.png';
import babylookBlue from '~assets/models/new/babylook3.png';
import babylookGreen from '~assets/models/new/babylook4.png';
import babylookRed from '~assets/models/new/babylook5.png';

import hoodieRed from '~/assets/models/hoodie1.png';
import hoodieBlue from '~/assets/models/hoodie2.png';
import hoodieGreen from '~/assets/models/hoodie3.png';
import hoodiePink from '~/assets/models/hoodie4.png';
import hoodieYellow from '~/assets/models/hoodie5.png';

import { uploadShirts } from './actions';

export function* upload() {
  let tFronts = [];
  let bFronts = [];
  let hFronts = [];

  const tFront = resolveAssetSource(tShirtFront);

  const bFront = resolveAssetSource(babylookFront);

  const hFront = resolveAssetSource(moletomFront);

  tFronts.push(resolveAssetSource(tFront));
  tFronts.push(resolveAssetSource(tShirtBlack));
  tFronts.push(resolveAssetSource(tShirtAsh));
  tFronts.push(resolveAssetSource(tShirtBlue));
  tFronts.push(resolveAssetSource(tShirtGreen));
  tFronts.push(resolveAssetSource(tShirtRed));

  bFronts.push(resolveAssetSource(bFront));
  bFronts.push(resolveAssetSource(babylookBlack));
  bFronts.push(resolveAssetSource(babylookAsh));
  bFronts.push(resolveAssetSource(babylookBlue));
  bFronts.push(resolveAssetSource(babylookGreen));
  bFronts.push(resolveAssetSource(babylookRed));

  hFronts.push(resolveAssetSource(hFront));
  hFronts.push(resolveAssetSource(hoodieRed));
  hFronts.push(resolveAssetSource(hoodieBlue));
  hFronts.push(resolveAssetSource(hoodieGreen));
  hFronts.push(resolveAssetSource(hoodiePink));
  hFronts.push(resolveAssetSource(hoodieYellow));

  const tshirt = {
    front: tFront.uri,
  };

  const bshirt = {
    front: bFront.uri,
  };

  const hoodie = {
    front: hFront.uri,
  };

  yield put(uploadShirts(tshirt, bshirt, hoodie, tFronts, bFronts, hFronts));
}

export function* popShirts({ payload }) {
  if (!payload) return;

  const { tshirt, bshirt, hoodie, tFronts, bFronts, hFronts } = payload.shirts;

  yield put(uploadShirts(tshirt, bshirt, hoodie, tFronts, bFronts, hFronts));
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', upload),
  takeLatest('persist/PERSIST', popShirts),
]);
