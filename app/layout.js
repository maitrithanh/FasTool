import { Inter } from "next/font/google";
import "./globals.css";
import { Manrope } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const font = Manrope({
  weight: ["200","300", "400", "500", "600", "700", "800"], // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
});

export const metadata = {
  title: "FasTool",
  description: "FasTool by Mai Tri Thanh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
