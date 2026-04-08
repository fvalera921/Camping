export default function PageHero({ eyebrow, title, description, image, imageAlt }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-[2.25rem] bg-stone-950 p-10 text-white">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">{eyebrow}</p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">{description}</p>
      </div>

      <img
        src={image}
        alt={imageAlt}
        className="h-full min-h-[360px] w-full rounded-[2.25rem] object-cover"
      />
    </section>
  );
}
