import { AMCS, AMC_ROW_LTR, AMC_ROW_RTL, type AmcEntry } from "@/data/amcs";
import SectionOverline from "@/components/SectionOverline";

const assetBase = import.meta.env.BASE_URL;

function AmcLogo({ amc }: { amc: AmcEntry }) {
  return (
    <div className="amc-logo-slot" title={amc.name}>
      <img
        src={`${assetBase}assets/amc/${amc.slug}.png`}
        alt=""
        width={160}
        height={160}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="amc-logo-img"
      />
    </div>
  );
}

function MarqueeTrack({ items, label }: { items: AmcEntry[]; label: string }) {
  return (
    <div className="amc-marquee-track" aria-hidden="true">
      {items.map((amc) => (
        <AmcLogo key={`${label}-a-${amc.slug}`} amc={amc} />
      ))}
      {items.map((amc) => (
        <AmcLogo key={`${label}-b-${amc.slug}`} amc={amc} />
      ))}
    </div>
  );
}

export default function AmcMarqueeSection() {
  return (
    <section
      className="amc-marquee-section relative w-full overflow-hidden bg-paper"
      aria-label="Fund houses available on Nivya"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(42% 60% at 50% 0%, rgba(15,110,94,0.045) 0%, transparent 70%)",
        }}
      />

      <div className="content-container relative z-10 pb-2 pt-2 text-center sm:pb-3 sm:pt-3">
        <SectionOverline text="Fund houses" align="center" />
        <p className="mt-2 font-sans text-[13.5px] leading-snug text-ink-mute sm:text-[14px]">
          All major AMC's on one platform.
        </p>
      </div>

      {/*
        Fades align to content-container gutters (same rail as Why Nivya cards).
        Mask sits on this padded rail so logos dissolve at the red-line edges.
      */}
      <div className="content-container relative z-10 mt-[clamp(1rem,2.5vw,1.5rem)]">
        <div className="amc-marquee-stack">
          <div className="amc-marquee amc-marquee--ltr">
            <MarqueeTrack items={AMC_ROW_LTR} label="ltr" />
          </div>

          <div className="amc-marquee amc-marquee--rtl mt-3 sm:mt-4">
            <MarqueeTrack items={AMC_ROW_RTL} label="rtl" />
          </div>
        </div>
      </div>

      <ul className="sr-only">
        {AMCS.map((amc) => (
          <li key={amc.slug}>{amc.name}</li>
        ))}
      </ul>
    </section>
  );
}
