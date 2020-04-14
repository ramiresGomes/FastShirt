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
  boomt: null,
};

export default function shirts(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
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
      // essas 6 actions se tornam uma só

      default:
    }
  });
}
