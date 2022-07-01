import React from 'react';
import { Button, Divider, Grid, Group, Paper, Select, Stack, Text, Textarea, TextInput, Title } from '@mantine/core';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import SupplierConfigs from 'pages/supplier/SupplierConfigs';
import useSupplierCreateViewModel from 'pages/supplier/SupplierCreate.vm';

function SupplierCreate() {
  const {
    form,
    handleFormSubmit,
    provinceSelectList,
    districtSelectList,
    statusSelectList,
  } = useSupplierCreateViewModel();

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={SupplierConfigs.managerPath}
        title={SupplierConfigs.createTitle}
      />

      <DefaultPropertyPanel/>

      <form onSubmit={handleFormSubmit}>
        <Paper shadow="xs">
          <Stack spacing={0}>
            <Grid p="sm">
              <Grid.Col>
                <Title order={4}>Thông tin cơ bản</Title>
                <Text size="sm">Một số thông tin chung</Text>
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={SupplierConfigs.properties.displayName.label}
                  {...form.getInputProps('displayName')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  required
                  label={SupplierConfigs.properties.code.label}
                  {...form.getInputProps('code')}
                />
              </Grid.Col>
              <Grid.Col>
                <Title order={4}>Người liên hệ</Title>
                <Text size="sm">Thông tin người liên hệ khi đặt hàng, mua hàng</Text>
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  label={SupplierConfigs.properties.contactFullname.label}
                  {...form.getInputProps('contactFullname')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  label={SupplierConfigs.properties.contactEmail.label}
                  {...form.getInputProps('contactEmail')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  label={SupplierConfigs.properties.contactPhone.label}
                  {...form.getInputProps('contactPhone')}
                />
              </Grid.Col>
              <Grid.Col>
                <Title order={4}>Thông tin công ty</Title>
                <Text size="sm">Thông tin chi tiết nhà cung cấp</Text>
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  label={SupplierConfigs.properties.companyName.label}
                  {...form.getInputProps('companyName')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  label={SupplierConfigs.properties.taxCode.label}
                  {...form.getInputProps('taxCode')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  label={SupplierConfigs.properties.email.label}
                  {...form.getInputProps('email')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  label={SupplierConfigs.properties.phone.label}
                  {...form.getInputProps('phone')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  label={SupplierConfigs.properties.fax.label}
                  {...form.getInputProps('fax')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  label={SupplierConfigs.properties.website.label}
                  {...form.getInputProps('website')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  label={SupplierConfigs.properties['address.line'].label}
                  {...form.getInputProps('address.line')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  label={SupplierConfigs.properties['address.provinceId'].label}
                  placeholder="--"
                  clearable
                  searchable
                  data={provinceSelectList}
                  {...form.getInputProps('address.provinceId')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  label={SupplierConfigs.properties['address.districtId'].label}
                  placeholder="--"
                  clearable
                  searchable
                  data={districtSelectList}
                  {...form.getInputProps('address.districtId')}
                />
              </Grid.Col>
              <Grid.Col>
                <Textarea
                  label={SupplierConfigs.properties.description.label}
                  {...form.getInputProps('description')}
                />
              </Grid.Col>
              <Grid.Col>
                <Textarea
                  label={SupplierConfigs.properties.note.label}
                  {...form.getInputProps('note')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={SupplierConfigs.properties.status.label}
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

export default SupplierCreate;
