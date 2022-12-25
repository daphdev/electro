import React, { useState } from 'react';
import {
  Button,
  Divider,
  Grid,
  Group,
  Loader,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { CreateUpdateTitle, DefaultPropertyPanel, VariantFinder, VariantTable } from 'components';
import OrderConfigs from 'pages/order/OrderConfigs';
import useOrderUpdateViewModel from 'pages/order/OrderUpdate.vm';
import { useDebouncedValue } from '@mantine/hooks';
import { SelectOption } from 'types';
import useGetAllApi from 'hooks/use-get-all-api';
import { CustomerResponse } from 'models/Customer';
import CustomerConfigs from 'pages/customer/CustomerConfigs';
import { EntityType } from 'components/VariantTable/VariantTable';
import MiscUtils from 'utils/MiscUtils';

function OrderUpdate() {
  const { id } = useParams();
  const {
    order,
    form,
    handleFormSubmit,
    handleClickVariantResultItem,
    handleQuantityInput,
    handleDeleteVariantButton,
    handleShippingCostInput,
    resetForm,
    orderResourceSelectList,
    orderCancellationReasonSelectList,
    statusSelectList,
    variants,
  } = useOrderUpdateViewModel(Number(id));

  const [customerSelectKeyword, setCustomerSelectKeyword] = useState('');

  const [customerSelectDebouncedKeyword] = useDebouncedValue(customerSelectKeyword, 400);

  const [customerSelectList, setCustomerSelectList] = useState<SelectOption[]>([]);

  const { isFetching: isFetchingCustomerListResponse } = useGetAllApi<CustomerResponse>(
    CustomerConfigs.resourceUrl,
    CustomerConfigs.resourceKey,
    {
      filter: (form.values.customerId && customerSelectDebouncedKeyword === '') ? `id==${form.values.customerId}` : '',
      size: 5,
      search: customerSelectDebouncedKeyword,
    },
    (customerListResponse) => {
      const selectList: SelectOption[] = customerListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.user.fullname,
      }));
      setCustomerSelectList(selectList);
    }
  );

  if (!order) {
    return null;
  }

  return (
    <Stack pb={50}>
      <CreateUpdateTitle
        managerPath={OrderConfigs.managerPath}
        title={OrderConfigs.updateTitle}
      />

      <DefaultPropertyPanel
        id={order.id}
        createdAt={order.createdAt}
        updatedAt={order.updatedAt}
        createdBy="1"
        updatedBy="1"
      />

      <Grid>
        <Grid.Col xs={8}>
          <Paper shadow="xs">
            <Stack spacing="xs" p="sm">
              <VariantFinder
                selectedVariants={variants}
                onClickItem={handleClickVariantResultItem}
                errorSearchInput={form.errors.orderVariants}
              />
              {variants.length > 0 && (
                <VariantTable
                  type={EntityType.ORDER}
                  variants={variants}
                  variantRequests={form.values.orderVariants}
                  handleQuantityInput={handleQuantityInput}
                  handleDeleteVariantButton={handleDeleteVariantButton}
                />
              )}
            </Stack>

            <Divider mt={5}/>

            <Group position="right">
              <Grid p="sm" gutter="xs" style={{ width: '45%' }}>
                <Grid.Col span={6}>
                  <Text size="sm" weight={500}>Tổng thành tiền:</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="md" color="blue" weight={500} sx={{ textAlign: 'right' }}>
                    {MiscUtils.formatPrice(form.values.totalAmount) + ' ₫'}
                  </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" weight={500}>Thuế ({form.values.tax * 100 + '%'}):</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="md" color="blue" weight={500} sx={{ textAlign: 'right' }}>
                    {MiscUtils.formatPrice(Number((form.values.totalAmount * form.values.tax).toFixed(0))) + ' ₫'}
                  </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" weight={500}>Phí vận chuyển:</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <NumberInput
                    size="xs"
                    placeholder="--"
                    value={form.values.shippingCost}
                    onChange={(value) => handleShippingCostInput(value || 0)}
                    error={form.errors.shippingCost}
                    min={0}
                    step={100}
                    icon={'₫'}
                    parser={MiscUtils.parserPrice}
                    formatter={MiscUtils.formatterPrice}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" weight={500}>Tổng tiền trả:</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="md" color="blue" weight={500} sx={{ textAlign: 'right' }}>
                    {MiscUtils.formatPrice(form.values.totalPay) + ' ₫'}
                  </Text>
                </Grid.Col>
              </Grid>
            </Group>
          </Paper>
        </Grid.Col>

        <Grid.Col xs={4}>
          <form onSubmit={handleFormSubmit}>
            <Paper shadow="xs">
              <Stack spacing={0}>
                <Grid p="sm">
                  <Grid.Col>
                    <Select
                      required
                      rightSection={isFetchingCustomerListResponse ? <Loader size={16}/> : null}
                      label="Khách hàng"
                      placeholder="--"
                      searchable
                      onSearchChange={setCustomerSelectKeyword}
                      data={customerSelectList}
                      {...form.getInputProps('customerId')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <TextInput
                      required
                      label={OrderConfigs.properties.code.label}
                      {...form.getInputProps('code')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Select
                      required
                      label={OrderConfigs.properties.status.label}
                      placeholder="--"
                      data={statusSelectList}
                      {...form.getInputProps('status')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Select
                      required
                      label="Nguồn đơn hàng"
                      placeholder="--"
                      data={orderResourceSelectList}
                      {...form.getInputProps('orderResourceId')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Select
                      label="Lý do hủy đơn hàng"
                      placeholder="--"
                      clearable
                      data={orderCancellationReasonSelectList}
                      // Chỉ bật khi trạng thái đơn hàng là "Hủy bỏ" (6)
                      disabled={form.values.status !== '6'}
                      {...form.getInputProps('orderCancellationReasonId')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Textarea
                      label="Ghi chú đơn hàng"
                      {...form.getInputProps('note')}
                    />
                  </Grid.Col>
                </Grid>

                <Divider mt="xs"/>

                <Group position="apart" p="sm">
                  <Button variant="default" onClick={resetForm}>Mặc định</Button>
                  <Button type="submit">Cập nhật</Button>
                </Group>
              </Stack>
            </Paper>
          </form>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

export default OrderUpdate;
