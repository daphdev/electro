import { Button, Stack } from '@mantine/core';
import React from 'react';
import { CollectionWrapper, SelectOption } from 'types';
import { SpecificationItem } from 'models/Product';
import { ProductSpecificationRow } from 'components/index';

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
    let currentSpecifications: CollectionWrapper<SpecificationItem>;
    if (specifications && specifications.content.length < specificationSelectList.length) {
      currentSpecifications = {
        content: [...specifications.content, {
          id: 0,
          name: '',
          code: '',
          value: '',
        }],
        totalElements: specifications.content.length + 1,
      };
    } else {
      currentSpecifications = {
        content: [
          {
            id: 0,
            name: '',
            code: '',
            value: '',
          },
        ],
        totalElements: 1,
      };
    }
    setSpecifications(currentSpecifications);
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
