# Home Sweet Home 3.0

A cozy, offline-friendly iPhone web app. Built as an upgrade of the supplied Home Sweet Home 2.0.

## Important before updating
- Export your current app backup first and verify the JSON file is saved.
- This app intentionally retains the localStorage key `home-sweet-home-v1` for compatibility.
- Deploy to a separate preview repository or URL for testing first. A different origin has different local storage.
- Do not delete your existing Home Screen icon or clear website data.
- After confirming the preview works, upload the files to the same existing GitHub Pages repository.
- On iPhone, service worker cache may delay updates; a cache version bump is included.

## Features
Morning Grace (KJV verses), bare minimum day, dashboard, meals, grocery copy for AnyList, laundry routine, maintenance, Shark automatic nightly run, decluttering, quick capture, Bailey notes, seasonal storage, household inventory, and backup import/export.

## Limits
Push notifications and live Google Calendar integration are not implemented. This static GitHub Pages app does not sync across devices. Copy for AnyList is a clipboard handoff, not direct integration. Daily verses rotate from a bundled selection, without an online scripture feed.
