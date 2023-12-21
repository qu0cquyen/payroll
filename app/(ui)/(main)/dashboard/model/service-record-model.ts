export interface ServiceRecordModel {
  id: string;
  userId: string;
  customerId: string;
  customerName: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  tip: number;
  total: number;
  staffCommission: number;
  staffTotal: number;
  createdAt: number;
}

export interface ServiceRecordList {
  records: ServiceRecordModel[];
  totalAmount: number;
  totalTip: number;
  totalStaffCommission: number;
}
