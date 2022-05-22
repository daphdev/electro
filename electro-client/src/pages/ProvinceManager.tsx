import React, { useState } from 'react';
import {
  ActionIcon,
  Button,
  Checkbox,
  createStyles,
  Group,
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
import { AdjustmentsHorizontal, Edit, Eye, Filter, Hash, Plus, Search, Trash } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

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
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export default function ProvinceManager() {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState<number[]>([]);

  const titleLinksFragment = titleLinks.map(titleLink => (
    <Menu.Item key={titleLink.label} component={Link} to={titleLink.link}>
      {titleLink.label}
    </Menu.Item>
  ))

  const rawData = `{
    "content": [
      {
        "id": 10,
        "createdAt": "2022-04-11T13:14:28Z",
        "updatedAt": "2021-10-03T08:28:38Z",
        "name": "Illinois",
        "code": "60158"
      },
      {
        "id": 9,
        "createdAt": "2022-04-14T13:12:37Z",
        "updatedAt": "2021-07-27T17:15:46Z",
        "name": "Connecticut",
        "code": "06127"
      },
      {
        "id": 8,
        "createdAt": "2022-05-08T01:21:42Z",
        "updatedAt": "2021-12-18T21:51:37Z",
        "name": "Texas",
        "code": "79105"
      },
      {
        "id": 7,
        "createdAt": "2021-09-28T10:42:31Z",
        "updatedAt": "2022-01-05T17:19:36Z",
        "name": "Pennsylvania",
        "code": "19136"
      },
      {
        "id": 6,
        "createdAt": "2021-10-22T15:40:25Z",
        "updatedAt": "2021-08-30T11:12:08Z",
        "name": "New Jersey",
        "code": "08638"
      }
    ],
    "page": 1,
    "size": 5,
    "totalElements": 10,
    "totalPages": 2,
    "last": false
  }`;

  const data = JSON.parse(rawData);

  const [activePage, setActivePage] = useState<number>(data.page);
  const [activePageSize, setActivePageSize] = useState<number>(data.size);

  const elements = data.content;

  const convertDate = (date: string) => dayjs(date).format('HH:mm:ss DD/MM/YYYY').toString();


  const toggleRow = (id: number) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );

  const toggleAll = () =>
    setSelection((current) => (current.length === data.size ? [] : data.content.map((item: any) => item.id)));

  const rows = elements.map((element: any) => {
    const selected = selection.includes(element.id);
    return (
      <tr key={element.id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selection.includes(element.id)}
            onChange={() => toggleRow(element.id)}
            transitionDuration={0}
          />
        </td>
        <td>{element.id}</td>
        <td>{convertDate(element.createdAt)}</td>
        <td>{convertDate(element.updatedAt)}</td>
        <td>{element.name}</td>
        <td>{element.code}</td>
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

  const ths = (
    <tr>
      <th style={{ width: 40 }}>
        <Checkbox
          onChange={toggleAll}
          checked={selection.length === data.size}
          indeterminate={selection.length > 0 && selection.length !== data.size}
          transitionDuration={0}
        />
      </th>
      <th>ID</th>
      <th>Ngày tạo</th>
      <th>Ngày cập nhật</th>
      <th>Tên tỉnh thành</th>
      <th>Mã tỉnh thành</th>
      <th style={{ width: 115 }}>Thao tác</th>
    </tr>
  );

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
              data={['React', 'Angular', 'Svelte', 'Vue']}
            />
            <Tooltip
              label="Sửa bộ lọc"
              withArrow
            >
              <ActionIcon color="teal" variant="light" size={36}>
                <Edit/>
              </ActionIcon>
            </Tooltip>
            <Button variant="light" leftIcon={<Filter/>}>
              Thêm bộ lọc
            </Button>
          </Group>
          <Group>
            <Button>
              Tìm kiếm
            </Button>
          </Group>
        </Group>
      </Paper>

      <Paper shadow="xs" p="0 12px 12px">
        <Table verticalSpacing="sm" highlightOnHover>
          <thead>{ths}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </Paper>

      <Group position="apart">
        <Text><Text weight={500} component="span">Trang {activePage}</Text> / {data.totalPages}</Text>
        <Pagination page={activePage} onChange={setActivePage} total={data.totalPages}/>
        <Group>
          <Text size="sm">Số hàng trên trang</Text>
          <Select
            styles={{ root: { width: '72px' } }}
            variant="filled"
            data={['5', '10', '25', '50']}
            value={String(activePageSize)}
            onChange={(pageSize) => setActivePageSize(Number(pageSize))}
          />
        </Group>
      </Group>

    </Stack>
  );
}
