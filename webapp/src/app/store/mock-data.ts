import { EntityRecord } from "../models/entity-record.model";
import { Entity } from "../models/entity.model";

export const MOCK_ENTITIES: Entity[] = [
        {
            id: '1',
            name: 'Account',
            pluralName: 'Accounts',
            fields: [
                { id: '1', name: 'Name', type: 'short-text' },
                { id: '2', name: 'Description', type: 'long-text' },
                { id: '3', name: 'Related Leads', type: 'backlink', backlinkSourceEntityId: '2', backlinkSourceFieldId: 'lead-3' },
            ],
            displayNameFieldId: '1'
        },
        {
            id: '2',
            name: 'Lead',
            pluralName: 'Leads',
            fields: [
                { id: 'lead-1', name: 'Full Name', type: 'short-text' },
                { id: 'lead-2', name: 'Title', type: 'short-text' },
                { id: 'lead-3', name: 'Account', type: 'reference', referenceEntityId: '1' },
            ],
            displayNameFieldId: 'lead-1'
        },
]

export const MOCK_RECORDS: EntityRecord[] = [
        // {
        //     id: '1',
        //     entityId: '1',
        //     data: {
        //         '1': 'Mirion Technologies',
        //         '2': 'A global leader in radiation detection and measurement solutions.'
        //     }
        // },
        // {
        //     id: '2',
        //     entityId: '1',
        //     data: {
        //         '1': 'Acme Corporation',
        //         '2': 'A leading manufacturer of industrial equipment.'
        //     }
        // },
        // {
        //     id: '3',
        //     entityId: '1',
        //     data: {
        //         '1': 'Global Solutions Inc.',
        //         '2': 'An innovative company in environmental monitoring and data analytics.'
        //     }
        // },
        // {
        //     id: '4',
        //     entityId: '2',
        //     data: {
        //         'lead-1': 'Alice Smith',
        //         'lead-2': 'VP Sales',
        //         'lead-3': '1'
        //     }
        // },
        // {
        //     id: '5',
        //     entityId: '2',
        //     data: {
        //         'lead-1': 'Bob Jones',
        //         'lead-2': 'Engineer',
        //         'lead-3': '2'
        //     }
        // },
]