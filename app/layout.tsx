//import "../css/globals.css"
export const metadata = {
  title: "DealMonkey",
  description: "DealMonkey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
