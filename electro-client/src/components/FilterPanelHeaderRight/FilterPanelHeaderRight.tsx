import React from 'react';
import { ActionIcon, Button, Group, Tooltip } from '@mantine/core';
import { FilterOff } from 'tabler-icons-react';
import useFilterPanelHeaderRightViewModel from 'components/FilterPanelHeaderRight/FilterPanelHeaderRight.vm';

export interface FilterPanelHeaderRightProps {
  filterNameInputRef: React.MutableRefObject<HTMLInputElement | null>;
}

function FilterPanelHeaderRight(props: FilterPanelHeaderRightProps) {
  const {
    handleCancelCreateFilterButton,
    handleCreateFilterButton,
  } = useFilterPanelHeaderRightViewModel(props);

  return (
    <Group spacing="sm">
      <Tooltip label="Hủy tạo bộ lọc" withArrow>
        <ActionIcon
          color="red"
          variant="light"
          size={36}
          onClick={handleCancelCreateFilterButton}
        >
          <FilterOff/>
        </ActionIcon>
      </Tooltip>
      <Button
        variant="light"
        onClick={handleCreateFilterButton}
      >
        Tạo bộ lọc
      </Button>
    </Group>
  );
}

export default React.memo(FilterPanelHeaderRight);
