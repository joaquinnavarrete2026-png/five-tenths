import { useState, useEffect } from 'react';

interface ClimaData {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
    time: string;
  };
}

export const ClimaComuna = () => {
  const [clima, setClima] = useState<ClimaData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const nombreComuna = "Temuco";
  const latitude = -38.7396;
  const longitude = -72.5984;

  useEffect(() => {
    const fetchClima = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=America%2FSantiago`
        );

        if (!response.ok) {
          throw new Error(`Error en la petición HTTP: ${response.status}`);
        }

        const data: ClimaData = await response.json();
        setClima(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ocurrió un error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClima();
  }, []);

  if (loading) {
    return (
      <div className="p-4 border rounded-lg shadow-sm bg-blue-50 text-blue-700 animate-pulse">
        <p className="font-semibold">Cargando clima de {nombreComuna}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border rounded-lg shadow-sm bg-red-50 text-red-700">
        <p className="font-bold">Error en {nombreComuna}</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-5 border rounded-xl shadow-md bg-white hover:shadow-lg transition">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{nombreComuna}</h3>
      {clima && (
        <div className="space-y-1 text-gray-600">
          <p className="text-2xl font-extrabold text-blue-600">
            {clima.current_weather.temperature} °C
          </p>
          <p className="text-sm">Viento: {clima.current_weather.windspeed} km/h</p>
        </div>
      )}
    </div>
  );
};