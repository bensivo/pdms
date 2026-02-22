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
        ]
    }
]

export const MOCK_RECORDS: EntityRecord[] = [
    {
        id: '1',
        entityId: '1',
        data: {
            '1': 'Mirion Technologies',
            '2': 'A global leader in radiation detection and measurement solutions.'
        }
    },
    {
        id: '2',
        entityId: '1',
        data: {
            '1': 'Acme Corporation',
            '2': 'A leading manufacturer of industrial equipment.'
        }
    },
    {
        id: '3',
        entityId: '1',
        data: {
            '1': 'Global Solutions Inc.',
            '2': 'An innovative company in environmental monitoring and data analytics.'
        }
    },
]