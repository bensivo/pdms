import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { EntityService } from '../../services/entity.service';
import { generateEntityKey } from '../../services/entity-key.util';

@Component({
  selector: 'app-workspace-config-page',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule,
    NzEmptyModule
  ],
  templateUrl: './workspace-config.page.html',
  styleUrl: './workspace-config.page.less'
})
export class WorkspaceConfigPageComponent {
  showCreateEntityModal = signal(false);

  newEntityName = '';
  newEntityPluralName = '';

  constructor(private entityService: EntityService) {}

  get entities$() {
    return this.entityService.entities$;
  }

  onClickAddEntityButton(): void {
    this.newEntityName = '';
    this.newEntityPluralName = '';
    this.showCreateEntityModal.set(true);
  }

  onClickCreateEntityButton(): void {
    if (!this.newEntityName || !this.newEntityPluralName) {
      return;
    }
    this.entityService.createEntity(this.newEntityName, this.newEntityPluralName);
    this.showCreateEntityModal.set(false);
  }

  onClickDeleteEntityButton(entityId: string): void {
    this.entityService.deleteEntity(entityId);
  }

  getEntityKey(name: string): string {
    return generateEntityKey(name);
  }

  getEntityKeyPreview(): string {
    return generateEntityKey(this.newEntityName);
  }
}
