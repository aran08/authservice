import Navbar from "@/components/layout/Navbar";
import "./globals.css";


export const metadata = {
  title: "Assignment",
  description: "Developed By Lohitha",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
