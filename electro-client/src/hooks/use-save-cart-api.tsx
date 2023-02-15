import { useMutation, useQueryClient } from 'react-query';
import useAuthStore from 'stores/use-auth-store';
import { ClientCartRequest, ClientCartResponse } from 'types';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import ResourceURL from 'constants/ResourceURL';
import NotifyUtils from 'utils/NotifyUtils';

function useSaveCartApi() {
  const queryClient = useQueryClient();

  const { currentCartId, currentTotalCartItems, updateCurrentCartId, updateCurrentTotalCartItems } = useAuthStore();

  return useMutation<ClientCartResponse, ErrorMessage, ClientCartRequest>(
    (requestBody) => FetchUtils.postWithToken(ResourceURL.CLIENT_CART, requestBody),
    {
      onSuccess: (cartResponse) => {
        void queryClient.invalidateQueries(['client-api', 'carts', 'getCart']);
        (currentCartId !== cartResponse.cartId) && updateCurrentCartId(cartResponse.cartId);
        (currentTotalCartItems !== cartResponse.cartItems.length) && updateCurrentTotalCartItems(cartResponse.cartItems.length);
      },
      onError: () => NotifyUtils.simpleFailed('Không lưu được thay đổi trên giỏ hàng'),
    }
  );
}

export default useSaveCartApi;
