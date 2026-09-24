# Arquivo Militar — Planning (revised)

A private, in-universe military archive for a narrative AoT-inspired RPG. Interface entirely in Brazilian Portuguese (pt-BR). No dice, HP, damage, percentages or numerical power scaling. Secrecy is enforced on the server and in the database, not in the interface.

## 1. Architecture

- TanStack Start (React + SSR), file-based routes, Tailwind design tokens.
- Lovable Cloud (database, auth, file storage for portraits/facecards and maps).
- Sensitive reads go through server functions acting as the signed-in user; row-level security decides what returns. The browser never receives rows or columns it may not see.
- Modular by section (dossiês, NPCs, arquivo, habilidades, fórum, confidencial, administração): each owns its tables, server functions and route folder.
- All UI text in pt-BR, kept in one strings module so wording stays consistent; dates formatted pt-BR.
- Desktop and mobile are both first-class (see section 9).

## 2. Branches and identities

Playable branches: Divisão de Reconhecimento and Polícia Militar. Guarnição exists only as narrative content (lore/NPCs), never selectable for player characters.

Three visual identities, same institution:
- Arquivo Central (neutral) — login, lore, forum OOC, shared areas.
- Divisão de Reconhecimento — applied to Reconhecimento dossiers and branch areas.
- Polícia Militar — applied to PM dossiers and branch areas.

## 3. Pages (pt-BR routes)

Public: `/` — archive cover with seal and sign-in.

Signed in:
- `/meu-dossie` — the player's own single character, full view of what they are cleared for.
- `/soldados` — roster of player characters: only name, age, facecard and branch.
- `/soldados/$id` — same four fields for other players; full dossier only for owner, GM, admin.
- `/figuras` — NPCs and Figuras Icônicas, separate from player characters, per-entry visibility.
- `/arquivo` — world/lore, nested entries.
- `/habilidades` and `/habilidades/arvore` — skill compendium and tree.
- `/forum/ic` and `/forum/ooc` — separate In Character and Out of Character areas.
- `/confidencial` — secret entries the user is cleared for.
- `/comando` (GM/Admin) — visual admin center: dossiers, NPCs, skills, lore, groups, users, approvals queue.

## 4. Authentication

Email + password. No open self-approval: new accounts start as pending and an administrator activates them and links them to their character. Session-gated route group.

## 5. Permissions

Platform roles (separate `user_roles` table, never on profiles): Jogador, Mestre, Administrador. Checked server-side via a security-definer function.

Secret narrative memberships are a separate system: `secret_groups` (Marley, Reiss, Ackermann, others) + `secret_group_members`. Membership grants reading access to group material only; it never grants platform powers.

Access layers combined per record: role (Mestre/Admin), ownership (own character), secret-group membership, explicit per-user grant. Visibility levels: `publico`, `dono`, `grupo`, `concedido`, `mestre`.

Hard guarantees:
- Players cannot insert/update roles, memberships, grants, account status or approval state — no write policies for them on those tables.
- Branch, official dossier fields and publication status are writable only by admins.
- Direct URLs and API calls return nothing unauthorized, since filtering happens in the database.
- Public roster served from a restricted view/function exposing only name, age, facecard, branch.

## 6. Data model (outline)

- `profiles` — display name, account status (pendente/ativo/suspenso).
- `user_roles` — user + role.
- `secret_groups`, `secret_group_members`.
- `characters` — one per player (unique owner), name, age, branch (reconhecimento | policia_militar), facecard, status.
- `character_fields` — flexible blocks (label, body, order, visibility, group) for biography, equipment, affiliations, development, secrets.
- `npcs` — NPCs and Figuras Icônicas (type, branch incl. Guarnição, fields with visibility).
- `skills`, `character_skills`, `skill_tree_nodes`, `skill_tree_edges` — descriptive only: requirements, narrative effects, restrictions, visibility.
- `lore_entries` — nested, with visibility.
- `forum_boards` (area: ic | ooc, optional group restriction), `threads`, `posts`.
- `submissions` — any future player-proposed content: status pendente/aprovado/rejeitado; only admins approve and publish into official tables.
- `access_grants`, `audit_log`.

No stat, HP, damage, percentage or roll columns anywhere.

## 7. Public vs confidential

Separate fetchers per entity: public (safe columns) and cleared. Lists and search never include secret fields. Classified blocks render only when the server response contains them; otherwise a redacted placeholder shows without the real text.

## 8. Admin interface (no code needed)

Visual forms inside the archive style: create/edit dossiers field by field, set each field's visibility with a selector, upload facecards, manage NPCs, skills and tree connections (drag nodes), lore, groups and memberships, activate users, assign roles, review the approvals queue. Every action validated server-side as admin.

## 9. Visual system

Shared base: dark archive room, aged parchment documents, ink rules, double borders, seals, stamps, dossiers, paper grain, fold creases, square corners. No SaaS navbars, gradients, glass or floating rounded cards.

Department variations (same structure, different institutional details):
- Arquivo Central — neutral sepia paper, black ink, brass seal, general registry stamps.
- Reconhecimento — field-worn paper, oxidized green ink accents, Asas da Liberdade seal, expedition report forms, map-grid underlays.
- Polícia Militar — crisp official stationery, deep ink and royal-seal red wax, unicorn crest, bureaucratic form layouts, stricter ruled grids.

Each identity is a token set (paper, ink, accent, seal, stamp artwork, form template) applied by context, so they read as departments, not color swaps.

Mobile: dossier as a stacked file you swipe through tab by tab, bottom filing-tab bar for navigation, full-width document sheets, seals and stamps scaled for touch, forum as a letter thread. Desktop: filing-cabinet side rail, open dossier spread across two pages.

## 10. Typography

Old-style display serif for headings, highly readable serif for body, condensed uppercase face for labels and stamps, handwritten script only for signatures and GM notes. All fonts with full Portuguese accent support.

## 11. Animation

Subtle and physical: dossier opens, pages slide and settle between tabs, ink fades in on headings, stamps land on classified panels, wax seals crack on reveal, redacted bars wipe away after clearance, lore unfolds like a letter, department switch like a new folder placed on the desk. Touch-friendly swipe transitions on mobile. Slow easing, no bounce, respects reduced-motion.

## 12. Implementation order

1. Foundation: pt-BR strings, base archive tokens, fonts, textures, core document components, responsive shell (desktop rail + mobile tab bar).
2. The three department identities as token sets on a static demo dossier.
3. Cloud backend, auth, profiles, roles, account activation.
4. Characters: one per player, restricted roster view, own dossier.
5. Admin visual editor for dossiers and users.
6. Secret groups, visibility system, grants, confidential area.
7. NPCs and Figuras Icônicas.
8. Skills compendium, then skill tree.
9. Lore archive.
10. Forum IC/OOC.
11. Submissions + approval queue (if adopted), audit log.
12. Animation polish, search, mobile refinement pass.

## 13. Cost control

Lock tokens, strings module and document components early. Define the visibility pattern once and reuse it for every table. One section per phase. Seed real sample content early.

## 14. Risks

- Inconsistent visibility rules — one shared policy helper.
- Leaks via roster, lists or search — restricted view and explicit columns.
- Identities drifting into color swaps — shared component structure, differing only in institutional artifacts.
- Textures hurting mobile performance/readability — light overlays.
- Skill tree on small screens — mobile shows a vertical path view instead of the full graph.

## 15. Decisions before building

- Do players edit anything on their dossier (e.g. development notes) as submissions, or is everything admin-only?
- Can IC forum boards be restricted by branch or secret group?
- Account onboarding: admin creates accounts, or players register and wait for activation?

## 16. First vs later

First: foundation, identities, auth, roles, characters, admin editor, visibility.
Later: skill tree, forum, submissions, audit log, search, notifications, session timeline.
