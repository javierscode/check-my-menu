# Glossary

## The restaurant side

**Restaurant**: A physical establishment whose menu is published here. It is the unit of ownership: every Category and Dish belongs to exactly one Restaurant, and deleting it deletes them.
_Not_: business, venue, site, place

**Owner**: The registered user who administers a Restaurant. Only a Restaurant has an Owner — a Category or a Dish reaches its Owner through its Restaurant. The only kind of person who can sign in; there is no other role.
_Not_: admin, manager, user (as a person)

**User**: The account an Owner signs in with — name, lastname, email and password. Every User is the Owner of zero or more Restaurants.
_Not_: account

**Profile**: A User without the password, as sent to the browser and held in the auth context.
_Not_: user data, account details

**Private area**: The pages under `/admin` where an Owner manages their own Restaurants, Categories and Dishes. Everything else is public.
_Not_: dashboard, backoffice, admin panel

## The menu

**Menu**: Everything a Restaurant publishes — all of its Categories and all of their Dishes. There is no Menu entity: it is the Restaurant's contents, reached through its Alias. A Restaurant has exactly one Menu and it is always public.
_Not_: carte, catalogue, listing

**Category**: A named, illustrated grouping of Dishes within one Restaurant. Owned through that Restaurant, never on its own. The first thing a Guest sees after scanning.
_Not_: section, course, group

**Dish**: A single item a Restaurant serves, with price, image, allergens and one or more Categories. It belongs to one Restaurant, is owned through it, and may appear in several of its Categories.
_Not_: item, product, plate

**Allergen**: One of the fourteen substances a Dish must declare. The list is closed and fixed — the fourteen of EU Regulation 1169/2011, Annex II.
_Not_: intolerance, ingredient, warning

**Alias**: The name a Restaurant is known by in public — `la-tagliatella` in `/la-tagliatella`. Chosen by the Owner at creation and unique across all Restaurants.
_Not_: domain, slug, restaurantSlug, handle, subdomain

## The public side

**Guest**: A person who reads a published Menu. Never signs in, is never stored, and is never identified. A Guest of the Restaurant, not of Check my menu.
_Not_: customer, client, diner, visitor, user

**QR**: The code an Owner prints and puts on the table. It encodes the public URL of a Restaurant's Menu and nothing else.
_Not_: QR code, code, link
