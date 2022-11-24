import React from 'react';
import { Button, ColorInput, Divider, Grid, Group, Paper, Select, Stack, TextInput } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import OrderResourceConfigs from 'pages/order-resource/OrderResourceConfigs';
import useOrderResourceUpdateViewModel from 'pages/order-resource/OrderResourceUpdate.vm';

function OrderResourceUpdate() {
  const { id } = useParams();
  const {
    orderResource,
    form,
    handleFormSubmit,
    customerResourceSelectList,
    statusSelectList,
  } = useOrderResourceUpdateViewModel(Number(id));

  if (!orderResource) {
    return null;
  }

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={OrderResourceConfigs.managerPath}
        title={OrderResourceConfigs.updateTitle}
      />

      <DefaultPropertyPanel
        id={orderResource.id}
        createdAt={orderResource.createdAt}
        updatedAt={orderResource.updatedAt}
        createdBy="1"
        updatedBy="1"
      />

      <form onSubmit={handleFormSubmit}>
        <Paper shadow="xs">
          <Stack spacing={0}>
            <Grid p="sm">
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={OrderResourceConfigs.properties.code.label}
                  {...form.getInputProps('code')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={OrderResourceConfigs.properties.name.label}
                  {...form.getInputProps('name')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <ColorInput
                  required
                  label={OrderResourceConfigs.properties.color.label}
                  {...form.getInputProps('color')}
                  placeholder="Chọn màu"
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  label={OrderResourceConfigs.properties.customerResourceId.label}
                  placeholder="--"
                  clearable
                  data={customerResourceSelectList}
                  {...form.getInputProps('customerResourceId')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={OrderResourceConfigs.properties.status.label}
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

export default OrderResourceUpdate;
