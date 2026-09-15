---
name: conventional-commits
description: Commit rules for where a commit is cut and how its Conventional Commits message reads. Use before committing.
---

# Conventional commits

What makes a commit one commit, and how its message reads. The cut comes first, the message after.

## The cut

A commit is one **intent**: what fits in a sentence with no "and" in it. Not one type and not one folder. Code and its test are a single intent, and one feature touching backend and frontend is one commit.

Files are the unit, and the intent outranks the file: when one file carries two intents, it splits by hunk.

A commit that would not build or would not make sense applied alone is not whole. It belongs after the commit it needs, or merged into it. Those dependencies also set the order.

## The message

**The types.** Prefer specific types over generic ones (e.g., perf over refactor for performance changes, build over feat for build system changes, ci over build for GitHub Actions workflows).

- `feat`: a new feature
- `fix`: a bug fix
- `docs`: documentation only
- `style`: formatting (not CSS/design, which are feat/fix/refactor)
- `refactor`: neither fixes a bug nor adds a feature
- `perf`: performance, without fixes or features
- `build`: build system or external dependencies
- `ci`: CI configuration files and scripts
- `chore`: does not modify src or test files
- `revert`: reverts a previous commit
- `test`: adds missing tests or corrects existing ones

**The scope.** Optional. Add a scope when the summary alone does not say where the change is. Take it from the area the commit touches: a module, a package. Use the vocabulary the codebase already has for it.

**The summary.** Imperative, lowercase, no trailing period, and the whole line stays under 100 characters.

**The body.** Optional. It explains the reasoning behind the change when the summary alone is not enough.
