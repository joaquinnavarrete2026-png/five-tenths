import { ClimaComuna } from './components/ClimaComuna';

function App() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Panel de Ferias Libres
          </h1>
          <p className="mt-3 text-slate-600 text-lg">
            Monitoreo meteorológico en tiempo real para la Región de La Araucanía
          </p>
        </header>
        
        {/* Usamos flex y justify-center para que la tarjeta se mantenga centrada y con su tamaño real */}
        <section className="flex justify-center">
          <ClimaComuna />
        </section>
      </div>
    </main>
  );
}

export default App;