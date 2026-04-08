import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/parcelas", label: "Parcelas" },
  { to: "/apartamentos", label: "Apartamentos" },
  { to: "/actividades", label: "Actividades" },
  { to: "/localizacion", label: "Localizacion" },
  { to: "/reservas", label: "Reservas" },
  { to: "/contacto", label: "Contacto" }
];

const navLinkClass = ({ isActive }) =>
  [
    "rounded-full px-4 py-2 text-sm font-medium transition",
    isActive
      ? "bg-emerald-600 text-white"
      : "text-stone-700 hover:bg-white/70 hover:text-stone-950"
  ].join(" ");

export default function Layout() {
  const { isAuthenticated, logout, user } = useAuth();
  const visibleNavItems =
    user?.role === "ADMIN" ? [...navItems, { to: "/admin", label: "Admin" }] : navItems;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_28%),linear-gradient(180deg,_#f8faf7_0%,_#f3efe4_45%,_#ebe3d2_100%)] text-stone-900">
      <div className="border-b border-stone-200 bg-stone-950 text-stone-100">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-3 text-sm">
          <div className="flex flex-wrap items-center gap-4">
            <a href="tel:+34968654666">+34 968 654 666</a>
            <a href="mailto:campinglarafa@gmail.com">campinglarafa@gmail.com</a>
          </div>
          <p className="text-stone-300">Paraje La Rafa s/n, Bullas, Murcia</p>
        </div>
      </div>

      <header className="sticky top-0 z-10 border-b border-stone-200/70 bg-[#f8f4ea]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-600 text-lg font-semibold text-white">
              R
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-700">La Rafa</p>
              <p className="text-sm text-stone-600">Bullas, Murcia</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {visibleNavItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
            {!isAuthenticated ? (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>
                <NavLink to="/register" className={navLinkClass}>
                  Registro
                </NavLink>
              </>
            ) : (
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
            )}
            {isAuthenticated ? (
              <>
                <span className="ml-2 rounded-full bg-white px-4 py-2 text-sm text-stone-700">
                  {user?.name || user?.email}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
                >
                  Salir
                </button>
              </>
            ) : null}
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-stone-200/80 bg-[#f4efe4]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">La Rafa</p>
            <p className="mt-4 max-w-sm text-stone-600">
              Propuesta web para convertir el camping en una experiencia de reserva directa,
              clara y orientada a familias, grupos y campistas.
            </p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Contacto</p>
            <p className="mt-4 text-stone-700">Paraje La Rafa s/n, Bullas, Murcia</p>
            <p className="mt-2 text-stone-700">+34 968 654 666</p>
            <p className="mt-2 text-stone-700">campinglarafa@gmail.com</p>
            <p className="mt-2 text-stone-700">info@larafa.es</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Entorno</p>
            <p className="mt-4 text-stone-700">Rio Mula, Via Verde, Salto del Usero y D.O.P. Bullas.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
