import React from 'react';
import { Card, Grid, Group, MantineColor, Paper, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import {
  Box,
  BrandApple,
  BuildingWarehouse,
  FileBarcode,
  Icon,
  Percentage,
  Star,
  Truck,
  Users
} from 'tabler-icons-react';
import { Bar, BarChart, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const userData = [
  { 'date': '20/02', 'numberOfRegistrations': 1 },
  { 'date': '21/02', 'numberOfRegistrations': 2 },
  { 'date': '22/02', 'numberOfRegistrations': 0 },
  { 'date': '23/02', 'numberOfRegistrations': 1 },
  { 'date': '24/02', 'numberOfRegistrations': 0 },
  { 'date': '25/02', 'numberOfRegistrations': 1 },
  { 'date': '26/02', 'numberOfRegistrations': 1 },
];

const orderData = [
  { 'date': '20/02', 'numberOfOrders': 0 },
  { 'date': '21/02', 'numberOfOrders': 0 },
  { 'date': '22/02', 'numberOfOrders': 1 },
  { 'date': '23/02', 'numberOfOrders': 0 },
  { 'date': '24/02', 'numberOfOrders': 2 },
  { 'date': '25/02', 'numberOfOrders': 1 },
  { 'date': '26/02', 'numberOfOrders': 0 },
];

const waybillData = [
  { 'date': '20/02', 'numberOfWaybills': 1 },
  { 'date': '21/02', 'numberOfWaybills': 0 },
  { 'date': '22/02', 'numberOfWaybills': 2 },
  { 'date': '23/02', 'numberOfWaybills': 0 },
  { 'date': '24/02', 'numberOfWaybills': 1 },
  { 'date': '25/02', 'numberOfWaybills': 0 },
  { 'date': '26/02', 'numberOfWaybills': 1 },
];

const reviewData = [
  { 'date': '20/02', 'numberOfReviews': 0 },
  { 'date': '21/02', 'numberOfReviews': 0 },
  { 'date': '22/02', 'numberOfReviews': 1 },
  { 'date': '23/02', 'numberOfReviews': 0 },
  { 'date': '24/02', 'numberOfReviews': 2 },
  { 'date': '25/02', 'numberOfReviews': 1 },
  { 'date': '26/02', 'numberOfReviews': 0 },
];

function AdminDashboard() {
  const theme = useMantineTheme();

  return (
    <Stack mb={30}>
      <Title order={3}>Thống kê hệ thống</Title>

      <Paper shadow="xs" p="md">
        <Stack>
          <Text size="lg" weight={500} color="dimmed">Tổng quan</Text>
          <Grid>
            <Grid.Col span={3}>
              <OverviewCard title="Tổng số khách hàng" number={2} color="blue" icon={Users}/>
            </Grid.Col>
            <Grid.Col span={3}>
              <OverviewCard title="Tổng số sản phẩm" number={13} color="orange" icon={Box}/>
            </Grid.Col>
            <Grid.Col span={3}>
              <OverviewCard title="Tổng số đơn hàng" number={2} color="teal" icon={FileBarcode}/>
            </Grid.Col>
            <Grid.Col span={3}>
              <OverviewCard title="Tổng số vận đơn" number={1} color="grape" icon={Truck}/>
            </Grid.Col>
            <Grid.Col span={3}>
              <OverviewCard title="Tổng số đánh giá" number={1} color="yellow" icon={Star}/>
            </Grid.Col>
            <Grid.Col span={3}>
              <OverviewCard title="Tổng số khuyến mãi hiện tại" number={1} color="pink" icon={Percentage}/>
            </Grid.Col>
            <Grid.Col span={3}>
              <OverviewCard title="Tổng số nhà cung cấp" number={5} color="violet" icon={BuildingWarehouse}/>
            </Grid.Col>
            <Grid.Col span={3}>
              <OverviewCard title="Tổng số thương hiệu" number={50} color="indigo" icon={BrandApple}/>
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>

      <Grid>
        <Grid.Col lg={6}>
          <Stack>
            <Paper shadow="xs" p="md">
              <Stack>
                <Group position="apart">
                  <Text size="lg" weight={500} color="dimmed">Lượt đăng ký tài khoản</Text>
                  <Text size="sm" color="dimmed">7 ngày gần nhất</Text>
                </Group>

                <LineChart
                  width={650}
                  height={275}
                  data={userData}
                  margin={{ top: 10, right: 5, bottom: 0, left: -10 }}
                >
                  <XAxis dataKey="date"/>
                  <YAxis/>
                  <Tooltip/>
                  <Line
                    name="Số lượt đăng ký"
                    type="monotone"
                    dataKey="numberOfRegistrations"
                    stroke={theme.colors.blue[5]}
                  />
                </LineChart>
              </Stack>
            </Paper>

            <Paper shadow="xs" p="md">
              <Stack>
                <Group position="apart">
                  <Text size="lg" weight={500} color="dimmed">Lượt đánh giá sản phẩm</Text>
                  <Text size="sm" color="dimmed">7 ngày gần nhất</Text>
                </Group>

                <LineChart
                  width={650}
                  height={275}
                  data={reviewData}
                  margin={{ top: 10, right: 5, bottom: 0, left: -10 }}
                >
                  <XAxis dataKey="date"/>
                  <YAxis/>
                  <Tooltip/>
                  <Line
                    name="Số lượt đánh giá"
                    type="monotone"
                    dataKey="numberOfReviews"
                    stroke={theme.colors.yellow[7]}
                  />
                </LineChart>
              </Stack>
            </Paper>
          </Stack>
        </Grid.Col>
        <Grid.Col lg={6}>
          <Stack>
            <Paper shadow="xs" p="md">
              <Stack>
                <Group position="apart">
                  <Text size="lg" weight={500} color="dimmed">Lượt đặt hàng</Text>
                  <Text size="sm" color="dimmed">7 ngày gần nhất</Text>
                </Group>

                <BarChart
                  width={650}
                  height={275}
                  data={orderData}
                  margin={{ top: 10, right: 5, bottom: 0, left: -10 }}
                >
                  <XAxis dataKey="date"/>
                  <YAxis/>
                  <Tooltip/>
                  <Bar
                    name="Số lượt đặt hàng"
                    dataKey="numberOfOrders"
                    fill={theme.colors.teal[5]}
                  />
                </BarChart>
              </Stack>
            </Paper>

            <Paper shadow="xs" p="md">
              <Stack>
                <Group position="apart">
                  <Text size="lg" weight={500} color="dimmed">Lượt tạo vận đơn</Text>
                  <Text size="sm" color="dimmed">7 ngày gần nhất</Text>
                </Group>

                <BarChart
                  width={650}
                  height={275}
                  data={waybillData}
                  margin={{ top: 10, right: 5, bottom: 0, left: -10 }}
                >
                  <XAxis dataKey="date"/>
                  <YAxis/>
                  <Tooltip/>
                  <Bar
                    name="Số lượt tạo vận đơn"
                    dataKey="numberOfWaybills"
                    fill={theme.colors.grape[5]}
                  />
                </BarChart>
              </Stack>
            </Paper>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

interface OverviewCardProps {
  title: string;
  number: number;
  color: MantineColor;
  icon: Icon;
}

function OverviewCard({ title, number, color, icon }: OverviewCardProps) {
  const theme = useMantineTheme();

  const Icon = icon;

  return (
    <Card sx={{
      backgroundColor: theme.colors[color][theme.colorScheme === 'dark' ? 9 : 1],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    }}>
      <Group>
        <Icon size={40} strokeWidth={1.25}/>
        <Stack spacing={2.5}>
          <Text>{title}</Text>
          <Text size="xl" weight={500}>{number}</Text>
        </Stack>
      </Group>
    </Card>
  );
}

export default AdminDashboard;
