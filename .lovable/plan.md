# Arquivo Militar — Planning (final review)

A private, in-universe military archive for a narrative AoT-inspired RPG. Interface entirely in Brazilian Portuguese (pt-BR). No dice, HP, damage, percentages or numerical power scaling. Secrecy is enforced on the server and in the database, never only in the interface. Desktop and mobile are both first-class.

## 1. Architecture and portability

- TanStack Start (React + SSR), file-based routes, Tailwind design tokens.
- Backend built on standard, portable pieces: PostgreSQL (with row-level security), a standard auth service, S3-compatible file storage. Development uses Lovable Cloud for these, but nothing in the app depends on Lovable-only features; the same database, auth and storage can be moved to a self-managed or external project.
- App deployable to external hosts such as Vercel. Server logic lives in standard server functions/routes; secrets read from environment variables; no Lovable-specific runtime APIs.
- All schema changes kept as versioned SQL migration files in the repository, so the database can be recreated anywhere.
- Thin data-access layer (one module per section) isolates backend calls, so a provider change touches one place.
- Modular sections: dossiês, soldados, figuras, arquivo, habilidades, fórum, confidencial, comando. All UI strings in one pt-BR module.

## 2. Branches and identities

Playable: Divisão de Reconhecimento and Polícia Militar. Guarnição exists only as narrative content (lore, NPCs) and can never be assigned to a player.

Three identities of the same institution:
- Arquivo Central (neutral) — login, lore, OOC forum, shared areas, admin panel.
- Divisão de Reconhecimento — Reconhecimento dossiers, boards and areas.
- Polícia Militar — PM dossiers, boards and areas.

## 3. Pages (pt-BR)

Public: `/` — archive cover with seal and sign-in. No registration page.

Signed in:
- `/meu-dossie` — the player's single character, everything they are cleared for.
- `/soldados` — roster of players: only name, age, facecard, branch.
- `/soldados/$id` — those four fields for others; full dossier only for owner and admin.
- `/figuras` — NPCs and Figuras Icônicas, separate sub-sections, per-entry visibility.
- `/arquivo` — lore and worldbuilding.
- `/habilidades`, `/habilidades/arvore` — compendium and skill tree.
- `/forum/ic`, `/forum/ooc` — separate areas; IC boards may be restricted.
- `/confidencial` — secret entries the user is cleared for.
- `/comando` — Administrator panel (section 8).

## 4. Authentication

Invitation-only email + password. No public signup (disabled at the auth-service level, not just hidden). The Administrator creates the account from the panel, the player receives an invite link to set a password, and the admin links the account to its character. Accounts can be suspended, which blocks sign-in and all data access.

## 5. Permissions

Platform roles (separate `user_roles` table): Jogador, Administrador. The Administrator is also the Game Master and has full narrative and platform control.

Secret narrative groups (Marley, Reiss, Ackermann, others) are a separate system: `secret_groups` + `secret_group_members`. Membership grants reading access to that group's material only, never platform powers.

Per-record access combines: Administrador (everything), ownership (own character), branch, secret-group membership, individual grant. Visibility levels: `publico`, `dono`, `ramo`, `grupo`, `concedido`, `admin`.

Hard guarantees:
- Players have no write access to roles, memberships, grants, account status, branch or any dossier content.
- Players can only write their own forum posts in boards they can access.
- Direct URLs and API calls return nothing unauthorized, since filtering happens in the database.
- The roster comes from a restricted view exposing only name, age, facecard and branch.
- Admin actions are re-verified on the server on every request.

## 6. Data model (outline)

- `profiles` — display name, account status (convidado/ativo/suspenso).
- `user_roles`.
- `secret_groups`, `secret_group_members`.
- `characters` — one per player (unique owner), name, age, branch, facecard, archived flag.
- `character_fields` — flexible blocks (label, body, order, visibility, group/branch) for biography, equipment, affiliations, development, secrets.
- `npcs` — type (NPC / Figura Icônica), branch incl. Guarnição, fields with visibility.
- `skills`, `character_skills`, `skill_trees`, `skill_tree_nodes` (position), `skill_tree_edges` — descriptive only: requirements, narrative effects, restrictions.
- `lore_entries` — nested, with visibility.
- `forum_boards` (area ic/ooc, optional branch and/or group restriction), `threads`, `posts` (moderation flags).
- `access_grants`, `audit_log`.
- Archived flag on all content tables for archive/restore instead of hard delete.

No submission/approval workflow (changes requested via Discord, applied by the admin). No stat, HP, damage, percentage or roll columns.

## 7. Public vs confidential

Separate fetchers per entity: public (safe columns) and cleared. Lists and search never carry secret fields. Uncleared content shows a redacted placeholder without the real text ever reaching the browser.

## 8. Administrator panel (no code, no database access)

Styled as the Arquivo Central command office, fully usable on desktop and mobile. Simple forms, clear pt-BR labels, confirmation before destructive actions.

- Contas: invite, activate, suspend, remove players; link account to character.
- Dossiês: create, edit, archive/restore, delete; assign branch; add/reorder fields; visibility selector per field; upload/replace facecards and media.
- Figuras: manage NPCs and Figuras Icônicas the same way.
- Habilidades: create/edit/remove skills; assign to characters.
- Árvores: visual editor to add, remove, drag-reposition and connect nodes.
- Arquivo: lore entries with rich text and images.
- Grupos secretos: create groups, add/remove members.
- Confidencial: manage classified entries and individual access grants.
- Fórum: create boards, set IC/OOC and branch/group restrictions, lock/pin/move/delete threads and posts.
- Registro: audit log of sensitive actions.

Only infrastructure tasks (deploy, backups, migrations, secrets) need developer access.

## 9. Visual system

Shared base: dark archive room, aged parchment, ink rules, double borders, seals, stamps, dossiers, paper grain, fold creases, square corners. No SaaS navbars, gradients, glass or floating rounded cards.

Department variations (same components, different institutional artifacts):
- Arquivo Central — neutral sepia paper, black ink, brass registry seal.
- Reconhecimento — field-worn paper, oxidized green accents, Asas da Liberdade seal, expedition report forms, map-grid underlays.
- Polícia Militar — crisp official stationery, royal-red wax, unicorn crest, strict bureaucratic forms.

Mobile: dossier as a stacked file swiped tab by tab, bottom filing-tab navigation, full-width sheets, touch-sized seals and stamps, vertical skill-path view. Desktop: filing-cabinet side rail, dossier opened as a two-page spread.

## 10. Typography

Old-style display serif for headings, readable serif for body, condensed uppercase face for labels/stamps, handwritten script only for signatures and admin annotations. Full Portuguese accent support.

## 11. Animation

Dossier opening, pages sliding between tabs, ink fading in, stamps landing on classified panels, wax seals cracking on reveal, redaction wiping away after clearance, lore unfolding like a letter, new folder placed on the desk when changing department. Swipe transitions on mobile. Slow easing, no bounce, respects reduced-motion.

## 12. Implementation order

1. Foundation: pt-BR strings, base tokens, fonts, textures, core document components, responsive shell.
2. Three department identities on a static demo dossier.
3. Backend setup with migrations, auth (invite-only), profiles, roles, account status.
4. Admin panel shell + account management.
5. Characters: one per player, restricted roster, own dossier, admin dossier editor with field visibility and media upload.
6. Secret groups, grants, confidential area.
7. NPCs and Figuras Icônicas (+ admin).
8. Skills and visual skill-tree editor.
9. Lore archive (+ admin).
10. Forum IC/OOC with restrictions and moderation.
11. Audit log, archive/restore everywhere, search.
12. Animation polish, mobile pass, deployment guide for an external host.

## 13. Cost control

Lock tokens, strings and document components early. One reusable visibility pattern and one reusable admin form pattern for every section. One section per phase. Seed real sample content early.

## 14. Risks

- Inconsistent visibility rules — one shared policy helper.
- Leaks via roster, lists or search — restricted view, explicit columns.
- Identities becoming color swaps — shared structure, differing artifacts.
- Admin panel growing complex — consistent form layout across all sections.
- Provider lock-in — portable SQL migrations, standard env configuration, isolated data layer.
- Mobile performance with textures — light overlays.

## 15. Decisions before building

- Invite delivery: email invite link, or admin sets an initial password and shares it via Discord?
- Should forum posts be editable/deletable by their authors?
- Should the audit log record every view of classified content, or only admin changes?

## 16. First vs later

First: foundation, identities, auth, roles, admin accounts, characters with dossier editor, visibility.
Later: skill-tree editor, forum, search, audit log, notifications, session timeline, deployment to external host.
