import { ApiProductHistory } from "../produtos/api.model";
import { ApiUser } from "../socios/api.model";

export enum ApiEPaymentMethod {
  ACCOUNT_CREDIT = 'ACCOUNT_CREDIT',
  CARD_CREDIT    = 'CARD_CREDIT',
  CASH           = 'CASH',
  PIX            = 'PIX'
}

export enum ApiEPaymentType {
  ORDER = 'ORDER',
  ACCOUNT = 'ACCOUNT',
  ORDER_ITEM = 'ORDER_ITEM'
}

export class ApiOrderItemPayment {
  id: number;
  type: ApiEPaymentType.ORDER_ITEM; 
  method: ApiEPaymentMethod;
  amount: number;
  discount: number;
  userId: number;
  user: ApiUser;
  orderItemIds: number[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export class ApiCreateOrderItemPaymentDto {
  type: ApiEPaymentType.ORDER_ITEM;
  method: ApiEPaymentMethod;
  amount: number;
  discount: number;
  userId: number;
  orderItemIds: number[];
  useCredit: boolean;
}