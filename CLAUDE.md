# Claude.md

## Project Overview
This project is a web-based application for managing data and documents. It's intended to be like a general purpose, configurable CRM, ERP, etc. 

Users can configure this app with any number of entities, with fields, links, and data, then start managing sets of those entiites. Entities could be things like 'accounts', 'leads', in a CRM workflow, or 'projects', 'tasks', in a project management workflow. 

This project in is early phases.

## Project Structure
This is a monorepo - there will be multiple deployable units in this codebase:
- `docs/` - All docs and style guides used in this project
- `webapp` - The angular frontend of this application

IN the future, the backend will also be in a top level folder, as well as any infra. 


## Style Guides and Docs
The `docs/` folder has the internal docs, you'll need for working. Here are all the docs listed:
- `01-project-overview.md` - A description of what this project is
- `02-project-discovery.md` - Notes from looking at other apps, and defining some requirements and key user journeys
- `typescript-style-guide.md` - A style guide for writing any typescript code. Read this before writing any TS, and make sure all your generated code follows the instructions within
- `less-style-guide.md` - A style guide for writing any less code. Read this before writing any less, and make sure all your generated code follows the instructions within
- `angular-codebase-design.md` - A guide with design patterns for angular codebases. Read this before writing any angular, and make sure all your generated code follows the patterns within. 


## Key Technologies used:
Because we are early phases, this app is just a webapp for now. On teh frontend, these are technolgies used:
- Angular - frontend web framework
- NG-Zorro - UI Kit for Angular. Use ng-zorro components as much as possible.
- Signals - For all state managemetn and reactivity in angular, do NOT use observables or any other state management system
- LESS - CSS preprocessor



## General instructions for generating code:
- We want to keep our dependency list minimal. DO NOT add any external libraries unless explicitly asked to. Implement all features with current tools. 
- Keeep the README.md updated with any instructions a developer would need to know to run the application