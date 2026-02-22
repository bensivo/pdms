import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FieldType } from '../../models/entity.model';
import { generateEntityKey } from '../../services/entity-key.util';
import { EntityService } from '../../services/entity.service';

@Component({
  selector: 'app-entity-config-page',
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzModalModule,
    NzEmptyModule
  ],
  templateUrl: './entity-config.page.html',
  styleUrl: './entity-config.page.less'
})
export class EntityConfigPageComponent implements OnInit {
  private entityKeySignal = signal<string>('');
  entity$ = computed(() => {
    const key = this.entityKeySignal();
    const entities = this.entityService.entities$();
    return entities.find(e => generateEntityKey(e.name) === key);
  });

  showAddFieldModal = signal(false);

  newFieldName = '';
  newFieldType: FieldType = 'short-text';

  fieldTypeOptions: { label: string; value: FieldType }[] = [
    { label: 'Short Text', value: 'short-text' },
    { label: 'Long Text', value: 'long-text' },
    { label: 'Number', value: 'number' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private entityService: EntityService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const key = params['key'];
      this.entityKeySignal.set(key);
      if (!this.entity$()) {
        this.router.navigate(['/workspace-config']);
      }
    });
  }

  onClickBackButton(): void {
    this.router.navigate(['/workspace-config']);
  }

  onClickAddFieldButton(): void {
    this.newFieldName = '';
    this.newFieldType = 'short-text';
    this.showAddFieldModal.set(true);
  }

  onClickConfirmAddFieldButton(): void {
    const entity = this.entity$();
    if (!entity || !this.newFieldName) {
      return;
    }
    this.entityService.addField(entity.id, this.newFieldName, this.newFieldType);
    this.showAddFieldModal.set(false);
  }

  onClickRemoveFieldButton(fieldId: string): void {
    const entity = this.entity$();
    if (!entity) {
      return;
    }
    this.entityService.removeField(entity.id, fieldId);
  }

  getFieldTypeLabel(type: FieldType): string {
    return this.fieldTypeOptions.find(opt => opt.value === type)?.label || type;
  }
}
