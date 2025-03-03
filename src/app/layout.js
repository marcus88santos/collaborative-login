import "./globals.css";

export const metadata = {
  title: "Collaborative Login",
  description: "Building a collaborative login system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
