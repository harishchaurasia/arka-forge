import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you're building — game co-development, a game-engine digital twin for high-stakes training, or an interactive product. Schedule a scoping call with ArkaForge.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
