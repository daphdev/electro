import React, { useState } from 'react';
import {
  ActionIcon,
  Box,
  Group,
  Loader,
  Popover,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme
} from '@mantine/core';
import { Check, Search, Trash } from 'tabler-icons-react';
import { useDebouncedValue, useElementSize } from '@mantine/hooks';
import useGetAllApi from 'hooks/use-get-all-api';
import BaseResponse from 'models/BaseResponse';

interface EntityFinderProps<T> {
  selections: T[];
  onClickItem: (entityResponse: T) => void;
  onDeleteItem: (entityResponse: T) => void;
  options: {
    resourceUrl: string;
    resourceKey: string;
    resultListSize: number;
    resultFragment: (entityResponse: T) => React.ReactNode;
    inputLabel: string;
    inputPlaceholder?: string;
    selectedFragment: (entityResponse: T) => React.ReactNode;
    deleteButtonTitle?: string;
  },
  errorSearchInput: React.ReactNode;
}

function EntityFinder<T extends BaseResponse>({
  selections,
  onClickItem,
  onDeleteItem,
  errorSearchInput,
  options,
}: EntityFinderProps<T>) {
  const theme = useMantineTheme();

  const { ref: refBox, width: widthBox } = useElementSize();

  const [popoverOpened, setPopoverOpened] = useState(false);
  const [keyword, setKeyword] = useState('');

  const [debouncedKeyword] = useDebouncedValue(keyword, 400);

  const { data: entityResponses, isFetching } = useGetAllApi<T>(
    options.resourceUrl,
    options.resourceKey,
    { size: options.resultListSize, search: debouncedKeyword }
  );

  const selectionIds = selections.map(selection => selection.id);

  return (
    <Stack>
      <Box ref={refBox}>
        <Popover
          opened={popoverOpened}
          position="bottom"
          placement="start"
          transition="pop-top-left"
          styles={{ root: { width: '100%' }, popover: { width: widthBox }, inner: { padding: 4 } }}
          trapFocus={false}
          onFocusCapture={() => setPopoverOpened(true)}
          onClose={() => setPopoverOpened(false)}
          target={
            <TextInput
              required
              label={options.inputLabel}
              placeholder={options.inputPlaceholder || '--'}
              value={keyword}
              onChange={(event) => setKeyword(event.currentTarget.value)}
              icon={<Search size={14}/>}
              rightSection={isFetching ? <Loader size={16}/> : null}
              error={errorSearchInput}
            />
          }
        >
          <Stack spacing={0}>
            {(!entityResponses || entityResponses.totalElements === 0)
              ? <Text size="sm" p="sm" color="dimmed" sx={{ fontStyle: 'italic' }}>Không có kết quả</Text>
              : entityResponses.content.map(entityResponse => {
                const disabled = selectionIds.includes(entityResponse.id);

                return (
                  <UnstyledButton
                    key={entityResponse.id}
                    onClick={() => {
                      onClickItem(entityResponse);
                      setPopoverOpened(false);
                    }}
                    disabled={disabled}
                  >
                    <Group
                      position="apart"
                      sx={{
                        padding: '10px 12px',
                        borderRadius: theme.radius.sm,
                        opacity: disabled ? 0.5 : 'unset',
                        '&:hover': {
                          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1],
                        },
                      }}
                    >
                      {options.resultFragment(entityResponse)}
                      {disabled && (
                        <Group spacing={5}>
                          <ThemeIcon radius="lg" color="green" size="xs">
                            <Check size={12}/>
                          </ThemeIcon>
                          <Text weight={500} color="green" size="xs">Đã thêm</Text>
                        </Group>
                      )}
                    </Group>
                  </UnstyledButton>
                );
              })}
          </Stack>
        </Popover>
      </Box>

      {selections.length > 0 && (
        <Stack spacing="xs">
          {selections.map(selectedEntityResponse => (
            <Group
              key={selectedEntityResponse.id}
              position="apart"
              sx={{
                padding: theme.spacing.sm,
                borderRadius: theme.radius.sm,
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
              }}
            >
              {options.selectedFragment(selectedEntityResponse)}
              <ActionIcon
                color="red"
                variant="outline"
                size={24}
                title={options.deleteButtonTitle}
                onClick={() => onDeleteItem(selectedEntityResponse)}
              >
                <Trash size={16}/>
              </ActionIcon>
            </Group>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

export default EntityFinder;
