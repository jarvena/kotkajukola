function getGeoJsonBounds(geojson) {
  const coords = [];
  const collect = (geometry) => {
    if (!geometry) return;
    const { type, coordinates, geometries } = geometry;

    if (type === 'Point') {
      coords.push(coordinates);
      return;
    }

    if (type === 'LineString' || type === 'MultiPoint') {
      coordinates.forEach((coord) => coords.push(coord));
      return;
    }

    if (type === 'Polygon' || type === 'MultiLineString') {
      coordinates.forEach((line) => line.forEach((coord) => coords.push(coord)));
      return;
    }

    if (type === 'MultiPolygon') {
      coordinates.forEach((polygon) => polygon.forEach((line) => line.forEach((coord) => coords.push(coord))));
      return;
    }

    if (type === 'GeometryCollection') {
      geometries.forEach(collect);
      return;
    }
  };

  if (!geojson) return null;

  if (geojson.type === 'FeatureCollection') {
    geojson.features.forEach((feature) => collect(feature.geometry));
  } else if (geojson.type === 'Feature') {
    collect(geojson.geometry);
  } else {
    collect(geojson);
  }

  if (coords.length === 0) return null;

  let minX = coords[0][0];
  let minY = coords[0][1];
  let maxX = coords[0][0];
  let maxY = coords[0][1];

  coords.forEach(([x, y]) => {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  });

  return [[minX, minY], [maxX, maxY]];
}

export { getGeoJsonBounds };