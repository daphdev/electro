export interface StatisticResource {
  date: string;
  total: number;
}

export interface StatisticResponse {
  totalCustomer: number;
  totalProduct: number;
  totalOrder: number;
  totalWaybill: number;
  totalReview: number;
  totalActivePromotion: number;
  totalSupplier: number;
  totalBrand: number;
  statisticRegistration: StatisticResource[];
  statisticOrder: StatisticResource[];
  statisticReview: StatisticResource[];
  statisticWaybill: StatisticResource[];
}
