# Team 2 - Terminators

<https://lhh-team2.github.io/>

## Writing a post

Open the `_posts` folder and copy `TEMPLATE-copy-this-file.md` — step-by-step
instructions are at the top of that file.

The one rule that trips everyone up: **the file name must start with the date**,
like `2026-08-15-we-built-the-arm.md`. A post without a date in its file name
just won't show up, and GitHub won't warn you.

## Adding pictures

Upload images into `assets/images` (**Add file** → **Upload files**), then link
to one in a post like this:

```markdown
![Our robot arm](/assets/images/robot-arm.jpg)
```

Keep photos under a few MB each — phones take much bigger pictures than a
website needs.

## Where the design comes from

The layouts and styling live in a shared repo,
[lts-team-blog-theme](https://github.com/Lansing-Tech-Studio/lts-team-blog-theme),
pulled in by the `remote_theme` line in `_config.yml`. That's why there's no CSS
in here. When the shared design is improved, your site picks it up the next time
you publish a post — you never have to merge anything.

You can still override any of it: a file you add here wins over the theme's copy.

## Previewing on your own computer (optional)

Not needed for normal use — committing on github.com publishes the site. But if
you want to see changes before they go live and you have Ruby installed:

```bash
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000/
