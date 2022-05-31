import React from 'react';
import { ActionIcon, Button, Group, Paper, Select, TextInput, Tooltip } from '@mantine/core';
import { AdjustmentsHorizontal, Edit, Eraser, Filter, Search } from 'tabler-icons-react';
import { SelectOption } from 'types';
import { FilterObject } from 'utils/FilterUtils';

interface SearchPanelProps {
  filterSelectList: SelectOption[];
  activeFilter: FilterObject | null;
  searchInputRef: React.MutableRefObject<HTMLInputElement | null>;
  handleSearchInput: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleFilterSelect: (filterIdValue: string | null) => void;
  handleAddFilterButton: () => void;
  handleResetButton: () => void;
  handleSearchButton: () => void;
}

export default function SearchPanel({
  filterSelectList,
  activeFilter,
  searchInputRef,
  handleSearchInput,
  handleFilterSelect,
  handleAddFilterButton,
  handleResetButton,
  handleSearchButton,
}: SearchPanelProps) {
  return (
    <Paper shadow="xs" p="sm">
      <Group position="apart">
        <Group spacing="sm">
          <TextInput
            placeholder="Từ khóa"
            icon={<Search size={14}/>}
            styles={{ root: { width: 250 } }}
            ref={searchInputRef}
            onKeyDown={handleSearchInput}
          />
          <Select
            placeholder="Chọn bộ lọc"
            icon={<AdjustmentsHorizontal size={14}/>}
            clearable
            data={filterSelectList}
            value={activeFilter ? activeFilter.id : null}
            onChange={handleFilterSelect}
          />
          <Tooltip label="Sửa bộ lọc" withArrow>
            <ActionIcon color="teal" variant="light" size={36}>
              <Edit/>
            </ActionIcon>
          </Tooltip>
          <Button variant="light" leftIcon={<Filter/>} onClick={handleAddFilterButton}>
            Thêm bộ lọc
          </Button>
        </Group>

        <Group spacing="sm">
          <Tooltip label="Đặt mặc định" withArrow>
            <ActionIcon color="red" variant="filled" size={36} onClick={handleResetButton}>
              <Eraser/>
            </ActionIcon>
          </Tooltip>
          <Button onClick={handleSearchButton}>
            Tìm kiếm
          </Button>
        </Group>
      </Group>
    </Paper>
  );
}
