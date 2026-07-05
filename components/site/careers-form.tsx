"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB
const RESUME_ACCEPT = ".pdf,.doc,.docx";

// [iso, name, dial] — iso is a stable unique key (dial codes can repeat, e.g. +1)
const COUNTRY_CODES: [string, string, string][] = [
  ["IN", "India", "+91"],
  ["US", "United States", "+1"],
  ["CA", "Canada", "+1"],
  ["GB", "United Kingdom", "+44"],
  ["AU", "Australia", "+61"],
  ["NZ", "New Zealand", "+64"],
  ["IE", "Ireland", "+353"],
  ["DE", "Germany", "+49"],
  ["FR", "France", "+33"],
  ["ES", "Spain", "+34"],
  ["PT", "Portugal", "+351"],
  ["IT", "Italy", "+39"],
  ["NL", "Netherlands", "+31"],
  ["BE", "Belgium", "+32"],
  ["CH", "Switzerland", "+41"],
  ["AT", "Austria", "+43"],
  ["SE", "Sweden", "+46"],
  ["NO", "Norway", "+47"],
  ["DK", "Denmark", "+45"],
  ["FI", "Finland", "+358"],
  ["PL", "Poland", "+48"],
  ["CZ", "Czechia", "+420"],
  ["RO", "Romania", "+40"],
  ["GR", "Greece", "+30"],
  ["UA", "Ukraine", "+380"],
  ["RU", "Russia", "+7"],
  ["TR", "Turkey", "+90"],
  ["AE", "United Arab Emirates", "+971"],
  ["SA", "Saudi Arabia", "+966"],
  ["QA", "Qatar", "+974"],
  ["IL", "Israel", "+972"],
  ["EG", "Egypt", "+20"],
  ["ZA", "South Africa", "+27"],
  ["NG", "Nigeria", "+234"],
  ["KE", "Kenya", "+254"],
  ["PK", "Pakistan", "+92"],
  ["BD", "Bangladesh", "+880"],
  ["LK", "Sri Lanka", "+94"],
  ["NP", "Nepal", "+977"],
  ["CN", "China", "+86"],
  ["HK", "Hong Kong", "+852"],
  ["TW", "Taiwan", "+886"],
  ["JP", "Japan", "+81"],
  ["KR", "South Korea", "+82"],
  ["SG", "Singapore", "+65"],
  ["MY", "Malaysia", "+60"],
  ["ID", "Indonesia", "+62"],
  ["TH", "Thailand", "+66"],
  ["VN", "Vietnam", "+84"],
  ["PH", "Philippines", "+63"],
  ["BR", "Brazil", "+55"],
  ["MX", "Mexico", "+52"],
  ["AR", "Argentina", "+54"],
  ["CL", "Chile", "+56"],
  ["CO", "Colombia", "+57"],
];

export function CareersForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();
  const resumeInputRef = React.useRef<HTMLInputElement>(null);
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    location: "",
    role: "",
    background: "",
    links: "",
    source: "",
    sourceOther: "",
    message: "",
  });
  const [resume, setResume] = React.useState<{
    name: string;
    content: string;
  } | null>(null);
  const [resumeError, setResumeError] = React.useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeError("");
    const file = e.target.files?.[0];
    if (!file) {
      setResume(null);
      return;
    }
    if (file.size > MAX_RESUME_BYTES) {
      setResumeError("File must be under 5MB.");
      setResume(null);
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1] ?? "";
      setResume({ name: file.name, content: base64 });
    };
    reader.onerror = () => {
      setResumeError("Could not read that file. Try another.");
      setResume(null);
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const clearResume = () => {
    setResume(null);
    setResumeError("");
    if (resumeInputRef.current) resumeInputRef.current.value = "";
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
          message: `Area of interest: ${form.role}\n\nPhone: ${form.countryCode} ${form.phone}\n\nLocation: ${form.location}\n\nBackground: ${form.background}\n\nLinks: ${form.links}\n\nHeard about us: ${form.source === "Other" ? form.sourceOther : form.source}\n\nAnything else: ${form.message}`,
          honeypot: "",
          company: "",
          resumeName: resume?.name,
          resumeContent: resume?.content,
          formType: "careers",
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
        countryCode: "+91",
        phone: "",
        location: "",
        role: "",
        background: "",
        links: "",
        source: "",
        sourceOther: "",
        message: "",
      });
      clearResume();
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label
            htmlFor="phone"
            className="text-xs font-medium text-muted-foreground mb-1.5 block"
          >
            Phone *
          </Label>
          <div className="flex gap-2">
            <select
              id="countryCode"
              name="countryCode"
              value={form.countryCode}
              onChange={handleChange}
              aria-label="Country code"
              style={{ fieldSizing: "content" } as React.CSSProperties}
              className="h-10 w-auto min-w-[6rem] max-w-[65%] shrink-0 rounded-lg border border-border bg-card px-2 text-sm text-foreground transition-all duration-200 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {COUNTRY_CODES.map(([iso, name, dial]) => (
                <option key={iso} value={dial}>
                  {name} ({dial})
                </option>
              ))}
            </select>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="99999 99999"
              value={form.phone}
              onChange={handleChange}
              className="min-w-0 flex-1"
              required
            />
          </div>
        </div>
        <div>
          <Label
            htmlFor="location"
            className="text-xs font-medium text-muted-foreground mb-1.5 block"
          >
            Location
          </Label>
          <Input
            id="location"
            name="location"
            placeholder="City, Country"
            value={form.location}
            onChange={handleChange}
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
          className="h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground transition-all duration-200 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <option value="">Select an area</option>
          <option>Video Game Development</option>
          <option>Narrative Design &amp; World Building</option>
          <option>Software Engineering / Development</option>
          <option>Digital Twins &amp; Simulations</option>
          <option>Digital Experiences</option>
          <option>AI / Machine Learning</option>
          <option>3D Art, Graphics &amp; Animation</option>
          <option>UI/UX &amp; Graphic Design</option>
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
          placeholder="Tell us about your experience and what you specialize in. New to the field? Tell us what you're eager to learn."
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
          Portfolio / Work Links
        </Label>
        <Textarea
          id="links"
          name="links"
          rows={3}
          placeholder="Portfolio, GitHub, reel, LinkedIn, personal site - anything that shows your work."
          value={form.links}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label
          htmlFor="resume"
          className="text-xs font-medium text-muted-foreground mb-1.5 block"
        >
          Resume{" "}
          <span className="font-normal text-muted-foreground/70">
            (optional - PDF or Word, max 5MB)
          </span>
        </Label>
        <input
          ref={resumeInputRef}
          id="resume"
          name="resume"
          type="file"
          accept={RESUME_ACCEPT}
          onChange={handleResumeChange}
          className="block w-full cursor-pointer rounded-lg border border-border bg-card text-sm text-muted-foreground transition-all duration-200 file:mr-3 file:cursor-pointer file:border-0 file:bg-secondary file:px-3 file:py-2.5 file:text-sm file:font-medium file:text-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        />
        {resume && (
          <p className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="text-foreground">{resume.name}</span>
            <button
              type="button"
              onClick={clearResume}
              className="text-primary hover:underline"
            >
              Remove
            </button>
          </p>
        )}
        {resumeError && (
          <p className="mt-1.5 text-xs text-destructive">{resumeError}</p>
        )}
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

      <div>
        <Label
          htmlFor="source"
          className="text-xs font-medium text-muted-foreground mb-1.5 block"
        >
          How did you hear about us? *
        </Label>
        <select
          id="source"
          name="source"
          value={form.source}
          onChange={handleChange}
          required
          className="h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground transition-all duration-200 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <option value="">Select an option</option>
          <option>LinkedIn</option>
          <option>Instagram</option>
          <option>Twitter / X</option>
          <option>Google Search</option>
          <option>Referral (friend or colleague)</option>
          <option>Discord or community</option>
          <option>Job board</option>
          <option>Other</option>
        </select>
        {form.source === "Other" && (
          <Input
            id="sourceOther"
            name="sourceOther"
            placeholder="Please specify"
            value={form.sourceOther}
            onChange={handleChange}
            required
            className="mt-2"
          />
        )}
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
