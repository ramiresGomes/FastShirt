export function uploadShirts(
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
      tutorial,
      boomt,
    },
  };
}
