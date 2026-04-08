import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { accommodations as fallbackAccommodations } from "../data/accommodations.js";
import { accommodationApi, userApi } from "../lib/api.js";

const formatDateRange = (startDate, endDate) => {
  const formatter = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  return `${formatter.format(new Date(startDate))} - ${formatter.format(new Date(endDate))}`;
};

const statusStyles = {
  CONFIRMED: "bg-emerald-100 text-emerald-800",
  CANCELLED: "bg-rose-100 text-rose-700"
};

export default function ReservasPage() {
  const { isAuthenticated, token } = useAuth();
  const [accommodations, setAccommodations] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingError, setBookingError] = useState("");

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

  useEffect(() => {
    if (!isAuthenticated) {
      setBookings([]);
      setBookingError("");
      return;
    }

    userApi
      .getBookings(token)
      .then((items) => {
        setBookings(items);
      })
      .catch((apiError) => {
        setBookingError(apiError.message);
      });
  }, [isAuthenticated, token]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
      <PageHero
        eyebrow="Reservas"
        title="Gestor de reservas de La Rafa"
        description="Consulta disponibilidad por tipo de alojamiento, entra en la ficha que te interese y completa la reserva online. Si ya has iniciado sesion, desde aqui tambien puedes revisar tus estancias."
        image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
        imageAlt="Zona de reserva y camping"
      />

      <section className="mt-10 grid gap-6 rounded-[2.25rem] border border-stone-200 bg-white/85 p-6 lg:grid-cols-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Reservas online</p>
          <p className="mt-2 text-lg font-medium">Motor activo desde las fichas de alojamiento</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Estados</p>
          <p className="mt-2 text-lg font-medium">Confirmadas y canceladas sin solapes</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Seguimiento</p>
          <p className="mt-2 text-lg font-medium">Panel de usuario y gestion admin</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Apoyo directo</p>
          <p className="mt-2 text-lg font-medium">+34 968 654 666</p>
        </div>
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[2.25rem] bg-stone-950 p-8 text-white">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Disponibilidad</p>
              <h2 className="mt-3 text-3xl font-semibold">Alojamientos reservables</h2>
            </div>
            <Link
              to="/alojamientos"
              className="rounded-full bg-white px-5 py-3 text-sm font-medium text-stone-900"
            >
              Ver catalogo
            </Link>
          </div>

          {isLoading ? <p className="mt-8 text-stone-300">Cargando alojamientos...</p> : null}

          <div className="mt-8 grid gap-4">
            {accommodations.map((accommodation) => (
              <article
                key={accommodation.id}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{accommodation.title}</h3>
                    <p className="mt-2 text-stone-300">{accommodation.location}</p>
                    <p className="mt-3 text-sm text-emerald-200">
                      {Number(accommodation.pricePerNight).toFixed(2)} EUR por noche ·{" "}
                      {accommodation.capacity} plazas
                    </p>
                  </div>
                  <Link
                    to={`/alojamientos/${accommodation.id}`}
                    className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white"
                  >
                    Reservar
                  </Link>
                </div>
              </article>
            ))}
            {!isLoading && accommodations.length === 0 ? (
              <div className="rounded-[1.75rem] border border-dashed border-white/20 bg-white/5 p-6 text-stone-300">
                No hay alojamientos cargados todavia.
              </div>
            ) : null}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-[2.25rem] border border-stone-200 bg-white p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Tu area</p>
            <h2 className="mt-3 text-3xl font-semibold">Seguimiento de reservas</h2>
            <p className="mt-4 text-stone-600">
              {isAuthenticated
                ? "Estas viendo tus ultimas reservas registradas en la plataforma."
                : "Inicia sesion para consultar tus reservas y reservar mas rapido."}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-medium text-white"
                  >
                    Iniciar sesion
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-full border border-stone-300 px-5 py-3 text-sm font-medium text-stone-700"
                  >
                    Crear cuenta
                  </Link>
                </>
              ) : (
                <Link
                  to="/dashboard"
                  className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-medium text-white"
                >
                  Abrir dashboard
                </Link>
              )}
            </div>

            {bookingError ? <p className="mt-6 text-sm text-rose-700">{bookingError}</p> : null}

            {isAuthenticated ? (
              <div className="mt-8 space-y-4">
                {bookings.slice(0, 3).map((booking) => (
                  <article
                    key={booking.id}
                    className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                          RSV-{booking.id}
                        </p>
                        <p className="mt-2 text-lg font-semibold">
                          {booking.accommodation?.title}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          statusStyles[booking.status] || "bg-stone-200 text-stone-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-stone-600">
                      {formatDateRange(booking.startDate, booking.endDate)}
                    </p>
                    <p className="mt-2 text-sm font-medium text-stone-700">
                      Total: {Number(booking.totalPrice).toFixed(2)} EUR
                    </p>
                  </article>
                ))}
                {bookings.length === 0 ? (
                  <div className="rounded-[1.5rem] border border-dashed border-stone-300 bg-stone-50 p-5 text-stone-600">
                    Todavia no tienes reservas registradas.
                  </div>
                ) : null}
              </div>
            ) : null}
          </section>

          <section className="rounded-[2.25rem] border border-stone-200 bg-[#f7eddc] p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Contacto rapido</p>
            <div className="mt-5 grid gap-4">
              <a href="tel:+34968654666" className="rounded-[1.5rem] bg-white px-5 py-4">
                <p className="text-sm text-stone-500">Telefono</p>
                <p className="mt-1 text-lg font-semibold text-stone-900">+34 968 654 666</p>
              </a>
              <a
                href="mailto:campinglarafa@gmail.com"
                className="rounded-[1.5rem] bg-white px-5 py-4"
              >
                <p className="text-sm text-stone-500">Email</p>
                <p className="mt-1 text-lg font-semibold text-stone-900">
                  campinglarafa@gmail.com
                </p>
              </a>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
