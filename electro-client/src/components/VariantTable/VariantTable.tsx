import React from 'react';
import { ActionIcon, Center, Group, NumberInput, Stack, Table, Text } from '@mantine/core';
import { VariantResponse } from 'models/Variant';
import { PurchaseOrderVariantRequest } from 'models/PurchaseOrderVariant';
import MiscUtils from 'utils/MiscUtils';
import { Trash } from 'tabler-icons-react';
import { DocketVariantRequest } from 'models/DocketVariant';

export enum EntityType {
  PURCHASE_ORDER,
  DOCKET,
  TRANSFER,
  ORDER,
  COUNT,
}

interface VariantTableProps {
  type: EntityType;
  variants: VariantResponse[];
  variantRequests: Array<PurchaseOrderVariantRequest | DocketVariantRequest>;
  handleQuantityInput: (quantity: number, index: number) => void;
  handleDeleteVariantButton: (index: number) => void;
}

function VariantTable({
  type,
  variants,
  variantRequests,
  handleQuantityInput,
  handleDeleteVariantButton,
}: VariantTableProps) {
  return (
    <Table
      horizontalSpacing="xs"
      verticalSpacing="sm"
      striped
    >
      <thead>
        <tr>
          <th style={{ textAlign: 'center' }}>STT</th>
          <th>Mặt hàng</th>
          {type === EntityType.PURCHASE_ORDER && <th style={{ textAlign: 'right' }}>Giá vốn</th>}
          <th style={{ textAlign: 'center' }}>Số lượng</th>
          {type === EntityType.PURCHASE_ORDER && <th style={{ textAlign: 'right' }}>Thành tiền</th>}
          <th style={{ textAlign: 'center' }}>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {variants.map((variant, index) => (
          <tr key={variant.id}>
            <td style={{ textAlign: 'center' }}>{index + 1}</td>
            <td>
              <Stack spacing={2}>
                <Text size="sm">
                  {variant.product.name}
                </Text>
                <Group spacing={5}>
                  {variant.properties && variant.properties.content.map(property => (
                    <React.Fragment key={property.code}>
                      <Text size="xs" color="blue" title={property.name}>
                        {property.value}
                      </Text>
                      <Text size="xs" color="dimmed">⋅</Text>
                    </React.Fragment>
                  ))}
                  <Text size="xs" color="dimmed">
                    SKU: {variant.sku}
                  </Text>
                </Group>
              </Stack>
            </td>
            {type === EntityType.PURCHASE_ORDER && (
              <td style={{ textAlign: 'right' }}>
                {MiscUtils.formatPrice(variant.cost) + ' ₫'}
              </td>
            )}
            <td>
              <Center>
                <NumberInput
                  size="xs"
                  placeholder="--"
                  value={variantRequests[index].quantity}
                  onChange={(value) => handleQuantityInput(value || 1, index)}
                  min={1}
                  max={1_000_000}
                  parser={MiscUtils.parserPrice}
                  formatter={MiscUtils.formatterPrice}
                  sx={{ width: 100 }}
                />
              </Center>
            </td>
            {type === EntityType.PURCHASE_ORDER && (
              <td style={{ textAlign: 'right' }}>
                {MiscUtils.formatPrice((variantRequests[index] as PurchaseOrderVariantRequest).amount) + ' ₫'}
              </td>
            )}
            <td>
              <Center>
                <ActionIcon
                  color="red"
                  variant="outline"
                  size={24}
                  title="Xóa mặt hàng này"
                  onClick={() => handleDeleteVariantButton(index)}
                >
                  <Trash size={16}/>
                </ActionIcon>
              </Center>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default VariantTable;
