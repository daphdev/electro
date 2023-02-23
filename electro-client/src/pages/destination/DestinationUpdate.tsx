import React from 'react';
import { Button, Divider, Grid, Group, Paper, Select, Stack, TextInput } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { CreateUpdateTitle, DefaultPropertyPanel } from 'components';
import DestinationConfigs from 'pages/destination/DestinationConfigs';
import useDestinationUpdateViewModel from 'pages/destination/DestinationUpdate.vm';

function DestinationUpdate() {
  const { id } = useParams();
  const {
    destination,
    form,
    handleFormSubmit,
    provinceSelectList,
    districtSelectList,
    statusSelectList,
  } = useDestinationUpdateViewModel(Number(id));

  if (!destination) {
    return null;
  }

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle
        managerPath={DestinationConfigs.managerPath}
        title={DestinationConfigs.updateTitle}
      />

      <DefaultPropertyPanel
        id={destination.id}
        createdAt={destination.createdAt}
        updatedAt={destination.updatedAt}
        createdBy="1"
        updatedBy="1"
      />

      <form onSubmit={handleFormSubmit}>
        <Paper shadow="xs">
          <Stack spacing={0}>
            <Grid p="sm">
              <Grid.Col xs={6}>
                <TextInput
                  label={DestinationConfigs.properties.contactFullname.label}
                  {...form.getInputProps('contactFullname')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  label={DestinationConfigs.properties.contactEmail.label}
                  {...form.getInputProps('contactEmail')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  label={DestinationConfigs.properties.contactPhone.label}
                  {...form.getInputProps('contactPhone')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  required
                  label={DestinationConfigs.properties['address.line'].label}
                  {...form.getInputProps('address.line')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={DestinationConfigs.properties['address.provinceId'].label}
                  placeholder="--"
                  searchable
                  data={provinceSelectList}
                  {...form.getInputProps('address.provinceId')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={DestinationConfigs.properties['address.districtId'].label}
                  placeholder="--"
                  searchable
                  data={districtSelectList}
                  {...form.getInputProps('address.districtId')}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  required
                  label={DestinationConfigs.properties.status.label}
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

export default DestinationUpdate;
