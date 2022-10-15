import { ActionIcon, Group, Select, TextInput } from '@mantine/core';
import { AB, DragDrop, Keyboard, PlaystationX } from 'tabler-icons-react';
import React from 'react';
import { CollectionWrapper, SelectOption } from 'types';
import { SpecificationItem } from 'models/Product';
import produce from 'immer';

interface ProductSpecificationRowProps {
  specification: SpecificationItem;
  index: number;
  specifications: CollectionWrapper<SpecificationItem>;
  setSpecifications: (specifications: CollectionWrapper<SpecificationItem> | null) => void;
  specificationSelectList: SelectOption[];
  setSpecificationSelectList: React.Dispatch<React.SetStateAction<SelectOption[]>>;
}

function ProductSpecificationRow({
  specification,
  index,
  specifications,
  setSpecifications,
  specificationSelectList,
  setSpecificationSelectList,
}: ProductSpecificationRowProps) {
  const isDisabledProductSpecificationValueInput = specification.id === 0;

  const handleProductSpecificationSelect = (specificationInfos: string | null, specificationIndex: number) => {
    const specification: SpecificationItem = { id: 0, name: '', code: '', value: '' };

    if (specificationInfos) {
      const parsedSpecificationInfos = JSON.parse(specificationInfos);
      specification.id = parsedSpecificationInfos.id;
      specification.name = parsedSpecificationInfos.name;
      specification.code = parsedSpecificationInfos.code;
    }

    const currentSpecifications = new CollectionWrapper(specifications.content
      .map((item, index) => (index === specificationIndex) ? specification : item));
    setSpecifications(currentSpecifications);

    const currentSpecificationsIds = currentSpecifications.content.map(item => item.id);

    setSpecificationSelectList(specificationSelectList.map((option) => {
      if (option.disabled === true && !currentSpecificationsIds.includes(JSON.parse(option.value).id)) {
        return { value: option.value, label: option.label };
      }
      if (option.value === specificationInfos) {
        return { ...option, disabled: true };
      }
      return option;
    }));
  };

  const handleProductSpecificationValueInput = (specificationValue: string, specificationIndex: number) => {
    const currentSpecifications = new CollectionWrapper(produce(specifications.content, draft => {
      draft[specificationIndex].value = specificationValue;
    }));
    setSpecifications(currentSpecifications);
  };

  const handleDeleteProductSpecificationButton = (specificationIndex: number) => {
    const currentSpecifications = new CollectionWrapper(specifications.content
      .filter((_, index) => index !== specificationIndex));
    setSpecifications(currentSpecifications.totalElements !== 0 ? currentSpecifications : null);

    setSpecificationSelectList(specificationSelectList.map((option) => {
      if (option.disabled === true && JSON.parse(option.value).id === specifications.content[specificationIndex].id) {
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
        title="Di chuyển thông số sản phẩm"
      >
        <DragDrop/>
      </ActionIcon>
      <Select
        sx={{ width: '100%' }}
        placeholder="Chọn thông số"
        icon={<AB size={14}/>}
        clearable
        searchable
        value={JSON.stringify({ id: specification.id, name: specification.name, code: specification.code })}
        data={specificationSelectList}
        onChange={specificationInfos => handleProductSpecificationSelect(specificationInfos, index)}
      />
      <TextInput
        sx={{ width: '100%' }}
        placeholder="Nhập giá trị"
        icon={<Keyboard size={14}/>}
        value={specification.value}
        onChange={(event) => handleProductSpecificationValueInput(event.currentTarget.value, index)}
        disabled={isDisabledProductSpecificationValueInput}
      />
      <ActionIcon
        color="red"
        variant="hover"
        size={36}
        title="Xóa thông số"
        onClick={() => handleDeleteProductSpecificationButton(index)}
      >
        <PlaystationX/>
      </ActionIcon>
    </Group>
  );
}

export default ProductSpecificationRow;
