---
title: Gallery
permalink: /gallery/
---

<style>
  .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; }
  .gallery img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; border-radius: 6px; }
  .gallery figure { margin: 0; }
  .gallery figcaption { font-size: 0.9em; text-align: center; }
  #lightbox { max-width: 95vw; max-height: 95vh; padding: 0; border: none; background: none; }
  #lightbox::backdrop { background: rgba(0, 0, 0, 0.85); }
  #lightbox img { max-width: 95vw; max-height: 95vh; display: block; cursor: zoom-out; }
  #lightbox button { position: fixed; top: 50%; transform: translateY(-50%); font-size: 2.5em; padding: 0 0.3em; border: none; border-radius: 6px; background: rgba(0, 0, 0, 0.5); color: white; cursor: pointer; }
  #lightbox .prev { left: 8px; }
  #lightbox .next { right: 8px; }
</style>

{% assign images = site.static_files | where_exp: "f", "f.path contains '/assets/images/'" | where_exp: "f", "f.name != '.gitkeep'" %}
<div class="gallery">
{% for image in images %}
  <figure>
    <a href="{{ image.path | relative_url }}">
      <img src="{{ image.path | relative_url }}" alt="{{ image.basename | replace: '-', ' ' }}" loading="lazy">
    </a>
    <figcaption>{{ image.basename | replace: '-', ' ' }}</figcaption>
  </figure>
{% endfor %}
</div>

<dialog id="lightbox">
  <button class="prev" aria-label="Previous image">&lsaquo;</button>
  <img alt="">
  <button class="next" aria-label="Next image">&rsaquo;</button>
</dialog>

<script>
  const box = document.getElementById('lightbox');
  const big = box.querySelector('img');
  const links = [...document.querySelectorAll('.gallery a')];
  let current = 0;

  function show(i) {
    current = (i + links.length) % links.length;
    big.src = links[current].href;
    big.alt = links[current].querySelector('img').alt;
  }

  links.forEach((link, i) => link.addEventListener('click', (e) => {
    e.preventDefault();
    show(i);
    box.showModal();
  }));
  box.querySelector('.prev').addEventListener('click', (e) => { e.stopPropagation(); show(current - 1); });
  box.querySelector('.next').addEventListener('click', (e) => { e.stopPropagation(); show(current + 1); });
  box.addEventListener('click', () => box.close());
  box.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
</script>
