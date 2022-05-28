import React from 'react';
import { SimpleGrid } from '@mantine/core';

export default function Fragments({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

const FormRow2Col = ({ children }: { children: React.ReactNode }) => (
  <SimpleGrid p="sm" spacing="md" breakpoints={[{ minWidth: 'xs', cols: 2 }]}>
    {children}
  </SimpleGrid>
);

Fragments.FormRow2Col = FormRow2Col;
