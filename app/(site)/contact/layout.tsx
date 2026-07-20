import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you're building - a digital twin for high-stakes training, game co-development, or an interactive product. Schedule a scoping call with ArkaForge.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
