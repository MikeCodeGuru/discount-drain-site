/**
 * GOOGLE MAPS FRONTEND INTEGRATION - ESSENTIAL GUIDE
 *
 * USAGE FROM PARENT COMPONENT:
 * ======
 *
 * const mapRef = useRef<google.maps.Map | null>(null);
 *
 * <MapView
 *   initialCenter={{ lat: 40.7128, lng: -74.0060 }}
 *   initialZoom={15}
 *   onMapReady={(map) => {
 *     mapRef.current = map; // Store to control map from parent anytime, google map itself is in charge of the re-rendering, not react state.
 * </MapView>
 *
 * ======
 * Available Libraries and Core Features:
 * -------------------------------
 * 📍 MARKER (from `marker` library)
 * - Attaches to map using { map, position }
 * new google.maps.marker.AdvancedMarkerElement({
 *   map,
 *   position: { lat: 37.7749, lng: -122.4194 },
 *   title: "San Francisco",
 * });
 *
 * -------------------------------
 * 🏢 PLACES (from `places` library)
 * - Does not attach directly to map; use data with your map manually.
 * const place = new google.maps.places.Place({ id: PLACE_ID });
 * await place.fetchFields({ fields: ["displayName", "location"] });
 * map.setCenter(place.location);
 * new google.maps.marker.AdvancedMarkerElement({ map, position: place.location });
 *
 * -------------------------------
 * 🧭 GEOCODER (from `geocoding` library)
 * - Standalone service; manually apply results to map.
 * const geocoder = new google.maps.Geocoder();
 * geocoder.geocode({ address: "New York" }, (results, status) => {
 *   if (status === "OK" && results[0]) {
 *     map.setCenter(results[0].geometry.location);
 *     new google.maps.marker.AdvancedMarkerElement({
 *       map,
 *       position: results[0].geometry.location,
 *     });
 *   }
 * });
 *
 * -------------------------------
 * 📐 GEOMETRY (from `geometry` library)
 * - Pure utility functions; not attached to map.
 * const dist = google.maps.geometry.spherical.computeDistanceBetween(p1, p2);
 *
 * -------------------------------
 * 🛣️ ROUTES (from `routes` library)
 * - Combines DirectionsService (standalone) + DirectionsRenderer (map-attached)
 * const directionsService = new google.maps.DirectionsService();
 * const directionsRenderer = new google.maps.DirectionsRenderer({ map });
 * directionsService.route(
 *   { origin, destination, travelMode: "DRIVING" },
 *   (res, status) => status === "OK" && directionsRenderer.setDirections(res)
 * );
 *
 * -------------------------------
 * 🌦️ MAP LAYERS (attach directly to map)
 * - new google.maps.TrafficLayer().setMap(map);
 * - new google.maps.TransitLayer().setMap(map);
 * - new google.maps.BicyclingLayer().setMap(map);
 *
 * -------------------------------
 * ✅ SUMMARY
 * - "map-attached" → AdvancedMarkerElement, DirectionsRenderer, Layers.
 * - "standalone" → Geocoder, DirectionsService, DistanceMatrixService, ElevationService.
 * - "data-only" → Place, Geometry utilities.
 */

/// <reference types="@types/google.maps" />

import { useEffect, useRef, useState } from "react";
import { usePersistFn } from "@/hooks/usePersistFn";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    google?: typeof google;
  }
}

// Use the server-side proxy route to avoid origin validation issues with the Forge maps proxy.
// The server at /api/maps-proxy/* forwards requests to forge.manus.ai with the correct credentials.
const API_KEY = import.meta.env.VITE_FRONTEND_FORGE_API_KEY;
const MAPS_PROXY_URL = "/api/maps-proxy";

// Singleton promise — ensures the script is only ever injected once,
// even when multiple MapView instances mount simultaneously.
let mapScriptPromise: Promise<void> | null = null;

function loadMapScript(): Promise<void> {
  // If Google Maps is already loaded, resolve immediately.
  if (window.google?.maps) {
    return Promise.resolve();
  }

  // If a load is already in progress, return the same promise.
  if (mapScriptPromise) {
    return mapScriptPromise;
  }

  mapScriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `${MAPS_PROXY_URL}/maps/api/js?key=${API_KEY}&v=weekly&loading=async&libraries=marker,places,geocoding,geometry`;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.onload = () => {
      resolve();
    };
    script.onerror = () => {
      // Reset so a future attempt can retry.
      mapScriptPromise = null;
      // Only log in production — in dev the proxy route doesn't run (static build),
      // so this error is expected and not actionable.
      if (import.meta.env.PROD) {
        console.error("Failed to load Google Maps script");
      }
      reject(new Error("Failed to load Google Maps script"));
    };
    document.head.appendChild(script);
  });

  return mapScriptPromise;
}

interface MapViewProps {
  className?: string;
  initialCenter?: google.maps.LatLngLiteral;
  initialZoom?: number;
  onMapReady?: (map: google.maps.Map) => void;
}

export function MapView({
  className,
  initialCenter = { lat: 37.7749, lng: -122.4194 },
  initialZoom = 12,
  onMapReady,
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const [mapError, setMapError] = useState(false);
  const init = usePersistFn(async () => {
    try {
      await loadMapScript();
    } catch {
      // Script failed to load (e.g. origin not registered in dev mode).
      setMapError(true);
      return;
    }
    if (!mapContainer.current) return;
    try {
      map.current = new window.google!.maps.Map(mapContainer.current, {
        zoom: initialZoom,
        center: initialCenter,
        mapTypeControl: true,
        fullscreenControl: true,
        zoomControl: true,
        streetViewControl: true,
        mapId: "DEMO_MAP_ID",
      });
      if (onMapReady) {
        onMapReady(map.current);
      }
    } catch {
      setMapError(true);
    }
  });
  useEffect(() => {
    init();
  }, [init]);
  if (mapError) {
    // Fallback: static OpenStreetMap tile centred on London, ON
    // Used in dev (proxy not running) and as a graceful degradation in prod.
    const lat = initialCenter?.lat ?? 42.9849;
    const lng = initialCenter?.lng ?? -81.2453;
    const zoom = initialZoom ?? 12;
    const staticMapUrl =
      `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=${zoom}&size=800x420&markers=${lat},${lng},red`;
    return (
      <div
        className={cn(
          "w-full relative overflow-hidden rounded-lg",
          "bg-[#F7F6F3] border border-[#E8E6DF]",
          className
        )}
        style={{ minHeight: "420px" }}
      >
        <img
          src={staticMapUrl}
          alt="Map of London, Ontario service area"
          className="w-full h-full object-cover"
          style={{ minHeight: "420px" }}
          onError={(e) => {
            // If static tile also fails, show a simple grey placeholder
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div
          className="absolute bottom-3 left-3 right-3 flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium"
          style={{ backgroundColor: "rgba(255,255,255,0.92)", color: "#555", backdropFilter: "blur(4px)", maxWidth: "fit-content" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle cx="12" cy="9" r="2.5"/>
          </svg>
          Interactive map available on the published site
        </div>
      </div>
    );
  }
  return (
    <div ref={mapContainer} className={cn("w-full h-[500px]", className)} />
  );
}
