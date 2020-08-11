### Relationships

*   Project(one) <==> Tasks(many)
*   Project(many) <==> Resources(many)

### Tables

- Projects
    - id
    - name (required, unique)
    - description (optional)
    - status (boolean) - default to false

- Tasks
    - id
    - description (required, unique)
    - notes (optional)
    - project_id (required)
    - status (bool) - default to false

- Resources
    - id
    - name (required, unique)
    - description (optional)

- Project-Resources
    - id
    - project_id
    - resource_id