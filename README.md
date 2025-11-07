# GitHub Diff Whitespace Extension

Are you sick of GitHub never remembering your whitespace setting? Wish you could have whitespace changes off by default ALL THE TIME? **LOOK NO FURTHER!**

This Chrome extension automatically appends `?w=1` to every GitHub diff URL so you never have to click that "Hide whitespace changes" button again. Ever. Seriously, we've got you covered.

## Why This Extension?

GitHub has [seemingly refused to implement a user-level setting](https://github.com/orgs/community/discussions/5486) to hide whitespace changes by default, despite years of community requests (seriously, check out that discussion - it's been going on forever). While GitHub does remember the setting per pull request, who has time to click that button on every single PR? Not you! That's why this extension exists - it automatically adds the `?w=1` query parameter to all GitHub diff URLs so you can focus on what actually matters: reviewing code, not fighting with whitespace.

## Features

- **Automatic link modification**: Click any GitHub diff link? Boom, `?w=1` is already there. Magic!
- **Auto-redirect**: Navigate to a diff URL without `?w=1`? We'll redirect you faster than you can say "whitespace"
- **Smart URL handling**: Already have query parameters? No problem! We're smart enough to add `w=1` without breaking anything

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select this directory

## Usage

Just install it and forget about it! The extension works automatically with zero configuration. Links get modified when you click them, and navigation gets redirected. It's like having a personal assistant that really, really cares about whitespace (probably more than GitHub does).

## Development

Built with Manifest V3 because we're modern like that. The extension consists of:
- `manifest.json` - The blueprint (extension configuration)
- `content.js` - The click interceptor (catches those diff links)
- `background.js` - The redirect master (handles navigation like a boss)
- `popup.html/js/css` - The popup UI (mostly just for show, but it's nice to have)

