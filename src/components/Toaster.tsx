
import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster 
      position="top-right"
      toastOptions={{
        className: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border",
        style: {
          // Ensure consistent styling with the rest of the app
          padding: '0.75rem',
          borderRadius: '0.375rem',
        },
      }}
    />
  );
}
