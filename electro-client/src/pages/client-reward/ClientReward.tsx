import React from 'react';
import {
  Badge,
  Card,
  Container,
  Grid,
  Group,
  MantineColor,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme
} from '@mantine/core';
import { ClientUserNavbar } from 'components';
import useTitle from 'hooks/use-title';
import { ClientRewardResponse } from 'types';
import { RewardStrategyType } from 'models/RewardStrategy';
import { Award, FileBarcode, Icon, Star } from 'tabler-icons-react';
import DateUtils from 'utils/DateUtils';

const reward: ClientRewardResponse = {
  rewardTotalScore: 1050,
  rewardLogs: [
    {
      rewardLogId: 2,
      rewardLogCreatedAt: '2023-02-28T00:00:00Z',
      rewardLogScore: 1000,
      rewardLogType: RewardStrategyType.SUCCESS_ORDER,
      rewardLogNote: 'Bạn đã nhận được 1000 điểm thưởng cho đơn hàng AVWTSRSEXS.',
    },
    {
      rewardLogId: 1,
      rewardLogCreatedAt: '2023-02-27T00:00:00Z',
      rewardLogScore: 50,
      rewardLogType: RewardStrategyType.ADD_REVIEW,
      rewardLogNote: 'Bạn đã nhận được 50 điểm thưởng cho đánh giá ở sản phẩm Laptop Lenovo Gaming Legion 5.',
    },
  ],
};

type RewardLogInfo = {
  icon: Icon,
  color: MantineColor,
};

const rewardLogInfoMap: Record<RewardStrategyType, RewardLogInfo> = {
  [RewardStrategyType.SUCCESS_ORDER]: {
    icon: FileBarcode,
    color: 'blue',
  },
  [RewardStrategyType.ADD_REVIEW]: {
    icon: Star,
    color: 'yellow',
  },
};

function ClientReward() {
  useTitle();

  const theme = useMantineTheme();

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
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}

export default ClientReward;
