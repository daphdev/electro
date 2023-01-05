import React from 'react';
import { Button, Card, Grid, Group, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import { List } from 'tabler-icons-react';
import PageConfigs from 'pages/PageConfigs';
import { Link } from 'react-router-dom';
import MockUtils from 'utils/MockUtils';

function ClientHomeFeaturedCategories() {
  const theme = useMantineTheme();

  return (
    <Stack>
      <Group position="apart">
        <Title order={2}>
          <Text
            color="orange"
            inherit
          >
            Danh mục nổi bật
          </Text>
        </Title>
        <Button component={Link} to="/all-categories" variant="light" leftIcon={<List size={16}/>} radius="md">
          Xem tất cả
        </Button>
      </Group>
      <Grid>
        {MockUtils.featuredCategories.map(category => {
          const CategoryIcon = PageConfigs.categorySlugIconMap[category.categorySlug];

          return (
            <Grid.Col key={category.categorySlug} span={6} sm={4} md={3}>
              <Card
                radius="md"
                shadow="sm"
                p="lg"
                component={Link}
                to={'/category/' + category.categorySlug}
                sx={{
                  '&:hover': {
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
                  },
                }}
              >
                <Group>
                  <CategoryIcon size={50} strokeWidth={1}/>
                  <Text>{category.categoryName}</Text>
                </Group>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </Stack>
  );
}

export default ClientHomeFeaturedCategories;
