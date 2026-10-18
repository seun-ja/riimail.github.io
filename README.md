# The RiiMail Book

Documentation for [RiiMail](https://github.com/seun-ja/rii-mail), published with GitHub Pages at [seun-ja.github.io/riimail.github.io](https://seun-ja.github.io/riimail.github.io/).

The site uses the Jekyll build included with GitHub Pages. Content is written in Markdown, while `_layouts/book.html`, `_includes/sidebar.html`, and the files under `assets/` provide the book-style reading experience.

## Add a chapter

1. Create a Markdown page with `title`, `section`, and previous/next navigation in its front matter.
2. Add the chapter to `_includes/sidebar.html`.
3. Add its title and search terms to `assets/js/book.js`.

Pushes to the repository's publishing branch are built and hosted by GitHub Pages.
