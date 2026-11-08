// ==UserScript==
// @name         Vector 2022 Responsive
// @namespace    https://wikimedia.org/
// @version      1.0
// @description  Intercept and rewrite viewport meta before first paint across all WMF wikis and translatewiki
// @match        https://*.wikipedia.org/*
// @match        https://*.wikimedia.org/*
// @match        https://*.wiktionary.org/*
// @match        https://*.wikibooks.org/*
// @match        https://*.wikidata.org/*
// @match        https://*.wikinews.org/*
// @match        https://*.wikiquote.org/*
// @match        https://*.wikisource.org/*
// @match        https://*.wikiversity.org/*
// @match        https://*.wikivoyage.org/*
// @match        https://*.wikifunctions.org/*
// @match        https://*.mediawiki.org/*
// @match        https://*.wmflabs.org/*
// @match        https://translatewiki.net/*
// @updateURL    https://raw.githubusercontent.com/Nvdtn19/vector-2022-responsive/main/vector-2022-responsive.user.js
// @downloadURL  https://raw.githubusercontent.com/Nvdtn19/vector-2022-responsive/main/vector-2022-responsive.user.js
// @run-at       document-start
// @grant        none
// ==/UserScript==
(function() {
  'use strict';

  function applyMobileViewport(meta) {
    if (meta.getAttribute('content') !== 'width=device-width, initial-scale=1.0') {
      meta.setAttribute('content', 'width=device-width, initial-scale=1.0');
    }
  }

  // 1. Check if the element was already streamed
  const existingMeta = document.querySelector('meta[name="viewport"]');
  if (existingMeta) {
    applyMobileViewport(existingMeta);
  }

  // 2. Watch the stream and alter the tag before first layout/paint
  const observer = new MutationObserver((mutations, obs) => {
    const meta = document.querySelector('meta[name="viewport"]');
    if (meta) {
      applyMobileViewport(meta);
      obs.disconnect(); // Task finished, stop watching
    }
  });

  observer.observe(document.documentElement || document, {
    childList: true,
    subtree: true
  });
})();
