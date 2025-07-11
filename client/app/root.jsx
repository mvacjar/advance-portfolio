import { Outlet, Scripts } from 'react-router';
import '@mantine/core/styles.css';
import {
  createTheme,
  MantineProvider,
  ColorSchemeScript,
  Loader,
} from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});

export function Layout({ children }) {
  return (
    <html lang='en' data-mantine-color-scheme='light'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <ColorSchemeScript defaultColorScheme='light' />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme='light'>
          {children}
        </MantineProvider>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }) {
  return (
    <html lang='en' data-mantine-color-scheme='light'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <ColorSchemeScript defaultColorScheme='light' />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme='light'>
          <main style={{ padding: 20 }}>
            <h1>Oops!</h1>
            <p>{error?.message || 'An unexpected error occurred.'}</p>
          </main>
        </MantineProvider>
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return (
    <div id='loading-splash'>
      <div id='loading-splash-spinner' />
      <Loader color='orange' size='xl' type='bars' />
      <p>Loading, please wait...</p>
    </div>
  );
}
