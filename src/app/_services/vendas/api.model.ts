import { ApiProductHistory } from "../produtos/api.model";
import { ApiUser } from "../socios/api.model";

export class ApiOrder {
  id: number;
  clientId: number;
  client: ApiUser;
  clientAccountId: number;
//   clientAccount?: Account;
  items: ApiOrderItem[]
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export class ApiOrderItem {
  id: number;
  order: ApiOrder;
  product: ApiProductHistory;
  value: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

class ApiOrderItemDto {
  productId: number;
  quantity: number;
}

export class ApiCreateOrderDto {
  clientId: number;
  items: ApiOrderItemDto[];
}