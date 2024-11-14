import "./globals.css";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "./pageComponents/ThemeProvider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Rocket Crypto",
  description:
    "Join a trusted and secure cryptocurrency exchange platform for seamless trading. Access real-time data, easy conversions, and powerful tools to make informed trading decisions. Perfect for both beginners and experienced traders looking for a reliable and user-friendly crypto experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
