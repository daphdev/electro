import React, { useState } from 'react';
import { Button, Divider, Grid, Group, NumberInput, Paper, Select, Stack, Tabs, Text, TextInput } from '@mantine/core';
import { CreateUpdateTitle, DefaultPropertyPanel, EntityFinder } from 'components';
import PromotionConfigs, { AddProductMode } from 'pages/promotion/PromotionConfigs';
import usePromotionCreateViewModel from 'pages/promotion/PromotionCreate.vm';
import { DateRangePicker } from '@mantine/dates';
import DateUtils from 'utils/DateUtils';
import { CategoryResponse } from 'models/Category';
import CategoryConfigs from 'pages/category/CategoryConfigs';
import { ProductResponse } from 'models/Product';
import ProductConfigs from 'pages/product/ProductConfigs';

function PromotionCreate() {
  const {
    form,
    handleFormSubmit,
    statusSelectList,
    setAddProductMode,
    categories, setCategories,
    handleAddCategoryFinder,
    handleDeleteCategoryFinder,
    products, setProducts,
    handleAddProductFinder,
    handleDeleteProductFinder,
  } = usePromotionCreateViewModel();

  const [activeTab, setActiveTab] = useState(0);

  const onTabChange = (active: number, tabKey: AddProductMode) => {
    setActiveTab(active);
    setAddProductMode(tabKey);
    form.setFieldValue('categoryIds', []);
    form.setFieldValue('productIds', []);
    setCategories([]);
    setProducts([]);
  };

  const resetForm = () => {
    form.reset();
    setCategories([]);
    setProducts([]);
  };

  return (
    <Stack pb={50}>
      <CreateUpdateTitle
        managerPath={PromotionConfigs.managerPath}
        title={PromotionConfigs.createTitle}
      />

      <DefaultPropertyPanel/>

      <Grid>
        <Grid.Col xs={8}>
          <Paper shadow="xs" p="sm">
            <Tabs variant="pills" active={activeTab} onTabChange={onTabChange}>
              <Tabs.Tab tabKey={AddProductMode.CATEGORY} label="Danh mục">
                <EntityFinder<CategoryResponse>
                  selections={categories}
                  onClickItem={handleAddCategoryFinder}
                  onDeleteItem={handleDeleteCategoryFinder}
                  options={{
                    resourceUrl: CategoryConfigs.resourceUrl,
                    resourceKey: CategoryConfigs.resourceKey,
                    resultListSize: 5,
                    resultFragment: categoryResponse => <Text size="sm">{categoryResponse.name}</Text>,
                    inputLabel: 'Thêm danh mục sản phẩm',
                    inputPlaceholder: 'Nhập tên danh mục sản phẩm',
                    selectedFragment: categoryResponse => <Text size="sm">{categoryResponse.name}</Text>,
                    deleteButtonTitle: 'Xóa danh mục sản phẩm này',
                  }}
                  errorSearchInput={form.errors.categoryIds}
                />
              </Tabs.Tab>
              <Tabs.Tab tabKey={AddProductMode.PRODUCT} label="Sản phẩm">
                <EntityFinder<ProductResponse>
                  selections={products}
                  onClickItem={handleAddProductFinder}
                  onDeleteItem={handleDeleteProductFinder}
                  options={{
                    resourceUrl: ProductConfigs.resourceUrl,
                    resourceKey: ProductConfigs.resourceKey,
                    resultListSize: 5,
                    resultFragment: productResponse => (
                      <Stack spacing={2}>
                        <Text size="sm">{productResponse.name}</Text>
                        <Group spacing="xs">
                          <Text size="xs" color="dimmed">Mã: {productResponse.code}</Text>
                          <Text size="xs" color="dimmed">Danh mục: {productResponse.category?.name}</Text>
                        </Group>
                      </Stack>
                    ),
                    inputLabel: 'Thêm sản phẩm',
                    inputPlaceholder: 'Nhập tên sản phẩm',
                    selectedFragment: productResponse => (
                      <Stack spacing={2}>
                        <Text size="sm">{productResponse.name}</Text>
                        <Group spacing="xs">
                          <Text size="xs" color="dimmed">Mã: {productResponse.code}</Text>
                          <Text size="xs" color="dimmed">Danh mục: {productResponse.category?.name}</Text>
                        </Group>
                      </Stack>
                    ),
                    deleteButtonTitle: 'Xóa sản phẩm này',
                  }}
                  errorSearchInput={form.errors.productIds}
                />
              </Tabs.Tab>
            </Tabs>
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
                      label={PromotionConfigs.properties.name.label}
                      {...form.getInputProps('name')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <DateRangePicker
                      required
                      locale="vi"
                      inputFormat="DD/MM/YYYY"
                      labelFormat="MM/YYYY"
                      clearable={false}
                      minDate={DateUtils.today()}
                      allowSingleDateInRange={false}
                      label="Khoảng thời gian"
                      placeholder="Chọn thời gian diễn ra khuyến mãi"
                      value={form.values.range}
                      onChange={value => form.setFieldValue('range', value)}
                      error={form.errors['range.0']}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <NumberInput
                      required
                      label={PromotionConfigs.properties.percent.label}
                      min={1}
                      max={100}
                      {...form.getInputProps('percent')}
                    />
                  </Grid.Col>
                  <Grid.Col>
                    <Select
                      required
                      label={PromotionConfigs.properties.status.label}
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

export default PromotionCreate;
