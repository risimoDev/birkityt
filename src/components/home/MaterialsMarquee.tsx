export function MaterialsMarquee({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  // duplicate for seamless loop
  const loop = [...items, ...items];

  return (
    <section className="border-y border-textColorDark/10 bg-textColorDark py-5 text-mainColor">
      <div className="relative flex overflow-hidden">
        <div className="marquee-track flex shrink-0 items-center gap-10 whitespace-nowrap pr-10">
          {loop.map((label, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="text-lg font-medium tracking-tight">{label}</span>
              <span className="text-onbutton">✳</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
