import React from 'react';
import { Button, Divider, Group, Paper, Select, SimpleGrid, Stack, TextInput } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import DistrictConfigs from 'pages/district/DistrictConfigs';
import useDistrictUpdateViewModel from 'pages/district/DistrictUpdate.vm';

function DistrictUpdate() {
  const { id } = useParams();
  const {
    district,
    form,
    handleFormSubmit,
    provinceSelectList,
  } = useDistrictUpdateViewModel(Number(id));

  if (!district) {
    return null;
  }

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={DistrictConfigs.managerPath}
        title={DistrictConfigs.updateTitle}
      />

      <DefaultPropertyPanel
        id={district.id}
        createdAt={district.createdAt}
        updatedAt={district.updatedAt}
        createdBy="1"
        updatedBy="1"
      />

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
              <Button type="submit">Cập nhật</Button>
            </Group>
          </Stack>
        </Paper>
      </form>
    </Stack>
  );
}

export default DistrictUpdate;
