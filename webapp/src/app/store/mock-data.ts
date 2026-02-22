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