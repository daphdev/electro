import Titles from 'constants/Titles';
import { matchRoutes, useLocation } from 'react-router-dom';
import { useDocumentTitle } from '@mantine/hooks';

const routes = Object.keys(Titles).map(title => ({ path: title }));

function useTitle(explicitTitle?: string) {
  const location = useLocation();
  const match = matchRoutes(routes, location);
  const path = match ? match[0].route.path : '';

  useDocumentTitle(explicitTitle ? explicitTitle + ' – Electro' : Titles[path]);
}

export default useTitle;
