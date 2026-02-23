import { useEffect, useState, useRef } from "react";
import { MapPin, Loader2 } from "lucide-react";

interface GeoResult {
  lat: string;
  lon: string;
  display_name: string;
}

interface DestinationMapProps {
  destination: string;
}

const DestinationMap = ({ destination }: DestinationMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!destination) return;

    let isMounted = true;

    const init = async () => {
      setLoading(true);
      setNotFound(false);

      // Geocode via Nominatim (OpenStreetMap, free, no API key)
      let coords: { lat: number; lon: number } | null = null;
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(destination)}&format=json&limit=1`,
          { headers: { "Accept-Language": "en" } }
        );
        const data: GeoResult[] = await res.json();
        if (data.length > 0) {
          coords = { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
        }
      } catch {
        // silently fail
      }

      if (!isMounted) return;

      if (!coords) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      // Dynamically import leaflet to avoid SSR issues
      const L = (await import("leaflet")).default;

      // Fix default icon paths for bundlers
      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      if (!mapRef.current || !isMounted) return;

      // Destroy previous map if any
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }

      const map = L.map(mapRef.current, {
        center: [coords.lat, coords.lon],
        zoom: 10,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      L.marker([coords.lat, coords.lon])
        .addTo(map)
        .bindPopup(`<strong>${destination}</strong>`)
        .openPopup();

      leafletMapRef.current = map;
      setLoading(false);
    };

    init();

    return () => {
      isMounted = false;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [destination]);

  return (
    <div className="mt-4 rounded-xl overflow-hidden border border-border">
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      />

      {loading && !notFound && (
        <div className="flex items-center justify-center gap-2 h-48 bg-muted text-muted-foreground text-sm font-body">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading map…
        </div>
      )}

      {notFound && (
        <div className="flex items-center justify-center gap-2 h-48 bg-muted text-muted-foreground text-sm font-body">
          <MapPin className="h-4 w-4" />
          Location not found on map
        </div>
      )}

      <div
        ref={mapRef}
        style={{ height: loading || notFound ? 0 : "220px" }}
        className="w-full transition-all"
      />
    </div>
  );
};

export default DestinationMap;
