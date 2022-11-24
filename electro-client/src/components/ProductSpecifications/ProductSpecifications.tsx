import { Button, Stack } from '@mantine/core';
import React from 'react';
import { CollectionWrapper, SelectOption } from 'types';
import { SpecificationItem } from 'models/Product';
import { ProductSpecificationRow } from 'components';

interface ProductSpecificationsProps {
  specifications: CollectionWrapper<SpecificationItem> | null;
  setSpecifications: (specifications: CollectionWrapper<SpecificationItem> | null) => void;
  specificationSelectList: SelectOption[];
  setSpecificationSelectList: React.Dispatch<React.SetStateAction<SelectOption[]>>;
}

function ProductSpecifications({
  specifications,
  setSpecifications,
  specificationSelectList,
  setSpecificationSelectList,
}: ProductSpecificationsProps) {
  const isDisabledCreateProductSpecificationButton = specifications?.content.length === specificationSelectList.length;

  const handleCreateProductSpecificationButton = () => {
    let currentSpecificationItems: SpecificationItem[] = [];

    if (specifications && specifications.content.length < specificationSelectList.length) {
      currentSpecificationItems = [...specifications.content];
    }

    currentSpecificationItems.push({ id: 0, name: '', code: '', value: '' });
    setSpecifications(new CollectionWrapper(currentSpecificationItems));
  };

  const productSpecificationsFragment = specifications?.content.map((specification, index) => (
    <ProductSpecificationRow
      key={index}
      specification={specification}
      index={index}
      specifications={specifications}
      setSpecifications={setSpecifications}
      specificationSelectList={specificationSelectList}
      setSpecificationSelectList={setSpecificationSelectList}
    />
  ));

  return (
    <Stack spacing="sm">
      {productSpecificationsFragment}
      <Button
        variant="outline"
        onClick={handleCreateProductSpecificationButton}
        disabled={isDisabledCreateProductSpecificationButton}
      >
        Thêm thông số sản phẩm
      </Button>
    </Stack>
  );
}

export default ProductSpecifications;
