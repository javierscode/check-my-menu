---
name: implement-plan
description: Runs a plan's slices as parallel subagents, each reviewed before it merges, into a single pull request.
argument-hint: "The path to the plan folder to implement."
disable-model-invocation: true
---

# Implement plan

You orchestrate; the subagents write the code. You read `plan.md` and nothing else. Every `task-N.md` belongs to the subagent working it, and keeping them out of your context is what makes the whole run fit in one.

The run carries one name over from the plan: `<slug>`, the plan folder's name with its date prefix stripped. It names the integration branch `<type>/<agent>/<slug>` — the Conventional Commits type the plan lands as, then the agent running it — and every task branch and worktree hangs off it.

## 1. Open the run

Read `<path>/plan.md`. Its `Slices` table gives you each task's number, title and `Blocked by`: that table is your map for the run.

Create the integration branch from the branch you are on, switch to it, push it, and open a **draft** PR titled after the plan's `# Plan for <feature>`.

When that branch already exists, this is a resume. Switch to it. Every task whose commit it carries is done, and you redo the rest from scratch.

## 2. Work the frontier

The **frontier** is every unfinished task whose `Blocked by` tasks have all merged. Dispatch the whole frontier at once, in a single message, and re-form it each time a task merges.

Each task runs its own loop, up to **three rounds**:

1. **Worktree.** `git worktree add -b <slug>-task-N .git/implement-plan/<slug>/task-N` off the integration branch, then make it runnable: copy the git-ignored local files the repo needs, and install with the command its lockfile names.
2. **Implement.** Dispatch a subagent with [`references/implementer.md`](references/implementer.md), the path to `task-N.md`, its worktree, the round number, the corrections from the last round, and the **Deviations** and **Open questions** its direct blockers reported. It returns four blocks.
3. **Review.** Dispatch a subagent with [`references/reviewer.md`](references/reviewer.md), the path to `task-N.md` and the worktree. It returns `approved`, or `corrections` with a list.

`corrections` opens another round at step 2, in the same worktree.

`approved` merges, and you merge one task at a time: `git merge --squash <slug>-task-N`, committed with a message written from the task's title. Call the Skill tool with "conventional-commits". It settles how that message reads. A conflict here means the branch moved underneath it, so send the task back to step 2. Then write the implementer's four blocks into the PR body under that task, and remove the worktree and the branch.

Three rounds without an approval **prunes** the task: leave its worktree and branch on disk as the evidence, drop everything that depends on it, and keep working the rest of the frontier.

## 3. Audit the seams

Once the frontier empties, dispatch one subagent with [`references/auditor.md`](references/auditor.md), the plan's path and the integration branch against the base it branched from. It returns a list of fixes; dispatch one subagent to apply all of them on the integration branch and commit. One pass, and no review behind it.

## 4. Close

Write into the PR body which slices landed, which were pruned with what the reviewer last asked of them, and the worktree each pruned task waits in. Mark the PR ready when every task landed; a pruned run stays draft.
