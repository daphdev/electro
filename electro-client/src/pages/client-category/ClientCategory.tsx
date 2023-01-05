import {
  Anchor,
  Breadcrumbs,
  Button,
  Card,
  Chip,
  Chips,
  Container,
  Grid,
  Group,
  NumberInput,
  Pagination,
  Radio,
  RadioGroup,
  RangeSlider,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme
} from '@mantine/core';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MockUtils from 'utils/MockUtils';
import MiscUtils from 'utils/MiscUtils';
import { ClientProductCard } from 'components';
import { ArrowsDownUp, ChartCandle, ChevronRight, Search, X } from 'tabler-icons-react';
import useTitle from 'hooks/use-title';
import { useQuery } from 'react-query';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import { ClientCategoryResponse } from 'types';

function ClientCategory() {
  const theme = useMantineTheme();

  const { slug } = useParams();
  const { data: categoryResponse, isLoading, isError } = useGetCategory(slug as string);
  const category = categoryResponse as ClientCategoryResponse;
  useTitle(category?.categoryName);

  const [sortValue, setSortValue] = useState('newest');

  if (isLoading) {
    return (
      <main>
        <Container size="xl">
          <Stack>
            {Array(5).fill(0).map((_, index) => (
              <Skeleton key={index} height={50} radius="md"/>
            ))}
          </Stack>
        </Container>
      </main>
    );
  }

  if (isError) {
    return (
      <main>
        <Container size="xl">
          <Stack spacing="xl" sx={{ textAlign: 'center' }}>
            <Text
              weight={700}
              sx={{ fontSize: 120, color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2] }}
            >
              Oops...
            </Text>
            <Title>Đã có lỗi xảy ra</Title>
            <Group position="center">
              <Button component={Link} to="/" variant="subtle" size="md">
                Trở về Trang chủ
              </Button>
            </Group>
          </Stack>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <Container size="xl">
        <Stack spacing={theme.spacing.xl * 2}>

          <Card radius="md" shadow="sm" p="lg">
            <Stack>
              <Breadcrumbs>
                <Anchor component={Link} to="/">
                  Trang chủ
                </Anchor>
                {MiscUtils.makeCategoryBreadcrumbs(category).slice(0, -1).map(c => (
                  <Anchor key={c.categorySlug} component={Link} to={'/category/' + c.categorySlug}>
                    {c.categoryName}
                  </Anchor>
                ))}
                <Text color="dimmed">
                  {category.categoryName}
                </Text>
              </Breadcrumbs>

              <Group spacing="xs" sx={{ alignItems: 'baseline' }}>
                <Title order={2}>{category.categoryName}</Title>
                {category.categoryChildren.length > 0 && (
                  <>
                    <Text color="dimmed">
                      <ChevronRight size={14}/>
                    </Text>
                    <Breadcrumbs separator="·">
                      {category.categoryChildren.map(c => (
                        <Anchor key={c.categorySlug} component={Link} to={'/category/' + c.categorySlug} size="sm">
                          {c.categoryName}
                        </Anchor>
                      ))}
                    </Breadcrumbs>
                  </>
                )}
              </Group>
            </Stack>
          </Card>

          <Grid gutter="xl">
            <Grid.Col md={3} mb={theme.spacing.xl}>
              <Stack spacing="lg">
                <Group position="apart">
                  <Group spacing="xs">
                    <ChartCandle/>
                    <Text weight={500}>Bộ lọc</Text>
                  </Group>
                  <Button
                    variant="light"
                    color="pink"
                    radius="md"
                    size="xs"
                    compact
                    leftIcon={<X size={10}/>}
                    styles={{ leftIcon: { marginRight: 6 } }}
                  >
                    Đặt mặc định
                  </Button>
                </Group>

                <Stack>
                  <Text weight={500}>Tìm kiếm</Text>
                  <TextInput
                    radius="md"
                    placeholder={'Tìm kiếm trong ' + category.categoryName}
                    icon={<Search size={16}/>}
                  />
                </Stack>

                <Stack>
                  <Text weight={500}>Khoảng giá</Text>
                  <RangeSlider
                    defaultValue={[20, 80]}
                    marks={[
                      { value: 20, label: '20%' },
                      { value: 50, label: '50%' },
                      { value: 80, label: '80%' },
                    ]}
                  />
                  <SimpleGrid cols={2} mt={theme.spacing.md}>
                    <NumberInput
                      defaultValue={1_000_000}
                      label="Từ"
                      radius="md"
                      hideControls
                    />
                    <NumberInput
                      defaultValue={25_000_000}
                      label="Đến"
                      radius="md"
                      hideControls
                    />
                  </SimpleGrid>
                </Stack>

                <Stack>
                  <Text weight={500}>Thương hiệu</Text>
                  <Chips variant="filled" multiple>
                    <Chip value="apple">Apple</Chip>
                    <Chip value="dell">Dell</Chip>
                    <Chip value="hp">HP</Chip>
                    <Chip value="asus">Asus</Chip>
                  </Chips>
                </Stack>
              </Stack>
            </Grid.Col>

            <Grid.Col md={9}>
              <Stack spacing="lg">
                <Group position="apart">
                  <Group spacing="xs">
                    <ArrowsDownUp size={20}/>
                    <Text weight={500} mr={theme.spacing.xs}>Sắp xếp theo</Text>
                    <RadioGroup value={sortValue} onChange={setSortValue}>
                      <Radio value="newest" label="Mới nhất"/>
                      <Radio value="lowest-price" label="Giá thấp → cao"/>
                      <Radio value="highest-price" label="Giá cao → thấp"/>
                    </RadioGroup>
                  </Group>
                  <Text>30 sản phẩm</Text>
                </Group>
                <Grid>
                  {Array(8).fill(MockUtils.sampleProduct).map((product, index) => (
                    <Grid.Col key={index} span={6} sm={4}>
                      <ClientProductCard product={product}/>
                    </Grid.Col>
                  ))}
                </Grid>
                <Group position="apart" mt={theme.spacing.lg}>
                  <Pagination total={5}/>
                  <Text>
                    <Text
                      component="span"
                      weight={500}
                    >
                      Trang 1
                    </Text>
                    <span> / 5 </span>
                  </Text>
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>

        </Stack>
      </Container>
    </main>
  );
}

function useGetCategory(categorySlug: string) {
  return useQuery<ClientCategoryResponse, ErrorMessage>(
    ['client-api', 'categories', 'getCategory', categorySlug],
    () => FetchUtils.get(ResourceURL.CLIENT_CATEGORY + '/' + categorySlug),
    {
      onError: () => NotifyUtils.simpleFailed('Lấy dữ liệu không thành công'),
      refetchOnWindowFocus: false,
    }
  );
}

export default ClientCategory;
