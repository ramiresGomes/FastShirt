import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  tshirt: null,
  bshirt: null,
  hoodie: null,
};

export default function user(state = INITIAL_STATE, { type, payload }) {
  return produce(state, (draft) => {
    switch (type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = payload.user;
        draft.tshirt = payload.tshirt;
        draft.bshirt = payload.bshirt;
        draft.hoodie = payload.hoodie;
        break;
      }

      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.profile = payload.profile;
        break;
      }

      case '@user/update_tshirt_front': {
        draft.tshirt.front = payload.uri;
        break;
      }

      case '@user/update_tshirt_back': {
        draft.tshirt.back = payload.uri;
        break;
      }

      case '@user/update_bshirt_front': {
        draft.bshirt.front = payload.uri;
        break;
      }

      case '@user/update_bshirt_back': {
        draft.bshirt.back = payload.uri;
        break;
      }

      case '@user/update_hoodie_front': {
        draft.hoodie.front = payload.uri;
        break;
      }

      case '@user/update_hoodie_back': {
        draft.hoodie.back = payload.uri;
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.profile = null;
        break;
      }
      default:
    }
  });
}
