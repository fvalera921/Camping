import PageHero from "../components/PageHero.jsx";
import { activityItems } from "../data/siteContent.js";

const routeItems = [
  {
    title: "Salto del Usero",
    category: "Paraje natural",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    description:
      "Uno de los lugares mas conocidos de Bullas. La erosion del agua ha creado una forma de boveda natural y una poza muy visitada en los meses de calor.",
    link: "https://larafabullas.es/actividades/bullas/"
  },
  {
    title: "Via Verde del Noroeste",
    category: "Senderismo y bicicleta",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    description:
      "Una antigua via ferroviaria adaptada para pasear, correr o pedalear entre paisajes del noroeste murciano y varias comarcas conectadas.",
    link: "https://larafabullas.es/actividades/bullas/"
  },
  {
    title: "Valle del Aceniche",
    category: "Ruta del vino",
    image:
      "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=1200&q=80",
    description:
      "Un paisaje de vinedos y montana donde se encuentran algunas de las bodegas mas representativas de la D.O.P. Bullas.",
    link: "https://larafabullas.es/actividades/bullas/"
  },
  {
    title: "Itinerario turistico El Romero",
    category: "Ruta local",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    description:
      "Recorrido que parte desde La Rafa y conecta parajes como la Venta del Pino, el Jabonero y la Asomadilla hasta enlazar con la Via Verde.",
    link: "https://larafabullas.es/actividades/bullas/"
  },
  {
    title: "Barranco de la Regidora",
    category: "Bosque mediterraneo",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80",
    description:
      "Un recorrido de gran valor paisajistico con puentes de madera, vegetacion de ribera y un entorno muy agradable para caminar en familia.",
    link: "https://larafabullas.es/actividades/bullas/"
  },
  {
    title: "Bullas 1900",
    category: "Patrimonio",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80",
    description:
      "Ruta urbana para descubrir casas senoriales, edificios modernistas, la Torre del Reloj y otros rincones historicos del municipio.",
    link: "https://larafabullas.es/actividades/bullas/"
  }
];

const wineItems = [
  {
    title: "D.O.P. Bullas",
    description:
      "Bullas cuenta con una de las denominaciones de origen de la Region de Murcia. Una propuesta ideal para combinar naturaleza, gastronomia y visitas a bodega."
  },
  {
    title: "Paisaje de vinedos",
    description:
      "El entorno de Bullas ofrece un paisaje de vinedos rodeados de montanas que aporta una identidad muy clara a la escapada."
  },
  {
    title: "Enoturismo",
    description:
      "Catas, visitas guiadas y rutas del vino completan una experiencia muy ligada al territorio y a los productores locales."
  }
];

export default function ActivitiesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
      <PageHero
        eyebrow="Actividades"
        title="Para toda la familia"
        description="Animacion familiar durante la temporada estival con propuestas deportivas, creativas y de ocio para pequenos y mayores."
        image="https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?auto=format&fit=crop&w=1200&q=80"
        imageAlt="Actividades familiares en camping"
      />

      <div className="mt-8 rounded-[2rem] bg-[#f7eddc] p-8 text-stone-700">
        Programacion orientativa: fines de semana al inicio de julio y animacion semanal del
        15 de julio al 1 de septiembre, con turnos de manana y tarde.
      </div>

      <section className="mt-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {activityItems.map((item) => (
            <div key={item} className="rounded-[1.75rem] border border-stone-200 bg-white px-5 py-5 text-center">
              <p className="font-medium text-stone-800">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2.25rem] bg-stone-950 p-10 text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Entorno</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight">
              Disfruta de la naturaleza
            </h2>
            <h3 className="mt-4 text-2xl font-semibold text-emerald-200">
              Un lugar rodeado de naturaleza para disfrutar de sus paisajes
            </h3>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-stone-300">
              En los alrededores de nuestro camping encontraras numerosas rutas de senderismo y
              actividades en la naturaleza, perfectas para descubrir los paisajes del Noroeste de
              Murcia. Muy cerca podras visitar lugares como el Salto del Usero o recorrer la Via
              Verde del Noroeste mientras disfrutas del paisaje.
            </p>
          </div>

          <div className="rounded-[2.25rem] overflow-hidden border border-stone-200 bg-white">
            <img
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80"
              alt="Entorno natural de Bullas"
              className="h-full min-h-[320px] w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-10 space-y-8">
          {routeItems.map((route, index) => (
            <article
              key={route.title}
              className="grid gap-6 rounded-[2rem] border border-stone-200 bg-[#f7eddc] p-6 lg:grid-cols-[0.95fr_1.05fr]"
            >
              <img
                src={route.image}
                alt={route.title}
                className={`h-full min-h-[260px] w-full rounded-[1.75rem] object-cover ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              />
              <div
                className={`flex flex-col justify-center rounded-[1.5rem] bg-white p-6 ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">{route.category}</p>
                <h3 className="mt-3 text-3xl font-semibold text-stone-950">{route.title}</h3>
                <p className="mt-4 text-lg leading-8 text-stone-600">{route.description}</p>
                <div className="mt-6">
                  <a
                    href={route.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white"
                  >
                    Ver ruta
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2.25rem] overflow-hidden border border-stone-200 bg-white">
            <img
              src="https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=1400&q=80"
              alt="Ruta del vino de Bullas"
              className="h-full min-h-[320px] w-full object-cover"
            />
          </div>
          <div className="rounded-[2.25rem] bg-stone-950 p-10 text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Rutas del vino</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight">
              Estamos en zona D.O.P. Bullas
            </h2>
            <p className="mt-6 text-lg leading-8 text-stone-300">
              Si eres amante del vino, podras disfrutar de visitas a las bodegas de la zona y
              realizar catas de sus vinos mientras descubres el paisaje de vinedos del Noroeste
              de Murcia.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {wineItems.map((item) => (
            <article key={item.title} className="rounded-[2rem] border border-stone-200 bg-white p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Bullas</p>
              <h3 className="mt-3 text-2xl font-semibold text-stone-950">{item.title}</h3>
              <p className="mt-4 text-stone-600">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <a
            href="https://larafabullas.es/actividades/bullas/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white"
          >
            Ver ruta del vino
          </a>
        </div>
      </section>
    </div>
  );
}
