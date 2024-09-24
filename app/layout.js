import "./globals.css";
import NavBar from "../components/NavBar";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata = {
  title: "project portal",
  description: "simple place forr publishing projects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` bg-background min-h-screen`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
