import React from 'react';
import { Button, Divider, Grid, Group, Paper, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import OrderCancellationReasonConfigs from 'pages/order-cancellation-reason/OrderCancellationReasonConfigs';
import useOrderCancellationReasonUpdateViewModel
  from 'pages/order-cancellation-reason/OrderCancellationReasonUpdate.vm';

function OrderCancellationReasonUpdate() {
  const { id } = useParams();
  const {
    orderCancellationReason,
    form,
    handleFormSubmit,
    statusSelectList,
  } = useOrderCancellationReasonUpdateViewModel(Number(id));

  if (!orderCancellationReason) {
    return null;
  }

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={OrderCancellationReasonConfigs.managerPath}
        title={OrderCancellationReasonConfigs.updateTitle}
      />

      <DefaultPropertyPanel
        id={orderCancellationReason.id}
        createdAt={orderCancellationReason.createdAt}
        updatedAt={orderCancellationReason.updatedAt}
        createdBy="1"
        updatedBy="1"
      />

      <form onSubmit={handleFormSubmit}>
        <Paper shadow="xs">
          <Stack spacing={0}>
            <Grid p="sm">
              <Grid.Col>
                <TextInput
                  required
                  label={OrderCancellationReasonConfigs.properties.name.label}
                  {...form.getInputProps('name')}
                />
              </Grid.Col>
              <Grid.Col>
                <Textarea
                  label={OrderCancellationReasonConfigs.properties.note.label}
                  {...form.getInputProps('note')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={OrderCancellationReasonConfigs.properties.status.label}
                  placeholder="--"
                  data={statusSelectList}
                  {...form.getInputProps('status')}
                />
              </Grid.Col>
            </Grid>

            <Divider mt="xs"/>

            <Group position="apart" p="sm">
              <Button variant="default" onClick={form.reset}>Mặc định</Button>
              <Button type="submit">Cập nhật</Button>
            </Group>
          </Stack>
        </Paper>
      </form>
    </Stack>
  );
}

export default OrderCancellationReasonUpdate;
