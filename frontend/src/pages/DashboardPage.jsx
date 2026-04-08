import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { userApi } from "../lib/api.js";

const formatDateRange = (startDate, endDate) => {
  const formatter = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short"
  });

  return `${formatter.format(new Date(startDate))} - ${formatter.format(new Date(endDate))}`;
};

export default function DashboardPage() {
  const { token, user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    userApi
      .getBookings(token)
      .then((items) => {
        setBookings(items);
      })
      .catch((apiError) => {
        setError(apiError.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  const totalSpent = bookings.reduce((sum, booking) => sum + Number(booking.totalPrice || 0), 0);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="rounded-[2.5rem] bg-stone-950 p-8 text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Dashboard</p>
          <h1 className="mt-4 text-4xl font-semibold">Hola, {user?.name || "viajero"}</h1>
          <p className="mt-4 text-stone-300">
            Desde aqui se puede gestionar la experiencia de reserva para La Rafa sin depender
            de llamadas manuales ni formularios externos.
          </p>

          <div className="mt-10 grid gap-4">
            <div className="rounded-2xl bg-white/5 p-5">
              <p className="text-sm text-stone-300">Reservas activas</p>
              <p className="mt-2 text-3xl font-semibold">{bookings.length}</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-5">
              <p className="text-sm text-stone-300">Total invertido</p>
              <p className="mt-2 text-3xl font-semibold">{totalSpent.toFixed(2)} €</p>
            </div>
          </div>
        </aside>

        <section className="rounded-[2.5rem] border border-stone-200 bg-white p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-stone-500">Tus reservas</p>
              <h2 className="mt-2 text-3xl font-semibold">Proximas estancias</h2>
            </div>
            <Link
              to="/alojamientos"
              className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-medium text-white"
            >
              Buscar nuevo alojamiento
            </Link>
          </div>

          {isLoading ? <p className="mt-8 text-stone-600">Cargando reservas...</p> : null}
          {error ? <p className="mt-8 text-rose-700">{error}</p> : null}

          <div className="mt-8 space-y-4">
            {bookings.map((booking) => (
              <article
                key={booking.id}
                className="grid gap-4 rounded-[1.75rem] border border-stone-200 bg-stone-50 p-6 md:grid-cols-4 md:items-center"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Reserva</p>
                  <p className="mt-2 font-semibold">RSV-{booking.id}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Alojamiento</p>
                  <p className="mt-2 font-semibold">{booking.accommodation?.title}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Fechas</p>
                  <p className="mt-2 font-semibold">
                    {formatDateRange(booking.startDate, booking.endDate)}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-800">
                    {booking.status}
                  </span>
                  <p className="font-semibold">{Number(booking.totalPrice).toFixed(2)} €</p>
                </div>
              </article>
            ))}
            {!isLoading && !error && bookings.length === 0 ? (
              <div className="rounded-[1.75rem] border border-dashed border-stone-300 bg-stone-50 p-6 text-stone-600">
                Todavia no tienes reservas.
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
