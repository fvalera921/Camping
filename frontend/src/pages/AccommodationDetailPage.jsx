import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DateRangePicker from "../components/DateRangePicker.jsx";
import { accommodations as fallbackAccommodations } from "../data/accommodations.js";
import { bookingApi, accommodationApi } from "../lib/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const fallbackImage =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80";

const calculateNights = (startDate, endDate) => {
  if (!startDate || !endDate) {
    return 0;
  }

  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  const millisecondsPerNight = 1000 * 60 * 60 * 24;

  return Math.ceil((end.getTime() - start.getTime()) / millisecondsPerNight);
};

export default function AccommodationDetailPage() {
  const { id } = useParams();
  const { isAuthenticated, token } = useAuth();
  const [accommodation, setAccommodation] = useState(null);
  const [form, setForm] = useState({ startDate: "", endDate: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const nights = calculateNights(form.startDate, form.endDate);
  const totalPrice = nights * Number(accommodation?.pricePerNight || 0);

  useEffect(() => {
    setIsLoading(true);
    setError("");

    accommodationApi
      .getById(id)
      .then((item) => {
        setAccommodation(item);
      })
      .catch(() => {
        const fallback = fallbackAccommodations.find((item) => String(item.id) === id);
        setAccommodation(fallback || null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handleBooking = async (event) => {
    event.preventDefault();

    if (!isAuthenticated) {
      setError("Debes iniciar sesion para crear una reserva");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      await bookingApi.create(token, {
        accommodationId: Number(id),
        startDate: form.startDate,
        endDate: form.endDate
      });

      setSuccessMessage("Reserva creada correctamente");
      setForm({ startDate: "", endDate: "" });
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-[2rem] border border-stone-200 bg-white p-10">
          <p className="text-lg text-stone-600">Cargando alojamiento...</p>
        </div>
      </div>
    );
  }

  if (!accommodation) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-[2rem] border border-stone-200 bg-white p-10">
          <h1 className="text-3xl font-semibold">Alojamiento no encontrado</h1>
          <Link
            to="/alojamientos"
            className="mt-6 inline-flex rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white"
          >
            Volver al listado
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <img
            src={accommodation.imageUrl || accommodation.image || fallbackImage}
            alt={accommodation.title}
            className="h-[420px] w-full rounded-[2.5rem] object-cover shadow-[0_30px_100px_-40px_rgba(0,0,0,0.55)]"
          />

          <div className="mt-8 rounded-[2rem] border border-stone-200 bg-white p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-700">Alojamiento</p>
            <h1 className="mt-3 text-4xl font-semibold">{accommodation.title}</h1>
            <p className="mt-4 text-lg text-stone-600">{accommodation.description}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {(accommodation.features || [
                `Capacidad para ${accommodation.capacity} personas`,
                `Ubicado en ${accommodation.location}`,
                "Reserva online inmediata",
                "Gestion de fechas sin solapamientos"
              ]).map((feature) => (
                <div
                  key={feature}
                  className="rounded-2xl bg-stone-100 px-4 py-4 text-sm font-medium text-stone-700"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] bg-stone-950 p-8 text-white">
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">Reserva</p>
            <p className="mt-4 text-4xl font-semibold">
              {Number(accommodation.pricePerNight).toFixed(2)} EUR
            </p>
            <p className="mt-1 text-stone-300">por noche</p>

            <form className="mt-8 grid gap-4" onSubmit={handleBooking}>
              <DateRangePicker
                startDate={form.startDate}
                endDate={form.endDate}
                minDate={today}
                onChange={(nextRange) => {
                  setForm(nextRange);
                }}
              />

              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-4 text-sm text-stone-300">
                  <span>Noches</span>
                  <span>{nights || 0}</span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-4 text-sm text-stone-300">
                  <span>Capacidad</span>
                  <span>{accommodation.capacity} personas</span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-4 text-base font-semibold text-white">
                  <span>Total estimado</span>
                  <span>{totalPrice.toFixed(2)} EUR</span>
                </div>
              </div>

              {error ? <p className="text-sm text-rose-300">{error}</p> : null}
              {successMessage ? <p className="text-sm text-emerald-300">{successMessage}</p> : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-emerald-800"
              >
                {isSubmitting ? "Reservando..." : "Reservar ahora"}
              </button>
            </form>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-[#f7eddc] p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Resumen</p>
            <div className="mt-5 space-y-3 text-stone-700">
              <p>Ubicacion: {accommodation.location}</p>
              <p>Capacidad: {accommodation.capacity} personas</p>
              <p>Ideal para: escapadas rurales, familias y turismo de naturaleza en Bullas</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
