import { Button, Checkbox, Group, Stack } from '@mantine/core';
import React, { useState } from 'react';

interface AddVariantsModalProps {
  remainingPropertyValueCombinations: string[][];
  handleAddVariantsButton: (selectedRemainingPropertyValueCombinationIndexes: number[]) => void;
}

function AddVariantsModal({
  remainingPropertyValueCombinations,
  handleAddVariantsButton,
}: AddVariantsModalProps) {
  const [selectedRemainingPropertyValueCombinationIndexes, setSelectedRemainingPropertyValueCombinationIndexes] = useState<number[]>([]);

  const handleRemainingPropertyValueCombinationCheckbox = (index: number) => {
    setSelectedRemainingPropertyValueCombinationIndexes(indexes =>
      indexes.includes(index) ? indexes.filter(i => i !== index) : [...indexes, index]);
  };

  return (
    <>
      <Stack spacing="sm">
        {remainingPropertyValueCombinations.map((combination, index) => (
          <Group key={index} spacing="sm">
            <Checkbox
              checked={selectedRemainingPropertyValueCombinationIndexes.includes(index)}
              onChange={() => handleRemainingPropertyValueCombinationCheckbox(index)}
            />
            {combination.join(' ⋅ ')}
          </Group>
        ))}
      </Stack>
      <Button
        fullWidth
        disabled={selectedRemainingPropertyValueCombinationIndexes.length === 0}
        onClick={() => handleAddVariantsButton(selectedRemainingPropertyValueCombinationIndexes)}
        mt="md"
      >
        Thêm
      </Button>
    </>
  );
}

export default AddVariantsModal;
