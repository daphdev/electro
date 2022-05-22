import React, { useEffect, useState } from 'react';
import {
  ActionIcon,
  Button,
  Center,
  Checkbox,
  createStyles,
  Group,
  LoadingOverlay,
  Menu,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
  Tooltip
} from '@mantine/core';
import { AdjustmentsHorizontal, Edit, Eraser, Eye, Filter, Hash, Plus, Search, Trash } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { getAll, RequestParams, ResponseData } from '../utils/FetchUtils';
import { ResourceURL } from '../constants/ResourceURL';
import { isoDateToString } from '../utils/DateUtils';

interface TitleLink {
  link: string,
  label: string,
}

const titleLinks: TitleLink[] = [
  {
    link: '/admin/address',
    label: 'Quản lý địa chỉ',
  },
  {
    link: '/admin/address/province',
    label: 'Quản lý tỉnh thành',
  },
  {
    link: '/admin/address/district',
    label: 'Quản lý quận huyện',
  }
]

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2) + '!important'
        : theme.colors[theme.primaryColor][0] + '!important',
  },
}));

interface Province {
  id: number,
  createdAt: string,
  updatedAt: string,
  name: string,
  code: string
}

const initialResponseData: ResponseData<Province> = {
  content: [],
  page: 1,
  size: 5,
  totalElements: 0,
  totalPages: 0,
  last: false
}

export default function ProvinceManager() {
  const { classes, cx } = useStyles();

  const [responseData, setResponseData] = useState<ResponseData<Province>>(initialResponseData);
  const [activePage, setActivePage] = useState<number>(responseData.page);
  const [activePageSize, setActivePageSize] = useState<number>(responseData.size);
  const [selection, setSelection] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestParams: RequestParams = {
      page: activePage,
      size: activePageSize,
    };
    const responseData = getAll<Province>(ResourceURL.PROVINCE, requestParams);
    responseData.then((data) => {
      setResponseData(data);
      setLoading(false);
    });
  }, [activePage, activePageSize]);

  const toggleRow = (id: number) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );

  const toggleAll = () =>
    setSelection((current) =>
      current.length === responseData.size ? [] : responseData.content.map((item) => item.id)
    );

  const setActivePageAndLoading = (page: number) => {
    if (page !== activePage) {
      setLoading(true);
      setActivePage(page);
    }
  }

  const setActivePageSizeAndLoading = (size: number) => {
    if (size !== activePageSize) {
      setLoading(true);
      setActivePage(1);
      setActivePageSize(size);
    }
  }

  const titleLinksFragment = titleLinks.map(titleLink => (
    <Menu.Item key={titleLink.label} component={Link} to={titleLink.link}>
      {titleLink.label}
    </Menu.Item>
  ));

  const ths = (
    <tr>
      <th style={{ width: 40 }}>
        <Checkbox
          onChange={toggleAll}
          checked={selection.length === responseData.size}
          indeterminate={selection.length > 0 && selection.length !== responseData.size}
          transitionDuration={0}
        />
      </th>
      <th>ID</th>
      <th>Ngày tạo</th>
      <th>Ngày cập nhật</th>
      <th>Tên tỉnh thành</th>
      <th>Mã tỉnh thành</th>
      <th style={{ width: 120 }}>Thao tác</th>
    </tr>
  );

  const rows = responseData.content.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
            transitionDuration={0}
          />
        </td>
        <td>{item.id}</td>
        <td>{isoDateToString(item.createdAt)}</td>
        <td>{isoDateToString(item.updatedAt)}</td>
        <td>{item.name}</td>
        <td>{item.code}</td>
        <td>
          <Group spacing="xs">
            <ActionIcon color="blue" variant="outline" size={24} title="Xem">
              <Eye size={16}/>
            </ActionIcon>
            <ActionIcon color="teal" variant="outline" size={24} title="Sửa">
              <Edit size={16}/>
            </ActionIcon>
            <ActionIcon color="red" variant="outline" size={24} title="Xóa">
              <Trash size={16}/>
            </ActionIcon>
          </Group>
        </td>
      </tr>
    );
  });

  // console.log('re-render: ', responseData, { activePage, activePageSize, selection, loading });

  return (
    <Stack>

      <Group position="apart">
        <Group spacing="xs">
          <Menu
            control={(
              <ActionIcon color="blue" variant="filled">
                <Hash/>
              </ActionIcon>
            )}
          >
            {titleLinksFragment}
          </Menu>
          <Title order={3}>Quản lý tỉnh thành</Title>
        </Group>

        <Group spacing="xs">
          <Button variant="outline" leftIcon={<Plus/>}>
            Thêm mới
          </Button>
          <Button variant="outline" color="red" leftIcon={<Trash/>}>
            Xóa hàng loạt
          </Button>
        </Group>
      </Group>

      <Paper shadow="xs" p="sm">
        <Group position="apart">
          <Group spacing="sm">
            <TextInput
              placeholder="Từ khóa"
              icon={<Search size={14}/>}
              styles={{ root: { width: 250 } }}
            />
            <Select
              placeholder="Chọn bộ lọc"
              icon={<AdjustmentsHorizontal size={14}/>}
              clearable
              data={['Bộ lọc 1', 'Bộ lọc 2', 'Bộ lọc 3']}
            />
            <Tooltip label="Sửa bộ lọc" withArrow>
              <ActionIcon color="teal" variant="light" size={36}>
                <Edit/>
              </ActionIcon>
            </Tooltip>
            <Button variant="light" leftIcon={<Filter/>}>
              Thêm bộ lọc
            </Button>
          </Group>

          <Group spacing="sm">
            <Tooltip label="Đặt mặc định" withArrow>
              <ActionIcon color="red" variant="filled" size={36}>
                <Eraser/>
              </ActionIcon></Tooltip>
            <Button>
              Tìm kiếm
            </Button>
          </Group>
        </Group>
      </Paper>

      <Paper shadow="xs" style={{
        position: 'relative',
        height: responseData.totalElements === 0 ? '250px' : 'auto'
      }}
      >
        <LoadingOverlay visible={loading}/>
        {responseData.totalElements === 0 ? (
          <Center sx={{ height: '100%' }}>
            <Text color="dimmed">Không có gì hết :)</Text>
          </Center>
        ) : (
          <Table
            horizontalSpacing="sm"
            verticalSpacing="sm"
            highlightOnHover
            striped
            sx={(theme) => ({
              borderRadius: theme.radius.sm,
              overflow: 'hidden'
            })}
          >
            <thead>{ths}</thead>
            <tbody>{rows}</tbody>
          </Table>
        )}
      </Paper>

      {responseData.totalElements !== 0 && (
        <Group position="apart">
          <Text>
            <Text component="span" weight={500}>Trang {activePage}</Text>
            <span> / {responseData.totalPages} </span>
            <Text component="span" color="gray" size="sm">({responseData.totalElements})</Text>
          </Text>
          <Pagination page={activePage} onChange={setActivePageAndLoading} total={responseData.totalPages}/>
          <Group>
            <Text size="sm">Số hàng trên trang</Text>
            <Select
              styles={{ root: { width: 72 } }}
              variant="filled"
              data={['5', '10', '25', '50']}
              value={String(activePageSize)}
              onChange={(pageSize) => setActivePageSizeAndLoading(Number(pageSize))}
            />
          </Group>
        </Group>
      )}

    </Stack>
  );
}
