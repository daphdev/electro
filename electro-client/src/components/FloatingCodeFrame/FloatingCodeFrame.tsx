import { Prism } from '@mantine/prism';
import React from 'react';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  codePreview: {
    overflow: 'scroll',
    position: 'fixed',
    top: 50,
    right: 0,
    width: 450,
    height: 600,
  },
}));

function FloatingCodeFrame({ object }: { object: object }) {
  const { classes } = useStyles();

  return (
    <div className={classes.codePreview}>
      <Prism language="json">
        {JSON.stringify(object, null, 2)}
      </Prism>
    </div>
  );
}

export default FloatingCodeFrame;
