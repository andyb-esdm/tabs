import { IRecordListItem } from './record-list-item.model';

export interface IRecord extends IRecordListItem {
    description: string,
    recordId: number | null,
    hasLinks?: boolean
}