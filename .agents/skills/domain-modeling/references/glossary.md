# Glossary format

`docs/GLOSSARY.md` holds the project's vocabulary and nothing else.

## Structure

```md
# Glossary

**Order**: A customer's request for goods, placed and priced, not yet paid.
_Not_: purchase, transaction

**Invoice**: A request for payment, sent after delivery.
_Not_: bill, payment request
```

Group terms under subheadings once natural clusters appear. A flat list is right until then.

## Rules

- **Pick one word.** When several words name one concept, choose one and list the rest under `_Not_`. A glossary that admits synonyms has settled nothing.
- **Define what it is,** in one or two sentences. What it does is the code's job to say.
- **Only terms this project gives its own meaning to.** Timeouts, retries and repositories mean here what they mean everywhere, however much the project uses them.
- **Terms only.** Decisions go to `docs/adr/`.
