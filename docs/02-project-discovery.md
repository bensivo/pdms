# Project Discovery

This document is mostly notes about differnt systems that exist, or information about the user personas which we want to support. 

## Differnt Use Cases

### Project Management
Any project management tool cares about these entities:
- teams
- people
- task hierarchies (tasks, stories, epics, intitiatives, projects, etc.)
- milestones

And some views that different users might need:
- a kanban board of tasks
- a list of either tasks, epics, etc.
- a report of historical task activity, by
  - team
  - person
  - date
  - project (or any level in the hierarchy)

### CRM
Any CRM cares about these entities
- accounts
- leads
- opportunities
- deals
- interactions
- notes

And some views that different users might need:
- A page for each entitiy, with all the info about that entity, and related entities
- A 'funnel' view, to show where each lead is
- A '$ closed' view, to show how $ was generated in deals in X time
- A list of my leads, my accounts


## Reverse Engineering Similar Apps
Salesforce:
![alt text](image.png)

Looking at the opportunities page, users can:
- See all opportunities in a table
- Filter the table
- Search for specific opportunities
- Switch to a 'kanban' view, to see the opportunities organized by stage 
- Add a new opportunity by clicking on 'new' 
- See both details and the table with 'split view', for quickly navigating through many opportunities


SAP:
![alt text](image-2.png)
Looking specifically at the new 'business partner' page of SAP, there are a few key takeaways here:
- Users can actually enter data at multiple levels. You don't just see the 'business partner' here, but also 'roles', 'addresses', 'bank accounts'. These are technically separate entities, but they all roll up to business partner, so to make data entry easy, they're all available on one page.
- If we were to make a generic system, we'd surely need this feature, to input data for the parent AND children all at once, instead of N screens for N entities. 

## Requirements

### User Stories
- I can create a new entity type, and define what fields belong to it (e.g. "Account" with fields    "name, address, description")
- I can define relationships between entities (e.g. "An account can have many leads")
- For any entity, I can create new instances
- I can create tables of any given entity, with custom columns
- I can search through anything
- I can create differnet 'workspaces' for different sets of entities. e.g. a project-managemetn space, a CRM space, etc. 
- I can create custom forms that allow quick creation or updating of entities, single or in bulk