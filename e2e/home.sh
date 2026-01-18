#!/bin/bash
# E2E Test: Home Screen
# Usage: bun run e2e < e2e/home.sh

# Open the web version of the app
open http://localhost:8081

# Wait for page to load
sleep 3

# Take a snapshot to see the accessibility tree
snapshot

# Check for main elements
get text "現在の時刻"
get text "世界の都市"

# Take screenshot
screenshot e2e/screenshots/home.png
