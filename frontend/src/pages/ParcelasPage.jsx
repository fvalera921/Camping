import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { parcelPricesHigh, parcelPricesLow, campingServices } from "../data/siteContent.js";

function PriceTable({ title, subtitle, rows }) {
  return (
    <div className="rounded-[2rem] border border-stone-200 bg-white p-8">
      <p className="text-sm uppercase tracking-[0.25em] text-emerald-700">{title}</p>
      <p className="mt-3 text-sm text-stone-500">{subtitle}</p>
      <div className="mt-6 space-y-3">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 border-b border-stone-100 pb-3">
            <span className="text-stone-600">{label}</span>
            <span className="font-semibold text-stone-900">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ParcelasPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
      <PageHero
        eyebrow="Alojamientos"
        title="Nuestras parcelas"
        description="Nuestro camping cuenta con amplias parcelas de 100 m2 equipadas con conexion de electricidad, agua y TV, pensadas para tiendas, caravanas y autocaravanas."
        image="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
        imageAlt="Parcelas de camping"
      />

      <section className="mt-20">
        <SectionHeading
          eyebrow="Camping"
          title="Con todas las comodidades para mejorar tu estancia"
          description="Bloques de servicios, duchas de agua caliente gratuita y servicios complementarios para familias y campistas."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campingServices.map((service) => (
            <div key={service} className="rounded-[1.75rem] border border-stone-200 bg-white px-5 py-5 text-center text-stone-700">
              {service}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-8 lg:grid-cols-2">
        <PriceTable
          title="Precios por dia"
          subtitle="Temporada alta: Semana Santa, julio, agosto, puentes y festivos."
          rows={parcelPricesHigh}
        />
        <PriceTable
          title="Precios por dia"
          subtitle="Temporada baja: resto de dias."
          rows={parcelPricesLow}
        />
      </section>

      <section className="mt-20 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2.25rem] border border-stone-200 bg-[#f7eddc] p-10">
          <p className="text-sm uppercase tracking-[0.25em] text-stone-500">Mas libertad</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight">Acampada libre</h2>
          <p className="mt-6 text-lg leading-8 text-stone-700">
            Si buscas una forma mas natural y tranquila de acampar, nuestra zona de acampada
            libre es el lugar perfecto para disfrutar del entorno con mas libertad.
          </p>
          <Link
            to="/reservas"
            className="mt-8 inline-flex rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white"
          >
            Reservar
          </Link>
        </div>

        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
          alt="Zona de acampada libre"
          className="h-full min-h-[340px] w-full rounded-[2.25rem] object-cover"
        />
      </section>

      <section className="mt-20">
        <SectionHeading
          eyebrow="Otros alojamientos"
          title="Estos son nuestros alojamientos"
          description="Descubre el resto de opciones de alojamiento disponibles en La Rafa."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Link to="/apartamentos" className="rounded-[2rem] border border-stone-200 bg-white p-8 transition hover:-translate-y-1">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Apartamentos</p>
            <h3 className="mt-3 text-2xl font-semibold text-stone-950">8 apartamentos con historia</h3>
            <p className="mt-4 text-stone-600">Disfruta de nuestros apartamentos ubicados en un edificio con historia.</p>
          </Link>
          <Link to="/albergue" className="rounded-[2rem] border border-stone-200 bg-white p-8 transition hover:-translate-y-1">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Albergue</p>
            <h3 className="mt-3 text-2xl font-semibold text-stone-950">Hasta 44 plazas</h3>
            <p className="mt-4 text-stone-600">Una opcion orientada a grupos y convivencias.</p>
          </Link>
          <Link to="/reservas" className="rounded-[2rem] border border-stone-200 bg-white p-8 transition hover:-translate-y-1">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Acampada libre</p>
            <h3 className="mt-3 text-2xl font-semibold text-stone-950">Vistas al lago</h3>
            <p className="mt-4 text-stone-600">Zona mas aventurera y flexible para una experiencia distinta.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
