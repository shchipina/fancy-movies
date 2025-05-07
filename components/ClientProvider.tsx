"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReduxProvider } from "./ReduxProvider";

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider>
        {children}
      </ReduxProvider>
    </QueryClientProvider>
  );
}