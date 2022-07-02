import React from 'react';
import { Button, Divider, Grid, Group, Paper, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import BrandConfigs from 'pages/brand/BrandConfigs';
import useBrandUpdateViewModel from 'pages/brand/BrandUpdate.vm';

function BrandUpdate() {
  const { id } = useParams();
  const {
    brand,
    form,
    handleFormSubmit,
    statusSelectList,
  } = useBrandUpdateViewModel(Number(id));

  if (!brand) {
    return null;
  }

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={BrandConfigs.managerPath}
        title={BrandConfigs.updateTitle}
      />

      <DefaultPropertyPanel
        id={brand.id}
        createdAt={brand.createdAt}
        updatedAt={brand.updatedAt}
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
                  label={BrandConfigs.properties.name.label}
                  {...form.getInputProps('name')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={BrandConfigs.properties.code.label}
                  {...form.getInputProps('code')}
                />
              </Grid.Col>
              <Grid.Col>
                <Textarea
                  label={BrandConfigs.properties.description.label}
                  {...form.getInputProps('description')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={BrandConfigs.properties.status.label}
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

export default BrandUpdate;
