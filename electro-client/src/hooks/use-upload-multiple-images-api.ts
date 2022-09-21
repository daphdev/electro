import { useMutation } from 'react-query';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import { CollectionWrapper } from 'types';
import { UploadedImageResponse } from 'models/Image';
import NotifyUtils from 'utils/NotifyUtils';

function useUploadMultipleImagesApi() {
  return useMutation<CollectionWrapper<UploadedImageResponse>, ErrorMessage, File[]>(
    (images) => FetchUtils.uploadMultipleImages(images),
    {
      onSuccess: () => NotifyUtils.simpleSuccess('Tải hình lên thành công'),
      onError: () => NotifyUtils.simpleFailed('Tải hình lên không thành công'),
    }
  );
}

export default useUploadMultipleImagesApi;
