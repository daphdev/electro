import React from 'react';
import { Button, Divider, Grid, Group, Paper, Select, Stack, TextInput } from '@mantine/core';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import AddressConfigs from 'pages/address/AddressConfigs';
import useAddressCreateViewModel from 'pages/address/AddressCreate.vm';

function AddressCreate() {
  const {
    form,
    handleFormSubmit,
    provinceSelectList,
    districtSelectList,
  } = useAddressCreateViewModel();

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={AddressConfigs.managerPath}
        title={AddressConfigs.createTitle}
      />

      <DefaultPropertyPanel/>

      <form onSubmit={handleFormSubmit}>
        <Paper shadow="xs">
          <Stack spacing={0}>
            <Grid p="sm">
              <Grid.Col>
                <TextInput
                  label={AddressConfigs.properties.line.label}
                  {...form.getInputProps('line')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  label={AddressConfigs.properties.provinceId.label}
                  placeholder="--"
                  clearable
                  searchable
                  data={provinceSelectList}
                  {...form.getInputProps('provinceId')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  label={AddressConfigs.properties.districtId.label}
                  placeholder="--"
                  clearable
                  searchable
                  data={districtSelectList}
                  {...form.getInputProps('districtId')}
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

export default AddressCreate;
