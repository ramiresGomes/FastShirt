export function uploadShirts(
  tshirt,
  bshirt,
  hoodie,
  tFronts,
  bFronts,
  hFronts,
  boomt
) {
  return {
    type: '@shirts/UPLOAD_SHIRTS',
    payload: {
      tshirt,
      bshirt,
      hoodie,
      tFronts,
      bFronts,
      hFronts,
      boomt,
    },
  };
}
