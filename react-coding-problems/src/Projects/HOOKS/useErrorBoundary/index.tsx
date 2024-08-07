import React, { useState, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  fallback,
}) => {
  const [hasError, setHasError] = useState(false);

  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    setHasError(true);
  };

  try {
    if (hasError) {
      return fallback;
    }
    return children;
  } catch (error) {
    handleError(error as Error, { componentStack: "" });
    return fallback;
  }
};

export default ErrorBoundary;
