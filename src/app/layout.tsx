import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tony Mu — Property Advisor & Digital Builder",
  description:
    "Your no-pressure property advisor in Malaysia. Over 100 clients served. I also build websites and apps for businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
