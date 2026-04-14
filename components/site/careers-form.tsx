"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export function CareersForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    role: "",
    background: "",
    links: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: `Careers - ${form.role}`,
          message: `Background: ${form.background}\n\nLinks: ${form.links}\n\nMessage: ${form.message}`,
          honeypot: "",
          company: "",
        }),
      });
      if (!response.ok) throw new Error();
      toast({
        title: "Submitted.",
        description: "We'll review your work and be in touch if there's a fit.",
      });
      setForm({
        name: "",
        email: "",
        role: "",
        background: "",
        links: "",
        message: "",
      });
    } catch {
      toast({
        title: "Something went wrong.",
        description: "Try again or email careers@arkaforge.com directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label
            htmlFor="name"
            className="text-xs font-medium text-muted-foreground mb-1.5 block"
          >
            Name *
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label
            htmlFor="email"
            className="text-xs font-medium text-muted-foreground mb-1.5 block"
          >
            Email *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <Label
          htmlFor="role"
          className="text-xs font-medium text-muted-foreground mb-1.5 block"
        >
          Area of Interest *
        </Label>
        <select
          id="role"
          name="role"
          value={form.role}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Select an area</option>
          <option>Game Development - Unreal Engine/Unity</option>
          <option>Artificial intellgence / Machine Learning</option>
          <option>Software Engineering</option>
          <option>3D Art, Graphics or Animation</option>
          <option>Narrative & Instructional Design</option>
          <option>UI/UX & Graphic Design</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <Label
          htmlFor="background"
          className="text-xs font-medium text-muted-foreground mb-1.5 block"
        >
          Background *
        </Label>
        <Textarea
          id="background"
          name="background"
          rows={4}
          placeholder="Tell us about your experience and what you specialize in."
          value={form.background}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label
          htmlFor="links"
          className="text-xs font-medium text-muted-foreground mb-1.5 block"
        >
          Portfolio / Work Links *
        </Label>
        <Textarea
          id="links"
          name="links"
          rows={3}
          placeholder="Portfolio, GitHub, reel, LinkedIn, personal site - anything that shows your work."
          value={form.links}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label
          htmlFor="message"
          className="text-xs font-medium text-muted-foreground mb-1.5 block"
        >
          Anything Else
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={3}
          placeholder="What kind of work are you looking for? Anything else we should know?"
          value={form.message}
          onChange={handleChange}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full glow"
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        We review every submission. If there&apos;s a fit, we&apos;ll reach out
        directly. Or email us at{" "}
        <a
          href="mailto:careers@arkaforge.com"
          className="text-primary hover:underline"
        >
          careers@arkaforge.com
        </a>
      </p>
    </form>
  );
}
