import React from 'react';
import { Button, Divider, Grid, Group, Paper, Stack, TextInput } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import useProvinceUpdateViewModel from 'pages/province/ProvinceUpdate.vm';

function ProvinceUpdate() {
  const { id } = useParams();
  const {
    province,
    form,
    handleFormSubmit,
  } = useProvinceUpdateViewModel(Number(id));

  if (!province) {
    return null;
  }

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={ProvinceConfigs.managerPath}
        title={ProvinceConfigs.updateTitle}
      />

      <DefaultPropertyPanel
        id={province.id}
        createdAt={province.createdAt}
        updatedAt={province.updatedAt}
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
              <Button type="submit">Cập nhật</Button>
            </Group>
          </Stack>
        </Paper>
      </form>
    </Stack>
  );
}

export default ProvinceUpdate;
