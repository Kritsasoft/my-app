// _app.tsx
import '../styles/globals.css'; // Adjust the path according to your project structure

import { ReactNode, ComponentType } from 'react';

function MyApp({ Component, pageProps }: { Component: ComponentType<any>, pageProps: { [key: string]: any } }) {
  return <Component {...pageProps} />;
}

export default MyApp;
