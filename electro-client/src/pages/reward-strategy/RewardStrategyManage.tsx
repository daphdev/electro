import {
  ActionIcon,
  Badge,
  Button,
  Group,
  LoadingOverlay,
  Paper,
  Stack,
  Switch,
  Table,
  Text,
  TextInput,
  useMantineTheme
} from '@mantine/core';
import React, { useState } from 'react';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import { formList, useForm, zodResolver } from '@mantine/form';
import { ManageHeader, ManageHeaderTitle } from 'components';
import RewardStrategyConfigs from 'pages/reward-strategy/RewardStrategyConfigs';
import { useModals } from '@mantine/modals';
import { MathFunction } from 'tabler-icons-react';
import { RewardStrategyRequest, RewardStrategyResponse } from 'models/RewardStrategy';
import { useMutation, useQueryClient } from 'react-query';
import PageConfigs from 'pages/PageConfigs';
import FetchUtils, { ErrorMessage, ListResponse } from 'utils/FetchUtils';
import useGetAllApi from 'hooks/use-get-all-api';
import MiscUtils from 'utils/MiscUtils';
import NotifyUtils from 'utils/NotifyUtils';
import { z } from 'zod';

function RewardStrategyManage() {
  const theme = useMantineTheme();
  const modals = useModals();
  const queryClient = useQueryClient();

  useResetManagePageState();

  const form = useForm({
    initialValues: {
      rewardStrategies: formList([] as Array<{ status: boolean }>),
    },
  });

  const {
    isLoading,
    data: listResponse = PageConfigs.initialListResponse as ListResponse<RewardStrategyResponse>,
  } = useGetAllApi<RewardStrategyResponse>(
    RewardStrategyConfigs.resourceUrl,
    RewardStrategyConfigs.resourceKey,
    { all: 1, sort: 'id,asc' },
    (data) =>
      form.setFieldValue('rewardStrategies', formList(data.content.map(entity => ({ status: entity.status === 1 })))),
    { refetchOnWindowFocus: false }
  );

  const updateRewardStrategyApi = useUpdateRewardStrategyApi();

  const handleUpdateButton = async () => {
    try {
      const updateRewardStrategyRequests: UpdateRewardStrategyRequest[] = [];

      listResponse.content.forEach((entity, index) => {
        const currentStatus = form.values.rewardStrategies[index].status ? 1 : 2;

        if (currentStatus !== entity.status) {
          updateRewardStrategyRequests.push({
            id: entity.id,
            body: { formula: null, status: currentStatus },
          });
        }
      });

      await Promise.all(updateRewardStrategyRequests.map(async (request) => {
        await updateRewardStrategyApi.mutateAsync(request);
      }));

      NotifyUtils.simpleSuccess('Cập nhật thành công');
      void queryClient.invalidateQueries([RewardStrategyConfigs.resourceKey, 'getAll']);
    } catch (e) {
      NotifyUtils.simpleFailed('Cập nhật không thành công');
    }
  };

  const handleUpdateFormulaButton = (rewardStrategy: RewardStrategyResponse) => {
    modals.openModal({
      size: 'md',
      overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      overlayOpacity: 0.55,
      overlayBlur: 3,
      title: <strong>Sửa công thức tính</strong>,
      children: <UpdateFormulaModal rewardStrategy={rewardStrategy}/>,
    });
  };

  const rewardStrategyStatusBadgeFragment = (status: number) => {
    switch (status) {
    case 1:
      return <Badge color="blue" variant="filled" size="sm">Đang kích hoạt</Badge>;
    case 2:
      return <Badge color="pink" variant="filled" size="sm">Không kích hoạt</Badge>;
    }
  };

  const entitiesTableHeadsFragment = (
    <tr>
      <th>Kích hoạt</th>
      <th>Chiến lược điểm thưởng</th>
      <th>Mã</th>
      <th>Công thức tính</th>
      <th>Trạng thái</th>
    </tr>
  );

  const entitiesTableRowsFragment = listResponse.content.map((entity, index) => (
    <tr key={entity.id}>
      <td>
        <Switch
          size="md"
          {...form.getListInputProps('rewardStrategies', index, 'status', { type: 'checkbox' })}
        />
      </td>
      <td>{entity.name}</td>
      <td><Text size="sm" sx={{ fontFamily: theme.fontFamilyMonospace }}>{entity.code}</Text></td>
      <td>
        <Group>
          <Text size="sm" sx={{ fontFamily: theme.fontFamilyMonospace }}>{entity.formula}</Text>
          <ActionIcon
            color="blue"
            variant="outline"
            size="sm"
            title="Cập nhật công thức mới"
            onClick={() => handleUpdateFormulaButton(entity)}
          >
            <MathFunction size={15} strokeWidth={1.5}/>
          </ActionIcon>
        </Group>
      </td>
      <td>{rewardStrategyStatusBadgeFragment(entity.status)}</td>
    </tr>
  ));

  const disabledUpdateButton = MiscUtils.isEquals(
    listResponse.content.map(entity => ({ status: entity.status === 1 })),
    form.values.rewardStrategies
  );

  return (
    <Stack sx={{ maxWidth: 850 }}>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={RewardStrategyConfigs.manageTitleLinks}
          title={RewardStrategyConfigs.manageTitle}
        />
      </ManageHeader>

      <Paper shadow="xs" sx={{ position: 'relative', height: listResponse.content.length === 0 ? 170 : 'auto' }}>
        <LoadingOverlay visible={isLoading} zIndex={50}/>
        <Table horizontalSpacing="sm" verticalSpacing="sm">
          <thead>{entitiesTableHeadsFragment}</thead>
          <tbody>{entitiesTableRowsFragment}</tbody>
        </Table>
      </Paper>

      <Button
        sx={{ width: 'fit-content' }}
        disabled={disabledUpdateButton}
        onClick={handleUpdateButton}
      >
        Cập nhật
      </Button>
    </Stack>
  );
}

function UpdateFormulaModal({ rewardStrategy }: { rewardStrategy: RewardStrategyResponse }) {
  const modals = useModals();
  const queryClient = useQueryClient();

  const [currentFormula, setCurrentFormula] = useState(rewardStrategy.formula);

  const form = useForm({
    initialValues: { formula: currentFormula },
    schema: zodResolver(z.object({ formula: z.string() })),
  });

  const updateRewardStrategyApi = useUpdateRewardStrategyApi();

  const handleFormSubmit = form.onSubmit(async (formValues) => {
    const requestBody: RewardStrategyRequest = {
      formula: formValues.formula,
      status: null,
    };

    try {
      await updateRewardStrategyApi.mutateAsync({ id: rewardStrategy.id, body: requestBody });
      NotifyUtils.simpleSuccess('Cập nhật thành công');
      void queryClient.invalidateQueries([RewardStrategyConfigs.resourceKey, 'getAll']);
      setCurrentFormula(formValues.formula);
    } catch (e) {
      NotifyUtils.simpleFailed('Cập nhật không thành công');
    }
  });

  return (
    <form onSubmit={handleFormSubmit}>
      <Stack>
        <Text size="sm" color="dimmed">Công thức tính của chiến lược &quot;{rewardStrategy.name}&quot;</Text>
        <TextInput
          data-autofocus
          required
          placeholder="Nhập công thức tính"
          {...form.getInputProps('formula')}
        />
        <Group position="right">
          <Button variant="default" onClick={modals.closeAll}>
            Đóng
          </Button>
          <Button type="submit" disabled={MiscUtils.isEquals(form.values, { formula: currentFormula })}>
            Cập nhật
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

type UpdateRewardStrategyRequest = { id: number, body: RewardStrategyRequest };

function useUpdateRewardStrategyApi() {
  return useMutation<RewardStrategyResponse, ErrorMessage, UpdateRewardStrategyRequest>(
    (request) => FetchUtils.update(RewardStrategyConfigs.resourceUrl, request.id, request.body)
  );
}

export default RewardStrategyManage;
