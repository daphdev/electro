import { Button, Stack } from '@mantine/core';
import React from 'react';
import { CollectionWrapper, SelectOption } from 'types';
import { ProductPropertyItem } from 'models/Product';
import { ProductPropertyRow } from 'components';

interface ProductPropertiesProps {
  productProperties: CollectionWrapper<ProductPropertyItem> | null;
  setProductProperties: (productProperties: CollectionWrapper<ProductPropertyItem> | null) => void;
  productPropertySelectList: SelectOption[];
  setProductPropertySelectList: React.Dispatch<React.SetStateAction<SelectOption[]>>;
}

function ProductProperties({
  productProperties,
  setProductProperties,
  productPropertySelectList,
  setProductPropertySelectList,
}: ProductPropertiesProps) {
  const isDisabledCreateProductPropertyButton = productProperties?.content.length === productPropertySelectList.length;

  const handleCreateProductPropertyButton = () => {
    let currentProductPropertyItems: ProductPropertyItem[] = [];

    if (productProperties && productProperties.content.length < productPropertySelectList.length) {
      currentProductPropertyItems = [...productProperties.content];
    }

    currentProductPropertyItems.push({ id: 0, name: '', code: '', value: [] });
    setProductProperties(new CollectionWrapper(currentProductPropertyItems));
  };

  const productPropertiesFragment = productProperties?.content.map((productProperty, index) => (
    <ProductPropertyRow
      key={index}
      productProperty={productProperty}
      index={index}
      productProperties={productProperties}
      setProductProperties={setProductProperties}
      productPropertySelectList={productPropertySelectList}
      setProductPropertySelectList={setProductPropertySelectList}
    />
  ));

  return (
    <Stack spacing="sm">
      {productPropertiesFragment}
      <Button
        variant="outline"
        onClick={handleCreateProductPropertyButton}
        disabled={isDisabledCreateProductPropertyButton}
      >
        Thêm thuộc tính sản phẩm
      </Button>
    </Stack>
  );
}

export default ProductProperties;
