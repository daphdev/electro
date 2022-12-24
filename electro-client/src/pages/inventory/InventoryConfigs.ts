import { TitleLink } from 'types';
import WarehouseConfigs from 'pages/warehouse/WarehouseConfigs';
import ResourceURL from 'constants/ResourceURL';

class InventoryConfigs {
  static title = 'Theo dõi tồn kho sản phẩm';
  static titleLinks: TitleLink[] = WarehouseConfigs.manageTitleLinks;
  static productInventoryResourceUrl = ResourceURL.PRODUCT_INVENTORY;
  static productInventoryResourceKey = 'product-inventories';
}

export default InventoryConfigs;
