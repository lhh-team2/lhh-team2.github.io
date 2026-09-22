---
title: Gallery
permalink: /gallery/
---

{% assign images = site.static_files | where_exp: "f", "f.path contains '/assets/images/'" | where_exp: "f", "f.name != '.gitkeep'" %}
{% for image in images %}
<figure>
  <img src="{{ image.path | relative_url }}" alt="{{ image.basename | replace: '-', ' ' }}" style="max-width: 100%;">
  <figcaption>{{ image.basename | replace: '-', ' ' }}</figcaption>
</figure>
{% endfor %}
