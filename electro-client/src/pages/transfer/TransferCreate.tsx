import React from 'react';
import { Button, Divider, Grid, Group, Paper, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { CreateUpdateTitle, DefaultPropertyPanel, VariantFinder, VariantTable } from 'components';
import TransferConfigs from 'pages/transfer/TransferConfigs';
import useTransferCreateViewModel from 'pages/transfer/TransferCreate.vm';
import { EntityType } from 'components/VariantTable/VariantTable';

function TransferCreate() {
  const {
    form,
    handleFormSubmit,
    handleClickVariantResultItem,
    handleQuantityInput,
    handleDeleteVariantButton,
    handleWarehouseSelectList,
    resetForm,
    warehouseSelectList,
    variants,
  } = useTransferCreateViewModel();

  return (
    <Stack pb={50}>
      <CreateUpdateTitle
        managerPath={TransferConfigs.managerPath}
        title={TransferConfigs.createTitle}
      />

      <DefaultPropertyPanel/>

      <Grid>
        <Grid.Col xs={8}>
          <Paper shadow="xs">
            <Stack spacing="xs" p="sm">
              <VariantFinder
                selectedVariants={variants}
                onClickItem={handleClickVariantResultItem}
                errorSearchInput={form.errors.docketVariants}
              />
              {variants.length > 0 && (
                <VariantTable
                  type={EntityType.TRANSFER}
                  variants={variants}
                  variantRequests={form.values.docketVariants}
                  handleQuantityInput={handleQuantityInput}
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
                      label={TransferConfigs.properties.code.label}
                      {...form.getInputProps('code')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Select
                      required
                      label="Kho xuất"
                      placeholder="--"
                      data={warehouseSelectList}
                      value={form.values['exportDocket.warehouseId']}
                      onChange={value => handleWarehouseSelectList(value, 'export')}
                      error={form.errors['exportDocket.warehouseId']}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Select
                      required
                      label="Kho nhập"
                      placeholder="--"
                      data={warehouseSelectList}
                      value={form.values['importDocket.warehouseId']}
                      onChange={value => handleWarehouseSelectList(value, 'import')}
                      error={form.errors['importDocket.warehouseId']}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Textarea
                      label={TransferConfigs.properties.note.label}
                      {...form.getInputProps('note')}
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

export default TransferCreate;
