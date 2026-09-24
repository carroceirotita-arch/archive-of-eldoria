# Archive of Eldoria

I want to plan a private web application for a narrative RPG inspired by the universe of Shingeki no Kyojin (Attack on Titan).



IMPORTANT: DO NOT IMPLEMENT THE APPLICATION YET.



At this stage, analyze the project, identify the necessary architecture, propose the data structure, access-control model, page structure, reusable components, visual system, and implementation phases.



The goal of this planning phase is to establish a solid foundation before any actual implementation begins.



---



PROJECT PURPOSE



The application will function as a central private forum and archive for RPG players.



Players should eventually be able to access different sections related to their characters and the RPG universe, including:



- Character sheets

- Worldbuilding and lore

- Skill trees

- Skill descriptions and mechanics

- Player interaction/forum sections

- Character-specific information

- Secret information associated with certain characters

- Hidden factions, bloodlines, organizations, or affiliations

- Master-only information and administrative content



The application should feel like an immersive in-universe archive rather than a conventional modern web application.



---



SECRET AND PRIVATE INFORMATION



Some characters may possess information that MUST NOT be accessible to other players.



Examples include secret affiliations or characteristics such as:



- Marley

- Ackermann

- Secret organizations

- Hidden bloodlines

- Other confidential information defined by the Game Master



This information must be protected through REAL authorization and access control.



DO NOT simply hide secret information from the interface.



The underlying data and routes must be protected so unauthorized users cannot access confidential information even if they attempt to access the relevant page directly.



The architecture should support different permission levels, for example:



- Player

- Authorized Player

- Faction/Group-specific Player

- Game Master

- Administrator



The system should be designed so that individual pieces of information can be restricted to specific users, groups, factions, or roles.



---



RPG SYSTEM



This RPG DOES NOT use dice or numerical rolls to determine actions.



DO NOT create:



- d20 systems

- Dice rolls

- Hit chance percentages

- Automatic damage calculations

- HP systems

- Numerical combat calculations

- Automated power calculations



The RPG uses a NARRATIVE resolution system.



Actions are resolved according to:



- The Game Master's judgment

- The player's description of their action

- The context of the scene

- The character's abilities

- The character's established skills

- The circumstances of the situation



Power scaling should also remain primarily narrative.



The relative strength of characters should be determined through the Game Master's judgment, the established narrative context, character descriptions, and their respective skills.



Therefore, this application should primarily function as a:



- Roleplaying platform

- Character archive

- Worldbuilding database

- Skill/reference system

- Private information management system

- Player interaction/forum



It should NOT become an automated RPG combat engine.



---



VISUAL IDENTITY — CRITICAL REQUIREMENT



The application MUST NOT use the typical modern SaaS, corporate dashboard, or generic AI-generated web application aesthetic.



This is one of the highest-priority requirements of the project.



The interface should feel like an IN-UNIVERSE MILITARY ARCHIVE.



The visual direction should combine elements inspired by:



- Aged military documents

- Historical letters

- Confidential archives

- Weathered paper

- Old parchment

- Handwritten manuscripts

- Physical character dossiers

- Military records

- Wax seals

- Official stamps

- Ornamental borders

- Serif and archaic typography

- Subtle paper textures

- Ink marks

- Classified documents

- Historical military bureaucracy

- Dark and atmospheric archival environments



The user should feel as if they are physically opening and reading an old military document from the RPG world.



The interface may use modern web technology internally, but its VISUAL PRESENTATION must NOT look like a modern corporate web application.



---



STRICTLY AVOID



DO NOT use:



- Generic SaaS dashboards

- Corporate UI patterns

- Generic white cards

- Modern gradient backgrounds

- Excessive rounded corners

- Generic modern navigation bars

- Generic admin-panel layouts

- Excessive minimalist design

- Modern startup aesthetics

- Generic Tailwind-style dashboard appearance

- Floating cards that look disconnected from the world

- Excessive glassmorphism

- Futuristic UI elements

- Generic "AI-generated website" aesthetics



Do not simply place a serif font on top of a modern dashboard and consider the visual requirement fulfilled.



The ENTIRE DESIGN LANGUAGE must support the historical military archive concept.



---



INTERACTION AND ANIMATION



The interface must feel dynamic and immersive.



Every major navigation tab or important section opened by the user should have at least one meaningful animation or transition.



Animations should reinforce the concept of physical documents and archival material.



Possible examples include:



- Documents sliding into view

- Pages turning

- Dossiers opening

- Files being unfolded

- Ink appearing gradually

- Stamps appearing on documents

- Seals being revealed

- Paper-like transitions

- Sections unfolding like archival folders

- Subtle document movement

- Confidential information being revealed through an appropriate transition



Animations should be atmospheric, subtle, and purposeful.



DO NOT make the interface feel like a flashy modern animation showcase.



The animations should enhance immersion and usability.



---



TYPOGRAPHY



Typography is an important part of the identity.



The design should explore combinations of:



- Historical serif fonts

- Old-style serif typography

- Editorial/document typography

- Handwritten or calligraphic accents where appropriate



However, readability must remain excellent.



Avoid excessive decorative typography for large amounts of body text.



The typography should make the application resemble an old military archive while remaining practical for extended reading.



---



INFORMATION ARCHITECTURE



The future application should be structured around clearly separated sections.



At minimum, consider:



1. Character Sheet

2. World / Lore

3. Skill Tree

4. Skills

5. Forum / Player Interaction

6. Secret Information

7. Game Master / Administration



The final architecture may modify this structure if a better organization is identified during planning.



---



CHARACTER SHEETS



Character sheets should eventually support information such as:



- Character identity

- Background

- Biography

- Skills

- Abilities

- Equipment

- Affiliations

- Character development

- Narrative information

- Private information

- Secret information



The architecture should allow the Game Master to determine which fields are public and which are private.



---



SKILL SYSTEM



The skill system should eventually allow characters to have individual skills and abilities.



Skills should be represented descriptively rather than through arbitrary numerical power values.



The architecture should support:



- Skill name

- Description

- Requirements

- Narrative effects

- Restrictions

- Character ownership

- Skill categories

- Skill progression

- Potential hidden or restricted skills



A skill tree should visually communicate progression and relationships between abilities without turning the system into a numerical RPG progression system.



---



SECURITY AND ACCESS CONTROL



Treat privacy as an architectural requirement rather than a visual feature.



Plan for:



- Authentication

- User accounts

- Roles

- Permissions

- Group/faction-based access

- User-specific private information

- Game Master-only information

- Protected routes

- Protected database records



Secret information must not be exposed through client-side data even if the corresponding UI element is hidden.



---



PLANNING REQUIREMENTS



For this planning phase, provide:



1. Recommended overall application architecture

2. Recommended page/section structure

3. Authentication strategy

4. Authorization and permission model

5. Database/data model

6. Separation between public and confidential information

7. Recommended reusable components

8. Visual design system

9. Typography strategy

10. Animation and transition strategy

11. Recommended implementation order

12. How to minimize development cost and avoid unnecessary rework

13. Potential architectural risks

14. Decisions that should be made before implementation

15. Which parts should be implemented first and which should be postponed



Prioritize a modular architecture so the application can grow without requiring major rewrites.



---



DEVELOPMENT STRATEGY



Because this project will be developed incrementally, recommend an implementation sequence that minimizes unnecessary AI generation and reduces the risk of breaking existing functionality.



Do NOT attempt to build everything at once.



The future implementation should be divided into logical phases such as:



- Foundation

- Visual identity

- Navigation

- Authentication

- Database

- Permissions

- Character system

- Skills

- Secret information

- Forum

- Animation and polish



Adjust these phases if you believe a better development sequence exists.



---



FINAL INSTRUCTION



Again: DO NOT IMPLEMENT THE APPLICATION YET.



This is a PLANNING request.



Analyze the requirements carefully and return a structured technical and design plan that can later be converted into small, controlled implementation prompts.



The visual identity, narrative RPG philosophy, and secure handling of secret information are core requirements and must not be treated as optional features.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f3cf529e-00c3-4362-9c7a-709367c48bc2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
