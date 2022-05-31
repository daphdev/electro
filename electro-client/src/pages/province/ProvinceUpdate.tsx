import React, { useEffect, useState } from 'react';
import { Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useParams } from 'react-router-dom';
import FetchUtils from '../../utils/FetchUtils';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import { CreateUpdateTitle, DefaultPropertyPanel, SimpleUpdateForm, Fragments } from 'components';
import NotifyUtils from '../../utils/NotifyUtils';
import MiscUtils from '../../utils/MiscUtils';
import { ProvinceRequest, ProvinceResponse } from 'models/province';

export default function ProvinceUpdate() {
  const { entityId } = useParams();
  const [entity, setEntity] = useState<ProvinceResponse>();
  const form = useForm({
    initialValues: ProvinceConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(ProvinceConfigs.createUpdateFormSchema),
  });

  useEffect(() => {
    if (!entity) {
      FetchUtils.getById<ProvinceResponse>(ProvinceConfigs.resourceUrl, Number(entityId))
        .then(([responseStatus, responseBody]) => {
          if (responseStatus === 200) {
            const castedResponseBody = responseBody as ProvinceResponse;
            setEntity(castedResponseBody);
            form.setValues(MiscUtils.pick<ProvinceResponse>(castedResponseBody,
              Object.keys(ProvinceConfigs.initialCreateUpdateFormValues)
            ) as typeof ProvinceConfigs.initialCreateUpdateFormValues);
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
      <CreateUpdateTitle managerPath={ProvinceConfigs.managerPath} title={ProvinceConfigs.updateLabel}/>

      <DefaultPropertyPanel
        id={entity.id}
        createdAt={entity.createdAt}
        updatedAt={entity.updatedAt}
        createdBy="1"
        updatedBy="1"
      />

      <SimpleUpdateForm<typeof ProvinceConfigs.initialCreateUpdateFormValues, ProvinceRequest, ProvinceResponse>
        form={form}
        resourceUrl={ProvinceConfigs.resourceUrl}
        entityId={entity.id}
      >
        <Fragments.FormRow2Col>
          <TextInput required label={ProvinceConfigs.properties.name.label} {...form.getInputProps('name')}/>
          <TextInput required label={ProvinceConfigs.properties.code.label} {...form.getInputProps('code')}/>
        </Fragments.FormRow2Col>
      </SimpleUpdateForm>
    </Stack>
  );
}
