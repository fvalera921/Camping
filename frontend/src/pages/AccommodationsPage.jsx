import { useEffect, useState } from "react";
import AccommodationCard from "../components/AccommodationCard.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { accommodations as fallbackAccommodations } from "../data/accommodations.js";
import { accommodationApi } from "../lib/api.js";

export default function AccommodationsPage() {
  const [accommodations, setAccommodations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    accommodationApi
      .getAll()
      .then((items) => {
        setAccommodations(items.length ? items : fallbackAccommodations);
      })
      .catch(() => {
        setAccommodations(fallbackAccommodations);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
      <SectionHeading
        eyebrow="Catalogo"
        title="Alojamientos de La Rafa"
        description="Propuesta de catalogo basada en la oferta publicada actualmente: parcelas, apartamentos, albergue y zona de acampada libre."
      />

      <div className="mt-10 grid gap-6 rounded-[2rem] border border-stone-200 bg-white/80 p-6 md:grid-cols-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Tipo</p>
          <p className="mt-2 text-lg font-medium">Parcelas, apartamentos, albergue</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Capacidad</p>
          <p className="mt-2 text-lg font-medium">De 4 a 44 plazas</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Rango</p>
          <p className="mt-2 text-lg font-medium">Desde acampada hasta apartamento</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Estado</p>
          <p className="mt-2 text-lg font-medium">Preparado para reserva online</p>
        </div>
      </div>

      {isLoading ? <p className="mt-10 text-lg text-stone-600">Cargando alojamientos...</p> : null}
      {error ? <p className="mt-10 text-lg text-rose-700">{error}</p> : null}

      <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {accommodations.map((accommodation) => (
          <AccommodationCard key={accommodation.id} accommodation={accommodation} />
        ))}
      </div>
    </div>
  );
}
