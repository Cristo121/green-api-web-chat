import React, { createContext, ReactNode, useContext } from "react";

interface ErrorBoundaryState {
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: (error: Error, resetError: () => void) => ReactNode;
}

const ErrorBoundaryContext = createContext<{
  error: Error | null;
  resetError: () => void;
} | null>(null);

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error, info);
  }

  resetError = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <ErrorBoundaryContext.Provider
          value={{ error: this.state.error, resetError: this.resetError }}
        >
          {this.props.fallback(this.state.error, this.resetError)}
        </ErrorBoundaryContext.Provider>
      );
    }

    return (
      <ErrorBoundaryContext.Provider
        value={{ error: null, resetError: this.resetError }}
      >
        {this.props.children}
      </ErrorBoundaryContext.Provider>
    );
  }
}

export function useErrorBoundary() {
  const context = useContext(ErrorBoundaryContext);
  if (!context) {
    throw new Error("useErrorBoundary must be used within an ErrorBoundary");
  }
  return context;
}

export default ErrorBoundary;
