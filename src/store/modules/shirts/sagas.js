import { all, takeLatest, put } from 'redux-saga/effects';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

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

import tutorial1 from '~/assets/tutorial/1.png';
import tutorial2 from '~/assets/tutorial/2.png';
import tutorial3 from '~/assets/tutorial/3.png';
import tutorial4 from '~/assets/tutorial/4.png';
import tutorial5 from '~/assets/tutorial/5.png';
import tutorial6 from '~/assets/tutorial/6.png';
import tutorial7 from '~/assets/tutorial/7.png';
import tutorial8 from '~/assets/tutorial/8.png';
import tutorial9 from '~/assets/tutorial/9.png';
import tutorial10 from '~/assets/tutorial/10.png';
import tutorial11 from '~/assets/tutorial/11.png';

import boom from '~/assets/boom.png';

import { uploadShirts } from './actions';

export function* upload() {
  let tFronts = [];
  let tBacks = [];
  let bFronts = [];
  let bBacks = [];
  let hFronts = [];
  let hBacks = [];
  let tutorial = [];

  const boomt = resolveAssetSource(boom);

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

  tutorial.push(resolveAssetSource(tutorial1));
  tutorial.push(resolveAssetSource(tutorial2));
  tutorial.push(resolveAssetSource(tutorial3));
  tutorial.push(resolveAssetSource(tutorial4));
  tutorial.push(resolveAssetSource(tutorial5));
  tutorial.push(resolveAssetSource(tutorial6));
  tutorial.push(resolveAssetSource(tutorial7));
  tutorial.push(resolveAssetSource(tutorial8));
  tutorial.push(resolveAssetSource(tutorial9));
  tutorial.push(resolveAssetSource(tutorial10));
  tutorial.push(resolveAssetSource(tutorial11));

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

  yield put(
    uploadShirts(
      tshirt,
      bshirt,
      hoodie,
      tFronts,
      tBacks,
      bFronts,
      bBacks,
      hFronts,
      hBacks,
      tutorial,
      boomt
    )
  );
}

export function* popShirts({ payload }) {
  if (!payload) return;

  const {
    tshirt,
    bshirt,
    hoodie,
    tFronts,
    tBacks,
    bFronts,
    bBacks,
    hFronts,
    hBacks,
  } = payload.shirts;

  yield put(
    uploadShirts(
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
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', upload),
  takeLatest('persist/PERSIST', popShirts),
]);
