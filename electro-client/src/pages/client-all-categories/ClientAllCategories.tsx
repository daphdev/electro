import React from 'react';
import {
  Anchor,
  Breadcrumbs,
  Card,
  Container,
  Grid,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme
} from '@mantine/core';
import PageConfigs from 'pages/PageConfigs';
import { Link } from 'react-router-dom';
import MockUtils from 'utils/MockUtils';
import useTitle from 'hooks/use-title';

function ClientAllCategories() {
  useTitle();

  const theme = useMantineTheme();

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
          {MockUtils.allCategories.map((firstCategory, index) => {
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
          })}
        </Stack>
      </Container>
    </main>
  );
}

export default ClientAllCategories;
