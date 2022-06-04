import React from 'react';
import { Center, LoadingOverlay, Paper, Text } from '@mantine/core';
import useAppStore from 'stores/use-app-store';
import { ManageTable } from 'components/index';

function ManageMain() {
  const {
    loading,
    listResponse,
  } = useAppStore();

  let manageMainInnerFragment = <ManageTable/>;

  if (listResponse.totalElements === 0) {
    manageMainInnerFragment = (
      <Center sx={{ height: '100%' }}>
        <Text color="dimmed">Không có gì hết :)</Text>
      </Center>
    );
  }

  return (
    <Paper
      shadow="xs"
      style={{
        position: 'relative',
        height: listResponse.totalElements === 0 ? '250px' : 'auto',
      }}
    >
      <LoadingOverlay visible={loading}/>
      {manageMainInnerFragment}
    </Paper>
  );
}

export default React.memo(ManageMain);
