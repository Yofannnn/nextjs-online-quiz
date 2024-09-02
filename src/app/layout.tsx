import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import NavbarComponent from "@/components/fragments/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Questify - Create and Take Custom Online Quizzes",
  description:
    "Questify empowers educators, students, and trivia enthusiasts to create, manage, and participate in engaging online quizzes. Enhance learning and challenge your knowledge with our intuitive quiz platform.",
  keywords: [
    "online quizzes",
    "quiz creation",
    "educational quizzes",
    "trivia",
    "interactive learning",
    "quiz platform",
    "create quizzes",
    "take quizzes",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <NavbarComponent />
          {children}
          <Toaster />
        </NextThemesProvider>
      </body>
    </html>
  );
}
