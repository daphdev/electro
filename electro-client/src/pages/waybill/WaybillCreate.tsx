import React, { useState } from 'react';
import { Button, Divider, Grid, Group, Loader, NumberInput, Paper, Select, Stack, Textarea } from '@mantine/core';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import WaybillConfigs from 'pages/waybill/WaybillConfigs';
import useWaybillCreateViewModel from 'pages/waybill/WaybillCreate.vm';
import { DatePicker } from '@mantine/dates';
import { useDebouncedValue } from '@mantine/hooks';
import { SelectOption } from 'types';
import useGetAllApi from 'hooks/use-get-all-api';
import { OrderResponse } from 'models/Order';
import OrderConfigs from 'pages/order/OrderConfigs';
import DateUtils from 'utils/DateUtils';

function WaybillCreate() {
  const {
    form,
    handleFormSubmit,
    ghnRequiredNoteSelectList,
  } = useWaybillCreateViewModel();

  const [orderSelectKeyword, setOrderSelectKeyword] = useState('');
  const [orderSelectDebouncedKeyword] = useDebouncedValue(orderSelectKeyword, 400);
  const [orderSelectList, setOrderSelectList] = useState<SelectOption[]>([]);

  const { isFetching: isFetchingOrderListResponse } = useGetAllApi<OrderResponse>(
    OrderConfigs.resourceUrl,
    OrderConfigs.resourceKey,
    { size: 5, filter: 'status==1', search: orderSelectDebouncedKeyword },
    (orderListResponse) => {
      const selectList: SelectOption[] = orderListResponse.content.map((item) => ({
        value: String(item.id),
        label: item.code,
      }));
      setOrderSelectList(selectList);
    }
  );

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={WaybillConfigs.managerPath}
        title={WaybillConfigs.createTitle}
      />

      <DefaultPropertyPanel/>

      <form onSubmit={handleFormSubmit}>
        <Paper shadow="xs">
          <Stack spacing={0}>
            <Grid p="sm">
              <Grid.Col>
                <Select
                  required
                  rightSection={isFetchingOrderListResponse ? <Loader size={16}/> : null}
                  label="Đơn hàng"
                  placeholder="Nhập mã đơn hàng và chọn đơn hàng"
                  searchable
                  clearable
                  onSearchChange={setOrderSelectKeyword}
                  data={orderSelectList}
                  {...form.getInputProps('orderId')}
                />
              </Grid.Col>
              <Grid.Col>
                <DatePicker
                  required
                  locale="vi"
                  inputFormat="DD/MM/YYYY"
                  labelFormat="MM/YYYY"
                  label="Ngày gửi hàng"
                  minDate={DateUtils.today()}
                  {...form.getInputProps('shippingDate')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <NumberInput
                  required
                  min={1}
                  max={30000}
                  label="Khối lượng kiện hàng"
                  description="Tính theo gram. Tối đa 30.000 gram."
                  {...form.getInputProps('weight')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <NumberInput
                  required
                  min={1}
                  max={150}
                  label="Chiều dài kiện hàng"
                  description="Tính theo cm. Tối đa 150 cm."
                  {...form.getInputProps('length')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <NumberInput
                  required
                  min={1}
                  max={150}
                  label="Chiều rộng kiện hàng"
                  description="Tính theo cm. Tối đa 150 cm."
                  {...form.getInputProps('width')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <NumberInput
                  required
                  min={1}
                  max={150}
                  label="Chiều cao kiện hàng"
                  description="Tính theo cm. Tối đa 150 cm."
                  {...form.getInputProps('height')}
                />
              </Grid.Col>
              <Grid.Col>
                <Textarea
                  label="Ghi chú vận đơn"
                  {...form.getInputProps('note')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label="Ghi chú cho dịch vụ GHN"
                  placeholder="--"
                  data={ghnRequiredNoteSelectList}
                  {...form.getInputProps('ghnRequiredNote')}
                />
              </Grid.Col>
            </Grid>

            <Divider mt="xs"/>

            <Group position="apart" p="sm">
              <Button variant="default" onClick={form.reset}>Mặc định</Button>
              <Button type="submit">Thêm</Button>
            </Group>
          </Stack>
        </Paper>
      </form>
    </Stack>
  );
}

export default WaybillCreate;
