import React from 'react';
import { Anchor, Grid, Group, ScrollArea, Stack, Tabs, ThemeIcon, useMantineTheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import { CategoryLink } from 'types';
import PageConfigs from 'pages/PageConfigs';

const categoryLinks: CategoryLink[] = [
  {
    categoryName: 'Laptop',
    categorySlug: 'laptop',
    categoryChildren: [
      {
        categoryName: 'Acer',
        categorySlug: 'acer',
        categoryChildren: [
          {
            categoryName: 'TravelMate',
            categorySlug: 'travelmate',
          },
          {
            categoryName: 'Nitro',
            categorySlug: 'nitro',
          },
          {
            categoryName: 'Aspire',
            categorySlug: 'aspire',
          },
          {
            categoryName: 'Swift',
            categorySlug: 'swift',
          },
          {
            categoryName: 'Predator',
            categorySlug: 'predator',
          },
        ],
      },
      {
        categoryName: 'HP',
        categorySlug: 'hp',
        categoryChildren: [
          {
            categoryName: 'Zbook',
            categorySlug: 'zbook',
          },
          {
            categoryName: 'ProBook',
            categorySlug: 'probook',
          },
          {
            categoryName: 'Pavilion',
            categorySlug: 'pavilion',
          },
          {
            categoryName: 'Victus',
            categorySlug: 'victus',
          },
          {
            categoryName: 'Omen',
            categorySlug: 'omen',
          },
          {
            categoryName: 'Envy',
            categorySlug: 'envy',
          },
          {
            categoryName: 'Elite',
            categorySlug: 'elite',
          },
          {
            categoryName: 'Spectre',
            categorySlug: 'spectre',
          },
        ],
      },
      {
        categoryName: 'Apple',
        categorySlug: 'apple',
        categoryChildren: [
          {
            categoryName: 'Macbook',
            categorySlug: 'macbook',
          },
        ],
      },
      {
        categoryName: 'LG',
        categorySlug: 'lg',
        categoryChildren: [
          {
            categoryName: 'Gram',
            categorySlug: 'gram',
          },
        ],
      },
      {
        categoryName: 'Huewei',
        categorySlug: 'huewei',
        categoryChildren: [
          {
            categoryName: 'MateBook',
            categorySlug: 'matebook',
          },
        ],
      },
      {
        categoryName: 'Xiaomi',
        categorySlug: 'xiaomi',
        categoryChildren: [
          {
            categoryName: 'RedmiBook',
            categorySlug: 'redmibook',
          },
        ],
      },
      {
        categoryName: 'Dell',
        categorySlug: 'dell',
        categoryChildren: [
          {
            categoryName: 'Inspiron',
            categorySlug: 'inspiron',
          },
          {
            categoryName: 'Alienware',
            categorySlug: 'alienware',
          },
          {
            categoryName: 'Gaming G Series',
            categorySlug: 'gaming-g-series',
          },
          {
            categoryName: 'Precision',
            categorySlug: 'precision',
          },
          {
            categoryName: 'XPS',
            categorySlug: 'xps',
          },
          {
            categoryName: 'Latitude',
            categorySlug: 'latitude',
          },
          {
            categoryName: 'Vostro',
            categorySlug: 'vostro',
          },
        ],
      },
      {
        categoryName: 'Asus',
        categorySlug: 'asus',
        categoryChildren: [
          {
            categoryName: 'ProArt Studiobook',
            categorySlug: 'proart-studiobook',
          },
          {
            categoryName: 'ROS Gaming',
            categorySlug: 'ros-gaming',
          },
          {
            categoryName: 'Expertbook',
            categorySlug: 'expertbook',
          },
          {
            categoryName: 'Zenbook',
            categorySlug: 'zenbook',
          },
          {
            categoryName: 'Vivobook',
            categorySlug: 'vivobook',
          },
          {
            categoryName: 'TUF Gaming',
            categorySlug: 'tuf-gaming',
          },
        ],
      },
    ],
  },
  {
    categoryName: 'Tablet',
    categorySlug: 'tablet',
    categoryChildren: [
      {
        categoryName: 'Apple',
        categorySlug: 'apple',
        categoryChildren: [
          {
            categoryName: 'iPad',
            categorySlug: 'ipad',
          },
        ],
      },
    ],
  },
  {
    categoryName: 'SmartWatch',
    categorySlug: 'smartwatch',
    categoryChildren: [
      {
        categoryName: 'Apple',
        categorySlug: 'apple',
        categoryChildren: [
          {
            categoryName: 'Apple Watch',
            categorySlug: 'apple-watch',
          },
        ],
      },
    ],
  },
  {
    categoryName: 'Âm thanh',
    categorySlug: 'am-thanh',
    categoryChildren: [
      {
        categoryName: 'Sony',
        categorySlug: 'sony',
      },
      {
        categoryName: 'Marshall',
        categorySlug: 'marshall',
      },
      {
        categoryName: 'Harman Kardon',
        categorySlug: 'harman-kardon',
      },
      {
        categoryName: 'JBL',
        categorySlug: 'jbl',
      },
      {
        categoryName: 'Bose',
        categorySlug: 'bose',
      },
      {
        categoryName: 'Bang Olufsen',
        categorySlug: 'bang-olufsen',
      },
      {
        categoryName: 'Devialet',
        categorySlug: 'devialet',
      },
    ],
  },
];

function CategoryMenu() {
  const theme = useMantineTheme();

  return (
    <Tabs variant="pills" tabPadding="md" styles={{
      // TODO: Refactor !important
      tabActive: {
        color: (theme.colorScheme === 'dark' ? theme.colors.blue[2] : theme.colors.blue[6]) + '!important',
        backgroundColor: (theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors.blue[8], 0.35) : theme.colors.blue[0]) + '!important',
      },
    }}
    >
      {categoryLinks.map((firstCategory, index) => {
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
                  {firstCategory.categoryChildren?.map((secondCategory, index) => (
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
                        {secondCategory.categoryChildren?.map((thirdCategory, index) => (
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
