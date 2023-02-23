import { useMutation } from 'react-query';
import { ClientPreorderRequest, ClientPreorderResponse } from 'types';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import { Anchor, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import React from 'react';

function useCreatePreorderApi() {
  return useMutation<ClientPreorderResponse, ErrorMessage, ClientPreorderRequest>(
    (requestBody) => FetchUtils.postWithToken(ResourceURL.CLIENT_PREORDER, requestBody),
    {
      onSuccess: (response) =>
        NotifyUtils.simpleSuccess(
          <Text inherit>
            <span>Đã thêm sản phẩm {response.preorderProduct.productName} vào </span>
            <Anchor component={Link} to="/user/preorder" inherit>danh sách đặt trước</Anchor>
          </Text>
        ),
      onError: () => NotifyUtils.simpleFailed('Không thêm được sản phẩm vào danh sách đặt trước'),
    }
  );
}

export default useCreatePreorderApi;
