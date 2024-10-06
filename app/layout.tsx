import './globals.css';
import Header from './components/header';
import Footer from './components/footer';

export const metadata = {
  title: 'Tutor-App',
  description: 'Платформа для поиска репетиторов и учеников',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}