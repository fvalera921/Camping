import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { accommodationApi, adminApi, apiRequest } from "../lib/api.js";

const initialForm = {
  title: "",
  description: "",
  location: "",
  pricePerNight: "",
  capacity: "",
  imageUrl: ""
};

const statusStyles = {
  CONFIRMED: "bg-emerald-100 text-emerald-800",
  CANCELLED: "bg-rose-100 text-rose-700"
};

const formatDateRange = (startDate, endDate) => {
  const formatter = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  return `${formatter.format(new Date(startDate))} - ${formatter.format(new Date(endDate))}`;
};

export default function AdminPage() {
  const { token } = useAuth();
  const [accommodations, setAccommodations] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusUpdatingId, setStatusUpdatingId] = useState(null);
  const [error, setError] = useState("");

  const loadAccommodations = async () => {
    const items = await accommodationApi.getAll();
    setAccommodations(items);
  };

  const loadBookings = async () => {
    const items = await adminApi.getBookings(token);
    setBookings(items);
  };

  useEffect(() => {
    Promise.all([loadAccommodations(), loadBookings()])
      .catch((apiError) => {
        setError(apiError.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleEdit = (accommodation) => {
    setEditingId(accommodation.id);
    setForm({
      title: accommodation.title || "",
      description: accommodation.description || "",
      location: accommodation.location || "",
      pricePerNight: String(accommodation.pricePerNight || ""),
      capacity: String(accommodation.capacity || ""),
      imageUrl: accommodation.imageUrl || ""
    });
    setError("");
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      await apiRequest(`/admin/accommodations/${id}`, {
        method: "DELETE",
        token
      });
      await loadAccommodations();
    } catch (apiError) {
      setError(apiError.message);
    }
  };

  const handleStatusChange = async (bookingId, status) => {
    try {
      setStatusUpdatingId(bookingId);
      setError("");
      await adminApi.updateBookingStatus(token, bookingId, status);
      await loadBookings();
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const path = editingId ? `/admin/accommodations/${editingId}` : "/admin/accommodations";
      const method = editingId ? "PUT" : "POST";

      await apiRequest(path, {
        method,
        token,
        body: {
          ...form,
          pricePerNight: Number(form.pricePerNight),
          capacity: Number(form.capacity)
        }
      });

      setForm(initialForm);
      setEditingId(null);
      await loadAccommodations();
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
      <div className="rounded-[2.5rem] bg-stone-950 p-8 text-white">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Admin</p>
        <h1 className="mt-4 text-4xl font-semibold">Gestor de alojamientos y reservas</h1>
        <p className="mt-4 max-w-3xl text-stone-300">
          Desde aqui puedes dar de alta alojamientos, editar tarifas y revisar todas las
          reservas con cambio de estado inmediato.
        </p>
      </div>

      {error ? (
        <div className="mt-6 rounded-[1.75rem] border border-rose-200 bg-rose-50 px-6 py-4 text-rose-700">
          {error}
        </div>
      ) : null}

      <div className="mt-8 grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-[2.5rem] border border-stone-200 bg-white p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Alojamientos</p>
          <h2 className="mt-4 text-3xl font-semibold">
            {editingId ? "Editar alojamiento" : "Nuevo alojamiento"}
          </h2>
          <p className="mt-4 text-stone-600">
            Gestiona parcelas, apartamentos, albergue y cualquier otro formato.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Titulo"
              className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descripcion"
              rows="5"
              className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none"
            />
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Ubicacion"
              className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none"
            />
            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="pricePerNight"
                value={form.pricePerNight}
                onChange={handleChange}
                placeholder="Precio por noche"
                type="number"
                className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none"
              />
              <input
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                placeholder="Capacidad"
                type="number"
                className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none"
              />
            </div>
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="URL imagen"
              className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none"
            />

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-medium text-white disabled:bg-emerald-300"
              >
                {isSubmitting ? "Guardando..." : editingId ? "Actualizar" : "Crear"}
              </button>
              {editingId ? (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm(initialForm);
                    setError("");
                  }}
                  className="rounded-full border border-stone-300 px-5 py-3 text-sm font-medium text-stone-700"
                >
                  Cancelar
                </button>
              ) : null}
            </div>
          </form>
        </section>

        <section className="rounded-[2.5rem] border border-stone-200 bg-white p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-stone-500">Inventario</p>
          <h2 className="mt-2 text-3xl font-semibold">Listado actual</h2>

          {isLoading ? <p className="mt-8 text-stone-600">Cargando alojamientos...</p> : null}

          <div className="mt-8 space-y-4">
            {accommodations.map((accommodation) => (
              <article
                key={accommodation.id}
                className="rounded-[1.75rem] border border-stone-200 bg-stone-50 p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{accommodation.title}</h3>
                    <p className="mt-2 text-stone-600">{accommodation.location}</p>
                    <p className="mt-2 text-sm text-stone-500">
                      {Number(accommodation.pricePerNight).toFixed(2)} EUR / noche ·{" "}
                      {accommodation.capacity} plazas
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleEdit(accommodation)}
                      className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(accommodation.id)}
                      className="rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-8 rounded-[2.5rem] border border-stone-200 bg-white p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-stone-500">Reservas</p>
            <h2 className="mt-2 text-3xl font-semibold">Gestor de reservas</h2>
          </div>
          <div className="rounded-full bg-stone-100 px-4 py-2 text-sm text-stone-600">
            {bookings.length} registros
          </div>
        </div>

        {isLoading ? <p className="mt-8 text-stone-600">Cargando reservas...</p> : null}

        <div className="mt-8 space-y-4">
          {bookings.map((booking) => (
            <article
              key={booking.id}
              className="rounded-[1.75rem] border border-stone-200 bg-stone-50 p-6"
            >
              <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr_auto] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-sm font-semibold text-stone-900">RSV-{booking.id}</p>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        statusStyles[booking.status] || "bg-stone-200 text-stone-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <p className="mt-3 text-lg font-semibold">{booking.accommodation?.title}</p>
                  <p className="mt-1 text-stone-600">{booking.accommodation?.location}</p>
                </div>

                <div className="grid gap-2 text-sm text-stone-600">
                  <p>
                    <span className="font-medium text-stone-900">Cliente:</span>{" "}
                    {booking.user?.name || "Sin nombre"}
                  </p>
                  <p>
                    <span className="font-medium text-stone-900">Email:</span>{" "}
                    {booking.user?.email}
                  </p>
                  <p>
                    <span className="font-medium text-stone-900">Fechas:</span>{" "}
                    {formatDateRange(booking.startDate, booking.endDate)}
                  </p>
                  <p>
                    <span className="font-medium text-stone-900">Total:</span>{" "}
                    {Number(booking.totalPrice).toFixed(2)} EUR
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    disabled={statusUpdatingId === booking.id || booking.status === "CONFIRMED"}
                    onClick={() => handleStatusChange(booking.id, "CONFIRMED")}
                    className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white disabled:bg-emerald-200"
                  >
                    Confirmar
                  </button>
                  <button
                    type="button"
                    disabled={statusUpdatingId === booking.id || booking.status === "CANCELLED"}
                    onClick={() => handleStatusChange(booking.id, "CANCELLED")}
                    className="rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white disabled:bg-rose-200"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </article>
          ))}
          {!isLoading && bookings.length === 0 ? (
            <div className="rounded-[1.75rem] border border-dashed border-stone-300 bg-stone-50 p-6 text-stone-600">
              No hay reservas registradas todavia.
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
