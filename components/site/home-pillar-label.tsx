export function HomePillarLabel({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <div className="mb-6 flex flex-col items-center gap-1.5 md:mb-8 md:gap-2">
      <span
        aria-hidden
        className="font-mono text-3xl font-semibold leading-none tabular-nums text-primary md:text-4xl"
      >
        {index}
      </span>
      <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground md:text-sm">
        {title}
      </span>
    </div>
  );
}
