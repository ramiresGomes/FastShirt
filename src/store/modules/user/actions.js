export function updateProfileRequest(data) {
  return { type: '@user/UPDATE_PROFILE_REQUEST', payload: { data } };
}

export function updateProfileSuccess(profile) {
  return { type: '@user/UPDATE_PROFILE_SUCCESS', payload: { profile } };
}

export function updateProfileFailure() {
  return { type: '@user/UPDATE_PROFILE_FAILURE' };
}

export function updateShirt(source, tShirtImage, shirtType, shirtSide) {
  return {
    type: '@user/UPDATE_SHIRT',
    payload: { source, tShirtImage, shirtType, shirtSide },
  };
}
