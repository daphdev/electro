import React, { Dispatch, SetStateAction } from 'react';
import {
  Anchor,
  Grid,
  Group,
  ScrollArea,
  Skeleton,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
  useMantineTheme
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import PageConfigs from 'pages/PageConfigs';
import { useQuery } from 'react-query';
import { ClientCategoryResponse, CollectionWrapper } from 'types';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import { AlertTriangle } from 'tabler-icons-react';

function CategoryMenu({ setOpenedCategoryMenu }: { setOpenedCategoryMenu: Dispatch<SetStateAction<boolean>> }) {
  const theme = useMantineTheme();

  const navigate = useNavigate();

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

  if (isLoadingCategoryResponses) {
    return (
      <Stack>
        {Array(5).fill(0).map((_, index) => (
          <Skeleton key={index} height={50} radius="md"/>
        ))}
      </Stack>
    );
  }

  if (isErrorCategoryResponses) {
    return (
      <Stack my={theme.spacing.xl} sx={{ alignItems: 'center', color: theme.colors.pink[6] }}>
        <AlertTriangle size={125} strokeWidth={1}/>
        <Text size="xl" weight={500}>Đã có lỗi xảy ra</Text>
      </Stack>
    );
  }

  const handleAnchor = (path: string) => {
    setOpenedCategoryMenu(false);
    setTimeout(() => navigate(path), 200);
  };

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
      {categoryResponses?.content.map((firstCategory, index) => {
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
                  sx={{ fontSize: theme.fontSizes.sm * 2 }}
                  weight={500}
                  onClick={() => handleAnchor('/category/' + firstCategory.categorySlug)}
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
                          weight={500}
                          color="pink"
                          onClick={() => handleAnchor('/category/' + secondCategory.categorySlug)}
                        >
                          {secondCategory.categoryName}
                        </Anchor>
                        {secondCategory.categoryChildren.map((thirdCategory, index) => (
                          <Anchor
                            key={index}
                            onClick={() => handleAnchor('/category/' + thirdCategory.categorySlug)}
                          >
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
