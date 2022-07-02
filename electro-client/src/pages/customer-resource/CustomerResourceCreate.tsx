import React from 'react';
import { Button, ColorInput, Divider, Grid, Group, Paper, Select, Stack, TextInput } from '@mantine/core';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import CustomerResourceConfigs from 'pages/customer-resource/CustomerResourceConfigs';
import useCustomerResourceCreateViewModel from 'pages/customer-resource/CustomerResourceCreate.vm';

function CustomerResourceCreate() {
  const {
    form,
    handleFormSubmit,
    statusSelectList,
  } = useCustomerResourceCreateViewModel();

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={CustomerResourceConfigs.managerPath}
        title={CustomerResourceConfigs.createTitle}
      />

      <DefaultPropertyPanel/>

      <form onSubmit={handleFormSubmit}>
        <Paper shadow="xs">
          <Stack spacing={0}>
            <Grid p="sm">
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={CustomerResourceConfigs.properties.code.label}
                  {...form.getInputProps('code')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={CustomerResourceConfigs.properties.name.label}
                  {...form.getInputProps('name')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  required
                  label={CustomerResourceConfigs.properties.description.label}
                  {...form.getInputProps('description')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <ColorInput
                  required
                  label={CustomerResourceConfigs.properties.color.label}
                  {...form.getInputProps('color')}
                  placeholder="Chọn màu"
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={CustomerResourceConfigs.properties.status.label}
                  placeholder="--"
                  data={statusSelectList}
                  {...form.getInputProps('status')}
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

export default CustomerResourceCreate;
