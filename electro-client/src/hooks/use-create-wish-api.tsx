import { useMutation } from 'react-query';
import { ClientWishRequest, ClientWishResponse } from 'types';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';
import { Anchor, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import React from 'react';

function useCreateWishApi() {
  return useMutation<ClientWishResponse, ErrorMessage, ClientWishRequest>(
    (requestBody) => FetchUtils.postWithToken(ResourceURL.CLIENT_WISH, requestBody),
    {
      onSuccess: (response) =>
        NotifyUtils.simpleSuccess(
          <Text inherit>
            <span>Đã thêm sản phẩm {response.wishProduct.productName} vào </span>
            <Anchor component={Link} to="/user/wishlist" inherit>danh sách yêu thích</Anchor>
          </Text>
        ),
      onError: () => NotifyUtils.simpleFailed('Không thêm được sản phẩm vào danh sách yêu thích'),
    }
  );
}

export default useCreateWishApi;
