import { FAQ_ENABLED, FaqItem } from "@/lib/seo/faq";

export default function FaqSection({ items }: { items: FaqItem[] }) {
  if (!FAQ_ENABLED || items.length === 0) return null;
  return (
    <section
      className="faq mt-10 rounded-sm border border-border-default bg-bg-base p-6"
      aria-label="Frequently asked questions"
    >
      <h2 className="mb-4 text-xl font-black tracking-tight text-white">
        Frequently asked questions
      </h2>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <details
            key={i}
            className="faq-item rounded-sm border border-border-default/50 bg-white/5 p-3 open:bg-white/10"
          >
            <summary className="faq-question cursor-pointer text-sm font-bold text-white">
              {item.q}
            </summary>
            <div className="faq-answer mt-2 text-sm text-text-secondary">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
