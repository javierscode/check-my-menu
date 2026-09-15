# <Imperative title, one action>

<One paragraph: the end-to-end behaviour this slice makes work, seen from the outside.>

## Acceptance criteria

- [ ] <Verifiable condition, happy path>
- [ ] <Verifiable condition, on invalid input or a missing resource>

## Verification

Commands that run as they are from the repo root and pass or fail clearly, proving the criteria a command can prove. A criterion that resists automation is listed as reviewer judgement.

- `<command>` covers <which criteria>
- Reviewer judgement: <criterion>

## Constraints

Keep when the scope fixed something this slice respects without changing it. Each one verifiable here appears as an acceptance criterion too.

- <constraint>

## Interfaces

Keep when this slice shares names or types with another. Each implementer sees only their own file, so write the names in both files.

- Consumes <name> with <signature or shape>, from `task-N`
- Produces <name> with <signature or shape>, for `task-N`

## Reading context

Code the exploration found that the implementer would not find on their own. What this slice changes goes in `Files affected`.

- <full path from the repo root>:<first line>-<last line> shows <what this slice takes from it>

## Files affected

What this slice creates or modifies. A forecast, not a finding.

- <full path from the repo root>

## Blocked by

<Every `task-N` that gates this one, or "none".>
