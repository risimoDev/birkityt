var LB_STATE = {
    images: [],
    titles: [],
    index: 0
};

function collectGallery() {
    var nodes = document.querySelectorAll('.gallery-image .card img');
    LB_STATE.images = Array.prototype.map.call(nodes, function (n) { return n.getAttribute('src'); });
    LB_STATE.titles = Array.prototype.map.call(nodes, function (n) {
        var parent = n.closest('.card');
        return parent ? (parent.getAttribute('data-title') || '') : '';
    });
}

function showIndex(i) {
    if (!LB_STATE.images.length) collectGallery();
    if (i < 0) i = LB_STATE.images.length - 1;
    if (i >= LB_STATE.images.length) i = 0;
    LB_STATE.index = i;
    var overlay = document.getElementById('lightbox');
    var img = document.getElementById('lightboxImg');
    var cap = document.getElementById('lightboxCaption');
    if (!overlay || !img || !cap) return;
    img.src = LB_STATE.images[i] || '';
    cap.textContent = LB_STATE.titles[i] || '';
}

function openLightbox(src, caption) {
    var overlay = document.getElementById('lightbox');
    var img = document.getElementById('lightboxImg');
    var cap = document.getElementById('lightboxCaption');
    if (!overlay || !img || !cap) return;
    collectGallery();
    // Find index of clicked src; fallback to first
    var i = LB_STATE.images.indexOf(src);
    if (i < 0) i = 0;
    showIndex(i);
    overlay.classList.remove('hidden');
}

function closeLightbox(e) {
    // Close when clicking overlay or close button; ignore clicks on image
    var overlay = document.getElementById('lightbox');
    if (!overlay) return;
    // If click target is inside image container, do not close unless explicitly on button
    if (e && e.target && e.target.id === 'lightboxImg') {
        return;
    }
    overlay.classList.add('hidden');
}

// Optional: Close on Escape
document.addEventListener('keyup', function (e) {
    if (e.key === 'Escape') {
        var overlay = document.getElementById('lightbox');
        if (overlay) overlay.classList.add('hidden');
    }
});

// Prev/Next buttons
document.addEventListener('click', function (e) {
    var prev = document.getElementById('lightboxPrev');
    var next = document.getElementById('lightboxNext');
    if (e.target === prev) {
        showIndex(LB_STATE.index - 1);
    } else if (e.target === next) {
        showIndex(LB_STATE.index + 1);
    }
});

// Keyboard arrows
document.addEventListener('keyup', function (e) {
    var overlay = document.getElementById('lightbox');
    if (!overlay || overlay.classList.contains('hidden')) return;
    if (e.key === 'ArrowLeft') {
        showIndex(LB_STATE.index - 1);
    } else if (e.key === 'ArrowRight') {
        showIndex(LB_STATE.index + 1);
    }
});

// Touch swipe
(function () {
    var startX = 0, startY = 0, active = false;
    var overlay = document.getElementById('lightbox');
    if (!overlay) return;
    overlay.addEventListener('touchstart', function (e) {
        if (!e.touches || !e.touches.length) return;
        active = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    overlay.addEventListener('touchend', function (e) {
        if (!active) return;
        active = false;
        var endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : startX;
        var endY = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientY : startY;
        var dx = endX - startX;
        var dy = endY - startY;
        if (Math.abs(dx) > 40 && Math.abs(dy) < 60) {
            if (dx < 0) showIndex(LB_STATE.index + 1); else showIndex(LB_STATE.index - 1);
        }
    }, { passive: true });
})();
