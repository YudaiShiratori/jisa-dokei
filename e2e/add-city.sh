#!/bin/bash
# E2E Test: Add City Flow
# Usage: bun run e2e < e2e/add-city.sh

# Open the web version of the app
open http://localhost:8081

# Wait for page to load
sleep 3

# Take initial snapshot
snapshot

# Click the add button
find text "追加" click

# Wait for modal
sleep 1

# Take snapshot of add city screen
snapshot

# Select a continent (Asia)
find text "アジア" click

# Wait for cities to load
sleep 1

# Select a city (Seoul)
find text "ソウル" click

# Wait for navigation back
sleep 1

# Verify city was added
snapshot
get text "ソウル"

# Take final screenshot
screenshot e2e/screenshots/add-city-result.png
