# Team Blog Template

A ready-to-go blog for a Lansing Tech Studio robotics team. Everything is edited
in the browser at github.com — you don't need to install anything.

## Setting up your team's blog (once, at the start)

1. Log in to GitHub on your team's Chromebook, as your team account.
2. On this repo, click the green **Use this template** → **Create a new
   repository**.
3. Name it **your GitHub username followed by `.github.io`** — nothing else.
   If your account is `lts-team1`, the repo is named:

       lts-team1.github.io

   Copy your username exactly as GitHub spells it. This special name is what
   puts your blog at the top level of your own web address.
4. Set it to **Public** and click **Create repository**.
5. Check **Settings** → **Pages**. It usually turns itself on for a
   `.github.io` repo — you should see "Deploy from a branch", branch **main**,
   folder **/ (root)**. If it's not set that way, set it and click Save.
6. Open `_config.yml` and fill in the settings at the top — your team name,
   description, and your username in the two links. Commit the change.
7. Wait a minute or two, then visit your site:

   `https://YOUR-USERNAME.github.io/`

If the page loads but looks like plain text with no colors, check that
`baseurl` in `_config.yml` is still empty (`baseurl: ""`). That's the fix
almost every time.

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
