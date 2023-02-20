import React from 'react';
import {
  Badge,
  Button,
  Divider,
  Grid,
  Group,
  Paper,
  Select,
  Stack,
  Text,
  Textarea,
  Title,
  useMantineTheme
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import WaybillConfigs from 'pages/waybill/WaybillConfigs';
import useWaybillUpdateViewModel from 'pages/waybill/WaybillUpdate.vm';
import DateUtils from 'utils/DateUtils';
import MiscUtils from 'utils/MiscUtils';

function WaybillUpdate() {
  const theme = useMantineTheme();

  const { id } = useParams();
  const {
    waybill,
    form,
    handleFormSubmit,
    ghnRequiredNoteSelectList,
  } = useWaybillUpdateViewModel(Number(id));

  const waybillStatusBadgeFragment = (status: number) => {
    switch (status) {
    case 1:
      return <Badge variant="outline" size="sm" color="gray">Đợi lấy hàng</Badge>;
    case 2:
      return <Badge variant="outline" size="sm" color="blue">Đang giao</Badge>;
    case 3:
      return <Badge variant="outline" size="sm" color="green">Đã giao</Badge>;
    case 4:
      return <Badge variant="outline" size="sm" color="red">Hủy</Badge>;
    }
  };

  if (!waybill) {
    return null;
  }

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={WaybillConfigs.managerPath}
        title={WaybillConfigs.updateTitle}
      />

      <DefaultPropertyPanel
        id={waybill.id}
        createdAt={waybill.createdAt}
        updatedAt={waybill.updatedAt}
        createdBy="1"
        updatedBy="1"
      />

      <form onSubmit={handleFormSubmit}>
        <Paper shadow="xs">
          <Stack spacing={0}>
            <Grid p="sm">
              <Grid.Col>
                <Title order={4}>Thông tin vận đơn</Title>
                <Text size="sm">Một số thông tin chung</Text>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stack spacing={4}>
                  <Text size="sm" weight={500}>Mã vận đơn</Text>
                  <Text sx={{ fontFamily: theme.fontFamilyMonospace }}>{waybill.code}</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stack spacing={4}>
                  <Text size="sm" weight={500}>Mã đơn hàng</Text>
                  <Text sx={{ fontFamily: theme.fontFamilyMonospace }}>{waybill.order.code}</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stack spacing={4}>
                  <Text size="sm" weight={500}>Ngày gửi hàng</Text>
                  <Text>{DateUtils.isoDateToString(waybill.shippingDate, 'DD/MM/YYYY')}</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stack spacing={4}>
                  <Text size="sm" weight={500}>Thời gian giao dự kiến</Text>
                  <Text>{DateUtils.isoDateToString(waybill.expectedDeliveryTime, 'DD/MM/YYYY')}</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stack spacing={4}>
                  <Text size="sm" weight={500}>Trạng thái</Text>
                  <Text>{waybillStatusBadgeFragment(waybill.status)}</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stack spacing={4}>
                  <Text size="sm" weight={500}>Người trả phí dịch vụ GHN</Text>
                  <Text>{WaybillConfigs.ghnPaymentTypeIdMap[waybill.ghnPaymentTypeId]}</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stack spacing={4}>
                  <Text size="sm" weight={500}>Tiền thu hộ</Text>
                  <Text>{MiscUtils.formatPrice(waybill.codAmount)} ₫</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stack spacing={4}>
                  <Text size="sm" weight={500}>Phí vận chuyển</Text>
                  <Text>{MiscUtils.formatPrice(waybill.shippingFee)} ₫</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stack spacing={4}>
                  <Text size="sm" weight={500}>Khối lượng kiện hàng</Text>
                  <Text>{MiscUtils.formatPrice(waybill.weight)} gram</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stack spacing={4}>
                  <Text size="sm" weight={500}>Chiều dài kiện hàng</Text>
                  <Text>{MiscUtils.formatPrice(waybill.length)} cm</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stack spacing={4}>
                  <Text size="sm" weight={500}>Chiều rộng kiện hàng</Text>
                  <Text>{MiscUtils.formatPrice(waybill.width)} cm</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Stack spacing={4}>
                  <Text size="sm" weight={500}>Chiều cao kiện hàng</Text>
                  <Text>{MiscUtils.formatPrice(waybill.height)} cm</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col>
                <Title order={4}>Thay đổi thông tin vận đơn</Title>
                <Text size="sm">Thay đổi một số thông tin cho phép</Text>
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

            <Group position="right" p="sm">
              <Button type="submit">Cập nhật</Button>
            </Group>
          </Stack>
        </Paper>
      </form>
    </Stack>
  );
}

export default WaybillUpdate;
