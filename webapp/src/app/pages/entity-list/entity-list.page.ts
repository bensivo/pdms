import { Component, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { Entity } from '../../models/entity.model';
import { EntityRecord } from '../../models/entity-record.model';
import { EntityService } from '../../services/entity.service';
import { EntityRecordService } from '../../services/entity-record.service';
import { generateEntityKey } from '../../services/entity-key.util';

@Component({
  selector: 'app-entity-list-page',
  imports: [
    CommonModule,
    NzButtonModule,
    NzInputModule,
    NzEmptyModule
  ],
  templateUrl: './entity-list.page.html',
  styleUrl: './entity-list.page.less'
})
export class EntityListPageComponent implements OnInit {
  private entityKeySignal = signal<string>('');
  entity$ = computed(() => {
    const key = this.entityKeySignal();
    const entities = this.entityService.entities$();
    return entities.find(e => generateEntityKey(e.name) === key);
  });

  records$ = computed(() => {
    const entity = this.entity$();
    if (!entity) return [];
    return this.entityRecordService.records$().filter(r => r.entityId === entity.id);
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private entityService: EntityService,
    private entityRecordService: EntityRecordService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const key = params['key'];
      this.entityKeySignal.set(key);
      if (!this.entity$()) {
        this.router.navigate(['/']);
      }
    });
  }

  onClickBackButton(): void {
    this.router.navigate(['/']);
  }

  onClickNewButton(): void {
    const entity = this.entity$();
    if (entity) {
      this.router.navigate(['/entity-create', generateEntityKey(entity.name)]);
    }
  }

  onClickRecordRow(recordId: string): void {
    const entity = this.entity$();
    if (entity) {
      this.router.navigate(['/entity', generateEntityKey(entity.name), recordId]);
    }
  }

  getRecordLabel(record: EntityRecord): string {
    const entity = this.entity$();
    if (!entity || entity.fields.length === 0) {
      return 'Untitled';
    }
    const firstFieldId = entity.fields[0].id;
    return record.data[firstFieldId] || 'Untitled';
  }
}
