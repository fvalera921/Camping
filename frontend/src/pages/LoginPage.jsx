import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = location.state?.from || "/dashboard";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await login(form);
      navigate(redirectTo, { replace: true });
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl items-center gap-10 px-6 py-12 lg:grid-cols-2">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Acceso</p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight">
          Entra para gestionar tus reservas y tu perfil.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-stone-600">
          Esta pantalla ya esta preparada para conectar el formulario con `POST /api/auth/login`.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-[2.5rem] border border-stone-200 bg-white p-8 shadow-[0_24px_80px_-40px_rgba(28,25,23,0.45)]"
      >
        <div className="space-y-5">
          <label className="block text-sm font-medium text-stone-700">
            Email
            <input
              type="email"
              placeholder="tu@email.com"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none transition focus:border-emerald-500"
            />
          </label>

          <label className="block text-sm font-medium text-stone-700">
            Password
            <input
              type="password"
              placeholder="********"
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({ ...current, password: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none transition focus:border-emerald-500"
            />
          </label>
        </div>

        {error ? <p className="mt-5 text-sm text-rose-700">{error}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-8 w-full rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-stone-400"
        >
          {isSubmitting ? "Entrando..." : "Iniciar sesion"}
        </button>

        <p className="mt-5 text-sm text-stone-500">
          No tienes cuenta?{" "}
          <Link to="/register" className="font-medium text-emerald-700">
            Registrate
          </Link>
        </p>
      </form>
    </div>
  );
}
