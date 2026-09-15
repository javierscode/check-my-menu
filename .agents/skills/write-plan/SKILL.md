---
name: write-plan
description: Turns what you decided in the session into a plan of vertical slices, one file per task, written once you approve the breakdown.
argument-hint: "Nothing, or the path to a file that states the scope."
disable-model-invocation: true
---

# Write plan

Break the scope into **vertical slices** and write one file per slice. You write the plan files and nothing else.

Read the context first, and explore only what it leaves open. When the project has a **domain model**, read it too. Name things the way `docs/GLOSSARY.md` names them, and follow the decisions in `docs/adr/`.

## 1. Close the gaps

Reread the context, group what it leaves unresolved by subsystem, and dispatch one read-only subagent per subsystem, in parallel. Consolidate what they report.

You end with the dependencies mapped, the **prefactors** identified, the scope's constraints written down at their exact values. A prefactor is a change that makes the change easy. When the scope already names one, validate it against the code instead of rediscovering it.

## 2. Slice

Each slice runs through every layer, end to end, and once finished is **verifiable** on its own.

Size each slice by the behaviour it delivers, and keep it in S–M:

| Size | Behaviour delivered                                |
| ---- | -------------------------------------------------- |
| XS   | A rule or a setting; nothing observable on its own |
| S    | One behaviour, end to end                          |
| M    | A few behaviours along one path                    |
| L    | Several independent paths                          |

Merge an XS slice into the slice that needs it, and split an L slice. Three tests force a split whatever the table says: the title needs an "and", the slice touches two independent subsystems, or it delivers more than three behaviours.

You end when every piece of the scope is covered by exactly one slice, and none is below S or above M.

## 3. Order

Number the slices so each one follows everything it depends on, and give each the list of tasks that block it. Prefactors go first and high risk goes early.

You end when the order respects every dependency and no slice leaves the system broken once it is done.

## 4. Approval

Present the breakdown: one line per slice with its title, its size, what it delivers and what blocks it. Ask whether the cuts and the order are right, and iterate.

You write files only once the user approves the breakdown.

## 5. Write

Write into `.plans/<YYYY-MM-DD-slug>/`, taking the slug from the file you were given, or from the feature's name. Write `plan.md` from [`references/plan.template.md`](references/plan.template.md), and one `task-N.md` per slice from [`references/task.template.md`](references/task.template.md).

Every section you keep states the real thing: the actual command, the actual path, the actual name. A section you cannot state that way has failed its condition, so cut it instead.
