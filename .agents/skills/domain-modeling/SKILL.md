---
name: domain-modeling
description: Sharpens a project's glossary and records the ADRs under it, mid-conversation. Use when a term is unsettled, when one word covers two concepts, when you draw a boundary between concepts, or when the user makes a hard-to-reverse decision. Consulting the glossary to use it is not this skill.
---

# Domain modeling

Sharpen the domain model as the user discusses it. The model lives in two places: `docs/GLOSSARY.md`, the vocabulary, and `docs/adr/`, the decisions underneath it. Create either one the first time you have something to put in it.

## Sharpen as you go

Four moves:

- **Challenge the term.** When a term contradicts the glossary, say so where it is used. "The glossary defines cancellation as X, and you mean Y. Which is it?"
- **Force the choice.** When one word covers two things, name both and make the user pick. "Account: Customer, or User?"
- **Invent the edge.** When the user draws a boundary between concepts, invent the scenario that tests it, and let the answer redraw the boundary.
- **Check the code.** When the user states how something works, go and read whether the code agrees. A contradiction is a finding. Surface it.

## Write the vocabulary

A term is settled the moment the user picks a word and means it. Write it into `docs/GLOSSARY.md` right there, in the format in [references/glossary.md](references/glossary.md), and carry on with the conversation. Terms settle constantly; asking each time turns the conversation into a form.

## Offer the decision

Offer an ADR when a decision passes all three:

1. **Hard to reverse.** Changing your mind later costs something real.
2. **Surprising without context.** A future reader will wonder why it was done this way.
3. **A real trade-off.** There were genuine alternatives, and one was picked for reasons.

Three of three, or there is no ADR. Offer it the moment the user decides, not when the conversation ends, and write it on a yes, in the format in [references/adr.md](references/adr.md). An ADR claims the user decided something and why. That claim is theirs to approve.
