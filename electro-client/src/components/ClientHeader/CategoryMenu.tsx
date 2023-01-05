import React from 'react';
import { Anchor, Grid, Group, ScrollArea, Stack, Tabs, ThemeIcon, useMantineTheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import PageConfigs from 'pages/PageConfigs';
import MockUtils from 'utils/MockUtils';

function CategoryMenu() {
  const theme = useMantineTheme();

  return (
    <Tabs
      variant="pills"
      tabPadding="md"
      styles={{
        // TODO: Refactor !important
        tabActive: {
          color: (theme.colorScheme === 'dark' ? theme.colors.blue[2] : theme.colors.blue[6]) + '!important',
          backgroundColor: (theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors.blue[8], 0.35) : theme.colors.blue[0]) + '!important',
        },
      }}
    >
      {MockUtils.allCategories.map((firstCategory, index) => {
        const FirstCategoryIcon = PageConfigs.categorySlugIconMap[firstCategory.categorySlug];

        return (
          <Tabs.Tab
            key={index}
            label={firstCategory.categoryName}
            icon={<FirstCategoryIcon size={14}/>}
          >
            <Stack>
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
              <ScrollArea style={{ height: 325 }}>
                <Grid sx={{ width: '100%' }}>
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
              </ScrollArea>
            </Stack>
          </Tabs.Tab>
        );
      })}
    </Tabs>
  );
}

export default CategoryMenu;
