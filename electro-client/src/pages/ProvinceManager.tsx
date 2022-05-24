import React, { useEffect, useRef, useState } from 'react';
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Checkbox,
  Code,
  createStyles,
  Divider,
  Grid,
  Group,
  Highlight,
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
import {
  AB,
  AdjustmentsHorizontal,
  ArrowsDownUp,
  CircleX,
  DragDrop,
  Edit,
  Eraser,
  Eye,
  Filter,
  FilterOff,
  Hash,
  Keyboard,
  Plus,
  Search,
  Trash
} from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { getAll, RequestParams, ResponseData } from '../utils/FetchUtils';
import { ResourceURL } from '../constants/ResourceURL';
import { isoDateToString } from '../utils/DateUtils';
import { SortCriteria } from '../utils/FilterUtils';

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

  titleFilterPanel: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    textAlign: 'center',
    padding: theme.spacing.xs,
    borderRadius: theme.radius.md,
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

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

const initialSortPropertySelectList: SelectOption[] = [
  {
    value: 'id',
    label: 'ID',
  },
  {
    value: 'createdAt',
    label: 'Ngày tạo',
  },
  {
    value: 'updatedAt',
    label: 'Ngày cập nhật',
  },
  {
    value: 'name',
    label: 'Tên tỉnh thành',
  },
  {
    value: 'code',
    label: 'Mã tỉnh thành',
  },
];

const sortOrderSelectList: SelectOption[] = [
  {
    value: 'asc',
    label: 'Tăng dần',
  },
  {
    value: 'desc',
    label: 'Giảm dần',
  },
];

export default function ProvinceManager() {
  const { classes, cx } = useStyles();

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const filterNameInputRef = useRef<HTMLInputElement | null>(null);

  const [responseData, setResponseData] = useState<ResponseData<Province>>(initialResponseData);
  const [activePage, setActivePage] = useState<number>(responseData.page);
  const [activePageSize, setActivePageSize] = useState<number>(responseData.size);
  const [selection, setSelection] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchToken, setSearchToken] = useState('');
  const [activeFilterPanel, setActiveFilterPanel] = useState(true);

  const [sortCriteriaList, setSortCriteriaList] = useState<SortCriteria[]>([]);
  const [sortPropertySelectList, setSortPropertySelectList] = useState(initialSortPropertySelectList);

  useEffect(() => {
    const requestParams: RequestParams = {
      page: activePage,
      size: activePageSize,
      sort: '',
      filter: '',
      search: searchToken,
    };
    const responseData = getAll<Province>(ResourceURL.PROVINCE, requestParams);
    setTimeout(() => {
      responseData.then((data) => {
        setResponseData(data);
        setLoading(false);
      });
    }, 100)
  }, [activePage, activePageSize, searchToken]);

  const toggleRow = (id: number) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );

  const toggleAll = () =>
    setSelection((current) =>
      current.length === responseData.size ? [] : responseData.content.map((item) => item.id)
    );

  const handlePaginationButton = (page: number) => {
    if (page !== activePage) {
      setLoading(true);
      setSelection([]);
      setActivePage(page);
    }
  }

  const handlePageSizeSelect = (size: string) => {
    const pageSize = Number(size);
    if (pageSize !== activePageSize) {
      setLoading(true);
      setSelection([]);
      setActivePage(1);
      setActivePageSize(pageSize);
    }
  }

  const handleSearchButton = () => {
    const currentSearchToken = String(searchInputRef.current?.value);
    if (currentSearchToken !== searchToken) {
      setLoading(true);
      setActivePage(1);
      setSearchToken(currentSearchToken);
    }
  }

  const handleSearchInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchButton();
    }
  }

  const handleResetButton = () => {
    if (searchInputRef.current?.value) {
      searchInputRef.current.value = '';
    }
  }

  const handleCreateFilterButton = () => {
    if (!activeFilterPanel) {
      setActiveFilterPanel(true);
    }
  }

  const handleCancelCreateFilterButton = () => {
    if (activeFilterPanel) {
      setActiveFilterPanel(false);
    }
  }

  const handleCreateSortCriteriaButton = () => {
    if (sortCriteriaList.length < sortPropertySelectList.length) {
      const sortCriteria: SortCriteria = {
        property: '',
        order: 'asc',
      };
      setSortCriteriaList(prevState => [...prevState, sortCriteria]);
    }
  }

  const handleSortOrderSelect = (order: string, sortCriteriaIndex: number) => {
    const currentSortCriteriaList = [...sortCriteriaList];
    currentSortCriteriaList[sortCriteriaIndex] = {
      ...currentSortCriteriaList[sortCriteriaIndex],
      order: order as 'asc' | 'desc'
    };
    setSortCriteriaList(currentSortCriteriaList);
  }

  const handleDeleteSortCriteriaButton = (sortCriteriaIndex: number) => {
    setSortCriteriaList(sortCriteriaList.filter((_, index) => index !== sortCriteriaIndex));
    setSortPropertySelectList(sortPropertySelectList.map(option => {
      if (option.disabled === true && option.value === sortCriteriaList[sortCriteriaIndex].property) {
        return { ...option, disabled: false };
      }
      return option;
    }));
  }

  const handleSortPropertySelect = (property: string, sortCriteriaIndex: number) => {
    const currentSortCriteriaList = [...sortCriteriaList];
    currentSortCriteriaList[sortCriteriaIndex] = { ...currentSortCriteriaList[sortCriteriaIndex], property: property };
    setSortCriteriaList(currentSortCriteriaList);
    setSortPropertySelectList(sortPropertySelectList.map(option => {
      if (option.disabled === true && !currentSortCriteriaList.map(sc => sc.property).includes(option.value)) {
        return { ...option, disabled: false };
      }
      if (option.value === property) {
        return { ...option, disabled: true };
      }
      return option;
    }));
  }

  const titleLinksFragment = titleLinks.map(titleLink => (
    <Menu.Item key={titleLink.label} component={Link} to={titleLink.link}>
      {titleLink.label}
    </Menu.Item>
  ));

  const tableHeadsFragment = (
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

  const tableRowsFragment = responseData.content.map((item) => {
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
        <td>
          <Highlight highlight={searchToken} highlightColor="blue">
            {item.name}
          </Highlight>
        </td>
        <td>
          <Highlight highlight={searchToken} highlightColor="blue">
            {item.code}
          </Highlight>
        </td>
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

  const sortCriteriaListFragment = sortCriteriaList.map((sortCriteria, index) => (
    <Group key={index} spacing="sm" sx={{ flexWrap: 'nowrap', justifyContent: 'space-between' }}>
      <ActionIcon color="blue" variant="hover" size={36} title="Di chuyển tiêu chí sắp xếp">
        <DragDrop/>
      </ActionIcon>
      <Select
        sx={{ width: '100%' }}
        placeholder="Chọn thuộc tính"
        icon={<AB size={14}/>}
        clearable
        value={sortCriteria.property}
        data={sortPropertySelectList}
        onChange={property => handleSortPropertySelect(String(property), index)}
      />
      <Select
        sx={{ width: '100%' }}
        placeholder="Chọn thứ tự sắp xếp"
        icon={<ArrowsDownUp size={14}/>}
        clearable
        value={sortCriteria.order}
        onChange={order => handleSortOrderSelect(String(order), index)}
        data={sortOrderSelectList}
      />
      <ActionIcon
        color="red"
        variant="hover"
        size={36}
        title="Xóa tiêu chí sắp xếp"
        onClick={() => handleDeleteSortCriteriaButton(index)}
      >
        <CircleX/>
      </ActionIcon>
    </Group>
  ));

  console.log('re-render: ', responseData, {
    sortCriteriaList,
    sortPropertySelectList,
    activePage,
    activePageSize,
    selection,
    loading
  });

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
              ref={searchInputRef}
              onKeyDown={handleSearchInput}
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
            <Button variant="light" leftIcon={<Filter/>} onClick={handleCreateFilterButton}>
              Thêm bộ lọc
            </Button>
          </Group>

          <Group spacing="sm">
            <Tooltip label="Đặt mặc định" withArrow>
              <ActionIcon color="red" variant="filled" size={36} onClick={handleResetButton}>
                <Eraser/>
              </ActionIcon>
            </Tooltip>
            <Button onClick={handleSearchButton}>
              Tìm kiếm
            </Button>
          </Group>
        </Group>
      </Paper>

      {activeFilterPanel && (
        <Paper shadow="xs">
          <Stack spacing={0}>
            <Group position="apart" p="sm">
              <Group>
                <TextInput
                  placeholder="Bộ lọc 1"
                  icon={<Filter size={14}/>}
                  styles={{ root: { width: 250 } }}
                  ref={filterNameInputRef}
                />
                <Text size="sm">Ngày tạo: <Code color="blue">__/__/____</Code></Text>
                <Text size="sm">Ngày sửa: <Code color="blue">__/__/____</Code></Text>
              </Group>
              <Group spacing="sm">
                <Tooltip label="Hủy tạo bộ lọc" withArrow>
                  <ActionIcon color="red" variant="light" size={36} onClick={handleCancelCreateFilterButton}>
                    <FilterOff/>
                  </ActionIcon>
                </Tooltip>
                <Button variant="light">
                  Tạo bộ lọc
                </Button>
              </Group>
            </Group>

            <Divider/>

            <Grid grow p="sm" gutter="sm">
              <Grid.Col span={1}>
                <Stack spacing="sm">
                  <Box className={classes.titleFilterPanel}>
                    Sắp xếp
                  </Box>
                  {sortCriteriaListFragment}
                  <Button
                    variant="outline"
                    onClick={handleCreateSortCriteriaButton}
                    disabled={sortCriteriaList.length === sortPropertySelectList.length}
                  >
                    Thêm tiêu chí sắp xếp
                  </Button>
                </Stack>
              </Grid.Col>
              <Grid.Col span={3}>
                <Stack spacing="sm">
                  <Box className={classes.titleFilterPanel}>
                    Lọc
                  </Box>
                  <Group spacing="sm" sx={{ flexWrap: 'nowrap', justifyContent: 'space-between' }}>
                    <ActionIcon color="blue" variant="hover" size={36} title="Di chuyển tiêu chí lọc">
                      <DragDrop/>
                    </ActionIcon>
                    <Select
                      sx={{ width: '100%' }}
                      placeholder="Chọn thuộc tính"
                      icon={<AB size={14}/>}
                      clearable
                      data={['ID', 'Ngày tạo', 'Ngày cập nhật', 'Tên tỉnh thành', 'Mã tỉnh thành']}
                    />
                    <Select
                      sx={{ width: '100%' }}
                      placeholder="Chọn cách lọc"
                      icon={<Filter size={14}/>}
                      clearable
                      data={[
                        'Bằng với', 'Không bằng với', 'Chứa chuỗi',
                        'Không chứa chuỗi', 'Bắt đầu với', 'Kết thúc với',
                        'Có trong', 'Không có trong', 'Là rỗng', 'Không là rỗng'
                      ]}
                    />
                    <TextInput
                      sx={{ width: '120%' }}
                      placeholder="Nhập giá trị"
                      icon={<Keyboard size={14}/>}
                    />
                    <ActionIcon color="red" variant="hover" size={36} title="Xóa tiêu chí lọc">
                      <CircleX/>
                    </ActionIcon>
                  </Group>
                  <Button variant="outline">
                    Thêm tiêu chí lọc
                  </Button>
                </Stack>
              </Grid.Col>
            </Grid>
          </Stack>
        </Paper>
      )}

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
            <thead>{tableHeadsFragment}</thead>
            <tbody>{tableRowsFragment}</tbody>
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
          <Pagination page={activePage} onChange={handlePaginationButton} total={responseData.totalPages}/>
          <Group>
            <Text size="sm">Số hàng trên trang</Text>
            <Select
              styles={{ root: { width: 72 } }}
              variant="filled"
              data={['5', '10', '25', '50']}
              value={String(activePageSize)}
              onChange={handlePageSizeSelect}
            />
          </Group>
        </Group>
      )}

    </Stack>
  );
}
