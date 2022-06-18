import React from 'react';
import { Button, Divider, Grid, Group, Paper, Stack, TextInput } from '@mantine/core';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import useProvinceCreateViewModel from 'pages/province/ProvinceCreate.vm';

function ProvinceCreate() {
  const {
    form,
    handleFormSubmit,
  } = useProvinceCreateViewModel();

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={ProvinceConfigs.managerPath}
        title={ProvinceConfigs.createTitle}
      />

      <DefaultPropertyPanel/>

      <form onSubmit={handleFormSubmit}>
        <Paper shadow="xs">
          <Stack spacing={0}>
            <Grid p="sm">
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={ProvinceConfigs.properties.name.label}
                  {...form.getInputProps('name')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={ProvinceConfigs.properties.code.label}
                  {...form.getInputProps('code')}
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

export default ProvinceCreate;
