import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  preview: null, // camiseta em edição
  shirtType: null,
};

export default function user(state = INITIAL_STATE, { type, payload }) {
  return produce(state, (draft) => {
    switch (type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = payload.user;
        break;
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.profile = payload.profile;
        break;
      }

      case '@user/UPDATE_SHIRT': {
        draft.preview = payload.source;
        draft.shirtType = payload.tShirtImage;
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
