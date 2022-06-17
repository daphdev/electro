import React from 'react';
import { Button, Divider, Group, Paper, Select, SimpleGrid, Stack, TextInput } from '@mantine/core';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import DistrictConfigs from 'pages/district/DistrictConfigs';
import useDistrictCreateViewModel from 'pages/district/DistrictCreate.vm';

function DistrictCreate() {
  const {
    form,
    handleFormSubmit,
    provinceSelectList,
  } = useDistrictCreateViewModel();

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={DistrictConfigs.managerPath}
        title={DistrictConfigs.createTitle}
      />

      <DefaultPropertyPanel/>

      <form onSubmit={handleFormSubmit}>
        <Paper shadow="xs">
          <Stack spacing={0}>
            <SimpleGrid
              p="sm"
              spacing="md"
              breakpoints={[{ minWidth: 'xs', cols: 2 }]}
            >
              <TextInput
                required
                label={DistrictConfigs.properties.name.label}
                {...form.getInputProps('name')}
              />
              <TextInput
                required
                label={DistrictConfigs.properties.code.label}
                {...form.getInputProps('code')}
              />
              <Select
                required
                label={DistrictConfigs.properties.provinceId.label}
                placeholder="--"
                clearable
                searchable
                data={provinceSelectList || []}
                {...form.getInputProps('provinceId')}
              />
            </SimpleGrid>

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

export default DistrictCreate;
