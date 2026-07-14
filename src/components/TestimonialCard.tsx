import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  detail: string;
  avatar: string;
}

export default function TestimonialCard({ quote, name, detail, avatar }: TestimonialCardProps) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-large border border-line bg-paper-raised p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover md:p-9">
      <div className="flex items-center gap-0.5 text-gold">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>

      <p className="relative z-10 mt-5 flex-1 font-sans text-[15px] leading-[1.7] text-ink-soft">
        {quote}
      </p>

      <div className="mt-7 flex items-center gap-4 border-t border-line pt-6">
        <img src={avatar} alt={name} className="h-11 w-11 rounded-full object-cover ring-2 ring-line" />
        <div>
          <p className="font-display text-[17px] font-500 text-ink">{name}</p>
          <p className="font-sans text-[13px] text-ink-mute">{detail}</p>
        </div>
      </div>
    </div>
  );
}
