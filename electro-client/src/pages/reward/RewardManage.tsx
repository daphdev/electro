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
import { ListResponse } from 'utils/FetchUtils';
import useResetManagePageState from 'hooks/use-reset-manage-page-state';
import { formList, useForm } from '@mantine/form';
import { ManageHeader, ManageHeaderTitle } from 'components';
import RewardConfigs from 'pages/reward/RewardConfigs';
import { useModals } from '@mantine/modals';
import { MathFunction } from 'tabler-icons-react';
import { RewardStrategyResponse, RewardStrategyType } from 'models/RewardStrategy';

const listResponse: ListResponse<RewardStrategyResponse> = {
  content: [
    {
      id: 1,
      createdAt: '2023-02-27T00:00:00Z',
      updatedAt: '2023-02-27T00:00:00Z',
      code: RewardStrategyType.SUCCESS_ORDER,
      name: 'Đơn hàng thành công',
      formula: '{{ORDER_TOTAL_PAY}} / 1000',
      status: 1,
    },
    {
      id: 2,
      createdAt: '2023-02-27T00:00:00Z',
      updatedAt: '2023-02-27T00:00:00Z',
      code: RewardStrategyType.ADD_REVIEW,
      name: 'Thêm đánh giá',
      formula: '50',
      status: 1,
    },
  ],
  page: 1,
  size: 5,
  totalElements: 2,
  totalPages: 1,
  last: true,
};

const isLoading = false;

// TODO: Chưa hoàn chỉnh trang này
function RewardManage() {
  const theme = useMantineTheme();
  const modals = useModals();

  useResetManagePageState();

  const form = useForm({
    initialValues: {
      rewardStrategies: formList(
        (listResponse.content.map(entity => ({ status: entity.status === 1 }))) as Array<{ status: boolean }>
      ),
    },
  });

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

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={RewardConfigs.manageTitleLinks}
          title={RewardConfigs.manageTitle}
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
        // disabled={disabledUpdateButton}
        // onClick={handleUpdateButton}
      >
        Cập nhật
      </Button>
    </Stack>
  );
}

function UpdateFormulaModal({ rewardStrategy }: { rewardStrategy: RewardStrategyResponse }) {
  const modals = useModals();

  const [formula, setFormula] = useState(rewardStrategy.formula);

  return (
    <Stack>
      <Text size="sm" color="dimmed">Công thức tính của chiến lược &quot;{rewardStrategy.name}&quot;</Text>
      <TextInput
        data-autofocus
        required
        placeholder="Nhập công thức tính"
        value={formula}
        onChange={(event) => setFormula(event.currentTarget.value)}
      />
      <Group position="right">
        <Button variant="default" onClick={modals.closeAll}>
          Đóng
        </Button>
        <Button>
          Cập nhật
        </Button>
      </Group>
    </Stack>
  );
}

export default RewardManage;
