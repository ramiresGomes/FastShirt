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
  tutorial: null,
  boomt: null,
  front_final: null,
  back_final: null,
};

export default function shirts(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@shirts/UPLOAD_SHIRTS': {
        draft.tshirt = action.payload.tshirt;
        draft.bshirt = action.payload.bshirt;
        draft.hoodie = action.payload.hoodie;
        draft.boomt = action.payload.boomt;

        draft.tFronts = action.payload.tFronts;
        draft.tBacks = action.payload.tBacks;
        draft.bFronts = action.payload.bFronts;
        draft.bBacks = action.payload.bBacks;
        draft.hFronts = action.payload.hFronts;
        draft.hBacks = action.payload.hBacks;

        draft.tutorial = action.payload.tutorial;

        break;
      }
      case '@shirts/update_color': {
        draft.tshirt.front = action.payload.tf;
        draft.tshirt.back = action.payload.tb;
        draft.bshirt.front = action.payload.bf;
        draft.bshirt.back = action.payload.bb;
        draft.hoodie.front = action.payload.hf;
        draft.hoodie.back = action.payload.hb;
        break;
      }

      case '@shirts/update_sticker': {
        draft.tshirt.front = action.payload.tf;
        draft.tshirt.back = action.payload.tb;
        draft.bshirt.front = action.payload.bf;
        draft.bshirt.back = action.payload.bb;
        draft.hoodie.front = action.payload.hf;
        draft.hoodie.back = action.payload.hb;
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
      case '@shirts/update_babylook_front': {
        draft.bshirt.front = action.payload.uri;
        break;
      }
      case '@shirts/update_babylook_back': {
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

      case '@shirts/set_front_shirt': {
        draft.front_final.print = action.payload.print;
        draft.front_final.id = action.payload.id;
        break;
      }
      case '@shirts/set_back_shirt': {
        draft.back_final.print = action.payload.print;
        draft.back_final.id = action.payload.id;
        break;
      }

      default:
    }
  });
}
