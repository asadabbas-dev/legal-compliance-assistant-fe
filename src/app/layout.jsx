"use client";

import FullPageLoader from "@/common/components/full-page-loader/full-page-loader.component";
import LenisProvider from "@/common/components/lenis-provider/lenis-provider.component";
import "@/common/styles/dashboard/dashboard.style.css";
import "lenis/dist/lenis.css";
import "@/common/styles/globals.style.css";
import "@/common/styles/home.style.scss";
import { persistor, store } from "@/provider/store";
import styled from "@emotion/styled";
import { StyledEngineProvider } from "@mui/material";
import { usePathname } from "next/navigation";
import { MaterialDesignContent, SnackbarProvider } from "notistack";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: "rgb(222 255 228)",
    color: "green",
  },
  "&.notistack-MuiContent-error": {
    backgroundColor: "rgb(255 222 222)",
    color: "red",
  },
}));

// Routes where Lenis smooth scroll should be DISABLED
// because they have their own inner scroll containers (like the chat workspace)
const LENIS_DISABLED_ROUTES = ["/app", "/workspace"];

function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  // Disable Lenis on routes that manage their own scroll
  const lenisDisabled = LENIS_DISABLED_ROUTES.some((route) =>
    pathname?.startsWith(route),
  );

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [pathname]);

  if (loading) {
    return <FullPageLoader />;
  }

  // For workspace/chat routes: use h-screen + overflow-hidden so that
  // the inner flex layout can control its own scroll properly.
  // For all other routes: use min-h-screen so pages can scroll naturally.
  if (lenisDisabled) {
    return (
      <div className="h-screen overflow-hidden bg-background-secondary">
        {children}
      </div>
    );
  }

  return (
    <LenisProvider>
      <div className="min-h-screen bg-background-secondary">{children}</div>
    </LenisProvider>
  );
}

/**
 * It is a root wrapper for all pages
 * @param {children} props
 * @returns page component with html wrapped around it
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <title>Compliance Assistant</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StyledEngineProvider injectFirst>
          <SnackbarProvider
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={3000}
            maxSnack={2}
            Components={{
              success: StyledMaterialDesignContent,
              error: StyledMaterialDesignContent,
            }}
          >
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <LayoutWrapper>{children}</LayoutWrapper>
              </PersistGate>
            </Provider>
          </SnackbarProvider>
        </StyledEngineProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
