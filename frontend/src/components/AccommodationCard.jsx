import { Link } from "react-router-dom";

const fallbackImage =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80";

export default function AccommodationCard({ accommodation }) {
  const image = accommodation.imageUrl || accommodation.image || fallbackImage;
  const summary =
    accommodation.summary ||
    accommodation.description ||
    "Alojamiento preparado para una escapada en plena naturaleza.";
  const label = accommodation.type || "Alojamiento";

  return (
    <article className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_24px_80px_-40px_rgba(28,25,23,0.45)]">
      <img src={image} alt={accommodation.title} className="h-64 w-full object-cover" />
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">{label}</p>
            <h3 className="mt-2 text-2xl font-semibold">{accommodation.title}</h3>
            <p className="mt-2 text-stone-600">{accommodation.location}</p>
          </div>
          <div className="rounded-2xl bg-stone-100 px-4 py-3 text-right">
            <p className="text-lg font-semibold">{accommodation.pricePerNight}€</p>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">por noche</p>
          </div>
        </div>

        <p className="text-stone-600">{summary}</p>

        <div className="flex items-center justify-between">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-800">
            {accommodation.capacity} huespedes
          </span>
          <Link
            to={`/alojamientos/${accommodation.id}`}
            className="rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  );
}
