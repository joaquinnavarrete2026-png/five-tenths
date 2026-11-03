import { ClimaComuna } from './components/ClimaComuna';

function App() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Panel meteorológico — Ferias Libres de La Araucanía
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <ClimaComuna />
      </div>
    </main>
  );
}

export default App;