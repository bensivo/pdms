# Manual Test: Reference List Field Type

## Test 1: Create a new Reference List field via entity config

1. Navigate to `/workspace-config`
2. Click on "Task" entity to open configuration
3. Click "+ Add Field"
4. Fill in form:
   - Field Name: "Assignees"
   - Field Type: "Reference List"
   - References Entity: "Team Members"
5. Click OK
6. Verify the "Assignees" field appears in the Task fields table with type "Reference List"

## Test 2: Create a record with multiple selections

1. Navigate to `/entity/tasks` (Task list page)
2. Click "+ New" button
3. Fill in form:
   - Name: "Test Task"
   - Assignee: select one team member (e.g., "Eric Perez")
   - Assignees: select multiple team members (e.g., "Clifford Schomburg", "Thane Tate", "Arnis")
4. Click "Create"
5. Verify the record is created and you're redirected to detail page

## Test 3: View record detail page with reference list

1. On the detail page from Test 2
2. Scroll to "Assignees" field
3. Verify it displays as a list of clickable links:
   - Each assignee name should appear as a link
   - Should be roughly similar format to "Backlink" field rendering below
   - Clicking any link should navigate to that team member's detail page
   - If no assignees, should display "—"

## Test 4: Edit record with multi-select

1. Click "Edit" button on the detail page
2. Verify the "Assignees" field shows a multi-select dropdown
3. Verify all selected assignees are pre-populated in the multi-select
4. Add a new assignee by selecting from the dropdown
5. Remove an assignee by clicking the X next to their name
6. Click "Save"
7. Verify changes are persisted:
   - Navigate away and back to the detail page
   - The "Assignees" field should show the updated list

## Test 5: View reference list in entity list table with clickable links

1. Navigate to `/entity/tasks` (Task list page)
2. Verify the "Assignees" column appears in the table
3. For records with assignees:
   - Should display each assignee name as a clickable link (blue, underline on hover)
   - e.g., "Clifford Schomburg", "Thane Tate", "Arnis" each as separate links
   - Clicking any assignee link should navigate to that team member's detail page
   - Each link should open in the same way as reference field links
4. For records without assignees:
   - Should display "—"
5. Clicking the table row (anywhere except links) should navigate to the task detail page
6. Verify that clicking a link stops propagation (doesn't navigate to the task)

## Test 6: Pre-populated mock data

1. Navigate to `/entity/tasks` list page
2. Look for tasks with multiple assignees (mock data includes some):
   - "Terraform Project Scaffolding" should have multiple assignees
   - "Deploy Dev Workspace" should have multiple assignees
   - "Deploy Prod Workspace" should have multiple assignees
3. Click on each to verify the detail page shows all assignees as links
4. Click one of the assignee links to navigate to that team member

## Test 7: Empty reference list handling

1. Create a new task without selecting any assignees
2. On detail page, verify the "Assignees" field shows "—"
3. Click Edit and verify the multi-select is empty
4. Select some assignees and save
5. Verify they now appear in the list
6. Click Edit again and clear all selections (remove all tags)
7. Save and verify it goes back to showing "—"
