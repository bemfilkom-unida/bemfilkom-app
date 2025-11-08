import { useState } from "react";
import { cn } from "@/lib/utils";
import Reveal from "@/components/effects/Reveal";
import Hero from "@/components/contact/Hero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import LocationMap from "@/components/contact/LocationMap";

function Section({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      {children}
    </section>
  );
}

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus("Please fill in name, email, and message.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    try {
      setSubmitting(true);
      setStatus(null);

      // Submit directly to Formspree
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('subject', subject);
      formData.append('message', message);

      const resp = await fetch('https://formspree.io/f/xovyajng', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send message. Please try again.');
      }

      form.reset();
      setStatus("✅ Your message has been sent successfully! We'll get back to you soon.");
    } catch (err) {
      setStatus(
        err instanceof Error ? err.message : "Failed to send. Please try again later.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute -top-32 left-1/2 size-[550px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.25),transparent_60%)] blur-3xl" />
        </div>
        <div className="container text-center max-w-3xl">
          <Hero />
        </div>
      </Section>
      <Section>
        <div className="container grid gap-8 lg:grid-cols-2">
          <ContactForm onSubmit={onSubmit} submitting={submitting} status={status} />
          <div className="space-y-6">
            <ContactInfo />
            <LocationMap />
          </div>
        </div>
      </Section>
    </div>
  );
}