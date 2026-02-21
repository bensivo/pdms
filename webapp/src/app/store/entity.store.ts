import { Injectable, signal } from '@angular/core';
import { Entity } from '../models/entity.model';
import { MOCK_ENTITIES } from './mock-data';

@Injectable({ providedIn: 'root' })
export class EntityStore {
  private entitiesSignal = signal<Entity[]>(MOCK_ENTITIES);
  public entities$ = this.entitiesSignal.asReadonly();

  getAll(): Entity[] {
    return this.entitiesSignal();
  }

  getById(id: string): Entity | undefined {
    return this.entitiesSignal().find(e => e.id === id);
  }

  add(entity: Entity): void {
    this.entitiesSignal.update(entities => [...entities, entity]);
  }

  update(id: string, entity: Partial<Entity>): void {
    this.entitiesSignal.update(entities =>
      entities.map(e => (e.id === id ? { ...e, ...entity } : e))
    );
  }

  remove(id: string): void {
    this.entitiesSignal.update(entities => entities.filter(e => e.id !== id));
  }
}
