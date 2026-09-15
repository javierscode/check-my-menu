---
name: commit-work
description: Cuts your working tree into one commit per intent in Conventional Commits, shows you the proposal, and commits once you approve.
disable-model-invocation: true
---

# Commit work

Split everything uncommitted into commits, one per intent. That means everything `git status` reports, untracked files included. Decide the cuts first. Write the messages after.

## 1. Rules

Call the Skill tool with "conventional-commits". It settles where a commit is cut and how its message reads.

## 2. Cutting

Apply those rules to the working tree, and judge the dependencies between the cuts by reading the diff, not by running tests or builds.

## 3. Approval

Stop and show the proposal: commits numbered in execution order, each with its full message and its files, partial-file cuts marked with which hunks go where. Where a dependency forced a merge, or an order nobody would expect, say so in one line.

Then wait, and read the reply as approval, refusal, or correction. Approval commits the proposal as shown, in order. Refusal leaves the repo untouched. A correction is applied, then show the proposal again and wait again.
