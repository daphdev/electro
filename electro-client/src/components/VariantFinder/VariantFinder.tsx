import React, { useState } from 'react';
import {
  Box,
  Group,
  Highlight,
  Loader,
  Popover,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  UnstyledButton
} from '@mantine/core';
import { Check, Search } from 'tabler-icons-react';
import { useDebouncedValue, useElementSize } from '@mantine/hooks';
import useGetAllApi from 'hooks/use-get-all-api';
import { VariantResponse } from 'models/Variant';
import ResourceURL from 'constants/ResourceURL';

interface VariantResultProps {
  variant: VariantResponse;
  keyword: string;
  disabled: boolean;
}

function VariantResult({ variant, keyword, disabled }: VariantResultProps) {
  return (
    <Group
      position="apart"
      sx={(theme) => ({
        padding: '5px 12px',
        borderRadius: theme.radius.sm,
        opacity: disabled ? 0.5 : 'unset',
        '&:hover': { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1] },
      })}
    >
      <Stack spacing={2}>
        <Highlight highlight={keyword} highlightColor="blue" size="sm">
          {variant.product.name}
        </Highlight>
        <Group spacing="xs">
          {variant.properties && variant.properties.content.map(property => (
            <Text key={property.code} size="xs" color="blue">
              {property.name}: {property.value}
            </Text>
          ))}
          <Text size="xs" color="dimmed">
            SKU: <Highlight component="span" highlight={keyword} highlightColor="blue" inherit>{variant.sku}</Highlight>
          </Text>
        </Group>
      </Stack>
      {disabled && (
        <Group spacing={5}>
          <ThemeIcon radius="lg" color="green" size="xs">
            <Check size={12}/>
          </ThemeIcon>
          <Text weight={500} color="green" size="xs">Đã thêm</Text>
        </Group>
      )}
    </Group>
  );
}

interface VariantFinderProps {
  selectedVariants: VariantResponse[];
  onClickItem: (variant: VariantResponse) => void;
  errorSearchInput: React.ReactNode;
}

function VariantFinder({ selectedVariants, onClickItem, errorSearchInput }: VariantFinderProps) {
  const { ref: refBox, width: widthBox } = useElementSize();

  const [popoverOpened, setPopoverOpened] = useState(false);
  const [keyword, setKeyword] = useState('');

  const [debouncedKeyword] = useDebouncedValue(keyword, 400);

  const { data: variants, isFetching } = useGetAllApi<VariantResponse>(
    ResourceURL.VARIANT,
    'variants',
    { size: 7, search: debouncedKeyword }
  );

  const selectedVariantIds = selectedVariants.map(variant => variant.id);

  return (
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
            label="Thêm mặt hàng"
            placeholder="Nhập tên, mã sản phẩm hay SKU để tìm..."
            value={keyword}
            onChange={(event) => setKeyword(event.currentTarget.value)}
            icon={<Search size={14}/>}
            rightSection={isFetching ? <Loader size={16}/> : null}
            error={errorSearchInput}
          />
        }
      >
        <Stack spacing={0}>
          {(!variants || variants.totalElements === 0)
            ? <Text size="sm" p="sm" color="dimmed" sx={{ fontStyle: 'italic' }}>Không có kết quả</Text>
            : variants.content.map(variant => (
              <UnstyledButton
                key={variant.sku}
                onClick={() => {
                  onClickItem(variant);
                  setPopoverOpened(false);
                }}
                disabled={selectedVariantIds.includes(variant.id)}
              >
                <VariantResult
                  variant={variant}
                  keyword={debouncedKeyword}
                  disabled={selectedVariantIds.includes(variant.id)}
                />
              </UnstyledButton>
            ))}
        </Stack>
      </Popover>
    </Box>
  );
}

export default VariantFinder;
