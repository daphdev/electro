import React, { useEffect, useState } from 'react';
import { Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useParams } from 'react-router-dom';
import FetchUtils from '../../utils/FetchUtils';
import Configs, { ProvinceRequest, ProvinceResponse } from './Configs';
import { CreateUpdateTitle, DefaultPropertyPanel, SimpleUpdateForm } from '../../components/CreateUpdatePages';
import Fragments from '../../components/Fragments';
import NotifyUtils from '../../utils/NotifyUtils';
import MiscUtils from '../../utils/MiscUtils';

export default function UpdateProvince() {
  const { entityId } = useParams();
  const [entity, setEntity] = useState<ProvinceResponse>();
  const form = useForm({
    initialValues: Configs.initialCreateUpdateFormValues,
    schema: zodResolver(Configs.createUpdateFormSchema),
  });

  useEffect(() => {
    if (!entity) {
      FetchUtils.getById<ProvinceResponse>(Configs.resourceUrl, Number(entityId))
        .then(([responseStatus, responseBody]) => {
          if (responseStatus === 200) {
            const castedResponseBody = responseBody as ProvinceResponse;
            setEntity(castedResponseBody);
            form.setValues(MiscUtils.pick<ProvinceResponse>(castedResponseBody,
              Object.keys(Configs.initialCreateUpdateFormValues)
            ) as typeof Configs.initialCreateUpdateFormValues);
          }
          if (responseStatus === 404) {
            NotifyUtils.error(responseStatus);
          }
        });
    }
  }, [entity, entityId, form]);

  if (entity === undefined) {
    return <></>;
  }

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <CreateUpdateTitle managerPath={Configs.managerPath} title={Configs.updateLabel}/>

      <DefaultPropertyPanel
        id={entity.id}
        createdAt={entity.createdAt}
        updatedAt={entity.updatedAt}
        createdBy="1"
        updatedBy="1"
      />

      <SimpleUpdateForm<typeof Configs.initialCreateUpdateFormValues, ProvinceRequest, ProvinceResponse>
        form={form}
        resourceUrl={Configs.resourceUrl}
        entityId={entity.id}
      >
        <Fragments.FormRow2Col>
          <TextInput required label={Configs.properties.name.label} {...form.getInputProps('name')}/>
          <TextInput required label={Configs.properties.code.label} {...form.getInputProps('code')}/>
        </Fragments.FormRow2Col>
      </SimpleUpdateForm>
    </Stack>
  )
}
