import React from 'react';
import { Button, Divider, Grid, Group, Paper, Select, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { CreateUpdateTitle, DefaultPropertyPanel, VariantFinder, VariantTable } from 'components';
import PurchaseOrderConfigs from 'pages/purchase-order/PurchaseOrderConfigs';
import usePurchaseOrderCreateViewModel from 'pages/purchase-order/PurchaseOrderCreate.vm';
import MiscUtils from 'utils/MiscUtils';
import { EntityType } from 'components/VariantTable/VariantTable';

function PurchaseOrderCreate() {
  const {
    form,
    handleFormSubmit,
    handleClickVariantResultItem,
    handleQuantityInput,
    handleDeleteVariantButton,
    resetForm,
    supplierSelectList,
    destinationSelectList,
    statusSelectList,
    variants,
  } = usePurchaseOrderCreateViewModel();

  return (
    <Stack pb={50}>
      <CreateUpdateTitle
        managerPath={PurchaseOrderConfigs.managerPath}
        title={PurchaseOrderConfigs.createTitle}
      />

      <DefaultPropertyPanel/>

      <Grid>
        <Grid.Col xs={8}>
          <Paper shadow="xs">
            <Stack spacing="xs" p="sm">
              <VariantFinder
                selectedVariants={variants}
                onClickItem={handleClickVariantResultItem}
                errorSearchInput={form.errors.purchaseOrderVariants}
              />
              {variants.length > 0 && (
                <VariantTable
                  type={EntityType.PURCHASE_ORDER}
                  variants={variants}
                  variantRequests={form.values.purchaseOrderVariants}
                  handleQuantityInput={handleQuantityInput}
                  handleDeleteVariantButton={handleDeleteVariantButton}
                />
              )}
            </Stack>

            <Divider mt={5}/>

            <Text p="sm" size="sm" weight={500} sx={{ textAlign: 'right' }}>
              <span>Tổng thành tiền: </span>
              <Text size="md" color="blue" component="span">
                {MiscUtils.formatPrice(form.values.totalAmount) + ' ₫'}
              </Text>
            </Text>
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
                      label={PurchaseOrderConfigs.properties.code.label}
                      {...form.getInputProps('code')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Select
                      required
                      label="Nhà cung cấp"
                      placeholder="--"
                      searchable
                      data={supplierSelectList}
                      {...form.getInputProps('supplierId')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Select
                      required
                      label="Điểm nhập hàng"
                      placeholder="--"
                      searchable
                      data={destinationSelectList}
                      {...form.getInputProps('destinationId')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Textarea
                      label={PurchaseOrderConfigs.properties.note.label}
                      {...form.getInputProps('note')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Select
                      required
                      label={PurchaseOrderConfigs.properties.status.label}
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

export default PurchaseOrderCreate;
