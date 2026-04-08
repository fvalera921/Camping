import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccommodationCard from "../components/AccommodationCard.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { accommodations as fallbackAccommodations } from "../data/accommodations.js";
import { accommodationApi } from "../lib/api.js";

const landscapeImages = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=1200&q=80"
];

const sustainabilityItems = [
  "Reciclaje y cuidado del entorno",
  "Productos locales y tienda de proximidad",
  "Talleres de naturaleza para familias"
];

export default function HomePage() {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    accommodationApi
      .getAll()
      .then((items) => {
        setAccommodations(items.length ? items : fallbackAccommodations);
      })
      .catch(() => {
        setAccommodations(fallbackAccommodations);
      });
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={landscapeImages[0]}
            alt="Entorno natural de La Rafa"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,24,39,0.84)_0%,rgba(17,24,39,0.58)_42%,rgba(17,24,39,0.18)_100%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="max-w-4xl text-white">
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">Camping La Rafa</p>
            <h1 className="mt-6 text-5xl font-semibold leading-tight md:text-7xl">
              Un lugar para desconectar en plena naturaleza de Bullas
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-200">
              Junto al rio Mula, con parcelas, apartamentos, albergue y actividades para
              familias, grupos y viajeros que buscan naturaleza, tranquilidad y escapadas
              rurales en Murcia.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/reservas"
                className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-medium text-white"
              >
                Reservar
              </Link>
              <Link
                to="/parcelas"
                className="rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white"
              >
                Ver alojamientos
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-10 relative z-[1] mx-auto max-w-7xl px-6">
        <div className="grid gap-4 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(28,25,23,0.5)] md:grid-cols-3">
          <div className="rounded-[1.5rem] bg-stone-50 px-5 py-5">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Oferta</p>
            <p className="mt-2 text-2xl font-semibold">Parcelas, apartamentos y albergue</p>
            <p className="mt-2 text-sm text-stone-600">Alojamientos adaptados a familias, grupos y campistas.</p>
          </div>
          <div className="rounded-[1.5rem] bg-stone-50 px-5 py-5">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Entorno</p>
            <p className="mt-2 text-2xl font-semibold">Rio Mula y Bullas</p>
            <p className="mt-2 text-sm text-stone-600">Naturaleza, rutas, vino y descanso en el noroeste murciano.</p>
          </div>
          <div className="rounded-[1.5rem] bg-stone-50 px-5 py-5">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Contacto</p>
            <p className="mt-2 text-2xl font-semibold">Reserva y atencion</p>
            <p className="mt-2 text-sm text-stone-600">Informacion, contacto directo y acceso a todos los alojamientos.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2.25rem] bg-white p-10 shadow-[0_24px_80px_-40px_rgba(28,25,23,0.45)]">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Bienvenidos</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-stone-950">
              Un camping para disfrutar de la naturaleza
            </h2>
            <p className="mt-6 text-lg leading-8 text-stone-600">
              La nueva home se organiza como una portada editorial: primero el lugar, luego los
              alojamientos, despues las actividades, el vino, la sostenibilidad y el contacto.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] bg-stone-100 p-5">
                <p className="font-semibold">Senderismo y Via Verde</p>
                <p className="mt-2 text-sm text-stone-600">Un entorno ideal para caminar y desconectar.</p>
              </div>
              <div className="rounded-[1.5rem] bg-stone-100 p-5">
                <p className="font-semibold">Ruta del vino D.O.P. Bullas</p>
                <p className="mt-2 text-sm text-stone-600">Un argumento diferencial que la web debe explotar mejor.</p>
              </div>
            </div>
          </div>

          <img
            src={landscapeImages[1]}
            alt="Camping y paisaje"
            className="h-full min-h-[360px] w-full rounded-[2.25rem] object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2.25rem] border border-stone-200 bg-[#f7eddc] p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Mapa del recinto</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-stone-950">
              Consulta el plano del camping antes de tu estancia
            </h2>
            <p className="mt-6 text-lg leading-8 text-stone-700">
              Aqui puedes ver la distribucion general del recinto para ubicar parcelas,
              servicios, accesos y zonas principales del camping.
            </p>
            <a
              href="/mapa_recinto_larafa.pdf"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white"
            >
              Ver mapa del recinto
            </a>
          </div>

          <div className="overflow-hidden rounded-[2.25rem] border border-stone-200 bg-white p-4">
            <img
              src="/mapa_recinto_larafa.png"
              alt="Mapa del recinto La Rafa"
              className="h-[420px] w-full rounded-[1.5rem] object-contain"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200/80 bg-white/70">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Ubicacion</p>
            <p className="mt-3 text-lg font-semibold">Paraje La Rafa, Bullas</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Naturaleza</p>
            <p className="mt-3 text-lg font-semibold">Rio Mula y senderos</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Experiencias</p>
            <p className="mt-3 text-lg font-semibold">Vino, talleres y familia</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Contacto</p>
            <p className="mt-3 text-lg font-semibold">+34 968 654 666</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Alojamientos"
          title="Estos son nuestros alojamientos"
          description="Parcelas, apartamentos, albergue y acampada libre para disfrutar del camping segun el tipo de estancia que busques."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {accommodations.map((accommodation) => (
            <AccommodationCard key={accommodation.id} accommodation={accommodation} />
          ))}
        </div>
      </section>

      <section className="bg-stone-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Entorno</p>
            <h2 className="mt-4 text-5xl font-semibold leading-tight">
              Disfruta de la naturaleza y del paisaje del noroeste de Murcia
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-300">
              Salto del Usero, Via Verde, rutas, aire libre y una sensacion de calma que debe
              sentirse en la propia pagina.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/15 px-4 py-2 text-sm">Salto del Usero</span>
              <span className="rounded-full border border-white/15 px-4 py-2 text-sm">Via Verde</span>
              <span className="rounded-full border border-white/15 px-4 py-2 text-sm">Senderismo</span>
              <span className="rounded-full border border-white/15 px-4 py-2 text-sm">Rio Mula</span>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <img
              src={landscapeImages[2]}
              alt="Entorno natural y vinedos"
              className="h-64 w-full rounded-[2rem] object-cover md:h-full"
            />
            <div className="rounded-[2rem] bg-white/5 p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Ruta del vino</p>
              <p className="mt-4 text-2xl font-semibold">Bullas tambien se descubre desde el vino</p>
              <p className="mt-4 text-stone-300">
                Bullas tambien es tierra de vino. Las bodegas y el paisaje de vinedos forman
                parte de la experiencia de estancia y escapada rural.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2.25rem] border border-stone-200 bg-[#f7eddc] p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Comprometidos con el entorno</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-stone-950">
              Sostenibilidad, proximidad y una experiencia mas conectada con el lugar
            </h2>
            <div className="mt-8 space-y-4">
              {sustainabilityItems.map((item) => (
                <div key={item} className="rounded-[1.5rem] bg-white p-5 text-stone-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
            alt="Camping sostenible"
            className="h-full min-h-[340px] w-full rounded-[2.25rem] object-cover"
          />
        </div>
      </section>

      <section className="bg-emerald-700 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-100">Contacto</p>
            <h2 className="mt-4 text-4xl font-semibold">Paraje La Rafa s/n, Bullas, Murcia</h2>
            <p className="mt-4 max-w-2xl text-lg text-emerald-50">
              Telefono, email, ubicacion y acceso a las reservas en un cierre mas solido y mas
              parecido a una web real de camping.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="tel:+34968654666"
              className="rounded-full bg-white px-6 py-3 text-center text-sm font-medium text-emerald-800"
            >
              +34 968 654 666
            </a>
            <a
              href="mailto:campinglarafa@gmail.com"
              className="rounded-full border border-white/25 px-6 py-3 text-center text-sm font-medium text-white"
            >
              campinglarafa@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
