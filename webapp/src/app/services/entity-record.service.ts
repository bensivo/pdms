import { Injectable } from '@angular/core';

import { EntityRecord } from '../models/entity-record.model';
import { EntityRecordStore } from '../store/entity-record.store';
import { EntityStore } from '../store/entity.store';

@Injectable({ providedIn: 'root' })
export class EntityRecordService {
    constructor(
        private entityRecordStore: EntityRecordStore,
        private entityStore: EntityStore
    ) {}

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

    /**
     * Gets the display name for a record based on the entity's displayNameFieldId.
     *
     * @param entityId - The ID of the entity
     * @param recordId - The ID of the record
     * @returns The display name string, or recordId as fallback
     */
    getRecordDisplayName(entityId: string, recordId: string): string {
        const entity = this.entityStore.getById(entityId);
        const record = this.entityRecordStore.getById(recordId);

        if (!entity || !record) {
            return recordId;
        }

        // Use the displayNameFieldId if set, otherwise use first field
        const displayFieldId = entity.displayNameFieldId || entity.fields[0]?.id;
        if (!displayFieldId) {
            return recordId;
        }

        return record.data[displayFieldId] || recordId;
    }

    /**
     * Returns all records of sourceEntityId where the field sourceFieldId
     * points to targetRecordId.
     *
     * @param sourceEntityId - The entity that has the reference field
     * @param sourceFieldId - The specific reference field in that entity
     * @param targetRecordId - The record ID being referenced
     * @returns Array of backlinked records
     */
    getBacklinkedRecords(sourceEntityId: string, sourceFieldId: string, targetRecordId: string): EntityRecord[] {
        return this.entityRecordStore.getByEntityId(sourceEntityId).filter(
            record => record.data[sourceFieldId] === targetRecordId
        );
    }

    private generateId(): string {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
}
