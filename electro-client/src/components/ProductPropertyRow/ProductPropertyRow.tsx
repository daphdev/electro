import { ProductPropertyItem } from 'models/Product';
import { ActionIcon, Group, MultiSelect, Select } from '@mantine/core';
import { AB, DragDrop, Keyboard, PlaystationX } from 'tabler-icons-react';
import React from 'react';
import { CollectionWrapper, SelectOption } from 'types';
import produce from 'immer';

interface ProductPropertyRowProps {
  productProperty: ProductPropertyItem;
  index: number;
  productProperties: CollectionWrapper<ProductPropertyItem>;
  setProductProperties: (productProperties: CollectionWrapper<ProductPropertyItem> | null) => void;
  productPropertySelectList: SelectOption[];
  setProductPropertySelectList: React.Dispatch<React.SetStateAction<SelectOption[]>>;
}

function ProductPropertyRow({
  productProperty,
  index,
  productProperties,
  setProductProperties,
  productPropertySelectList,
  setProductPropertySelectList,
}: ProductPropertyRowProps) {
  const isDisabledProductPropertyValueInput = productProperty.id === 0;

  const handleProductPropertySelect = (productPropertyInfos: string | null, productPropertyIndex: number) => {
    const productProperty: ProductPropertyItem = { id: 0, name: '', code: '', value: [] };

    if (productPropertyInfos) {
      const parsedProductPropertyInfos = JSON.parse(productPropertyInfos);
      productProperty.id = parsedProductPropertyInfos.id;
      productProperty.name = parsedProductPropertyInfos.name;
      productProperty.code = parsedProductPropertyInfos.code;
    }

    const currentProductProperties = new CollectionWrapper(productProperties.content
      .map((item, index) => (index === productPropertyIndex) ? productProperty : item));
    setProductProperties(currentProductProperties);

    const currentProductPropertiesIds = currentProductProperties.content.map(item => item.id);

    setProductPropertySelectList(productPropertySelectList.map((option) => {
      if (option.disabled === true && !currentProductPropertiesIds.includes(JSON.parse(option.value).id)) {
        return { value: option.value, label: option.label };
      }
      if (option.value === productPropertyInfos) {
        return { ...option, disabled: true };
      }
      return option;
    }));
  };

  const handleCreateProductPropertyValueInput = (productPropertyValue: string, productPropertyIndex: number) => {
    const currentProductProperties = new CollectionWrapper(produce(productProperties.content, draft => {
      draft[productPropertyIndex].value.push(productPropertyValue);
    }));
    setProductProperties(currentProductProperties);
  };

  const handleProductPropertyValueInput = (productPropertyValues: string[], productPropertyIndex: number) => {
    const currentProductProperties = new CollectionWrapper(produce(productProperties.content, draft => {
      draft[productPropertyIndex].value = productPropertyValues;
    }));
    setProductProperties(currentProductProperties);
  };

  const handleDeleteProductPropertyButton = (productPropertyIndex: number) => {
    const currentProductProperties = new CollectionWrapper(productProperties.content
      .filter((_, index) => index !== productPropertyIndex));
    setProductProperties(currentProductProperties.totalElements !== 0 ? currentProductProperties : null);

    setProductPropertySelectList(productPropertySelectList.map((option) => {
      if (option.disabled === true && JSON.parse(option.value).id === productProperties.content[productPropertyIndex].id) {
        return { value: option.value, label: option.label };
      }
      return option;
    }));
  };

  return (
    <Group
      spacing="sm"
      sx={{ flexWrap: 'nowrap', justifyContent: 'space-between' }}
    >
      <ActionIcon
        color="blue"
        variant="hover"
        size={36}
        title="Di chuyển thuộc tính sản phẩm"
      >
        <DragDrop/>
      </ActionIcon>
      <Select
        sx={{ width: '100%' }}
        placeholder="Chọn thuộc tính"
        icon={<AB size={14}/>}
        clearable
        searchable
        value={JSON.stringify({ id: productProperty.id, name: productProperty.name, code: productProperty.code })}
        data={productPropertySelectList}
        onChange={productPropertyInfos => handleProductPropertySelect(productPropertyInfos, index)}
      />
      <MultiSelect
        sx={{ width: '100%' }}
        placeholder="Nhập giá trị"
        icon={<Keyboard size={14}/>}
        searchable
        creatable
        getCreateLabel={(value) => `+ Thêm giá trị ${value}`}
        data={productProperty.value}
        value={productProperty.value}
        onCreate={(value) => handleCreateProductPropertyValueInput(value, index)}
        onChange={(values) => handleProductPropertyValueInput(values, index)}
        disabled={isDisabledProductPropertyValueInput}
      />
      <ActionIcon
        color="red"
        variant="hover"
        size={36}
        title="Xóa thuộc tính"
        onClick={() => handleDeleteProductPropertyButton(index)}
      >
        <PlaystationX/>
      </ActionIcon>
    </Group>
  );
}

export default ProductPropertyRow;
