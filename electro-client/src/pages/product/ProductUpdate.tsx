import React from 'react';
import {
  Button,
  Divider,
  Grid,
  Group,
  MultiSelect,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import {
  CreateUpdateTitle,
  DefaultPropertyPanel,
  ProductImagesDropzone,
  ProductProperties,
  ProductSpecifications,
  ProductVariantsForUpdate
} from 'components';
import ProductConfigs from 'pages/product/ProductConfigs';
import useProductUpdateViewModel from 'pages/product/ProductUpdate.vm';
import MiscUtils from 'utils/MiscUtils';
import { ImageResponse } from 'models/Image';

function ProductUpdate() {
  const { id } = useParams();
  const {
    product,
    form,
    prevFormValues,
    handleFormSubmit,
    statusSelectList,
    categorySelectList,
    brandSelectList,
    supplierSelectList,
    unitSelectList,
    tagSelectList,
    guaranteeSelectList,
    imageFiles, setImageFiles,
    thumbnailName, setThumbnailName,
    specificationSelectList, setSpecificationSelectList,
    productPropertySelectList, setProductPropertySelectList,
    selectedVariantIndexes, setSelectedVariantIndexes,
    resetForm,
  } = useProductUpdateViewModel(Number(id));

  if (!product) {
    return null;
  }

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={ProductConfigs.managerPath}
        title={ProductConfigs.updateTitle}
      />

      <DefaultPropertyPanel
        id={product.id}
        createdAt={product.createdAt}
        updatedAt={product.updatedAt}
        createdBy="1"
        updatedBy="1"
      />

      <form onSubmit={handleFormSubmit}>
        <Paper shadow="xs">
          <Stack spacing={0}>
            <Grid p="sm">
              <Grid.Col>
                <Title order={4}>Thông tin cơ bản</Title>
                <Text size="sm">Một số thông tin chung</Text>
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  required
                  label={ProductConfigs.properties.name.label}
                  {...form.getInputProps('name')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={ProductConfigs.properties.code.label}
                  {...form.getInputProps('code')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={ProductConfigs.properties.slug.label}
                  {...form.getInputProps('slug')}
                />
              </Grid.Col>
              <Grid.Col>
                <Textarea
                  label={ProductConfigs.properties.shortDescription.label}
                  {...form.getInputProps('shortDescription')}
                />
              </Grid.Col>
              <Grid.Col>
                <Textarea
                  label={ProductConfigs.properties.description.label}
                  {...form.getInputProps('description')}
                />
              </Grid.Col>
              <Grid.Col>
                <Title order={4}>Hình sản phẩm</Title>
                <Text size="sm">Thêm danh sách hình giới thiệu sản phẩm và chọn hình đại diện</Text>
              </Grid.Col>
              <Grid.Col>
                <ProductImagesDropzone
                  imageFiles={imageFiles}
                  setImageFiles={setImageFiles}
                  thumbnailName={thumbnailName}
                  setThumbnailName={setThumbnailName}
                  imageResponses={form.values.images as ImageResponse[]}
                  setImageResponses={(imageResponses) => form.setFieldValue('images', imageResponses)}
                />
              </Grid.Col>
              <Grid.Col>
                <Title order={4}>Thông số sản phẩm</Title>
                <Text size="sm">Thêm các thông số của sản phẩm</Text>
              </Grid.Col>
              <Grid.Col>
                <ProductSpecifications
                  specifications={form.values.specifications}
                  setSpecifications={(specifications) => form.setFieldValue('specifications', specifications)}
                  specificationSelectList={specificationSelectList}
                  setSpecificationSelectList={setSpecificationSelectList}
                />
              </Grid.Col>
              <Grid.Col>
                <Title order={4}>Thuộc tính sản phẩm</Title>
                <Text size="sm">Thêm mới thuộc tính giúp sản phẩm có nhiều lựa chọn, như kích cỡ hay màu sắc</Text>
              </Grid.Col>
              <Grid.Col>
                <ProductProperties
                  productProperties={form.values.properties}
                  setProductProperties={(productProperties) => form.setFieldValue('properties', productProperties)}
                  productPropertySelectList={productPropertySelectList}
                  setProductPropertySelectList={setProductPropertySelectList}
                />
              </Grid.Col>
              <Grid.Col>
                <Title order={4}>Phiên bản sản phẩm</Title>
                <Text size="sm">Phiên bản mặc định của sản phẩm hoặc phiên bản dựa vào thuộc tính sản phẩm</Text>
              </Grid.Col>
              <Grid.Col>
                <ProductVariantsForUpdate
                  variants={form.values.variants}
                  setVariants={(variants) => form.setFieldValue('variants', variants)}
                  productProperties={form.values.properties}
                  setProductProperties={(productProperties) => form.setFieldValue('properties', productProperties)}
                  selectedVariantIndexes={selectedVariantIndexes}
                  setSelectedVariantIndexes={setSelectedVariantIndexes}
                />
              </Grid.Col>
              <Grid.Col>
                <Title order={4}>Thông tin bổ sung</Title>
                <Text size="sm">Một số thông tin thêm</Text>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={ProductConfigs.properties.status.label}
                  placeholder="--"
                  data={statusSelectList}
                  {...form.getInputProps('status')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  label={ProductConfigs.properties.categoryId.label}
                  placeholder="--"
                  clearable
                  searchable
                  data={categorySelectList}
                  {...form.getInputProps('categoryId')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  label={ProductConfigs.properties.brandId.label}
                  placeholder="--"
                  clearable
                  searchable
                  data={brandSelectList}
                  {...form.getInputProps('brandId')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  label={ProductConfigs.properties.supplierId.label}
                  placeholder="--"
                  clearable
                  searchable
                  data={supplierSelectList}
                  {...form.getInputProps('supplierId')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  label={ProductConfigs.properties.unitId.label}
                  placeholder="--"
                  clearable
                  data={unitSelectList}
                  {...form.getInputProps('unitId')}
                />
              </Grid.Col>
              <Grid.Col>
                <MultiSelect
                  label={ProductConfigs.properties.tags.label}
                  placeholder="--"
                  clearable
                  searchable
                  creatable
                  data={tagSelectList}
                  getCreateLabel={(tagName) => `+ Tạo tag ${tagName}`}
                  {...form.getInputProps('tags')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <NumberInput
                  precision={2}
                  min={0}
                  label={ProductConfigs.properties.weight.label}
                  description="Tính theo gam"
                  {...form.getInputProps('weight')}
                />
              </Grid.Col>
              <Grid.Col xs={6} p={0}></Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  label={ProductConfigs.properties.guaranteeId.label}
                  placeholder="--"
                  clearable
                  data={guaranteeSelectList}
                  {...form.getInputProps('guaranteeId')}
                />
              </Grid.Col>
            </Grid>

            <Divider mt="xs"/>

            <Group position="apart" p="sm">
              <Button variant="default" onClick={resetForm}>Mặc định</Button>
              <Button
                type="submit"
                disabled={MiscUtils.isEquals(form.values, prevFormValues)
                  && selectedVariantIndexes.length === product.variants.length
                  && imageFiles.length === 0}
              >
                Cập nhật
              </Button>
            </Group>
          </Stack>
        </Paper>
      </form>
    </Stack>
  );
}

export default ProductUpdate;
