import produce from 'immer';

const INITIAL_STATE = {
  tshirt: null,
  bshirt: null,
  hoodie: null,
  tFronts: null, // array de tshirts
  bFronts: null, // array de babyloook
  hFronts: null,
  front_final: null,
};

export default function shirts(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@shirts/UPLOAD_SHIRTS': {
        draft.tshirt = action.payload.tshirt;
        draft.bshirt = action.payload.bshirt;
        draft.hoodie = action.payload.hoodie;

        draft.tFronts = action.payload.tFronts;
        draft.bFronts = action.payload.bFronts;
        draft.hFronts = action.payload.hFronts;

        break;
      }
      case '@shirts/update_color': {
        draft.tshirt.front = action.payload.tf;
        draft.bshirt.front = action.payload.bf;
        draft.hoodie.front = action.payload.hf;
        break;
      }

      case '@shirts/update_sticker': {
        draft.tshirt.front = action.payload.tf;
        draft.bshirt.front = action.payload.bf;
        draft.hoodie.front = action.payload.hf;
        break;
      }

      case '@shirts/update_tshirt_front': {
        draft.tshirt.front = action.payload.uri;
        break;
      }

      case '@shirts/update_babylook_front': {
        draft.bshirt.front = action.payload.uri;
        break;
      }

      case '@shirts/update_hoodie_front': {
        draft.hoodie.front = action.payload.uri;
        break;
      }

      case '@shirts/set_front_shirt': {
        draft.front_final.print = action.payload.print;
        draft.front_final.id = action.payload.id;
        break;
      }

      default:
    }
  });
}
