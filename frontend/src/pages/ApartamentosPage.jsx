import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { apartmentFeatures, apartmentPrices } from "../data/siteContent.js";

export default function ApartamentosPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
      <PageHero
        eyebrow="Apartamentos"
        title="Edificio sericicola reacondicionado"
        description="Disponemos de 8 apartamentos turisticos de una llave en un edificio sericicola reacondicionado, ideal para familias y escapadas rurales."
        image="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
        imageAlt="Apartamento en La Rafa"
      />

      <section className="mt-10 rounded-[2.25rem] border border-stone-200 bg-white p-8 shadow-[0_24px_80px_-40px_rgba(28,25,23,0.45)]">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {apartmentFeatures.map((feature) => (
            <div key={feature} className="rounded-2xl bg-stone-100 px-4 py-4 text-sm text-stone-700">
              {feature}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading
          eyebrow="Precios"
          title="Consulta nuestros precios"
          description="Precio de apartamentos para 4 personas segun temporada."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {apartmentPrices.map(([label, value]) => (
            <article key={label} className="rounded-[2rem] border border-stone-200 bg-white p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-stone-500">{label}</p>
              <p className="mt-4 text-4xl font-semibold">{value}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-stone-200 bg-[#f7eddc] p-8 text-stone-700">
          El precio para una sola noche en fin de semana y temporada baja se aplica con tarifa
          de temporada alta.
        </div>
      </section>

      <section className="mt-20 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2.25rem] bg-stone-950 p-10 text-white">
          <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">Reserva</p>
          <h2 className="mt-4 text-4xl font-semibold">Apartamentos para disfrutar del camping con mas comodidad</h2>
          <p className="mt-6 text-lg leading-8 text-stone-300">
            Sala de estar con cocina, dormitorio doble, buhardilla y equipamiento completo para
            una estancia comoda en Bullas.
          </p>
          <Link
            to="/reservas"
            className="mt-8 inline-flex rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white"
          >
            Reservar apartamentos
          </Link>
        </div>
        <img
          src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
          alt="Interior de apartamento"
          className="h-full min-h-[320px] w-full rounded-[2.25rem] object-cover"
        />
      </section>
    </div>
  );
}
