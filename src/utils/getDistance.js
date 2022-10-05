export function getDistanceArray(arrayDis) {
  return arrayDis.reduce((prev, cur) => prev + cur.Distance, 0) < 1000
    ? `${arrayDis.reduce((prev, cur) => prev + cur.Distance, 0)}m`
    : `${(
        arrayDis.reduce((prev, cur) => prev + cur.Distance, 0) / 1000
      ).toFixed(1)}km`;
}

export function getDistance(distance) {
  return distance < 1000 ? `${distance}m` : `${(distance / 1000).toFixed(1)}km`;
}
