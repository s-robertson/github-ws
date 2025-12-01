// Background script to handle redirects for GitHub diff URLs

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

// Listen for navigation events
browser.webNavigation.onCommitted.addListener((details) => {
  // Only process main frame navigations
  if (details.frameId !== 0) {
    return;
  }

  // Only process http/https URLs
  if (!details.url.startsWith('http://') && !details.url.startsWith('https://')) {
    return;
  }

  // Check if this is a GitHub diff URL
  if (!isGitHubDiffUrl(details.url)) {
    return;
  }

  // Check if w=1 is already present
  try {
    const urlObj = new URL(details.url);
    const params = new URLSearchParams(urlObj.search);
    if (params.get('w') === '1') {
      // Already has w=1, no need to redirect
      return;
    }
  } catch (e) {
    // If URL parsing fails, skip
    return;
  }

  // Redirect to URL with w=1 parameter
  const modifiedUrl = addWhitespaceParam(details.url);
  
  browser.tabs.update(details.tabId, {
    url: modifiedUrl
  });
}, {
  url: [
    { hostContains: 'github.com', pathContains: '/files' }
  ]
});

