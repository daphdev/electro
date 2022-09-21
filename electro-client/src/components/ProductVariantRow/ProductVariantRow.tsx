import { Checkbox, NumberInput, TextInput, useMantineTheme } from '@mantine/core';
import React from 'react';
import { VariantRequest } from 'models/Variant';
import produce from 'immer';
import MiscUtils from 'utils/MiscUtils';

interface ProductVariantRowProps {
  variant: VariantRequest;
  index: number;
  variants: VariantRequest[];
  setVariants: (variants: VariantRequest[]) => void;
  selectedVariantIndexes: number[];
  setSelectedVariantIndexes: React.Dispatch<React.SetStateAction<number[]>>;
  isNewable?: boolean; // For ProductUpdate
}

function ProductVariantRow({
  variant,
  index,
  variants,
  setVariants,
  selectedVariantIndexes,
  setSelectedVariantIndexes,
  isNewable,
}: ProductVariantRowProps) {
  const theme = useMantineTheme();

  const handleVariantCheckbox = (index: number) => {
    setSelectedVariantIndexes(indexes => indexes.includes(index) ? indexes.filter(i => i !== index) : [...indexes, index]);
  };

  const handleVariantSkuInput = (sku: string, index: number) => {
    setVariants(produce(variants, draft => {
      draft[index].sku = sku;
    }));
  };

  const handleVariantCostInput = (cost: number, index: number) => {
    setVariants(produce(variants, draft => {
      draft[index].cost = cost;
    }));
  };

  const handleVariantPriceInput = (price: number, index: number) => {
    setVariants(produce(variants, draft => {
      draft[index].price = price;
    }));
  };

  return (
    <tr style={isNewable
      ? {
        backgroundColor: theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors.yellow[8], 0.1)
          : theme.colors.yellow[0],
      }
      : {}}>
      <td>
        <Checkbox
          checked={selectedVariantIndexes.includes(index)}
          onChange={() => handleVariantCheckbox(index)}
          disabled={selectedVariantIndexes.includes(index) && selectedVariantIndexes.length === 1}
        />
      </td>
      <td>
        {variant.properties ? variant.properties.content.map(p => p.value).join(' ⋅ ') : <em>mặc định</em>}
      </td>
      <td>
        <TextInput
          styles={{ input: { fontFamily: 'monospace' } }}
          size="xs"
          placeholder="Nhập SKU"
          value={variant.sku}
          onChange={(event) => handleVariantSkuInput(event.currentTarget.value, index)}
          disabled={!selectedVariantIndexes.includes(index)}
        />
      </td>
      <td>
        <NumberInput
          size="xs"
          placeholder="Nhập giá gốc"
          value={variant.cost}
          onChange={(value) => handleVariantCostInput(value || 0, index)}
          disabled={!selectedVariantIndexes.includes(index)}
          min={0}
          step={100}
          icon={'₫'}
          parser={MiscUtils.parserPrice}
          formatter={MiscUtils.formatterPrice}
        />
      </td>
      <td>
        <NumberInput
          size="xs"
          placeholder="Nhập giá bán"
          value={variant.price}
          onChange={(value) => handleVariantPriceInput(value || 0, index)}
          disabled={!selectedVariantIndexes.includes(index)}
          min={0}
          step={100}
          icon={'₫'}
          parser={MiscUtils.parserPrice}
          formatter={MiscUtils.formatterPrice}
        />
      </td>
    </tr>
  );
}

export default ProductVariantRow;
