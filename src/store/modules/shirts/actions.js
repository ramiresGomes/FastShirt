export function uploadShirts(
  tshirt,
  bshirt,
  hoodie,
  tFronts,
  tBacks,
  bFronts,
  bBacks,
  hFronts,
  hBacks
) {
  return {
    type: '@shirts/UPLOAD_SHIRTS',
    payload: {
      tshirt,
      bshirt,
      hoodie,
      tFronts,
      tBacks,
      bFronts,
      bBacks,
      hFronts,
      hBacks,
    },
  };
}
