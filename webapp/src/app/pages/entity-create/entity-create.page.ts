import { Component, OnInit, computed, signal, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';

import { EntityService } from '../../services/entity.service';
import { EntityRecordService } from '../../services/entity-record.service';
import { generateEntityKey } from '../../services/entity-key.util';

@Component({
    selector: 'app-entity-create-page',
    imports: [
        CommonModule,
        FormsModule,
        NzButtonModule,
        NzInputModule,
        NzFormModule,
        NzCardModule
    ],
    templateUrl: './entity-create.page.html',
    styleUrl: './entity-create.page.less'
})
export class EntityCreatePageComponent implements OnInit, AfterViewInit {
    private entityKeySignal = signal<string>('');

    entity$ = computed(() => {
        const key = this.entityKeySignal();
        const entities = this.entityService.entities$();
        return entities.find(e => generateEntityKey(e.name) === key);
    });

    // All form values, keyed by field id
    formData = signal<Record<string, string>>({});

    @ViewChild('firstInput') firstInput: any;

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
            const entity = this.entity$();
            if (!entity) {
                this.router.navigate(['/']);
                return;
            }
            // Initialize all fields to empty string
            const initialData: Record<string, string> = {};
            for (const field of entity.fields) {
                initialData[field.id] = '';
            }
            this.formData.set(initialData);
        });
    }

    ngAfterViewInit(): void {
        this.firstInput?.nativeElement?.focus();
    }

    getFieldValue(fieldId: string): string {
        return this.formData()[fieldId] ?? '';
    }

    setFieldValue(fieldId: string, value: string): void {
        this.formData.update(current => ({ ...current, [fieldId]: value }));
    }

    onClickBackButton(): void {
        const entity = this.entity$();
        if (entity) {
            this.router.navigate(['/entity', generateEntityKey(entity.name)]);
        } else {
            this.router.navigate(['/']);
        }
    }

    onClickSubmit(): void {
        const entity = this.entity$();
        if (!entity) {
            return;
        }
        const record = this.entityRecordService.createRecord(entity.id, this.formData());
        this.router.navigate(['/entity', generateEntityKey(entity.name), record.id]);
    }
}
