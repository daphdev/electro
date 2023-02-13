import React, { useState } from 'react';
import {
  Card,
  Checkbox,
  Container,
  Grid,
  Group,
  Pagination,
  Radio,
  RadioGroup,
  Skeleton,
  Stack,
  Text,
  Title,
  useMantineTheme
} from '@mantine/core';
import { useLocation } from 'react-router-dom';
import { AlertTriangle, ArrowsDownUp, ChartCandle, Marquee } from 'tabler-icons-react';
import { ClientProductCard } from 'components';
import ApplicationConstants from 'constants/ApplicationConstants';
import { useQuery } from 'react-query';
import FetchUtils, { ErrorMessage, ListResponse } from 'utils/FetchUtils';
import { ClientListedProductResponse } from 'types';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import useTitle from 'hooks/use-title';

function ClientSearch() {
  const theme = useMantineTheme();

  const searchQuery = new URLSearchParams(useLocation().search).get('q');
  useTitle(`Kết quả tìm kiếm cho "${searchQuery}"`);

  const [activePage, setActivePage] = useState(1);
  const [activeSort, setActiveSort] = useState<string | null>(null);
  const [activeSaleable, setActiveSaleable] = useState(false);

  const requestParams = {
    page: activePage,
    size: ApplicationConstants.DEFAULT_CLIENT_SEARCH_PAGE_SIZE,
    filter: null,
    sort: activeSort,
    search: searchQuery,
    newable: true,
    saleable: activeSaleable,
  };

  const {
    data: productResponses,
    isLoading: isLoadingProductResponses,
    isError: isErrorProductResponses,
  } = useQuery<ListResponse<ClientListedProductResponse>, ErrorMessage>(
    ['client-api', 'products', 'getAllProducts', requestParams],
    () => FetchUtils.get(ResourceURL.CLIENT_PRODUCT, requestParams),
    {
      onError: () => NotifyUtils.simpleFailed('Lấy dữ liệu không thành công'),
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
  const products = productResponses as ListResponse<ClientListedProductResponse>;

  let resultFragment;

  if (isLoadingProductResponses) {
    resultFragment = (
      <Stack>
        {Array(5).fill(0).map((_, index) => (
          <Skeleton key={index} height={50} radius="md"/>
        ))}
      </Stack>
    );
  }

  if (isErrorProductResponses) {
    resultFragment = (
      <Stack my={theme.spacing.xl} sx={{ alignItems: 'center', color: theme.colors.pink[6] }}>
        <AlertTriangle size={125} strokeWidth={1}/>
        <Text size="xl" weight={500}>Đã có lỗi xảy ra</Text>
      </Stack>
    );
  }

  if (products && products.totalElements === 0) {
    resultFragment = (
      <Stack my={theme.spacing.xl} sx={{ alignItems: 'center', color: theme.colors.blue[6] }}>
        <Marquee size={125} strokeWidth={1}/>
        <Text size="xl" weight={500}>Không có sản phẩm</Text>
      </Stack>
    );
  }

  if (products && products.totalElements > 0) {
    resultFragment = (
      <>
        <Grid mt={theme.spacing.xs}>
          {products.content.map((product, index) => (
            <Grid.Col key={index} span={6} sm={4} md={3}>
              <ClientProductCard product={product} search={searchQuery || ''}/>
            </Grid.Col>
          ))}
        </Grid>

        <Group position="apart" mt={theme.spacing.lg}>
          <Pagination
            page={activePage}
            total={products.totalPages}
            onChange={(page: number) => (page !== activePage) && setActivePage(page)}
          />
          <Text>
            <Text component="span" weight={500}>Trang {activePage}</Text>
            <span> / {products.totalPages}</span>
          </Text>
        </Group>
      </>
    );
  }

  return (
    <main>
      <Container size="xl">
        <Stack spacing={theme.spacing.xl * 1.5}>
          <Card radius="md" shadow="sm" p="lg">
            <Title order={2}>
              Kết quả tìm kiếm cho &quot;<Text component="span" color="yellow" inherit>{searchQuery}</Text>&quot;
            </Title>
          </Card>

          <Stack spacing="lg">
            <Group position="apart">
              <Group spacing="xs">
                <ArrowsDownUp size={20}/>
                <Text weight={500} mr={theme.spacing.xs}>Sắp xếp theo</Text>
                <RadioGroup
                  value={activeSort || ''}
                  onChange={(value) => setActiveSort((value as '' | 'lowest-price' | 'highest-price') || null)}
                >
                  <Radio value="" label="Mới nhất"/>
                  <Radio value="lowest-price" label="Giá thấp → cao"/>
                  <Radio value="highest-price" label="Giá cao → thấp"/>
                </RadioGroup>
              </Group>
              <Text>{products?.totalElements || 0} sản phẩm</Text>
            </Group>

            <Group spacing="xs">
              <ChartCandle size={20}/>
              <Text weight={500} mr={theme.spacing.xs}>Lọc theo</Text>
              <Checkbox
                label="Chỉ tính còn hàng"
                checked={activeSaleable}
                onChange={(event) => {
                  setActiveSaleable(event.currentTarget.checked);
                  setActivePage(1);
                }}
              />
            </Group>

            {resultFragment}
          </Stack>
        </Stack>
      </Container>
    </main>
  );
}

export default ClientSearch;
