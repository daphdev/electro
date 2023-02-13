import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Reference: https://stackoverflow.com/q/36904185
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
