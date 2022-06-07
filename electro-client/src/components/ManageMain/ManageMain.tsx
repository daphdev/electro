import React from 'react';
import { Center, LoadingOverlay, Paper, Text } from '@mantine/core';
import useListResponse from 'hooks/use-list-response';

interface ManageMainProps {
  children: React.ReactNode;
}

function ManageMain({
  children,
}: ManageMainProps) {
  const { listResponse, isLoading } = useListResponse();

  let manageMainInnerFragment = <>{children}</>;

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
      <LoadingOverlay visible={isLoading}/>
      {manageMainInnerFragment}
    </Paper>
  );
}

export default React.memo(ManageMain);
