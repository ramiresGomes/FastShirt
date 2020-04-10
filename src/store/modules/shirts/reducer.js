import produce from 'immer';

const INITIAL_STATE = {
  tshirt: null,
  bshirt: null,
  hoodie: null,
  tFronts: null,
  tBacks: null,
  bFronts: null,
  bBacks: null,
  hFronts: null,
  hBacks: null,
};

export default function shirts(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@shirts/UPLOAD_SHIRTS': {
        draft.tshirt = action.payload.tshirt;
        draft.bshirt = action.payload.bshirt;
        draft.hoodie = action.payload.hoodie;

        draft.tFronts = action.payload.tFronts;
        draft.tBacks = action.payload.tBacks;
        draft.bFronts = action.payload.bFronts;
        draft.bBacks = action.payload.bBacks;
        draft.hFronts = action.payload.hFronts;
        draft.hBacks = action.payload.hBacks;
        break;
      }
      case '@shirts/update_tshirt_front': {
        draft.tshirt.front = action.payload.uri;
        break;
      }

      case '@shirts/update_tshirt_back': {
        draft.tshirt.back = action.payload.uri;
        break;
      }

      case '@shirts/update_bshirt_front': {
        draft.bshirt.front = action.payload.uri;
        break;
      }

      case '@shirts/update_bshirt_back': {
        draft.bshirt.back = action.payload.uri;
        break;
      }

      case '@shirts/update_hoodie_front': {
        draft.hoodie.front = action.payload.uri;
        break;
      }

      case '@shirts/update_hoodie_back': {
        draft.hoodie.back = action.payload.uri;
        break;
      }
      default:
    }
  });
}
