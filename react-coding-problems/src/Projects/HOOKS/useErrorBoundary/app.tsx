import React from "react";
import ErrorBoundary from ".";

const ErrorFallback = () => (
  <div role="alert">
    <p>Something went wrong.</p>
  </div>
);

const ErrorComp: React.FC = () => (
  <div>
    <ErrorBoundary fallback={<ErrorFallback />}>
      <div>Some random component</div>
    </ErrorBoundary>
  </div>
);

export default ErrorComp;
