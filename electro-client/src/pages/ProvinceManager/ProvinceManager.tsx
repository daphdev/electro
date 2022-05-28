import React, { useEffect, useRef, useState } from 'react';
import 'dayjs/locale/vi';
import { Link } from 'react-router-dom';
import { DatePicker } from '@mantine/dates';
import { showNotification } from '@mantine/notifications';
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
  Input,
  LoadingOverlay,
  Menu,
  Modal,
  NumberInput,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
  Tooltip,
  useMantineTheme
} from '@mantine/core';
import {
  AB,
  AdjustmentsHorizontal,
  ArrowsDownUp,
  Check,
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
  Trash,
  X
} from 'tabler-icons-react';
import ResourceURL from '../../constants/ResourceURL';
import { SelectOption } from '../../utils/MantineUtils';
import FetchUtils, { ListResponse, RequestParams } from '../../utils/FetchUtils';
import DateUtils from '../../utils/DateUtils';
import FilterUtils, {
  FilterCriteria,
  FilterObject,
  FilterOperator,
  FilterPropertyType,
  FilterPropertyTypes,
  OrderType,
  SortCriteria
} from '../../utils/FilterUtils';
import { ProvinceResponse } from './Configs';

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

const initialListResponse: ListResponse<ProvinceResponse> = {
  content: [],
  page: 1,
  size: 5,
  totalElements: 0,
  totalPages: 0,
  last: false
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

const filterPropertyTypes: FilterPropertyTypes = {
  id: FilterPropertyType.NUMBER,
  createdAt: FilterPropertyType.DATE,
  updatedAt: FilterPropertyType.DATE,
  name: FilterPropertyType.STRING,
  code: FilterPropertyType.STRING,
}

enum EntityPropertyType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  DATE = 'date',
}

interface EntityPropertyNames {
  [propertyName: string]: {
    label: string,
    type: EntityPropertyType,
  };
}

const entityPropertyNames: EntityPropertyNames = {
  id: {
    label: 'ID',
    type: EntityPropertyType.NUMBER,
  },
  createdAt: {
    label: 'Ngày tạo',
    type: EntityPropertyType.DATE,
  },
  updatedAt: {
    label: 'Ngày cập nhật',
    type: EntityPropertyType.DATE,
  },
  name: {
    label: 'Tên tỉnh thành',
    type: EntityPropertyType.STRING,
  },
  code: {
    label: 'Mã tỉnh thành',
    type: EntityPropertyType.STRING,
  },
}

const MAX_FILTER_CRITERIA_NUMBER = 10;
const CURRENT_USER_ID = 1;

const initialPageSizeSelectList: SelectOption[] = [
  {
    value: '5',
    label: '5',
  },
  {
    value: '10',
    label: '10'
  },
  {
    value: '25',
    label: '25'
  },
  {
    value: '50',
    label: '50'
  }
];

export default function ProvinceManager() {
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const filterNameInputRef = useRef<HTMLInputElement | null>(null);
  const filterCriteriaValueInputRefs = useRef<WeakMap<FilterCriteria, HTMLInputElement | HTMLButtonElement | null>>(new WeakMap());

  const [listResponse, setListResponse] = useState<ListResponse<ProvinceResponse>>(initialListResponse);
  const [activePage, setActivePage] = useState(listResponse.page);
  const [activePageSize, setActivePageSize] = useState(listResponse.size);
  const [selection, setSelection] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchToken, setSearchToken] = useState('');
  const [activeFilterPanel, setActiveFilterPanel] = useState(false);

  const [sortCriteriaList, setSortCriteriaList] = useState<SortCriteria[]>([]);
  const [sortPropertySelectList, setSortPropertySelectList] = useState(initialPropertySelectList);

  const [filterCriteriaList, setFilterCriteriaList] = useState<FilterCriteria[]>([]);
  const [filterPropertySelectList, setFilterPropertySelectList] = useState(initialPropertySelectList);
  const [filters, setFilters] = useState<FilterObject[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterObject | null>(null)
  const [prevActiveFilter, setPrevActiveFilter] = useState<FilterObject | null>(null);

  const [openedDeleteEntityModal, setOpenedDeleteEntityModal] = useState(false);
  const [activeEntityIdToDelete, setActiveEntityIdToDelete] = useState<number | null>(null);

  const [openedDeleteBatchEntitiesModal, setOpenedDeleteBatchEntitiesModal] = useState(false);
  const [activeEntityIdsToDelete, setActiveEntityIdsToDelete] = useState<number[]>([]);

  const [openedViewEntityModal, setOpenedViewEntityModal] = useState(false);
  const [activeEntityToView, setActiveEntityToView] = useState<ProvinceResponse | null>(null);

  useEffect(() => {
    if (loading) {
      const requestParams: RequestParams = {
        page: activePage,
        size: activePageSize,
        sort: FilterUtils.convertToSortRSQL(activeFilter),
        filter: FilterUtils.convertToFilterRSQL(activeFilter),
        search: searchToken,
      };
      FetchUtils.getAll<ProvinceResponse>(ResourceURL.PROVINCE, requestParams)
        .then(([responseStatus, responseBody]) => {
          if (responseStatus === 200) {
            setTimeout(() => {
              setListResponse(responseBody as ListResponse<ProvinceResponse>);
              setLoading(false);
            }, 100);
          }
          if (responseStatus === 500) {
            console.error(responseStatus, responseBody);
          }
        });
    }
  }, [activePage, activePageSize, activeFilter, searchToken, loading]);

  const handleToggleRowCheckbox = (entityId: number) =>
    setSelection(current =>
      current.includes(entityId) ? current.filter(item => item !== entityId) : [...current, entityId]
    );

  const handleToggleAllRowsCheckbox = () =>
    setSelection(current =>
      current.length === listResponse.content.length ? [] : listResponse.content.map(entity => entity.id)
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
    if (activeFilter !== null) {
      setActiveFilter(null);
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
      const currentFilterPropertyType = propertyValue ? filterPropertyTypes[propertyValue] : null;
      const currentFilterOperator = (propertyValue !== null && currentFilterPropertyType === item.type) ? item.operator : null;
      return (index === filterCriteriaIndex) ? {
        ...item,
        property: propertyValue,
        type: currentFilterPropertyType,
        operator: currentFilterOperator,
      } : item;
    });

    setFilterCriteriaList(currentFilterCriteriaList);
  }

  const handleFilterOperatorSelect = (operatorValue: string | null, filterCriteriaIndex: number) => {
    const currentFilterCriteriaList = filterCriteriaList.map((item, index) => {
      return (index === filterCriteriaIndex) ? { ...item, operator: operatorValue as FilterOperator } : item;
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
    setSortCriteriaList([]);
    setSortPropertySelectList(initialPropertySelectList);
    setFilterCriteriaList([]);
    setActiveFilterPanel(false);
  }

  const filterSelectList: SelectOption[] = filters.map(item => ({ value: item.id, label: item.name }));

  const handleFilterSelect = (filterIdValue: string | null) => {
    setActiveFilter(prevState => {
      setPrevActiveFilter(prevState ?? null);
      return filters.find(item => item.id === filterIdValue) ?? null;
    });
  }

  const handleDeleteEntityButton = (entityId: number) => {
    setActiveEntityIdToDelete(entityId);
    setOpenedDeleteEntityModal(true);
  }

  const handleCancelDeleteEntityButton = () => {
    setOpenedDeleteEntityModal(false);
  }

  const handleConfirmedDeleteEntityButton = () => {
    if (activeEntityIdToDelete) {
      FetchUtils.deleteById(ResourceURL.PROVINCE, activeEntityIdToDelete)
        .then((responseStatus) => {
          if (responseStatus === 204) {
            showNotification({
              title: 'Thông báo',
              message: 'Xóa thành công',
              autoClose: 5000,
              icon: <Check size={18}/>,
              color: 'teal',
            });
            if (listResponse.content.length === 1) {
              setActivePage(activePage - 1 || 1);
            }
            setLoading(true);
          }
          if (responseStatus === 500) {
            showNotification({
              title: 'Thông báo',
              message: 'Xóa không thành công',
              autoClose: 5000,
              icon: <X size={18}/>,
              color: 'red',
            });
          }
        });
    }
    setOpenedDeleteEntityModal(false);
  }

  const handleDeleteBatchEntitiesButton = () => {
    if (selection.length > 0) {
      setActiveEntityIdsToDelete(selection);
      setOpenedDeleteBatchEntitiesModal(true);
    } else {
      showNotification({
        title: 'Thông báo',
        message: 'Vui lòng chọn ít nhất một phần tử để xóa',
        autoClose: 5000,
      })
    }
  }

  const handleCancelDeleteBatchEntitiesButton = () => {
    setOpenedDeleteBatchEntitiesModal(false);
  }

  const handleConfirmedDeleteBatchEntitiesButton = () => {
    if (activeEntityIdsToDelete.length > 0) {
      FetchUtils.deleteByIds(ResourceURL.PROVINCE, activeEntityIdsToDelete)
        .then((responseStatus) => {
          if (responseStatus === 204) {
            showNotification({
              title: 'Thông báo',
              message: 'Xóa thành công',
              autoClose: 5000,
              icon: <Check size={18}/>,
              color: 'teal',
            });
            if (listResponse.content.length === selection.length) {
              setActivePage(activePage - 1 || 1);
            }
            setSelection([]);
            setLoading(true);
          }
          if (responseStatus === 500) {
            showNotification({
              title: 'Thông báo',
              message: 'Xóa không thành công',
              autoClose: 5000,
              icon: <X size={18}/>,
              color: 'red',
            });
          }
        });
    }
    setOpenedDeleteBatchEntitiesModal(false);
  }

  const handleViewEntityButton = (entityId: number) => {
    FetchUtils.getById<ProvinceResponse>(ResourceURL.PROVINCE, entityId)
      .then(([responseStatus, responseBody]) => {
        if (responseStatus === 200) {
          setActiveEntityToView(responseBody as ProvinceResponse);
          setOpenedViewEntityModal(true);
        }
        if (responseStatus === 404) {
          console.error(responseStatus, responseBody);
        }
      });
  }

  const handleCancelViewEntityButton = () => {
    setOpenedViewEntityModal(false);
  }

  const titleLinksFragment = titleLinks.map(titleLink => (
    <Menu.Item key={titleLink.label} component={Link} to={titleLink.link}>
      {titleLink.label}
    </Menu.Item>
  ));

  const entitiesTableHeadsFragment = (
    <tr>
      <th style={{ width: 40 }}>
        <Checkbox
          onChange={handleToggleAllRowsCheckbox}
          checked={selection.length === listResponse.content.length}
          indeterminate={selection.length > 0 && selection.length !== listResponse.content.length}
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

  const entitiesTableRowsFragment = listResponse.content.map((entity) => {
    const selected = selection.includes(entity.id);
    return (
      <tr key={entity.id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selection.includes(entity.id)}
            onChange={() => handleToggleRowCheckbox(entity.id)}
            transitionDuration={0}
          />
        </td>
        <td>{entity.id}</td>
        <td>{DateUtils.isoDateToString(entity.createdAt)}</td>
        <td>{DateUtils.isoDateToString(entity.updatedAt)}</td>
        <td>
          <Highlight highlight={searchToken} highlightColor="blue">
            {entity.name}
          </Highlight>
        </td>
        <td>
          <Highlight highlight={searchToken} highlightColor="blue">
            {entity.code}
          </Highlight>
        </td>
        <td>
          <Group spacing="xs">
            <ActionIcon
              color="blue"
              variant="outline"
              size={24}
              title="Xem"
              onClick={() => handleViewEntityButton(entity.id)}
            >
              <Eye size={16}/>
            </ActionIcon>
            <ActionIcon
              component={Link}
              to={'update/' + entity.id}
              color="teal"
              variant="outline"
              size={24}
              title="Cập nhật"
            >
              <Edit size={16}/>
            </ActionIcon>
            <ActionIcon
              color="red"
              variant="outline"
              size={24}
              title="Xóa"
              onClick={() => handleDeleteEntityButton(entity.id)}
            >
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
        data={FilterUtils.sortOrderSelectList}
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

  const filterCriteriaListFragment = filterCriteriaList.map((filterCriteria, index) => {
    const isSelectedFilterProperty = filterCriteria.property && filterCriteria.type;

    const disabledFilterValueInput = !(isSelectedFilterProperty && filterCriteria.operator)
      || FilterUtils.filterOperatorIsNullAndIsNotNullList.includes(filterCriteria.operator);

    let filterOperatorSelectList: SelectOption[];
    let filterValueInputFragment;

    switch (filterCriteria.type) {
    case FilterPropertyType.STRING:
      filterOperatorSelectList = FilterUtils.filterStringOperatorSelectList;
      filterValueInputFragment = (
        <TextInput
          sx={{ width: '100%' }}
          placeholder="Nhập giá trị"
          icon={<Keyboard size={14}/>}
          ref={inputRef => filterCriteriaValueInputRefs.current.set(filterCriteria, inputRef)}
          disabled={disabledFilterValueInput}
        />
      );
      break;
    case FilterPropertyType.NUMBER:
      filterOperatorSelectList = FilterUtils.filterNumberOperatorSelectList;
      filterValueInputFragment = (
        <NumberInput
          sx={{ width: '100%' }}
          placeholder="Nhập giá trị"
          icon={<Keyboard size={14}/>}
          ref={inputRef => filterCriteriaValueInputRefs.current.set(filterCriteria, inputRef)}
          disabled={disabledFilterValueInput}
        />
      );
      break;
    case FilterPropertyType.DATE:
      filterOperatorSelectList = FilterUtils.filterDateOperatorSelectList;
      filterValueInputFragment = (
        <DatePicker
          sx={{ width: '100%' }}
          placeholder="Nhập giá trị"
          icon={<Keyboard size={14}/>}
          ref={inputRef => filterCriteriaValueInputRefs.current.set(filterCriteria, inputRef)}
          disabled={disabledFilterValueInput}
          locale="vi"
          inputFormat="DD/MM/YYYY"
        />
      );
      break;
    default:
      filterOperatorSelectList = [];
      filterValueInputFragment = (
        <Input
          sx={{ width: '100%' }}
          placeholder="Nhập giá trị"
          icon={<Keyboard size={14}/>}
          disabled={disabledFilterValueInput}
        />
      );
    }

    return (
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
          data={filterOperatorSelectList}
          onChange={operatorValue => handleFilterOperatorSelect(operatorValue, index)}
          disabled={!isSelectedFilterProperty}
        />
        {filterValueInputFragment}
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
    );
  });

  const entityDetailsTableHeadsFragment = (
    <tr>
      <th>Thuộc tính</th>
      <th>Giá trị</th>
    </tr>
  );

  const entityDetailsTableRowsFragment = activeEntityToView &&
    Object.entries(activeEntityToView).map(([propertyName, propertyValue]) => (
      <tr key={propertyName}>
        <td>{entityPropertyNames[propertyName].label}</td>
        <td>
          {entityPropertyNames[propertyName].type === EntityPropertyType.DATE
            ? DateUtils.isoDateToString(propertyValue)
            : propertyValue}
        </td>
      </tr>
    ));

  const pageSizeSelectList = initialPageSizeSelectList.map(pageSize =>
    (Number(pageSize.value) > listResponse.totalElements) ? { ...pageSize, disabled: true } : pageSize
  );

  console.log('re-render: ', listResponse, {
    filterCriteriaList,
    // sortCriteriaList,
    // filters,
    // sortPropertySelectList,
    // activePage,
    // activePageSize,
    // selection,
    // filters,
    loading,
    // activeEntityIdToDelete,
    // openedDeleteEntityModal,
    activeEntityIdsToDelete,
    openedDeleteBatchEntitiesModal,
    // searchToken,
    // activeFilter,
    // prevActiveFilter,
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
          <Button
            component={Link}
            to="create"
            variant="outline"
            leftIcon={<Plus/>}
          >
            Thêm mới
          </Button>
          <Button
            variant="outline"
            color="red"
            leftIcon={<Trash/>}
            onClick={handleDeleteBatchEntitiesButton}
          >
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
              value={activeFilter ? activeFilter.id : null}
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

      <Modal
        size="xs"
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        closeOnClickOutside={false}
        opened={openedDeleteEntityModal}
        onClose={handleCancelDeleteEntityButton}
        title={<strong>Xác nhận xóa</strong>}
      >
        <Stack>
          <Text>Xóa phần tử có ID {activeEntityIdToDelete}?</Text>
          <Group grow>
            <Button variant="default" onClick={handleCancelDeleteEntityButton}>Không xóa</Button>
            <Button color="red" onClick={handleConfirmedDeleteEntityButton}>Xóa</Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        size="xs"
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        closeOnClickOutside={false}
        opened={openedDeleteBatchEntitiesModal}
        onClose={handleCancelDeleteBatchEntitiesButton}
        title={<strong>Xác nhận xóa</strong>}
      >
        <Stack>
          <Text>Xóa (các) phần tử có ID {activeEntityIdsToDelete.join(', ')}?</Text>
          <Group grow>
            <Button variant="default" onClick={handleCancelDeleteBatchEntitiesButton}>Không xóa</Button>
            <Button color="red" onClick={handleConfirmedDeleteBatchEntitiesButton}>Xóa</Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        size="md"
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={openedViewEntityModal}
        onClose={handleCancelViewEntityButton}
        title={<strong>Thông tin chi tiết</strong>}
      >
        <Table striped highlightOnHover>
          <thead>{entityDetailsTableHeadsFragment}</thead>
          <tbody>{entityDetailsTableRowsFragment}</tbody>
        </Table>
      </Modal>

      <Paper shadow="xs" style={{
        position: 'relative',
        height: listResponse.totalElements === 0 ? '250px' : 'auto'
      }}
      >
        <LoadingOverlay visible={loading}/>
        {listResponse.totalElements === 0 ? (
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
            <thead>{entitiesTableHeadsFragment}</thead>
            <tbody>{entitiesTableRowsFragment}</tbody>
          </Table>
        )}
      </Paper>

      {listResponse.totalElements !== 0 && (
        <Group position="apart">
          <Text>
            <Text component="span" weight={500}>Trang {activePage}</Text>
            <span> / {listResponse.totalPages} </span>
            <Text component="span" color="gray" size="sm">({listResponse.totalElements})</Text>
          </Text>
          <Pagination page={activePage} onChange={handlePaginationButton} total={listResponse.totalPages}/>
          <Group>
            <Text size="sm">Số hàng trên trang</Text>
            <Select
              styles={{ root: { width: 72 } }}
              variant="filled"
              data={pageSizeSelectList}
              value={String(activePageSize)}
              onChange={handlePageSizeSelect}
            />
          </Group>
        </Group>
      )}

    </Stack>
  );
}
