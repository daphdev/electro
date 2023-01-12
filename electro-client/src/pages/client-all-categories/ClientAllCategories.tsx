import React from 'react';
import {
  Anchor,
  Breadcrumbs,
  Card,
  Container,
  Grid,
  Group,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme
} from '@mantine/core';
import PageConfigs from 'pages/PageConfigs';
import { Link } from 'react-router-dom';
import useTitle from 'hooks/use-title';
import { useQuery } from 'react-query';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import { ClientCategoryResponse, CollectionWrapper } from 'types';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import { AlertTriangle } from 'tabler-icons-react';

function ClientAllCategories() {
  useTitle();

  const theme = useMantineTheme();

  const {
    data: categoryResponses,
    isLoading: isLoadingCategoryResponses,
    isError: isErrorCategoryResponses,
  } = useQuery<CollectionWrapper<ClientCategoryResponse>, ErrorMessage>(
    ['client-api', 'categories', 'getAllCategories'],
    () => FetchUtils.get(ResourceURL.CLIENT_CATEGORY),
    {
      onError: () => NotifyUtils.simpleFailed('Lấy dữ liệu không thành công'),
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  let resultFragment;

  if (isLoadingCategoryResponses) {
    resultFragment = (
      <Stack>
        {Array(5).fill(0).map((_, index) => (
          <Skeleton key={index} height={50} radius="md"/>
        ))}
      </Stack>
    );
  }

  if (isErrorCategoryResponses) {
    resultFragment = (
      <Stack my={theme.spacing.xl} sx={{ alignItems: 'center', color: theme.colors.pink[6] }}>
        <AlertTriangle size={125} strokeWidth={1}/>
        <Text size="xl" weight={500}>Đã có lỗi xảy ra</Text>
      </Stack>
    );
  }

  if (categoryResponses) {
    resultFragment = categoryResponses.content.map((firstCategory, index) => {
      const FirstCategoryIcon = PageConfigs.categorySlugIconMap[firstCategory.categorySlug];

      return (
        <Stack key={index}>
          <Group>
            <ThemeIcon variant="light" size={42}>
              <FirstCategoryIcon/>
            </ThemeIcon>
            <Anchor
              component={Link}
              to={'/category/' + firstCategory.categorySlug}
              sx={{ fontSize: theme.fontSizes.sm * 2 }}
              weight={500}
            >
              {firstCategory.categoryName}
            </Anchor>
          </Group>
          <Grid>
            {firstCategory.categoryChildren.map((secondCategory, index) => (
              <Grid.Col span={6} xs={4} sm={3} md={2.4} mb="sm" key={index}>
                <Stack spacing="xs">
                  <Anchor
                    component={Link}
                    to={'/category/' + secondCategory.categorySlug}
                    weight={500}
                    color="pink"
                  >
                    {secondCategory.categoryName}
                  </Anchor>
                  {secondCategory.categoryChildren.map((thirdCategory, index) => (
                    <Anchor key={index} component={Link} to={'/category/' + thirdCategory.categorySlug}>
                      {thirdCategory.categoryName}
                    </Anchor>
                  ))}
                </Stack>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      );
    });
  }

  return (
    <main>
      <Container size="xl">
        <Stack spacing={theme.spacing.xl * 2}>
          {/* TODO: Refactor */}
          <Card radius="md" shadow="sm" p="lg">
            <Stack>
              <Breadcrumbs>
                <Anchor component={Link} to="/">
                  Trang chủ
                </Anchor>
                <Text color="dimmed">
                  Tất cả danh mục sản phẩm
                </Text>
              </Breadcrumbs>
              <Title order={2}>Tất cả danh mục sản phẩm</Title>
            </Stack>
          </Card>

          {resultFragment}
        </Stack>
      </Container>
    </main>
  );
}

export default ClientAllCategories;
