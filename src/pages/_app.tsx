import '../styles/globals.scss';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';

// Importing App Layout
const Layout = dynamic(() => import('../components/Layout'), {
  ssr: false,
});

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default App;
