export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-textColorDark/10">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 -top-6 select-none font-mono text-[24vw] font-extrabold leading-none text-textColorDark/[0.03] sm:text-[10rem]"
      >
        ✳
      </span>
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <span className="font-mono text-xs uppercase tracking-widest text-onbutton">
          / {eyebrow}
        </span>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-textColorDark sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-textColor">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
