import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import {
  ActionIcon,
  Box,
  Button,
  Center,
  createStyles,
  Divider,
  Group,
  Image,
  MantineTheme,
  Stack,
  Text,
  useMantineTheme
} from '@mantine/core';
import React, { useEffect } from 'react';
import { Check, CirclePlus, Photo, Upload, X } from 'tabler-icons-react';
import { useModals } from '@mantine/modals';
import { FileWithPreview } from 'types';
import { ImageResponse } from 'models/Image';
import produce from 'immer';

const getIconColor = (status: DropzoneStatus, theme: MantineTheme) => {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
      ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
      : theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7];
};

const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => {
  const ImageUploadIcon = status.accepted ? Upload : (status.rejected ? X : Photo);

  return (
    <Group position="center" spacing="xl" style={{ minHeight: 125, pointerEvents: 'none' }}>
      <ImageUploadIcon style={{ color: getIconColor(status, theme) }} size={80}/>

      <div>
        <Text size="xl" inline>
          Kéo thả hoặc bấm để chọn hình
        </Text>
        <Text size="sm" color="dimmed" inline mt={7}>
          Dung lượng mỗi tập tin không quá 5 MB
        </Text>
      </div>
    </Group>
  );
};

const useStyles = createStyles(
  (theme) => ({
    previewPanel: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      marginTop: theme.spacing.sm,
      padding: theme.spacing.sm,
      borderRadius: theme.radius.md,
    },
  })
);

interface ProductImagesDropzoneProps {
  imageFiles: FileWithPreview[];
  setImageFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
  thumbnailName: string,
  setThumbnailName: React.Dispatch<React.SetStateAction<string>>,
  imageResponses?: ImageResponse[],
  setImageResponses?: (imageResponses: ImageResponse[]) => void;
}

function ProductImagesDropzone({
  imageFiles,
  setImageFiles,
  thumbnailName,
  setThumbnailName,
  imageResponses,
  setImageResponses,
}: ProductImagesDropzoneProps) {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const modals = useModals();

  const onDrop = (files: File[]) => {
    if ((imageResponses || []).every((imageResponse) => imageResponse.isEliminated)) {
      setThumbnailName(files[0].name);
    }
    setImageFiles(files.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) })));
  };

  const handleDeleteAllImagesButton = () => {
    modals.openConfirmModal({
      size: 'xs',
      overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      overlayOpacity: 0.55,
      overlayBlur: 3,
      closeOnClickOutside: false,
      title: <strong>Xác nhận xóa</strong>,
      children: <Text size="sm">Xóa tất cả hình?</Text>,
      labels: {
        cancel: 'Không xóa',
        confirm: 'Xóa',
      },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        if (imageFiles.some(imageFile => imageFile.name === thumbnailName) && imageResponses && setImageResponses) {
          const currentImageResponses = produce(imageResponses, draft => {
            for (const imageResponse of draft) {
              if (!imageResponse.isEliminated) {
                imageResponse.isThumbnail = true;
                setThumbnailName(imageResponse.name);
                break;
              }
            }
          });
          setImageResponses(currentImageResponses);
        }
        setImageFiles([]);
      },
    });
  };

  const handleDeleteImageButton = (imageIndex: number, arrayName: string) => {
    if (arrayName === 'imageFiles') {
      const currentImageFiles = imageFiles.filter((_, index) => index !== imageIndex);
      if (imageFiles[imageIndex].name === thumbnailName && currentImageFiles.length > 0) {
        setThumbnailName(currentImageFiles[0].name);
      }
      if (currentImageFiles.length === 0) {
        setThumbnailName('');
        if (imageResponses && setImageResponses) {
          const currentImageResponses = produce(imageResponses, draft => {
            for (const imageResponse of draft) {
              if (!imageResponse.isEliminated) {
                imageResponse.isThumbnail = true;
                setThumbnailName(imageResponse.name);
                break;
              }
            }
          });
          setImageResponses(currentImageResponses);
        }
      }
      setImageFiles(currentImageFiles);
    }

    if (arrayName === 'imageResponses' && imageResponses && setImageResponses) {
      const currentImageResponses = produce(imageResponses, draft => {
        draft[imageIndex].isEliminated = true;
        if (draft[imageIndex].isThumbnail) {
          draft[imageIndex].isThumbnail = false;
          for (const imageResponse of draft) {
            if (!imageResponse.isEliminated) {
              imageResponse.isThumbnail = true;
              setThumbnailName(imageResponse.name);
              break;
            }
          }
        }
      });
      if (currentImageResponses.every((imageResponse) => imageResponse.isEliminated)) {
        if (imageFiles.length > 0) {
          setThumbnailName(imageFiles[0].name);
        } else {
          setThumbnailName('');
        }
      }
      setImageResponses(currentImageResponses);
    }
  };

  const handleSelectThumbnailButton = (imageIndex: number, arrayName: string) => {
    if (arrayName === 'imageFiles') {
      setThumbnailName(imageFiles[imageIndex].name);
      if (imageResponses && setImageResponses) {
        const currentImageResponses = produce(imageResponses, draft => {
          for (const imageResponse of draft) {
            if (imageResponse.isThumbnail) {
              imageResponse.isThumbnail = false;
              break;
            }
          }
        });
        setImageResponses(currentImageResponses);
      }
    }

    if (arrayName === 'imageResponses' && imageResponses && setImageResponses) {
      setThumbnailName(imageResponses[imageIndex].name);
      const currentImageResponses = produce(imageResponses, draft => {
        for (const imageResponse of draft) {
          if (imageResponse.isThumbnail) {
            imageResponse.isThumbnail = false;
            break;
          }
        }
        draft[imageIndex].isThumbnail = true;
      });
      setImageResponses(currentImageResponses);
    }
  };

  const imageResponsesFragment = (imageResponses || []).map((imageResponse, index) => {
    if (!imageResponse.isEliminated) {
      return (
        <Stack key={imageResponse.name} spacing="xs">
          <Image
            radius="md"
            width={115}
            height={115}
            src={imageResponse.path}
            alt={imageResponse.name}
            title={imageResponse.name}
            styles={{
              image: {
                boxShadow: imageResponse.name === thumbnailName
                  ? '0 0 0 3px ' + theme.colors.teal[theme.colorScheme === 'dark' ? 4 : 6]
                  : 'none',
              },
            }}
          />
          <Center>
            <Group spacing="xs">
              <ActionIcon
                color="teal"
                variant="light"
                disabled={imageResponse.name === thumbnailName}
                title="Chọn làm hình đại điện"
                onClick={() => handleSelectThumbnailButton(index, 'imageResponses')}
              >
                <Check/>
              </ActionIcon>
              <ActionIcon
                color="red"
                variant="light"
                title="Xóa hình này"
                onClick={() => handleDeleteImageButton(index, 'imageResponses')}
              >
                <X/>
              </ActionIcon>
            </Group>
          </Center>
        </Stack>
      );
    }
    return null;
  });

  const imageFilesFragment = imageFiles.map((imageFile, index) => (
    <Stack key={imageFile.name} spacing="xs">
      <Image
        radius="md"
        width={115}
        height={115}
        src={imageFile.preview}
        alt={imageFile.name}
        title={imageFile.name}
        onLoad={() => URL.revokeObjectURL(imageFile.preview)}
        styles={{
          image: {
            boxShadow: imageFile.name === thumbnailName
              ? '0 0 0 3px ' + theme.colors.teal[theme.colorScheme === 'dark' ? 4 : 6]
              : 'none',
          },
        }}
      />
      <Center>
        <Group spacing="xs">
          <ActionIcon
            color="teal"
            variant="light"
            disabled={imageFile.name === thumbnailName}
            title="Chọn làm hình đại điện"
            onClick={() => handleSelectThumbnailButton(index, 'imageFiles')}
          >
            <Check/>
          </ActionIcon>
          <ActionIcon
            color="red"
            variant="light"
            title="Xóa hình này"
            onClick={() => handleDeleteImageButton(index, 'imageFiles')}
          >
            <X/>
          </ActionIcon>
        </Group>
      </Center>
    </Stack>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => imageFiles.forEach((imageFile) => URL.revokeObjectURL(imageFile.preview));
  }, [imageFiles]);

  return (
    <>
      <Dropzone
        onDrop={onDrop}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
      >
        {(status) => dropzoneChildren(status, theme)}
      </Dropzone>
      {(imageResponses || []).some((imageResponse) => !imageResponse.isEliminated) && (
        <Group spacing="sm" className={classes.previewPanel}>
          {imageResponsesFragment}
        </Group>
      )}
      {imageFiles.length > 0 && (
        <>
          <Divider
            my="xs"
            variant="dashed"
            labelPosition="center"
            label={
              <>
                <CirclePlus size={12}/>
                <Box ml={5}>Hình mới thêm, chưa được lưu</Box>
              </>
            }
          />
          <Group spacing="sm" className={classes.previewPanel}>
            {imageFilesFragment}
          </Group>
          <Button
            variant="light"
            color="pink"
            sx={{ marginTop: theme.spacing.sm }}
            onClick={handleDeleteAllImagesButton}
          >
            Xóa tất cả hình
          </Button>
        </>
      )}
    </>
  );
}

export default ProductImagesDropzone;
