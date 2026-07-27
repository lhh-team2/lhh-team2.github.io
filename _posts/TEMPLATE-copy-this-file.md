---
title: "Put Your Post Title Here"
author: Your Name
---

<!--
════════════════════════════════════════════════════════════════
  HOW TO USE THIS FILE

  1. Click "Copy raw file" (the copy icon at the top right), or
     select everything on this page and copy it.
  2. Go to the _posts folder → "Add file" → "Create new file".
  3. Name it with today's date, then your title in dashes:

         2026-08-15-we-built-the-arm.md

     ⚠️  The date at the front is REQUIRED. Without it, your post
         will not show up on the site. Use YYYY-MM-DD.
     ⚠️  No spaces and no capital letters in the file name.

  4. Paste, then change the title and author above and write
     your post below.
  5. Scroll down, click "Commit changes".
  6. Wait about a minute, then refresh your site. Done!

  Delete this whole comment block when you're finished — every
  line from <!-- down to the arrow below.
════════════════════════════════════════════════════════════════
-->

Write your first paragraph here. This is the part that shows up as a preview on
the front page, so make it interesting!

## A heading for your first section

Regular text goes here. Leave a blank line between paragraphs or they'll squish
together into one.

You can make text **bold** or *italic*, and [link to things](https://lansingtechstudio.org).

- A bullet point
- Another bullet point
- One more

1. A numbered list
2. Second thing
3. Third thing

## Adding a picture

Upload your image to the `assets/images` folder first, then:

![Describe the picture here](/assets/images/YOUR-IMAGE.jpg)

## Adding code

Put three backticks and the word `python` above your code, and three more
backticks below it:

```python
from pybricks.pupdevices import Motor
from pybricks.parameters import Port

arm = Motor(Port.A)
arm.run_angle(500, 90)
```

## A quote or something important

> Use a `>` at the start of the line to make text stand out like this.

## Wrapping up

End with what you learned or what you're doing next time.
