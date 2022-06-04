import React, { useEffect } from 'react';
import { Stack } from '@mantine/core';
import {
  FilterPanel,
  ManageHeader,
  ManageHeaderButtons,
  ManageHeaderTitle,
  ManageMain,
  ManagePagination,
  SearchPanel
} from 'components';
import ProvinceConfigs from 'pages/province/ProvinceConfigs';
import useProvinceManageViewModel from 'pages/province/ProvinceManage.vm';

function ProvinceManage() {
  const { getProvinces } = useProvinceManageViewModel();

  useEffect(() => {
    void getProvinces();
  }, [getProvinces]);

  return (
    <Stack>
      <ManageHeader>
        <ManageHeaderTitle
          titleLinks={ProvinceConfigs.manageTitleLinks}
          title={ProvinceConfigs.manageTitle}
        />
        <ManageHeaderButtons/>
      </ManageHeader>

      <SearchPanel/>

      <FilterPanel/>

      <ManageMain/>

      <ManagePagination/>
    </Stack>
  );
}

export default ProvinceManage;
