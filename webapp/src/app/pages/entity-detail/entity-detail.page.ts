import { Component, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { EntityService } from '../../services/entity.service';
import { EntityRecordService } from '../../services/entity-record.service';
import { EntityStore } from '../../store/entity.store';
import { EntityField } from '../../models/entity.model';
import { generateEntityKey } from '../../services/entity-key.util';

@Component({
    selector: 'app-entity-detail-page',
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NzButtonModule,
        NzInputModule,
        NzFormModule,
        NzCardModule,
        NzSelectModule
    ],
    templateUrl: './entity-detail.page.html',
    styleUrl: './entity-detail.page.less'
})
export class EntityDetailPageComponent implements OnInit {
    private entityKeySignal = signal<string>('');
    private recordIdSignal = signal<string>('');

    entity$ = computed(() => {
        const key = this.entityKeySignal();
        const entities = this.entityService.entities$();
        return entities.find(e => generateEntityKey(e.name) === key);
    });

    record$ = computed(() => {
        const id = this.recordIdSignal();
        return this.entityRecordService.records$().find(r => r.id === id);
    });

    isEditMode = signal(false);

    // Working copy of data during edit. Initialized when edit mode is entered.
    editData = signal<Record<string, string>>({});

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private entityService: EntityService,
        private entityRecordService: EntityRecordService,
        private entityStore: EntityStore
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.entityKeySignal.set(params['key']);
            this.recordIdSignal.set(params['id']);
            if (!this.entity$() || !this.record$()) {
                this.router.navigate(['/']);
            }
        });
    }

    getFieldValue(fieldId: string): string {
        return this.record$()?.data[fieldId] ?? '';
    }

    getEditValue(fieldId: string): string {
        return this.editData()[fieldId] ?? '';
    }

    setEditValue(fieldId: string, value: string): void {
        this.editData.update(current => ({ ...current, [fieldId]: value }));
    }

    onClickBackButton(): void {
        const entity = this.entity$();
        if (entity) {
            this.router.navigate(['/entity', generateEntityKey(entity.name)]);
        } else {
            this.router.navigate(['/']);
        }
    }

    onClickEdit(): void {
        const record = this.record$();
        if (!record) return;
        // Copy current data into the working edit buffer
        this.editData.set({ ...record.data });
        this.isEditMode.set(true);
    }

    onClickCancelEdit(): void {
        this.isEditMode.set(false);
    }

    onClickSave(): void {
        const record = this.record$();
        if (!record) return;
        this.entityRecordService.updateRecord(record.id, this.editData());
        this.isEditMode.set(false);
    }

    getReferencedRecordOptions(field: EntityField): { label: string; value: string }[] {
        if (!field.referenceEntityId) return [];
        const referencedRecords = this.entityRecordService.getByEntityId(field.referenceEntityId);
        return referencedRecords.map(record => ({
            label: this.entityRecordService.getRecordDisplayName(field.referenceEntityId!, record.id),
            value: record.id
        }));
    }

    getReferencedRecordDisplayName(field: EntityField, recordId: string): string {
        return this.entityRecordService.getRecordDisplayName(field.referenceEntityId!, recordId);
    }

    getReferencedEntityRouteKey(field: EntityField): string | null {
        if (!field.referenceEntityId) return null;
        const entity = this.entityStore.getById(field.referenceEntityId);
        if (!entity) return null;
        return generateEntityKey(entity.name);
    }
}
