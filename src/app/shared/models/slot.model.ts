export interface SlotModel {
  id: string;
  startAt: string;
  endAt: string;
  professorId: string;
  available: boolean;
  reason?: string;
  capacityUsed: number;
  capacityMax: number;
}
