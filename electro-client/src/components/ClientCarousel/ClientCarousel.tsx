import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { ActionIcon, createStyles } from '@mantine/core';
import { ChevronLeft, ChevronRight } from 'tabler-icons-react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const useStyles = createStyles((theme) => ({
  carousel: {
    borderRadius: theme.radius.md,
    overflow: 'hidden',
  },

  arrow: {
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 15px)',
    height: 40,
    width: 40,
    cursor: 'pointer',
    color: theme.colors.gray[5],
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[0],
    borderRadius: theme.radius.md,
    opacity: .75,
    transition: 'opacity .2s ease-in',

    '&:hover': {
      opacity: 1,
    },
  },

  indicator: {
    borderRadius: 5,
    background: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2],
    opacity: .5,
    width: 30,
    height: 5,
    display: 'inline-block',
    margin: '0 5px',
    cursor: 'pointer',
    transition: 'opacity .2s ease-in',

    '&:hover': {
      opacity: 1,
    },
  },
}));

function ClientCarousel({ children }: { children: React.ReactElement[] }) {
  const { classes } = useStyles();

  // TODO: Change labels
  return (
    <Carousel
      className={classes.carousel}
      infiniteLoop
      autoPlay
      emulateTouch
      interval={10_000}
      showStatus={false}
      showThumbs={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <ActionIcon
            variant="transparent"
            onClick={onClickHandler}
            title={label}
            className={classes.arrow}
            style={{ left: 15 }}
          >
            <ChevronLeft size={30} strokeWidth={1.5}/>
          </ActionIcon>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <ActionIcon
            variant="transparent"
            onClick={onClickHandler}
            title={label}
            className={classes.arrow}
            style={{ right: 15 }}
          >
            <ChevronRight size={30} strokeWidth={1.5}/>
          </ActionIcon>
        )
      }
      renderIndicator={(onClickHandler, isSelected, index, label) => {
        if (isSelected) {
          return (
            <li
              className={classes.indicator}
              style={{ opacity: 1 }}
              aria-label={`Selected: ${label} ${index + 1}`}
              title={`Selected: ${label} ${index + 1}`}
            />
          );
        }
        return (
          <li
            className={classes.indicator}
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            value={index}
            key={index}
            role="button"
            tabIndex={0}
            title={`${label} ${index + 1}`}
            aria-label={`${label} ${index + 1}`}
          />
        );
      }}
    >
      {children}
    </Carousel>
  );
}

export default ClientCarousel;
