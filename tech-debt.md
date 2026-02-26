# Tech Debt

## `EntityService.addField()` is getting complicated
**File**: `webapp/src/app/services/entity.service.ts`

The `addField()` method currently accepts `referenceEntityId` for reference fields, and will need to be extended again for `backlink` fields (`backlinkSourceEntityId`, `backlinkSourceFieldId`). The signature is growing awkward as each new field type adds more optional parameters.

**Suggested fix**: Refactor `addField()` to accept a typed config object per field type, e.g.:
```typescript
addField(entityId: string, fieldName: string, config: ReferenceFieldConfig | BacklinkFieldConfig | SimpleFieldConfig): void
```
Or split into separate methods: `addReferenceField()`, `addBacklinkField()`, `addSimpleField()`.


## Display Field shows backlink fields, and reference fields