import { useEffect, useState } from "react";
import { Cloud, Droplets, Wind, Thermometer, Loader2 } from "lucide-react";

interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  description: string;
  icon: string;
  wind_speed: number;
  city: string;
}

interface WeatherWidgetProps {
  lat: number;
  lon: number;
  className?: string;
}

const WeatherWidget = ({ lat, lon, className = "" }: WeatherWidgetProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
        const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
        const res = await fetch(
          `https://${projectId}.supabase.co/functions/v1/get-weather?lat=${lat}&lon=${lon}`,
          {
            headers: {
              apikey: anonKey,
              Authorization: `Bearer ${anonKey}`,
            },
          }
        );
        
        if (!res.ok) throw new Error("Failed to fetch weather");
        const result: WeatherData = await res.json();
        setWeather(result);
      } catch (e: any) {
        setError("Unable to load weather");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  if (loading) {
    return (
      <div className={`rounded-xl border border-border bg-card p-5 flex items-center justify-center ${className}`}>
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className={`rounded-xl border border-border bg-card p-5 text-center ${className}`}>
        <Cloud className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
        <p className="text-xs text-muted-foreground font-body">{error || "No data"}</p>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border border-border bg-card p-5 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Cloud className="h-4 w-4 text-primary" />
        <span className="text-xs font-body font-semibold uppercase tracking-wider text-primary">
          Current Weather
        </span>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
          className="w-16 h-16 -ml-2"
        />
        <div>
          <p className="font-display text-3xl font-bold text-foreground">{weather.temp}°C</p>
          <p className="text-sm text-muted-foreground font-body capitalize">{weather.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="text-center">
          <Thermometer className="h-3.5 w-3.5 text-muted-foreground mx-auto mb-1" />
          <p className="text-xs text-muted-foreground font-body">Feels like</p>
          <p className="text-sm font-semibold text-foreground font-body">{weather.feels_like}°C</p>
        </div>
        <div className="text-center">
          <Droplets className="h-3.5 w-3.5 text-muted-foreground mx-auto mb-1" />
          <p className="text-xs text-muted-foreground font-body">Humidity</p>
          <p className="text-sm font-semibold text-foreground font-body">{weather.humidity}%</p>
        </div>
        <div className="text-center">
          <Wind className="h-3.5 w-3.5 text-muted-foreground mx-auto mb-1" />
          <p className="text-xs text-muted-foreground font-body">Wind</p>
          <p className="text-sm font-semibold text-foreground font-body">{weather.wind_speed} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
