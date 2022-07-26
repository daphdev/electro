import { ActionIcon, Group, Select, TextInput } from '@mantine/core';
import { AB, CircleX, DragDrop, Keyboard } from 'tabler-icons-react';
import React from 'react';
import { CollectionWrapper, SelectOption } from 'types';
import { SpecificationItem } from 'models/Product';

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
    let specification: SpecificationItem;
    if (specificationInfos) {
      const specificationInfosArray = specificationInfos.split('#');
      specification = {
        id: Number(specificationInfosArray[0]),
        name: specificationInfosArray[1],
        code: specificationInfosArray[2],
        value: '',
      };
    } else {
      specification = {
        id: 0,
        name: '',
        code: '',
        value: '',
      };
    }

    const currentSpecifications: CollectionWrapper<SpecificationItem> = {
      content: specifications.content.map((item, index) => (index === specificationIndex) ? specification : item),
      totalElements: specifications.totalElements,
    };
    setSpecifications(currentSpecifications);

    const isIncludeInSpecifications = (specificationInfos: string) => {
      return currentSpecifications.content.map(item => String(item.id)).includes(specificationInfos.split('#')[0]);
    };

    setSpecificationSelectList(specificationSelectList.map((option) => {
      if (option.disabled === true && !isIncludeInSpecifications(option.value)) {
        return { value: option.value, label: option.label };
      }
      if (option.value === specificationInfos) {
        return { ...option, disabled: true };
      }
      return option;
    }));
  };

  const handleProductSpecificationValueInput = (specificationValue: string, specificationIndex: number) => {
    const currentSpecifications: CollectionWrapper<SpecificationItem> = {
      content: specifications.content.map((item, index) => (index === specificationIndex) ? {
        ...item,
        value: specificationValue,
      } : item),
      totalElements: specifications.totalElements,
    };
    setSpecifications(currentSpecifications);
  };

  const handleDeleteProductSpecificationButton = (specificationIndex: number) => {
    const currentSpecifications: CollectionWrapper<SpecificationItem> = {
      content: specifications.content.filter((_, index) => index !== specificationIndex),
      totalElements: specifications.totalElements - 1,
    };
    setSpecifications(currentSpecifications.totalElements !== 0 ? currentSpecifications : null);

    setSpecificationSelectList(specificationSelectList.map(option => {
      if (option.disabled === true && option.value.split('#')[0] === String(specifications.content[specificationIndex].id)) {
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
        value={`${specification.id}#${specification.name}#${specification.code}`}
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
        <CircleX/>
      </ActionIcon>
    </Group>
  );
}

export default ProductSpecificationRow;
