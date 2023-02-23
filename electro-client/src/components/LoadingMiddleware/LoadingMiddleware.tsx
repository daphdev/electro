import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LoadingContext, LoadingGetterContext, topbar } from 'react-router-loading';

interface LoadingMiddlewareProps {
  isLoading: boolean;
  children: React.ReactNode;
}

/**
 * Original: https://github.com/victortrusov/react-router-loading/blob/master/packages/react-router-loading/lib/_LoadingMiddleware.tsx
 * @param isLoading
 * @param children
 */
function LoadingMiddleware({ isLoading, children }: LoadingMiddlewareProps) {
  const [loading, setLoading] = useState(isLoading);
  const isFirstRender = useRef(true);

  const start = useCallback(() => {
    topbar.show();
    setLoading(true);
  }, []);

  const done = useCallback(() => {
    topbar.hide();
    setLoading(false);
  }, []);

  const restart = useCallback(() => {
    topbar.hide();
    topbar.show();
  }, []);

  useEffect(() => {
    if (!isFirstRender.current) {
      if (isLoading && !loading)
        start();
      else if (loading)
        done();
    } else {
      isFirstRender.current = false;
    }
  }, [isLoading]);

  const loadingProvider = useMemo(
    () => (
      <LoadingContext.Provider value={{ start, done, restart }}>
        {children}
      </LoadingContext.Provider>
    ),
    []
  );

  return (
    <LoadingGetterContext.Provider value={loading}>
      {loadingProvider}
    </LoadingGetterContext.Provider>
  );

}

export default LoadingMiddleware;
