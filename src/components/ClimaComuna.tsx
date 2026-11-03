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
      <div style={{ width: '380px', margin: '0 auto', background: '#0f172a', color: '#38bdf8', padding: '24px', borderRadius: '16px', border: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}>
        <div style={{ width: '20px', height: '20px', border: '2px solid #38bdf8', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ fontWeight: 600, margin: 0 }}>Cargando clima de {nombreComuna}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ width: '380px', margin: '0 auto', background: '#450a0a', color: '#fca5a5', padding: '24px', borderRadius: '16px', border: '1px solid #7f1d1d', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}>
        <p style={{ fontWeight: 'bold', margin: 0 }}>⚠️ Error en {nombreComuna}</p>
        <p style={{ fontSize: '14px', marginTop: '4px', margin: 0 }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ 
      width: '380px', 
      margin: '0 auto', 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', 
      color: '#ffffff', 
      padding: '24px', 
      borderRadius: '20px', 
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(56, 189, 248, 0.2)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <span style={{ 
            fontSize: '11px', 
            fontWeight: 'bold', 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em', 
            color: '#7dd3fc', 
            background: 'rgba(30, 58, 138, 0.6)', 
            padding: '4px 12px', 
            borderRadius: '9999px',
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }}>
            Araucanía
          </span>
          <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#ffffff', margin: '12px 0 0 0' }}>{nombreComuna}</h3>
        </div>
        <span style={{ fontSize: '32px' }}>⛅</span>
      </div>

      {clima && (
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(59, 130, 246, 0.2)' }}>
          <div>
            <p style={{ fontSize: '36px', fontWeight: 900, margin: 0, letterSpacing: '-0.025em' }}>
              {clima.current_weather.temperature}
              <span style={{ fontSize: '20px', fontWeight: 600, color: '#38bdf8', marginLeft: '4px' }}>°C</span>
            </p>
          </div>
          <div style={{ textAlign: 'right', background: 'rgba(15, 23, 42, 0.6)', padding: '8px 12px', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>Viento</p>
            <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#e2e8f0', margin: '2px 0 0 0' }}>{clima.current_weather.windspeed} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
};