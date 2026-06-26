import { BentoCard } from "./bento-card";

export function StatusCard() {
  return (
    <BentoCard className="lg:col-span-1 lg:row-span-1">
      <div className="flex h-full flex-col justify-between gap-3 p-5">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <p className="text-sm font-medium text-zinc-200">Available for work</p>
        </div>
        <div className="space-y-1">
          <p className="font-mono text-2xl font-semibold tracking-tight text-zinc-50">
            PHT
          </p>
          <p className="font-mono text-xs text-zinc-500">UTC+8 · Philippines</p>
        </div>
      </div>
    </BentoCard>
  );
}
