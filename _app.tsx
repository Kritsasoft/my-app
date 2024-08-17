
import '../styles/globals.css'; 

import { ReactNode, ComponentType } from 'react';

function MyApp({ Component, pageProps }: { Component: ComponentType<any>, pageProps: { [key: string]: any } }) {
  return <Component {...pageProps} />;
}

export default MyApp;
