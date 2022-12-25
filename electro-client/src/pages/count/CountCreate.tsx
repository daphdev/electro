import React from 'react';
import { Button, Divider, Grid, Group, Paper, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { CreateUpdateTitle, DefaultPropertyPanel, VariantFinder, VariantTable } from 'components';
import CountConfigs from 'pages/count/CountConfigs';
import useCountCreateViewModel from 'pages/count/CountCreate.vm';
import { EntityType } from 'components/VariantTable/VariantTable';

function CountCreate() {
  const {
    form,
    handleFormSubmit,
    handleClickVariantResultItem,
    handleActualInventoryInput,
    handleDeleteVariantButton,
    resetForm,
    warehouseSelectList,
    statusSelectList,
    variants,
  } = useCountCreateViewModel();

  return (
    <Stack pb={50}>
      <CreateUpdateTitle
        managerPath={CountConfigs.managerPath}
        title={CountConfigs.createTitle}
      />

      <DefaultPropertyPanel/>

      <Grid>
        <Grid.Col xs={8}>
          <Paper shadow="xs">
            <Stack spacing="xs" p="sm">
              <VariantFinder
                selectedVariants={variants}
                onClickItem={handleClickVariantResultItem}
                errorSearchInput={form.errors.countVariants}
              />
              {variants.length > 0 && (
                <VariantTable
                  type={EntityType.COUNT}
                  variants={variants}
                  variantRequests={form.values.countVariants}
                  handleActualInventoryInput={handleActualInventoryInput}
                  handleDeleteVariantButton={handleDeleteVariantButton}
                />
              )}
            </Stack>
          </Paper>
        </Grid.Col>

        <Grid.Col xs={4}>
          <form onSubmit={handleFormSubmit}>
            <Paper shadow="xs">
              <Stack spacing={0}>
                <Grid p="sm">
                  <Grid.Col>
                    <TextInput
                      required
                      label={CountConfigs.properties.code.label}
                      {...form.getInputProps('code')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Select
                      required
                      label="Nhà kho"
                      placeholder="--"
                      data={warehouseSelectList}
                      {...form.getInputProps('warehouseId')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Textarea
                      label="Ghi chú phiếu kiểm kho"
                      {...form.getInputProps('note')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Select
                      required
                      label={CountConfigs.properties.status.label}
                      placeholder="--"
                      data={statusSelectList}
                      {...form.getInputProps('status')}
                    />
                  </Grid.Col>
                </Grid>

                <Divider mt="xs"/>

                <Group position="apart" p="sm">
                  <Button variant="default" onClick={resetForm}>Mặc định</Button>
                  <Button type="submit">Thêm</Button>
                </Group>
              </Stack>
            </Paper>
          </form>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

export default CountCreate;
