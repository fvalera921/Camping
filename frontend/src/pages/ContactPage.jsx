export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2.5rem] border border-stone-200 bg-white p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Contacto</p>
          <h1 className="mt-4 text-5xl font-semibold">Estamos encantados de atenderte</h1>
          <p className="mt-6 text-lg leading-8 text-stone-600">
            Si necesitas informacion acerca de disponibilidad, tarifas, alojamiento o actividades,
            puedes escribirnos o llamarnos directamente.
          </p>

          <div className="mt-10 space-y-5">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Fijo</p>
              <p className="mt-2 text-2xl font-semibold">+34 968 654 666</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Movil</p>
              <p className="mt-2 text-2xl font-semibold">+34 697 705 023</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Emails</p>
              <p className="mt-2 text-lg font-medium">campinglarafa@gmail.com</p>
              <p className="mt-1 text-lg font-medium">info@larafa.es</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Horario</p>
              <p className="mt-2 text-stone-700">L - M 8a-6:30p · S - D 9a-2p</p>
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] bg-[#f7eddc] p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Informacion de contacto</p>
          <h2 className="mt-4 text-4xl font-semibold">Paraje La Rafa s/n, Bullas, Murcia</h2>
          <p className="mt-6 text-lg leading-8 text-stone-700">
            Si necesitas informacion sobre disponibilidad, tarifas, actividades o cualquier
            aspecto de tu estancia, ponte en contacto con nosotros.
          </p>
          <div className="mt-8 rounded-[2rem] bg-white p-8 text-stone-700">
            La recepcion estara encantada de ayudarte con reservas, estancias de grupo y
            cualquier consulta sobre el camping.
          </div>
        </section>
      </div>
    </div>
  );
}
