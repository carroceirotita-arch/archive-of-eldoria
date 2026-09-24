# Survey Corps Archive — Planning

A private, in-universe military archive for a narrative AoT-inspired RPG. No dice, no HP, no combat math. Secrecy is enforced in the database, not in the interface.

## 1. Architecture

- TanStack Start (React + SSR) with file-based routes; Tailwind design tokens for the archive look.
- Lovable Cloud (Postgres + Auth + Storage) for accounts, data, and file uploads (portraits, map scans).
- Every read of sensitive data goes through server functions that act as the signed-in user; row-level security decides what comes back. The browser never receives rows it may not see.
- Modular by section: characters, lore, skills, forum, admin — each with its own tables, server functions, and route folder, so a later phase never rewrites an earlier one.

## 2. Pages

Public (no login): a single gate page — archive cover with a seal and a sign-in panel.

Behind login:
- `/dossiers` — character index (cards as filed folders), `/dossiers/$id` with tabs: Identity, Biography, Skills, Equipment, Affiliations, Development, Classified.
- `/archive` — world/lore, nested entries (regions, history, factions, titans), search.
- `/skills` — skill compendium with categories and filters.
- `/skills/tree` — skill tree per character/discipline; nodes and connecting lines on parchment, states: known / available / rumored / locked.
- `/forum` — boards → threads → posts, in-character and out-of-character boards.
- `/classified` — entries the current user is cleared for (their own secrets, faction files).
- `/command` (GM/Admin only) — user and clearance management, secret authoring, faction membership, content moderation.

## 3. Authentication

Email + password, invitation-driven (GM creates accounts or approves requests). No public signup. Session-gated route group; login redirects to the dossier index.

## 4. Permissions

Roles in a separate `user_roles` table (never on the profile): `player`, `gm`, `admin`. Checked server-side through a security-definer function.

Four access layers, combined:
1. Role — GM/admin see everything.
2. Ownership — a player always sees their own character's private fields.
3. Faction/group membership — `groups` + `group_members` (Marley, Ackermann, secret orders...).
4. Explicit grant — GM can grant a single user access to a single entry.

Every protected record carries a visibility level (`public`, `owner`, `group`, `granted`, `gm_only`). Row-level policies evaluate it; a direct URL or API call by an uncleared user returns nothing.

## 5. Data model (outline)

- `profiles` — display name, avatar, rank flavor text.
- `user_roles` — user + role.
- `groups`, `group_members` — factions/bloodlines/organizations; groups themselves can be secret.
- `characters` — owner, name, public summary, portrait, status.
- `character_fields` — flexible field blocks (label, body, order, visibility, owning group) so the GM decides per-field what is public, private, or classified.
- `skills` — name, category, description, requirements, narrative effects, restrictions, visibility.
- `character_skills` — link + state (known/in progress) + GM notes.
- `skill_tree_nodes`, `skill_tree_edges` — position and prerequisites, no points or numbers.
- `lore_entries` — nested lore with visibility.
- `forum_boards`, `threads`, `posts` — boards can be group-restricted.
- `access_grants` — user + target record, for one-off clearances.
- `audit_log` — who opened which classified record.

No stat, HP, damage, or roll columns anywhere.

## 6. Public vs confidential

Two separate read paths per entity: a public fetcher (safe columns only) and a cleared fetcher. Lists never join secret fields "just in case". Classified blocks render only after a server response actually contains them.

## 7. Reusable components

DocumentSheet (paper panel with torn/aged edges), DossierFolder (index card), StampBadge (APPROVED / CLASSIFIED / DECEASED), WaxSeal (reveal trigger for secrets), RedactedBlock (blacked-out bar for content you lack clearance for), TypewriterHeading, ArchiveTabs (folder tabs), LedgerTable, InkDivider, FieldEntry (label + handwritten value), ThreadLetter (forum post as a letter), SkillNode, ClearanceGate.

## 8. Visual system

Dark archive room background (near-black brown) with warm parchment panels lit like a desk lamp. Ink black, faded sepia, oxidized military green, dried-blood red for classified marks, brass for seals. Paper grain, coffee rings, fold creases, faint ruled lines. Square or barely-softened corners, hairline ink rules and double borders instead of shadows and cards. No gradients, no glass, no rounded floating cards, no top SaaS navbar — navigation is a filing-cabinet rail with tabbed dividers. All colors as tokens in the stylesheet.

## 9. Typography

Headings in an old-style display serif (e.g. Cormorant / IM Fell style), body in a highly readable transitional serif at generous size and line height, labels and stamps in a condensed uppercase letter-spaced face, occasional handwritten script for GM annotations and signatures only. Never script for body text.

## 10. Animation

Motion for React, subtle and physical: dossier folder opens on entering a character, pages slide and settle when switching tabs, ink fades in on headings, a stamp thuds onto classified panels, wax seal cracks when a secret is unsealed, redacted bars wipe away when clearance is confirmed, lore entries unfold like a letter. Slow easing, no bounce, respects reduced-motion.

## 11. Implementation order

1. Foundation + visual identity: tokens, fonts, textures, core document components, one static demo dossier.
2. Navigation shell and route skeleton with placeholder pages.
3. Cloud backend + authentication + profiles + roles + login gate.
4. Characters: sheets with public/private fields, owner and GM editing.
5. Groups/factions and the full visibility system, including redacted and grant flows.
6. Skills compendium, then the skill tree view.
7. Lore archive.
8. Forum.
9. Classified hub + audit log + GM command center.
10. Animation polish, search, mobile refinement.

## 12. Cost control and avoiding rework

Lock the design tokens and document components in phase 1 and reuse them everywhere. Decide the visibility model once (phase 3) and apply the same pattern to every table afterwards. Keep each phase to one section so a change never touches the rest. Seed a few real characters early to test layouts against real text.

## 13. Risks

- Visibility rules spread inconsistently across tables — mitigated by one shared policy pattern and helper function.
- Leaking secrets through list endpoints or search — mitigated by separate fetchers and explicit column lists.
- Heavy textures hurting readability or mobile performance — keep textures as light repeating overlays.
- Skill tree layout complexity — start with a curated manual layout, not an auto-graph engine.
- Flexible character fields becoming chaotic — GM-defined templates per character type.

## 14. Decisions needed before building

- Interface language: Portuguese, English, or both?
- Who creates characters: players (GM approves) or GM only?
- Forum: in-character roleplay scenes, out-of-character chatter, or both?
- Does each player have one character or several?
- Should players see other players' public sheets, or only their own plus GM-published ones?

## 15. First vs later

First: visual identity, navigation, auth, character sheets, visibility model.
Later: skill tree visualization, forum, audit log, search, notifications, timeline of sessions, image uploads at scale.
