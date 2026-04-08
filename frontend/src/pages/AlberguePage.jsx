import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";

export default function AlberguePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
      <PageHero
        eyebrow="Albergue"
        title="Un amplio albergue con 44 plazas para grupos"
        description="Una solucion sencilla y economica para grupos, senderistas, convivencias y escapadas colectivas dentro del entorno natural de La Rafa."
        image="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
        imageAlt="Albergue para grupos"
      />

      <div className="mt-8">
        <Link
          to="/reservas"
          className="inline-flex rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white"
        >
          Reservar albergue
        </Link>
      </div>

      <section className="mt-20 grid gap-6 md:grid-cols-3">
        <article className="rounded-[2rem] border border-stone-200 bg-white p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Formato</p>
          <h2 className="mt-3 text-2xl font-semibold">Pensado para compartir</h2>
          <p className="mt-4 text-stone-600">Perfecto para viajes en grupo, salidas educativas o fines de semana activos.</p>
        </article>
        <article className="rounded-[2rem] border border-stone-200 bg-white p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Entorno</p>
          <h2 className="mt-3 text-2xl font-semibold">Naturaleza y actividades</h2>
          <p className="mt-4 text-stone-600">Facilita combinar alojamiento colectivo con rutas, piscina y animacion familiar.</p>
        </article>
        <article className="rounded-[2rem] border border-stone-200 bg-white p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Reserva</p>
          <h2 className="mt-3 text-2xl font-semibold">Mas clara que la web actual</h2>
          <p className="mt-4 text-stone-600">La nueva web puede explicar mejor la capacidad y el uso ideal del albergue.</p>
        </article>
      </section>
    </div>
  );
}
