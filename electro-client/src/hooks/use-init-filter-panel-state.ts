import useFilterPanelStore from 'stores/use-filter-panel-store';
import { useEffect } from 'react';
import { EntityPropertySchema } from 'types';

function useInitFilterPanelState(properties: EntityPropertySchema) {
  const { initFilterPanelState } = useFilterPanelStore();

  useEffect(() => {
    initFilterPanelState(properties);
  }, [initFilterPanelState, properties]);
}

export default useInitFilterPanelState;
