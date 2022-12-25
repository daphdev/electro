import { Table } from '@mantine/core';
import React, { useEffect } from 'react';
import { VariantRequest } from 'models/Variant';
import { CollectionWrapper } from 'types';
import { ProductPropertyItem } from 'models/Product';
import MiscUtils from 'utils/MiscUtils';
import { ProductVariantRow } from 'components';

interface ProductVariantsProps {
  variants: VariantRequest[];
  setVariants: (variants: VariantRequest[]) => void;
  productProperties: CollectionWrapper<ProductPropertyItem> | null;
  setProductProperties: (productProperties: CollectionWrapper<ProductPropertyItem> | null) => void;
  selectedVariantIndexes: number[];
  setSelectedVariantIndexes: React.Dispatch<React.SetStateAction<number[]>>;
}

function ProductVariants({
  variants,
  setVariants,
  productProperties,
  setProductProperties,
  selectedVariantIndexes,
  setSelectedVariantIndexes,
}: ProductVariantsProps) {

  useEffect(() => {
    const defaultVariant: VariantRequest = { sku: '', cost: 0, price: 0, properties: null, status: 1 };
    const currentVariants: VariantRequest[] = [];
    const currentSelectedVariantIndexes: number[] = [];

    if (productProperties && productProperties.content.some(item => item.value.length !== 0)) {
      const productPropertiesValues = productProperties.content
        .filter(item => item.value.length !== 0)
        .map(item => item.value);
      const propertyValueCombinations = MiscUtils.recursiveFlatMap(productPropertiesValues);

      for (const propertyValueCombination of propertyValueCombinations) {
        const variant = { ...defaultVariant };
        variant.properties = new CollectionWrapper(productProperties.content
          .filter(item => item.value.length !== 0)
          .map(item => ({ ...item, value: '' })));
        variant.properties.content.forEach((item, index) => (item.value = propertyValueCombination[index]));
        currentVariants.push(variant);
      }

      currentSelectedVariantIndexes.push(...Array.from(Array(propertyValueCombinations.length).keys()));
    } else {
      currentVariants.push(defaultVariant);
      currentSelectedVariantIndexes.push(0);
    }

    setVariants(currentVariants);
    setSelectedVariantIndexes(currentSelectedVariantIndexes);
  }, [productProperties]);

  return (
    <Table
      horizontalSpacing="xs"
      verticalSpacing="sm"
      striped
    >
      <thead>
        <tr>
          <th>#</th>
          <th>Phiên bản</th>
          <th>SKU</th>
          <th>Giá vốn</th>
          <th>Giá bán</th>
        </tr>
      </thead>
      <tbody>
        {variants.map((variant, index) => (
          <ProductVariantRow
            key={index}
            variant={variant}
            index={index}
            variants={variants}
            setVariants={setVariants}
            selectedVariantIndexes={selectedVariantIndexes}
            setSelectedVariantIndexes={setSelectedVariantIndexes}
          />
        ))}
      </tbody>
    </Table>
  );
}

export default ProductVariants;
