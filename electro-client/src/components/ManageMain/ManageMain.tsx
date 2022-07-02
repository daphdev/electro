import React from 'react';
import { Center, LoadingOverlay, Paper, ScrollArea, Text } from '@mantine/core';
import { ListResponse } from 'utils/FetchUtils';

interface ManageMainProps {
  listResponse: ListResponse;
  isLoading: boolean;
  children: React.ReactNode;
}

function ManageMain({
  listResponse,
  isLoading,
  children,
}: ManageMainProps) {
  let manageMainInnerFragment = (
    <ScrollArea>
      {children}
    </ScrollArea>
  );

  if (listResponse.totalElements === 0) {
    manageMainInnerFragment = (
      <Center sx={{ height: '100%' }}>
        {!isLoading && <Text color="dimmed">Không có gì hết :)</Text>}
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
      <LoadingOverlay visible={isLoading} zIndex={50}/>
      {manageMainInnerFragment}
    </Paper>
  );
}

export default React.memo(ManageMain);
