---
title: Project Design
permalink: /design/
# Paste the share link from screencast.com here.
video: https://app.screencast.com/4SC3iexlshLzS
# A picture or short video of your design. Upload it to assets/images first.
schematic: /assets/images/schematic.png
# Optional one-line caption under the schematic.
schematic_caption: The Terminator
---

The Terminator is our solution for getting rid of cane toads. It attracts cane toad tadpoles using dead tadpoles as the bait. When it catches more tadpoles, those become the bait for the next group of tadpoles.

<style>
  .design-figure { margin: 0 0 1rem; text-align: center; }
  .design-figure img,
  .design-figure video { display: block; max-width: 100%; margin: 0 auto; }
  .design-figure video { max-width: 480px; width: 100%; }
  .design-figure figcaption { font-size: 0.9em; color: var(--text-muted); margin-top: 0.5rem; }
  /* The shared theme sets iframe { height: auto }, which collapses a bare iframe.
     Wrap the player in a 16:9 box and fill it. */
  .design-video { aspect-ratio: 16 / 9; width: 100%; margin: 0 0 0.75rem; }
  .design-video iframe { width: 100%; height: 100%; border: 0; }
</style>

{% if page.schematic %}
## Schematic

<figure class="design-figure">
  {% if page.schematic contains '.mp4' %}
  <video src="{{ page.schematic | relative_url }}" autoplay loop muted playsinline controls>
    Your browser can't play this video. <a href="{{ page.schematic | relative_url }}">Download it</a> instead.
  </video>
  {% else %}
  <a href="{{ page.schematic | relative_url }}">
    <img src="{{ page.schematic | relative_url }}" alt="{{ site.title }} robot schematic">
  </a>
  {% endif %}
  {% if page.schematic_caption %}<figcaption>{{ page.schematic_caption }}</figcaption>{% endif %}
</figure>
{% endif %}

{% if page.video %}
## Video

{% assign video_id = page.video | split: '/' | last %}
<div class="design-video">
  <iframe src="https://app.screencast.com/connector/embed/index/{{ video_id }}" title="{{ site.title }} project video" allowfullscreen loading="lazy"></iframe>
</div>

<p><a href="{{ page.video }}">Watch on Screencast &rarr;</a></p>
{% endif %}
