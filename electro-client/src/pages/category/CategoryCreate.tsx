import React from 'react';
import { Button, Divider, Grid, Group, Paper, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import CategoryConfigs from 'pages/category/CategoryConfigs';
import useCategoryCreateViewModel from 'pages/category/CategoryCreate.vm';

function CategoryCreate() {
  const {
    form,
    handleFormSubmit,
    categorySelectList,
    statusSelectList,
  } = useCategoryCreateViewModel();

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={CategoryConfigs.managerPath}
        title={CategoryConfigs.createTitle}
      />

      <DefaultPropertyPanel/>

      <form onSubmit={handleFormSubmit}>
        <Paper shadow="xs">
          <Stack spacing={0}>
            <Grid p="sm">
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={CategoryConfigs.properties.name.label}
                  {...form.getInputProps('name')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={CategoryConfigs.properties.slug.label}
                  {...form.getInputProps('slug')}
                />
              </Grid.Col>
              <Grid.Col>
                <Textarea
                  label={CategoryConfigs.properties.description.label}
                  {...form.getInputProps('description')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label={CategoryConfigs.properties.thumbnail.label}
                  {...form.getInputProps('thumbnail')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  label={CategoryConfigs.properties.parentCategoryId.label}
                  placeholder="--"
                  clearable
                  searchable
                  data={categorySelectList}
                  {...form.getInputProps('parentCategoryId')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={CategoryConfigs.properties.status.label}
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

export default CategoryCreate;
