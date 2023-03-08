import React from 'react';
import {
  Badge,
  Card,
  Container,
  Grid,
  Group,
  MantineColor,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme
} from '@mantine/core';
import { ClientUserNavbar } from 'components';
import useTitle from 'hooks/use-title';
import { ClientRewardResponse } from 'types';
import { RewardType } from 'models/RewardStrategy';
import { AlertTriangle, Award, FileBarcode, Icon, Star } from 'tabler-icons-react';
import DateUtils from 'utils/DateUtils';
import { useQuery } from 'react-query';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';

type RewardLogInfo = {
  icon: Icon,
  color: MantineColor,
};

const rewardLogInfoMap: Record<RewardType, RewardLogInfo> = {
  [RewardType.SUCCESS_ORDER]: {
    icon: FileBarcode,
    color: 'blue',
  },
  [RewardType.ADD_REVIEW]: {
    icon: Star,
    color: 'yellow',
  },
};

function ClientReward() {
  useTitle();

  const theme = useMantineTheme();

  const { rewardResponse, isLoadingRewardResponse, isErrorRewardResponse } = useGetRewardApi();

  let rewardContentFragment;

  if (isLoadingRewardResponse) {
    rewardContentFragment = (
      <Stack>
        {Array(5).fill(0).map((_, index) => (
          <Skeleton key={index} height={50} radius="md"/>
        ))}
      </Stack>
    );
  }

  if (isErrorRewardResponse) {
    rewardContentFragment = (
      <Stack my={theme.spacing.xl} sx={{ alignItems: 'center', color: theme.colors.pink[6] }}>
        <AlertTriangle size={125} strokeWidth={1}/>
        <Text size="xl" weight={500}>Đã có lỗi xảy ra</Text>
      </Stack>
    );
  }

  if (rewardResponse) {
    const reward = rewardResponse;

    rewardContentFragment = (
      <>
        <Group position="apart">
          <Award size={85} strokeWidth={1} color={theme.colors.grape[5]}/>
          <Stack align="center">
            <Text color="grape" weight={500}>Tổng điểm thưởng tích lũy của bạn là</Text>
            <Badge radius="md" color="grape" size="xl" variant="filled">{reward.rewardTotalScore}</Badge>
          </Stack>
          <Award size={85} strokeWidth={1} color={theme.colors.grape[5]}/>
        </Group>

        <Card
          radius="md"
          p="lg"
          sx={{ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[0] }}
        >
          <Stack spacing="lg">
            <Text size="sm" color="dimmed" weight={500}>
              Lịch sử nhận điểm thưởng
            </Text>

            <Stack spacing="xs">
              {reward.rewardLogs.map(rewardLog => {
                const rewardLogInfo = rewardLogInfoMap[rewardLog.rewardLogType];

                return (
                  <Group key={rewardLog.rewardLogId} spacing="sm" sx={{ flexWrap: 'nowrap' }}>
                    <ThemeIcon color={rewardLogInfo.color} size="sm" variant="filled" radius="xl">
                      <rewardLogInfo.icon size={12}/>
                    </ThemeIcon>
                    <Text size="xs" color="dimmed">
                      {DateUtils.isoDateToString(rewardLog.rewardLogCreatedAt)}
                    </Text>
                    <Text size="xs" color="blue" weight={500}>
                      +{rewardLog.rewardLogScore}
                    </Text>
                    <Text size="xs">
                      {rewardLog.rewardLogNote}
                    </Text>
                  </Group>
                );
              })}
            </Stack>
          </Stack>
        </Card>
      </>
    );
  }

  return (
    <main>
      <Container size="xl">
        <Grid gutter="lg">
          <Grid.Col md={3}>
            <ClientUserNavbar/>
          </Grid.Col>

          <Grid.Col md={9}>
            <Card radius="md" shadow="sm" p="lg">
              <Stack>
                <Title order={2}>
                  Điểm thưởng
                </Title>

                {rewardContentFragment}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}

function useGetRewardApi() {
  const {
    data: rewardResponse,
    isLoading: isLoadingRewardResponse,
    isError: isErrorRewardResponse,
  } = useQuery<ClientRewardResponse, ErrorMessage>(
    ['client-api', 'rewards', 'getReward'],
    () => FetchUtils.getWithToken(ResourceURL.CLIENT_REWARD),
    {
      onError: () => NotifyUtils.simpleFailed('Lấy dữ liệu không thành công'),
      keepPreviousData: true,
    }
  );

  return { rewardResponse, isLoadingRewardResponse, isErrorRewardResponse };
}

export default ClientReward;
