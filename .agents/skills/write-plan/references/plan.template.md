# Plan for <feature>

## Scope

<One paragraph: what gets built, seen from the outside.>

## Out of scope

What this plan deliberately leaves out.

- <thing>

## Constraints

What every task respects and none may change: closed API contracts, design-system components and tokens to reuse as they are, target compatibilities, business rules. Exact values, not paraphrases.

- <constraint>

## Slices

Numbered so each task follows everything it depends on. A task can start once everything in `Blocked by` is done.

| # | Task | Blocked by | Size | Why here |
| --- | --- | --- | --- | --- |
| 1 | [<title>](task-1.md) | — | S | prefactor: unblocks 2 and 3 |
| 2 | [<title>](task-2.md) | 1 | M | high risk: external integration, early |
