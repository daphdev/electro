import React from 'react';
import { Code, Group, Paper, Stack, Text } from '@mantine/core';
import DateUtils from 'utils/DateUtils';

interface DefaultPropertyPanelProps {
  id?: string | number;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

function DefaultPropertyPanel({
  id = '__',
  createdAt = '__/__/____',
  updatedAt = '__/__/____',
  createdBy = '1',
  updatedBy = '1',
}: DefaultPropertyPanelProps) {
  return (
    <Paper shadow="xs" p="sm">
      <Group spacing="xl">
        <Stack spacing={5}>
          <Text size="sm">ID</Text>
          <Text><Code color="blue">{id}</Code></Text>
        </Stack>
        <Stack spacing={5}>
          <Text size="sm">Ngày tạo</Text>
          <Text>
            <Code color="blue">{DateUtils.isoDateToString(createdAt)}</Code>
          </Text>
        </Stack>
        <Stack spacing={5}>
          <Text size="sm">Ngày cập nhật</Text>
          <Text>
            <Code color="blue">{DateUtils.isoDateToString(updatedAt)}</Code>
          </Text>
        </Stack>
        {/* TODO: Triển khai createdBy và updatedBy */}
        {/*<Stack spacing={5}>*/}
        {/*  <Text size="sm">Người tạo</Text>*/}
        {/*  <Text>*/}
        {/*    <Code color="blue">{createdBy}</Code>*/}
        {/*  </Text>*/}
        {/*</Stack>*/}
        {/*<Stack spacing={5}>*/}
        {/*  <Text size="sm">Người cập nhật</Text>*/}
        {/*  <Text>*/}
        {/*    <Code color="blue">{updatedBy}</Code>*/}
        {/*  </Text>*/}
        {/*</Stack>*/}
      </Group>
    </Paper>
  );
}

export default React.memo(DefaultPropertyPanel);
