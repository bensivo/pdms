import { Injectable } from '@angular/core';

import { EntityRecord } from '../models/entity-record.model';
import { EntityRecordStore } from '../store/entity-record.store';

@Injectable({ providedIn: 'root' })
export class EntityRecordService {
    constructor(private entityRecordStore: EntityRecordStore) {}

    get records$() {
        return this.entityRecordStore.records$;
    }

    getAll(): EntityRecord[] {
        return this.entityRecordStore.getAll();
    }

    getById(id: string): EntityRecord | undefined {
        return this.entityRecordStore.getById(id);
    }

    getByEntityId(entityId: string): EntityRecord[] {
        return this.entityRecordStore.getByEntityId(entityId);
    }

    /**
     * Creates a new EntityRecord and saves it to the store.
     *
     * @param entityId - The ID of the parent Entity
     * @param data - Field values keyed by EntityField.id
     *
     * @returns The newly created EntityRecord with its generated id
     */
    createRecord(entityId: string, data: Record<string, string>): EntityRecord {
        const record: EntityRecord = {
            id: this.generateId(),
            entityId,
            data
        };
        this.entityRecordStore.add(record);
        return record;
    }

    /**
     * Updates the field data on an existing record.
     *
     * @param id - The record id to update
     * @param data - New field values keyed by EntityField.id
     */
    updateRecord(id: string, data: Record<string, string>): void {
        this.entityRecordStore.update(id, { data });
    }

    /**
     * Permanently deletes a record from the store.
     *
     * @param id - The record id to delete
     */
    deleteRecord(id: string): void {
        this.entityRecordStore.remove(id);
    }

    private generateId(): string {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
}
