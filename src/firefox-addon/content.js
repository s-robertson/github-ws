// Content script to intercept clicks on GitHub diff links and append ?w=1

(function() {
  'use strict';

  /**
   * Ensures a URL has the w=1 query parameter
   * Handles existing query parameters correctly
   */
  function addWhitespaceParam(url) {
    try {
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      params.set('w', '1');
      urlObj.search = params.toString();
      return urlObj.toString();
    } catch (e) {
      // If URL parsing fails, return original URL
      console.error('Failed to parse URL:', url, e);
      return url;
    }
  }

  /**
   * Checks if a URL is a GitHub diff URL (contains /files)
   */
  function isGitHubDiffUrl(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname === 'github.com' && urlObj.pathname.includes('/files');
    } catch (e) {
      return false;
    }
  }

  // Use event delegation to intercept clicks on links
  document.addEventListener('click', function(e) {
    // Find the closest anchor element
    let target = e.target;
    while (target && target.tagName !== 'A') {
      target = target.parentElement;
    }

    if (!target || !target.href) {
      return;
    }

    const url = target.href;
    
    // Only process GitHub diff URLs
    if (!isGitHubDiffUrl(url)) {
      return;
    }

    // Check if w=1 is already present
    try {
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      if (params.get('w') === '1') {
        // Already has w=1, no need to modify
        return;
      }
    } catch (e) {
      // If URL parsing fails, skip
      return;
    }

    // Prevent default navigation
    e.preventDefault();
    e.stopPropagation();

    // Modify URL and navigate
    const modifiedUrl = addWhitespaceParam(url);
    
    // Navigate to the modified URL
    if (e.ctrlKey || e.metaKey || e.button === 1) {
      // Middle click or Ctrl/Cmd+click - open in new tab
      window.open(modifiedUrl, '_blank');
    } else {
      // Regular click - navigate in same tab
      window.location.href = modifiedUrl;
    }
  }, true); // Use capture phase to catch events early
})();

