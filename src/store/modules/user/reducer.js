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

      case '@user/UPDATE_SHIRT': {
        // switch pra escolher qual lado de qual camiseta
        switch (payload.shirtType) {
          case 'tshirt':
            payload.shirtSide === 'front'
              ? (draft.tshirt.front = payload.source)
              : (draft.tshirt.back = payload.source);
            break;
          case 'babylook':
            payload.shirtSide === 'front'
              ? (draft.bshirt.front = payload.source)
              : (draft.bshirt.back = payload.source);
            break;
          case 'moletom':
            payload.shirtSide === 'front'
              ? (draft.hoodie.front = payload.source)
              : (draft.hoodie.back = payload.source);
            break;
          default:
        }
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
