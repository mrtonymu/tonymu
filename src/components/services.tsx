import { Building2, Code2 } from "lucide-react";
import { type Dictionary } from "@/app/[lang]/dictionaries";

export function Services({ dict }: { dict: Dictionary }) {
  const services = [
    {
      icon: Building2,
      title: dict.services.property.title,
      description: dict.services.property.description,
    },
    {
      icon: Code2,
      title: dict.services.digital.title,
      description: dict.services.digital.description,
    },
  ];

  return (
    <section id="services" className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {dict.services.title}
          </h2>
          <p className="text-muted">{dict.services.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-card rounded-2xl border border-border p-8 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center mb-6">
                <service.icon size={24} className="text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
