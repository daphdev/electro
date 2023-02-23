import { Button, Stack, Table, useMantineTheme } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { VariantPropertyItem, VariantRequest } from 'models/Variant';
import { CollectionWrapper } from 'types';
import { ProductPropertyItem } from 'models/Product';
import { AddVariantsModal, ProductVariantRow } from 'components';
import MiscUtils from 'utils/MiscUtils';
import { useModals } from '@mantine/modals';

interface ProductVariantsForUpdateProps {
  variants: VariantRequest[];
  setVariants: (variants: VariantRequest[]) => void;
  productProperties: CollectionWrapper<ProductPropertyItem> | null;
  setProductProperties: (productProperties: CollectionWrapper<ProductPropertyItem> | null) => void;
  selectedVariantIndexes: number[];
  setSelectedVariantIndexes: React.Dispatch<React.SetStateAction<number[]>>;
}

function ProductVariantsForUpdate({
  variants,
  setVariants,
  productProperties,
  setProductProperties,
  selectedVariantIndexes,
  setSelectedVariantIndexes,
}: ProductVariantsForUpdateProps) {
  const theme = useMantineTheme();
  const modals = useModals();

  const [propertyValueCombinations, setPropertyValueCombinations] = useState<string[][]>([]);
  const [modalId, setModalId] = useState('');

  useEffect(() => {
    if (productProperties) {
      const productPropertiesValues = productProperties.content.map(item => item.value);
      const currentPropertyValueCombinations = MiscUtils.recursiveFlatMap(productPropertiesValues);
      setPropertyValueCombinations(currentPropertyValueCombinations);
    }
    setSelectedVariantIndexes(Array.from(Array(variants.length).keys()));
  }, [variants]);

  const isDisabledOpenAddVariantsModalButton = propertyValueCombinations.length === 0
    || propertyValueCombinations.length === variants.length;

  const remainingPropertyValueCombinations = () => {
    const propertyValueCombinationStringsOfCurrentVariants = variants
      .map(variant => variant.properties?.content.map(property => property.value))
      .map(combination => JSON.stringify(combination));
    return propertyValueCombinations
      .map(combination => JSON.stringify(combination))
      .filter(combinationString => !propertyValueCombinationStringsOfCurrentVariants.includes(combinationString))
      .map(combinationString => JSON.parse(combinationString) as string[]);
  };

  const handleAddVariantsButton = (selectedRemainingPropertyValueCombinationIndexes: number[]) => {
    const defaultVariant: VariantRequest = { sku: '', cost: 0, price: 0, properties: null, status: 1 };
    const currentVariants: VariantRequest[] = [...variants];

    const selectedRemainingPropertyValueCombinations = remainingPropertyValueCombinations()
      .filter((_, index) => selectedRemainingPropertyValueCombinationIndexes.includes(index));

    for (const selectedRemainingPropertyValueCombination of selectedRemainingPropertyValueCombinations) {
      const variant = { ...defaultVariant };
      variant.properties = JSON.parse(JSON.stringify(productProperties)) as CollectionWrapper<VariantPropertyItem>;
      variant.properties.content.forEach((item, index) => (item.value = selectedRemainingPropertyValueCombination[index]));
      currentVariants.push(variant);
    }

    setVariants(currentVariants);
    modals.closeModal(modalId);
  };

  const handleOpenAddVariantsModalButton = () => {
    const currentModalId = modals.openModal({
      size: 'xs',
      overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      overlayOpacity: 0.55,
      overlayBlur: 3,
      title: 'Thêm phiên bản',
      children: <AddVariantsModal
        remainingPropertyValueCombinations={remainingPropertyValueCombinations()}
        handleAddVariantsButton={handleAddVariantsButton}
      />,
    });
    setModalId(currentModalId);
  };

  return (
    <Stack spacing="sm">
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
              isNewable={!variant.id}
            />
          ))}
        </tbody>
      </Table>
      <Button
        variant="outline"
        onClick={handleOpenAddVariantsModalButton}
        disabled={isDisabledOpenAddVariantsModalButton}
      >
        Thêm phiên bản sản
        phẩm {!isDisabledOpenAddVariantsModalButton && `(${propertyValueCombinations.length - variants.length})`}
      </Button>
    </Stack>
  );
}

export default ProductVariantsForUpdate;
