import React from 'react';
import { Center, LoadingOverlay, Paper, ScrollArea, Stack, Text, useMantineTheme } from '@mantine/core';
import { ListResponse } from 'utils/FetchUtils';
import { Marquee } from 'tabler-icons-react';

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
  const theme = useMantineTheme();

  let manageMainInnerFragment = (
    <ScrollArea>
      {children}
    </ScrollArea>
  );

  if (listResponse.totalElements === 0) {
    manageMainInnerFragment = (
      <Center sx={{ height: '100%' }}>
        {!isLoading && (
          <Stack my={theme.spacing.xl} sx={{ alignItems: 'center', color: theme.colors.blue[6] }}>
            <Marquee size={75} strokeWidth={1}/>
            <Text size="lg" weight={500}>Không có nội dung</Text>
          </Stack>
        )}
      </Center>
    );
  }

  return (
    <Paper
      shadow="xs"
      style={{
        position: 'relative',
        height: listResponse.totalElements === 0 ? 250 : 'auto',
      }}
    >
      <LoadingOverlay visible={isLoading} zIndex={50}/>
      {manageMainInnerFragment}
    </Paper>
  );
}

export default React.memo(ManageMain);
