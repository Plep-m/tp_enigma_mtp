import { useState, useEffect } from 'react';
import MapModel, { Coordinate } from '../models/map';

export function useMapRoute(waypoints: Coordinate[]) {
  const [routeCoordinates, setRouteCoordinates] = useState<Coordinate[]>([]);
  const [isLoading, setIsLoading] = useState(waypoints.length >= 2);

  const waypointsKey = JSON.stringify(waypoints);

  useEffect(() => {
    if (waypoints.length < 2) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    MapModel.fetchRoute(waypoints)
      .then(setRouteCoordinates)
      .catch((err) => console.error('[useMapRoute]', err))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waypointsKey]);

  return { routeCoordinates, isLoading };
}
