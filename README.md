# SB-HPC Guidelines

Source of the StrubiOS guidelines for EM data processing on the SB-HPC cluster, published at
<https://kischnelle.github.io/SB-IT/>.

The site is built with [MkDocs](https://www.mkdocs.org/) and
[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/). Pages are Markdown files in
[`docs/`](docs/); navigation and settings live in [`mkdocs.yml`](mkdocs.yml).

## Preview locally

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/mkdocs serve
```

Then open <http://127.0.0.1:8000/SB-IT/>. The preview reloads when you save a file.

## Add or change a page

1. Create or edit a Markdown file in `docs/` (software pages go in `docs/software/`).
2. For a new page, add it to the `nav:` section of `mkdocs.yml`.
3. Link to other pages by their `.md` file, e.g. `[SSH tunnels](ssh_tunnels.md)`.

Useful building blocks — see the Material documentation for details:

- Admonitions: `!!! note`, `!!! tip`, `!!! warning`, `!!! danger`
- Tabs: `=== "macOS / Linux"` (tabs with the same label switch together across the site)
- Keyboard keys: `++ctrl+c++`
- Shared text blocks live in [`includes/`](includes/) and are inserted with `--8<-- "file.md"`
- Hover explanations for abbreviations: add a line to [`includes/abbreviations.md`](includes/abbreviations.md)

## Checks

Every push and pull request runs [`.github/workflows/docs.yml`](.github/workflows/docs.yml):

- `mkdocs build --strict` — fails on broken internal links, anchors and nav entries
- [codespell](https://github.com/codespell-project/codespell) — spelling; add false positives to
  `ignore-words-list` in [`.codespellrc`](.codespellrc)
- [lychee](https://github.com/lycheeverse/lychee) — external links (also weekly)

Run the first two locally with:

```bash
.venv/bin/mkdocs build --strict
.venv/bin/pip install codespell && .venv/bin/codespell
```

Pushes to `main` deploy the site to GitHub Pages (repository settings: *Pages → Source: GitHub Actions*).
Dependencies and workflow actions are pinned; Dependabot proposes updates monthly.
