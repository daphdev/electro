import React, { useCallback, useRef, useState } from 'react';
import FilterUtils, {
  FilterCriteria,
  FilterObject,
  FilterOperator,
  FilterPropertyType,
  FilterPropertyTypes,
  OrderType,
  SortCriteria
} from 'utils/FilterUtils';
import FetchUtils, { ListResponse, RequestParams } from 'utils/FetchUtils';
import { ProvinceResponse } from 'models/Province';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import DateUtils from 'utils/DateUtils';
import { SelectOption } from 'types';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import useStore from 'stores/use-store';

const MAX_FILTER_CRITERIA_NUMBER = 10;
const CURRENT_USER_ID = 1;

const filterPropertyTypes: FilterPropertyTypes = {
  id: FilterPropertyType.NUMBER,
  createdAt: FilterPropertyType.DATE,
  updatedAt: FilterPropertyType.DATE,
  name: FilterPropertyType.STRING,
  code: FilterPropertyType.STRING,
};

export default function useProvinceManageViewModel() {
  const {
    selection, setSelection,
    activeEntityIdsToDelete, setActiveEntityIdsToDelete,
    openedDeleteBatchEntitiesModal, setOpenedDeleteBatchEntitiesModal,
  } = useStore();

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const filterNameInputRef = useRef<HTMLInputElement | null>(null);

  const filterCriteriaValueInputRefs = useRef<WeakMap<FilterCriteria, HTMLInputElement | HTMLButtonElement | null>>(new WeakMap());
  const [listResponse, setListResponse] = useState<ListResponse<ProvinceResponse>>(ProvinceConfigs.initialListResponse);
  const [activePage, setActivePage] = useState(listResponse.page);
  const [activePageSize, setActivePageSize] = useState(listResponse.size);
  // const [selection, setSelection] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchToken, setSearchToken] = useState('');
  const [activeFilterPanel, setActiveFilterPanel] = useState(false);

  const [sortCriteriaList, setSortCriteriaList] = useState<SortCriteria[]>([]);
  const [sortPropertySelectList, setSortPropertySelectList] = useState(ProvinceConfigs.initialPropertySelectList);

  const [filterCriteriaList, setFilterCriteriaList] = useState<FilterCriteria[]>([]);
  const [filterPropertySelectList, setFilterPropertySelectList] = useState(ProvinceConfigs.initialPropertySelectList);
  const [filters, setFilters] = useState<FilterObject[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterObject | null>(null);
  const [prevActiveFilter, setPrevActiveFilter] = useState<FilterObject | null>(null);

  const [openedDeleteEntityModal, setOpenedDeleteEntityModal] = useState(false);
  const [activeEntityIdToDelete, setActiveEntityIdToDelete] = useState<number | null>(null);

  // const [openedDeleteBatchEntitiesModal, setOpenedDeleteBatchEntitiesModal] = useState(false);
  // const [activeEntityIdsToDelete, setActiveEntityIdsToDelete] = useState<number[]>([]);

  const [openedViewEntityModal, setOpenedViewEntityModal] = useState(false);
  const [activeEntityToView, setActiveEntityToView] = useState<ProvinceResponse | null>(null);

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
  };

  const handlePageSizeSelect = (size: string) => {
    const pageSize = Number(size);
    if (pageSize !== activePageSize) {
      setLoading(true);
      setSelection([]);
      setActivePage(1);
      setActivePageSize(pageSize);
    }
  };

  const handleSearchButton = () => {
    const currentSearchToken = searchInputRef.current?.value ?? '';
    if (currentSearchToken !== searchToken || activeFilter?.id !== prevActiveFilter?.id) {
      setLoading(true);
      setActivePage(1);
      setSearchToken(currentSearchToken);
      setPrevActiveFilter(activeFilter);
    }
  };

  const handleSearchInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchButton();
    }
  };

  const handleResetButton = () => {
    if (searchInputRef.current?.value) {
      searchInputRef.current.value = '';
    }
    if (activeFilter !== null) {
      setActiveFilter(null);
    }
  };

  const handleAddFilterButton = () => {
    if (!activeFilterPanel) {
      setActiveFilterPanel(true);
    }
  };

  const handleCancelCreateFilterButton = () => {
    if (activeFilterPanel) {
      setSortCriteriaList([]);
      setSortPropertySelectList(ProvinceConfigs.initialPropertySelectList);
      setFilterCriteriaList([]);
      setActiveFilterPanel(false);
    }
  };

  const handleCreateSortCriteriaButton = () => {
    if (sortCriteriaList.length < sortPropertySelectList.length) {
      setSortCriteriaList(prevState => [...prevState, { property: null, order: OrderType.ASC }]);
    }
  };

  const handleSortPropertySelect = (propertyValue: string | null, sortCriteriaIndex: number) => {
    const currentSortCriteriaList = sortCriteriaList.map((item, index) => {
      return (index === sortCriteriaIndex) ? { ...item, property: propertyValue } : item;
    });

    setSortCriteriaList(currentSortCriteriaList);

    const isIncludeInSortCriteriaPropertyList = (propertyValue: string) => {
      return currentSortCriteriaList.map(item => item.property).includes(propertyValue);
    };

    setSortPropertySelectList(sortPropertySelectList.map(option => {
      if (option.disabled === true && !isIncludeInSortCriteriaPropertyList(option.value)) {
        return { ...option, disabled: false };
      }
      if (option.value === propertyValue) {
        return { ...option, disabled: true };
      }
      return option;
    }));
  };

  const handleSortOrderSelect = (orderValue: string | null, sortCriteriaIndex: number) => {
    setSortCriteriaList(sortCriteriaList.map((item, index) => {
      return (index === sortCriteriaIndex) ? { ...item, order: orderValue as OrderType } : item;
    }));
  };

  const handleDeleteSortCriteriaButton = (sortCriteriaIndex: number) => {
    setSortCriteriaList(sortCriteriaList.filter((_, index) => index !== sortCriteriaIndex));
    setSortPropertySelectList(sortPropertySelectList.map(option => {
      if (option.disabled === true && option.value === sortCriteriaList[sortCriteriaIndex].property) {
        return { ...option, disabled: false };
      }
      return option;
    }));
  };

  const handleCreateFilterCriteriaButton = () => {
    if (filterCriteriaList.length < MAX_FILTER_CRITERIA_NUMBER) {
      setFilterCriteriaList(prevState => [...prevState, {
        property: null,
        type: null,
        operator: null,
        value: null,
      }]);
    }
  };

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
  };

  const handleFilterOperatorSelect = (operatorValue: string | null, filterCriteriaIndex: number) => {
    const currentFilterCriteriaList = filterCriteriaList.map((item, index) => {
      return (index === filterCriteriaIndex) ? { ...item, operator: operatorValue as FilterOperator } : item;
    });

    setFilterCriteriaList(currentFilterCriteriaList);
  };

  const handleDeleteFilterCriteriaButton = (filterCriteriaIndex: number) => {
    setFilterCriteriaList(filterCriteriaList.filter((_, index) => index !== filterCriteriaIndex));
  };

  const handleCreateFilterButton = () => {
    const randomNumber = Math.floor(Math.random() * 10000) + 1;
    const filterId = 'filter-' + randomNumber;
    const filterName = filterNameInputRef.current?.value || 'Bộ lọc ' + randomNumber;

    const assignValueForFilterCriteria = (filterCriteriaList: FilterCriteria[]) => {
      return filterCriteriaList.map(item => {
        const filterCriteriaValueInputRefValue = filterCriteriaValueInputRefs.current.get(item)?.value;
        return filterCriteriaValueInputRefValue ? { ...item, value: filterCriteriaValueInputRefValue } : item;
      });
    };

    const filter: FilterObject = {
      id: filterId,
      createdAt: DateUtils.nowIso(),
      updatedAt: DateUtils.nowIso(),
      createdBy: CURRENT_USER_ID,
      updatedBy: CURRENT_USER_ID,
      name: filterName,
      sortCriteriaList: sortCriteriaList,
      filterCriteriaList: assignValueForFilterCriteria(filterCriteriaList),
    };

    setFilters(prevState => [...prevState, filter]);
    setSortCriteriaList([]);
    setSortPropertySelectList(ProvinceConfigs.initialPropertySelectList);
    setFilterCriteriaList([]);
    setActiveFilterPanel(false);
  };

  const filterSelectList: SelectOption[] = filters.map(item => ({ value: item.id, label: item.name }));

  const handleFilterSelect = (filterIdValue: string | null) => {
    setActiveFilter(prevState => {
      setPrevActiveFilter(prevState ?? null);
      return filters.find(item => item.id === filterIdValue) ?? null;
    });
  };

  const handleDeleteEntityButton = (entityId: number) => {
    setActiveEntityIdToDelete(entityId);
    setOpenedDeleteEntityModal(true);
  };

  const handleCancelDeleteEntityButton = () => {
    setOpenedDeleteEntityModal(false);
  };

  const handleConfirmedDeleteEntityButton = () => {
    if (activeEntityIdToDelete) {
      FetchUtils.deleteById(ResourceURL.PROVINCE, activeEntityIdToDelete)
        .then((responseStatus) => {
          if (responseStatus === 204) {
            NotifyUtils.simpleSuccess('Xóa thành công');
            if (listResponse.content.length === 1) {
              setActivePage(activePage - 1 || 1);
            }
            setLoading(true);
          }
          if (responseStatus === 500) {
            NotifyUtils.simpleFailed('Xóa không thành công');
          }
        });
    }
    setOpenedDeleteEntityModal(false);
  };

  // const handleDeleteBatchEntitiesButton = () => {
  //   if (selection.length > 0) {
  //     setActiveEntityIdsToDelete(selection);
  //     setOpenedDeleteBatchEntitiesModal(true);
  //   } else {
  //     showNotification({
  //       title: 'Thông báo',
  //       message: 'Vui lòng chọn ít nhất một phần tử để xóa',
  //       autoClose: 5000,
  //     });
  //   }
  // };

  const handleCancelDeleteBatchEntitiesButton = () => {
    setOpenedDeleteBatchEntitiesModal(false);
  };

  const handleConfirmedDeleteBatchEntitiesButton = () => {
    if (activeEntityIdsToDelete.length > 0) {
      FetchUtils.deleteByIds(ResourceURL.PROVINCE, activeEntityIdsToDelete)
        .then((responseStatus) => {
          if (responseStatus === 204) {
            NotifyUtils.simpleSuccess('Xóa thành công');
            if (listResponse.content.length === selection.length) {
              setActivePage(activePage - 1 || 1);
            }
            setSelection([]);
            setLoading(true);
          }
          if (responseStatus === 500) {
            NotifyUtils.simpleFailed('Xóa không thành công');
          }
        });
    }
    setOpenedDeleteBatchEntitiesModal(false);
  };

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
  };

  const handleCancelViewEntityButton = () => {
    setOpenedViewEntityModal(false);
  };

  const pageSizeSelectList = ProvinceConfigs.initialPageSizeSelectList.map(pageSize =>
    (Number(pageSize.value) > listResponse.totalElements) ? { ...pageSize, disabled: true } : pageSize
  );

  const getProvinces = useCallback(async () => {
    if (loading) {
      const requestParams: RequestParams = {
        page: activePage,
        size: activePageSize,
        sort: FilterUtils.convertToSortRSQL(activeFilter),
        filter: FilterUtils.convertToFilterRSQL(activeFilter),
        search: searchToken,
      };
      const [responseStatus, responseBody] = await FetchUtils.getAll<ProvinceResponse>(ResourceURL.PROVINCE, requestParams);
      if (responseStatus === 200) {
        setTimeout(() => {
          setListResponse(responseBody as ListResponse<ProvinceResponse>);
          setLoading(false);
        }, 100);
      }
      if (responseStatus === 500) {
        NotifyUtils.simpleFailed('Lấy dữ liệu không thành công');
      }
    }
  }, [loading, activePage, activePageSize, activeFilter, searchToken]);

  return {
    searchInputRef, filterNameInputRef, filterCriteriaValueInputRefs,
    listResponse, setListResponse,
    activePage, setActivePage,
    activePageSize, setActivePageSize,
    selection,
    loading, setLoading,
    searchToken, setSearchToken,
    activeFilterPanel, setActiveFilterPanel,
    sortCriteriaList, setSortCriteriaList,
    sortPropertySelectList, setSortPropertySelectList,
    filterCriteriaList, setFilterCriteriaList,
    filterPropertySelectList, setFilterPropertySelectList,
    filters, setFilters,
    activeFilter, setActiveFilter,
    prevActiveFilter, setPrevActiveFilter,
    openedDeleteEntityModal, setOpenedDeleteEntityModal,
    activeEntityIdToDelete, setActiveEntityIdToDelete,
    openedDeleteBatchEntitiesModal, setOpenedDeleteBatchEntitiesModal,
    activeEntityIdsToDelete, setActiveEntityIdsToDelete,
    openedViewEntityModal, setOpenedViewEntityModal,
    activeEntityToView, setActiveEntityToView,
    handleToggleRowCheckbox,
    handleToggleAllRowsCheckbox,
    handlePaginationButton,
    handlePageSizeSelect,
    handleSearchButton,
    handleSearchInput,
    handleResetButton,
    handleAddFilterButton,
    handleCancelCreateFilterButton,
    handleCreateSortCriteriaButton,
    handleSortPropertySelect,
    handleSortOrderSelect,
    handleDeleteSortCriteriaButton,
    handleCreateFilterCriteriaButton,
    handleFilterPropertySelect,
    handleFilterOperatorSelect,
    handleDeleteFilterCriteriaButton,
    handleCreateFilterButton,
    filterSelectList,
    handleFilterSelect,
    handleDeleteEntityButton,
    handleCancelDeleteEntityButton,
    handleConfirmedDeleteEntityButton,
    // handleDeleteBatchEntitiesButton: useCallback(handleDeleteBatchEntitiesButton, [selection]),
    // handleDeleteBatchEntitiesButton,
    handleCancelDeleteBatchEntitiesButton,
    handleConfirmedDeleteBatchEntitiesButton,
    handleViewEntityButton,
    handleCancelViewEntityButton,
    pageSizeSelectList,
    getProvinces,
  };
}
