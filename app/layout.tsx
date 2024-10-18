import './globals.css';
import MainContainer from './components/mainContainer';

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
    <html lang='ru'>
      <body>
        <MainContainer children={children} />
      </body>
    </html>
  );
}