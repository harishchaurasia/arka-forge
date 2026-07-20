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
import { BackLink } from "@/components/site/back-link";
import { CalEmbed } from "@/components/site/cal-embed";

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

      toast({ title: "Sent.", description: "We'll be in touch within 1-2 business days." });
      reset();
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: error instanceof Error ? error.message : "Try again, or email contact@arkaforge.com directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <BackLink href="/" label="Back to Home" />
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Contact</h1>
          <p className="text-base text-muted-foreground max-w-md">
            A game that needs more hands, a pitch that needs a vertical slice, or
            a product that should be an experience - tell us what you&apos;re
            building.
          </p>
        </div>

        {/* Cal embed — full width */}
        <CalEmbed />

        {/* Send a message — secondary */}
        <div className="mt-16">
          <div className="mb-6">
            <h2 className="text-xl font-semibold tracking-tight">Send a message</h2>
          </div>
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
                  <Input id="subject" placeholder="What's this about?" {...register("subject")} aria-invalid={errors.subject ? "true" : "false"} />
                  {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject.message}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-xs font-medium text-muted-foreground mb-1.5 block">Message *</Label>
                <Textarea id="message" rows={6} placeholder="Describe what you're working on or trying to solve." {...register("message")} aria-invalid={errors.message ? "true" : "false"} />
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
