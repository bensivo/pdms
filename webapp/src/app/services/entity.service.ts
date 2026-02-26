import { Injectable } from '@angular/core';
import { Entity, EntityField } from '../models/entity.model';
import { EntityStore } from '../store/entity.store';

@Injectable({ providedIn: 'root' })
export class EntityService {
  constructor(private entityStore: EntityStore) {}

  get entities$() {
    return this.entityStore.entities$;
  }

  getAll(): Entity[] {
    return this.entityStore.getAll();
  }

  getById(id: string): Entity | undefined {
    return this.entityStore.getById(id);
  }

  createEntity(name: string, pluralName: string): Entity {
    const entity: Entity = {
      id: this.generateId(),
      name,
      pluralName,
      fields: []
    };
    this.entityStore.add(entity);
    return entity;
  }

  addField(
      entityId: string,
      fieldName: string,
      fieldType: string,
      referenceEntityId?: string,
      backlinkSourceEntityId?: string,
      backlinkSourceFieldId?: string
  ): void {
    const entity = this.entityStore.getById(entityId);
    if (!entity) return;

    const field: EntityField = {
      id: this.generateId(),
      name: fieldName,
      type: fieldType as any,
      referenceEntityId,
      backlinkSourceEntityId,
      backlinkSourceFieldId
    };

    this.entityStore.update(entityId, {
      fields: [...entity.fields, field]
    });
  }

  removeField(entityId: string, fieldId: string): void {
    const entity = this.entityStore.getById(entityId);
    if (!entity) return;

    this.entityStore.update(entityId, {
      fields: entity.fields.filter(f => f.id !== fieldId)
    });
  }

  deleteEntity(id: string): void {
    this.entityStore.remove(id);
  }

  setDisplayNameField(entityId: string, fieldId: string): void {
    this.entityStore.update(entityId, { displayNameFieldId: fieldId });
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
