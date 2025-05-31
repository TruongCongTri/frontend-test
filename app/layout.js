import "./globals.css";
import { Toaster } from "react-hot-toast";
// import { Cascadia_Mono } from "next/font/google";

// const cascadiaMono = Cascadia_Mono({
//   subsets: ["latin"],
//   variable: "--font-cascadia-mono",
//   weight: ["200", "300", "400", "500", "600", "700"],
//   display: "swap",
// });

export const metadata = {
  title: "GitHub CLI Explorer",
  description:
    "Search GitHub profiles in a terminal-like UI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={`${cascadiaMono.variable} font-mono`} > */}
      <body  >
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "black",
              border: "1px solid white",
              color: "#00ff88",
              fontFamily: "monospace",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
