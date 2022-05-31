import React from 'react';
import { Button, Divider, Group, Paper, SimpleGrid, Stack, TextInput } from '@mantine/core';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import useProvinceCreateViewModel from 'pages/province/ProvinceCreate.vm';

export default function ProvinceCreate() {
  const { form, handleFormSubmit } = useProvinceCreateViewModel();

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle managerPath={ProvinceConfigs.managerPath} title={ProvinceConfigs.createTitle}/>

      <DefaultPropertyPanel/>

      <form onSubmit={handleFormSubmit}>
        <Paper shadow="xs">
          <Stack spacing={0}>
            <SimpleGrid p="sm" spacing="md" breakpoints={[{ minWidth: 'xs', cols: 2 }]}>
              <TextInput
                required
                label={ProvinceConfigs.properties.name.label}
                {...form.getInputProps('name')}
              />
              <TextInput
                required
                label={ProvinceConfigs.properties.code.label}
                {...form.getInputProps('code')}
              />
            </SimpleGrid>

            <Divider mt="xs"/>

            <Group position="apart" p="sm">
              <Button variant="default" onClick={form.reset}>Tẩy trống</Button>
              <Button type="submit">Thêm</Button>
            </Group>
          </Stack>
        </Paper>
      </form>
    </Stack>
  );
}
