"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Clock } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to send message");

      toast({ title: "Message sent!", description: "We'll get back to you soon." });
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 block">
            Get in Touch
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Contact</h1>
          <p className="text-base text-muted-foreground max-w-md">
            Have a project in mind? Let&apos;s discuss how we can help.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr,1.4fr] items-start">
          {/* Left — info cards */}
          <div className="space-y-4">
            <div className="glass-card p-6 flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg glass-icon flex items-center justify-center">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">Email</h3>
                <a href="mailto:contact@keplerforge.com" className="text-sm text-primary hover:underline">
                  contact@keplerforge.com
                </a>
              </div>
            </div>
            <div className="glass-card p-6 flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg glass-icon flex items-center justify-center">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">Response Time</h3>
                <p className="text-sm text-muted-foreground">Typically within 1-2 business days</p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="glass-card p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name" className="text-xs font-medium text-muted-foreground mb-1.5 block">Name *</Label>
                  <Input id="name" placeholder="Your name" {...register("name")} aria-invalid={errors.name ? "true" : "false"} />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="text-xs font-medium text-muted-foreground mb-1.5 block">Email *</Label>
                  <Input id="email" type="email" placeholder="you@company.com" {...register("email")} aria-invalid={errors.email ? "true" : "false"} />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="company" className="text-xs font-medium text-muted-foreground mb-1.5 block">Company</Label>
                  <Input id="company" placeholder="Company name" {...register("company")} />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-xs font-medium text-muted-foreground mb-1.5 block">Subject *</Label>
                  <Input id="subject" placeholder="Project inquiry" {...register("subject")} aria-invalid={errors.subject ? "true" : "false"} />
                  {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject.message}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-xs font-medium text-muted-foreground mb-1.5 block">Message *</Label>
                <Textarea id="message" rows={6} placeholder="Tell us about your project..." {...register("message")} aria-invalid={errors.message ? "true" : "false"} />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
              </div>

              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full glow">
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
