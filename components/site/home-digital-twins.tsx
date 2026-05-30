import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MediaFrame } from "@/components/site/media-frame";
import { Reveal } from "@/components/site/reveal";

export function DigitalTwins() {
  return (
    <section className="relative py-24 md:py-32">
      <Reveal className="mx-auto max-w-3xl px-5 text-center">
        <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
          02 / Digital twins
        </span>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Digital twins for{" "}
          <span className="text-primary">high-stakes training.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          We turn real-world procedures into interactive training simulations -
          built in a game engine, with every task, error, and readiness signal
          measured. It&apos;s the depth behind our nuclear glovebox trainer.
        </p>
        <div className="mx-auto mt-8 max-w-2xl">
          <MediaFrame
            src="/work/glovebox-1.png"
            alt="In-engine view of the nuclear glovebox training simulator built in Unreal Engine 5"
            label="Glovebox digital twin · selected views"
            note="UE5 · real-time"
            aspect="16/9"
          />
        </div>
        <Link
          href="/services/digital-twins"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
        >
          See digital twins <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </section>
  );
}
