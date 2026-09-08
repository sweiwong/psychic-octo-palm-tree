# Tang notes pilot

Wei approved starting the proposed Obsidian-compatible pilot with Tang.

Scope: ten existing cards: Tang, Xuanwu Gate, Zhenguan government, Xuanzang’s return, Wu Zhou, Kaiyuan, Talas, An Lushan, Two-Tax reform, and Li Bai and Du Fu. Keep all 221 card IDs and existing historical records. Do not publish or push.

1. Write failing tests for reading note properties, paragraphs, sections and native filename links. Build a small compiler with a standard YAML reader. Unsupported note structures must fail with the filename.
2. Write a failing integration check. Move these ten reader-facing revisions into notes and generate the existing editorial pack shape. Browser and export must consume identical generated content. Remove the migrated prose from the old editing source.
3. Add meaningful links to existing references, without new historical claims. Check every pilot note has outgoing and incoming links. Test the real Tang-to-event-to-backlink journey on desktop and phone, preservation of dates/sources/images, and all 221 card identities.

The pilot moves titles, introductions, sections, notes and aliases. Audited dates, Chinese names, sources, images and timeline layout remain in their existing research files. Notes are authoritative for migrated prose. The generated JavaScript is a local build output, not an editing source.

Use one folder with stable card-ID filenames. Frontmatter contains `title`, `link-title` (stable existing identity), and optional `aliases`. Body paragraphs form the introduction, `##` headings form sections, and optional final `## Note` holds the existing caveat. Native filename links compile to the atlas’s existing stable-ID links. Notes can be opened as a folder in Obsidian; no synchronization or application install is part of this pilot.
