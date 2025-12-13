import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/utils/query-client";

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders = (props: AppProvidersProps) => {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default AppProviders;
