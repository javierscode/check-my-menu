# ADR format

ADRs live in `docs/adr/`, one file per decision. Name each file `YYYY-MM-DD-slug.md` for the day of the decision. The date orders the directory chronologically and keeps names collision-free across branches, so you can name the file without reading the directory first.

## Template

```md
# {The decision, as a short title}

{One to three sentences: the situation, what was decided, and why.}
```

A paragraph is a whole ADR. The value is the record that a decision was made and why, not filled-in sections.

## Optional sections

- **Status** (`proposed | accepted | superseded by YYYY-MM-DD-slug.md`): once you start revisiting decisions. Supersession cites the slug of the ADR that replaced it.
- **Considered options**: when someone proposes the rejected alternative again in six months.
- **Consequences**: when a downstream effect does not follow obviously from the decision.

## What passes the three tests

- **Architectural shape.** "The write model is event-sourced; reads are projected into Postgres."
- **Integration between parts.** "Ordering and Billing talk through domain events, never synchronous HTTP."
- **Technology carrying lock-in.** The database, the message bus, the auth provider. The ones that take a quarter to swap, not every library.
- **Boundaries.** "Customer data is owned by Customer; everyone else holds an ID." The explicit no is worth as much as the yes.
- **Deliberate deviations.** "Hand-written SQL instead of an ORM, because X." These stop the next engineer from fixing what was on purpose.
- **Constraints invisible in the code.** "No AWS, for compliance." "Under 200ms, by partner contract."
