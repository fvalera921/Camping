import PageHero from "../components/PageHero.jsx";

export default function LocationPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
      <PageHero
        eyebrow="Localizacion"
        title="Descubre como llegar a La Rafa"
        description="Situada en un entorno natural proximo al rio Mula, en las afueras de Bullas y a unos 15 minutos a pie del centro urbano."
        image="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80"
        imageAlt="Entorno natural de Bullas"
      />

      <section className="mt-20 grid gap-6 md:grid-cols-3">
        <div className="rounded-[2rem] border border-stone-200 bg-white p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Pueblo</p>
          <h2 className="mt-3 text-2xl font-semibold">Bullas cerca</h2>
          <p className="mt-4 text-stone-600">Comercios, centro de salud, farmacias y servicios a muy poca distancia.</p>
        </div>
        <div className="rounded-[2rem] border border-stone-200 bg-white p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Naturaleza</p>
          <h2 className="mt-3 text-2xl font-semibold">Rio, rutas y paisaje</h2>
          <p className="mt-4 text-stone-600">Un lugar ideal para disfrutar de tranquilidad sin perder la cercania a planes y actividades.</p>
        </div>
        <div className="rounded-[2rem] border border-stone-200 bg-white p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Acceso</p>
          <h2 className="mt-3 text-2xl font-semibold">Facil de encontrar</h2>
          <p className="mt-4 text-stone-600">La nueva version puede incluir mapa embebido, coordenadas y boton de rutas.</p>
        </div>
      </section>
    </div>
  );
}
