export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-semibold leading-tight text-stone-950">{title}</h2>
      {description ? <p className="mt-4 text-lg text-stone-600">{description}</p> : null}
    </div>
  );
}
