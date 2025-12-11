<?php include 'includes/content.php'; ?>
<?php include 'includes/header.php'; ?>
<!--Здесь основной код страницы-->
<div class="">
  <p class="pt-4 mt-8 mb-2 text-3xl font-extrabold text-textColorDark text-center mx-auto">
    <?php echo content_get('works.title', 'Наши работы'); ?></p>
  <p class="text-center text-textColor mb-12">
    <?php echo content_get('works.description', 'Подборка выполненных проектов и примеров материалов.'); ?></p>
  <div class="gallery-image grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <?php include __DIR__ . '/includes/db.php';
    $page = max(1, (int) ($_GET['page'] ?? 1));
    $perPage = 18;
    $offset = ($page - 1) * $perPage;
    $items = [];
    $total = 0;
    try {
      $total = (int) $pdo->query('SELECT COUNT(*) AS c FROM works')->fetch()['c'];
      $stmt = $pdo->prepare('SELECT * FROM works ORDER BY created_at DESC LIMIT :limit OFFSET :offset');
      $stmt->bindValue(':limit', $perPage, PDO::PARAM_INT);
      $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
      $stmt->execute();
      $items = $stmt->fetchAll();
    } catch (Throwable $e) {
    }
    if (!$items) {
      echo '<p class="col-span-full text-center text-textColor">Пока нет работ. Загружайте примеры в админ‑панели.</p>';
    }
    foreach ($items as $w): ?>
      <?php $img = $w['image_webp'] ?: $w['image_original'];
      if ($img && $img[0] !== '/') {
        $img = '/' . $img;
      } ?>
      <div class="group rounded-2xl card overflow-hidden cursor-zoom-in"
        data-title="<?= htmlspecialchars($w['title'] ?: '') ?>"
        onclick="openLightbox('<?= htmlspecialchars($img) ?>', '<?= htmlspecialchars($w['title'] ?: '') ?>')">
        <img class="w-full h-full object-cover aspect-square" src="<?= htmlspecialchars($img) ?>"
          alt="<?= htmlspecialchars($w['title'] ?: 'Работа') ?>" loading="lazy">
        <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div
          class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <div class="text-sm font-semibold truncate"><?= htmlspecialchars($w['title'] ?: '') ?></div>
          <?php if (!empty($w['description'])): ?>
            <div class="text-xs line-clamp-2"><?= htmlspecialchars($w['description']) ?></div><?php endif; ?>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
  <?php
  $pages = max(1, (int) ceil($total / $perPage));
  if ($pages > 1):
    ?>
    <div class="flex items-center justify-center gap-2 mt-10">
      <?php for ($p = 1; $p <= $pages; $p++): ?>
        <?php if ($p === $page): ?>
          <span class="px-3 py-1 rounded bg-primary/20 text-textColorDark"><?= $p ?></span>
        <?php else: ?>
          <a class="px-3 py-1 rounded btn-primary" href="/works.php?page=<?= $p ?>"><?= $p ?></a>
        <?php endif; ?>
      <?php endfor; ?>
    </div>
  <?php endif; ?>


  <!--Здесь конец основнова кода страницы-->
  <!-- Lightbox overlay -->
  <div id="lightbox" class="fixed inset-0 bg-black/90 hidden z-50" onclick="closeLightbox(event)">
    <div class="absolute top-4 right-4">
      <button class="text-white text-2xl" aria-label="Закрыть" onclick="closeLightbox(event)">✕</button>
    </div>
    <div class="w-full h-full flex items-center justify-center p-4">
      <img id="lightboxImg" src="" alt="" class="max-w-[95vw] max-h-[85vh] object-contain" />
    </div>
    <!-- Prev/Next buttons -->
    <button id="lightboxPrev" class="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl select-none"
      aria-label="Предыдущее">‹</button>
    <button id="lightboxNext" class="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl select-none"
      aria-label="Следующее">›</button>
    <div id="lightboxCaption" class="absolute bottom-0 left-0 right-0 p-4 text-center text-white/90"></div>
  </div>
  <?php include 'includes/footer.php'; ?>