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
import ResourceURL from '../constants/ResourceURL';
import FetchUtils, { RequestParams, ResponseData } from '../utils/FetchUtils';
import DateUtils from '../utils/DateUtils';
import FilterUtils, {
  FilterCriteria,
  FilterObject,
  FilterPropertyType,
  FilterPropertyTypes,
  OrderType,
  SortCriteria,
  StringOperator
} from '../utils/FilterUtils';

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

const initialPropertySelectList: SelectOption[] = [
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

const filterPropertyTypes: FilterPropertyTypes = {
  id: FilterPropertyType.NUMBER,
  createdAt: FilterPropertyType.DATE,
  updatedAt: FilterPropertyType.DATE,
  name: FilterPropertyType.STRING,
  code: FilterPropertyType.STRING,
}

const filterStringOperatorSelectList: SelectOption[] = [
  {
    value: StringOperator.EQUALS,
    label: 'Bằng với',
  },
  {
    value: StringOperator.NOT_EQUALS,
    label: 'Không bằng với',
  },
];

const MAX_FILTER_CRITERIA_NUMBER = 10;
const CURRENT_USER_ID = 1;

export default function ProvinceManager() {
  const { classes, cx } = useStyles();

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const filterNameInputRef = useRef<HTMLInputElement | null>(null);
  const filterCriteriaValueInputRefs = useRef<WeakMap<FilterCriteria, HTMLInputElement | null>>(new WeakMap());

  const [responseData, setResponseData] = useState<ResponseData<Province>>(initialResponseData);
  const [activePage, setActivePage] = useState(responseData.page);
  const [activePageSize, setActivePageSize] = useState(responseData.size);
  const [selection, setSelection] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchToken, setSearchToken] = useState('');
  const [activeFilterPanel, setActiveFilterPanel] = useState(true);

  const [sortCriteriaList, setSortCriteriaList] = useState<SortCriteria[]>([]);
  const [sortPropertySelectList, setSortPropertySelectList] = useState(initialPropertySelectList);

  const [filterCriteriaList, setFilterCriteriaList] = useState<FilterCriteria[]>([]);
  const [filterPropertySelectList, setFilterPropertySelectList] = useState(initialPropertySelectList);
  const [filters, setFilters] = useState<FilterObject[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterObject | null>(null)
  const [prevActiveFilter, setPrevActiveFilter] = useState<FilterObject | null>(null);

  useEffect(() => {
    if (loading) {
      const requestParams: RequestParams = {
        page: activePage,
        size: activePageSize,
        sort: FilterUtils.convertToSortRSQL(activeFilter),
        filter: FilterUtils.convertToFilterRSQL(activeFilter),
        search: searchToken,
      };
      const responseDataPromise = FetchUtils.getAll<Province>(ResourceURL.PROVINCE, requestParams);
      setTimeout(() => responseDataPromise.then(setResponseData).then(() => setLoading(false)), 100);
    }
  }, [activePage, activePageSize, activeFilter, searchToken, loading]);

  const toggleRow = (id: number) =>
    setSelection(current =>
      current.includes(id) ? current.filter(item => item !== id) : [...current, id]
    );

  const toggleAll = () =>
    setSelection(current =>
      current.length === responseData.size ? [] : responseData.content.map(item => item.id)
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
    const currentSearchToken = searchInputRef.current?.value ?? '';
    if (currentSearchToken !== searchToken || activeFilter?.id !== prevActiveFilter?.id) {
      setLoading(true);
      setActivePage(1);
      setSearchToken(currentSearchToken);
      setPrevActiveFilter(activeFilter);
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

  const handleAddFilterButton = () => {
    if (!activeFilterPanel) {
      setActiveFilterPanel(true);
    }
  }

  const handleCancelCreateFilterButton = () => {
    if (activeFilterPanel) {
      setSortCriteriaList([]);
      setSortPropertySelectList(initialPropertySelectList);
      setFilterCriteriaList([]);
      setActiveFilterPanel(false);
    }
  }

  const handleCreateSortCriteriaButton = () => {
    if (sortCriteriaList.length < sortPropertySelectList.length) {
      setSortCriteriaList(prevState => [...prevState, { property: null, order: OrderType.ASC }]);
    }
  }

  const handleSortPropertySelect = (propertyValue: string | null, sortCriteriaIndex: number) => {
    const currentSortCriteriaList = sortCriteriaList.map((item, index) => {
      return (index === sortCriteriaIndex) ? { ...item, property: propertyValue } : item;
    })

    setSortCriteriaList(currentSortCriteriaList);

    const isIncludeInSortCriteriaPropertyList = (propertyValue: string) => {
      return currentSortCriteriaList.map(item => item.property).includes(propertyValue);
    }

    setSortPropertySelectList(sortPropertySelectList.map(option => {
      if (option.disabled === true && !isIncludeInSortCriteriaPropertyList(option.value)) {
        return { ...option, disabled: false };
      }
      if (option.value === propertyValue) {
        return { ...option, disabled: true };
      }
      return option;
    }));
  }

  const handleSortOrderSelect = (orderValue: string | null, sortCriteriaIndex: number) => {
    setSortCriteriaList(sortCriteriaList.map((item, index) => {
      return (index === sortCriteriaIndex) ? { ...item, order: orderValue as OrderType } : item;
    }));
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

  const handleCreateFilterCriteriaButton = () => {
    if (filterCriteriaList.length < MAX_FILTER_CRITERIA_NUMBER) {
      setFilterCriteriaList(prevState => [...prevState, {
        property: null,
        type: null,
        operator: null,
        value: null,
      }]);
    }
  }

  const handleFilterPropertySelect = (propertyValue: string | null, filterCriteriaIndex: number) => {
    const currentFilterCriteriaList = filterCriteriaList.map((item, index) => {
      return (index === filterCriteriaIndex) ? {
        ...item,
        property: propertyValue,
        type: propertyValue ? filterPropertyTypes[propertyValue] : null
      } : item;
    });

    setFilterCriteriaList(currentFilterCriteriaList);
  }

  const handleFilterOperatorSelect = (operatorValue: string | null, filterCriteriaIndex: number) => {
    const currentFilterCriteriaList = filterCriteriaList.map((item, index) => {
      return (index === filterCriteriaIndex) ? { ...item, operator: operatorValue as StringOperator } : item;
    });

    setFilterCriteriaList(currentFilterCriteriaList);
  }

  const handleDeleteFilterCriteriaButton = (filterCriteriaIndex: number) => {
    setFilterCriteriaList(filterCriteriaList.filter((_, index) => index !== filterCriteriaIndex));
  }

  const handleCreateFilterButton = () => {
    const randomNumber = Math.floor(Math.random() * 10000) + 1;
    const filterId = 'filter-' + randomNumber;
    const filterName = filterNameInputRef.current?.value || 'Bộ lọc ' + randomNumber;

    const assignValueForFilterCriteria = (filterCriteriaList: FilterCriteria[]) => {
      return filterCriteriaList.map(item => {
        const filterCriteriaValueInputRefValue = filterCriteriaValueInputRefs.current.get(item)?.value;
        return filterCriteriaValueInputRefValue ? { ...item, value: filterCriteriaValueInputRefValue } : item;
      });
    }

    const filter: FilterObject = {
      id: filterId,
      createdAt: DateUtils.nowIso(),
      updatedAt: DateUtils.nowIso(),
      createdBy: CURRENT_USER_ID,
      updatedBy: CURRENT_USER_ID,
      name: filterName,
      sortCriteriaList: sortCriteriaList,
      filterCriteriaList: assignValueForFilterCriteria(filterCriteriaList),
    }

    setFilters(prevState => [...prevState, filter]);

    // reset filter panel

    setSortCriteriaList([]);
    setSortPropertySelectList(initialPropertySelectList);
    setFilterCriteriaList([]);
    setActiveFilterPanel(false);

    // console.log(filter)
  }

  const filterSelectList: SelectOption[] = filters.map(item => ({ value: item.id, label: item.name }));

  const handleFilterSelect = (filterIdValue: string | null) => {
    setActiveFilter(prevState => {
      setPrevActiveFilter(prevState ?? null);
      return filters.find(item => item.id === filterIdValue) ?? null;
    });
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
        <td>{DateUtils.isoDateToString(item.createdAt)}</td>
        <td>{DateUtils.isoDateToString(item.updatedAt)}</td>
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
        onChange={propertyValue => handleSortPropertySelect(propertyValue, index)}
      />
      <Select
        sx={{ width: '100%' }}
        placeholder="Chọn thứ tự sắp xếp"
        icon={<ArrowsDownUp size={14}/>}
        clearable
        value={sortCriteria.order}
        data={sortOrderSelectList}
        onChange={orderValue => handleSortOrderSelect(orderValue, index)}
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

  const filterCriteriaListFragment = filterCriteriaList.map((filterCriteria, index) => (
    <Group key={index} spacing="sm" sx={{ flexWrap: 'nowrap', justifyContent: 'space-between' }}>
      <ActionIcon color="blue" variant="hover" size={36} title="Di chuyển tiêu chí lọc">
        <DragDrop/>
      </ActionIcon>
      <Select
        sx={{ width: '100%' }}
        placeholder="Chọn thuộc tính"
        icon={<AB size={14}/>}
        clearable
        value={filterCriteria.property}
        data={filterPropertySelectList}
        onChange={propertyValue => handleFilterPropertySelect(propertyValue, index)}
      />
      <Select
        sx={{ width: '100%' }}
        placeholder="Chọn cách lọc"
        icon={<Filter size={14}/>}
        clearable
        value={filterCriteria.operator}
        data={filterStringOperatorSelectList}
        onChange={operatorValue => handleFilterOperatorSelect(operatorValue, index)}
      />
      <TextInput
        sx={{ width: '120%' }}
        placeholder="Nhập giá trị"
        icon={<Keyboard size={14}/>}
        ref={inputRef => filterCriteriaValueInputRefs.current.set(filterCriteria, inputRef)}
      />
      <ActionIcon
        color="red"
        variant="hover"
        size={36}
        title="Xóa tiêu chí lọc"
        onClick={() => handleDeleteFilterCriteriaButton(index)}
      >
        <CircleX/>
      </ActionIcon>
    </Group>
  ));

  console.log('re-render: ', responseData, {
    // filterCriteriaList,
    // sortCriteriaList,
    // filters,
    // sortPropertySelectList,
    // activePage,
    // activePageSize,
    // selection,
    loading,
    searchToken,
    activeFilter,
    prevActiveFilter,
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
              data={filterSelectList}
              onChange={handleFilterSelect}
            />
            <Tooltip label="Sửa bộ lọc" withArrow>
              <ActionIcon color="teal" variant="light" size={36}>
                <Edit/>
              </ActionIcon>
            </Tooltip>
            <Button variant="light" leftIcon={<Filter/>} onClick={handleAddFilterButton}>
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
                <Button variant="light" onClick={handleCreateFilterButton}>
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
                  {filterCriteriaListFragment}
                  <Button
                    variant="outline"
                    onClick={handleCreateFilterCriteriaButton}
                    disabled={filterCriteriaList.length === MAX_FILTER_CRITERIA_NUMBER}
                  >
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
