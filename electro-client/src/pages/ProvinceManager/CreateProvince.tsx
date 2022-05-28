import React from 'react';
import { Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import Configs, { ProvinceRequest, ProvinceResponse } from './Configs';
import { CreateUpdateTitle, DefaultPropertyPanel, SimpleCreateForm } from '../../components/CreateUpdatePages';
import Fragments from '../../components/Fragments';

export default function CreateProvince() {
  const form = useForm({
    initialValues: Configs.initialCreateUpdateFormValues,
    schema: zodResolver(Configs.createUpdateFormSchema),
  });

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle managerPath={Configs.managerPath} title={Configs.createLabel}/>

      <DefaultPropertyPanel/>

      <SimpleCreateForm<typeof Configs.initialCreateUpdateFormValues, ProvinceRequest, ProvinceResponse>
        form={form}
        resourceUrl={Configs.resourceUrl}
      >
        <Fragments.FormRow2Col>
          <TextInput required label={Configs.properties.name.label} {...form.getInputProps('name')}/>
          <TextInput required label={Configs.properties.code.label} {...form.getInputProps('code')}/>
        </Fragments.FormRow2Col>
      </SimpleCreateForm>
    </Stack>
  )
}
