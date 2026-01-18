#!/bin/bash
# E2E Test: Time Difference Calculator
# Usage: bun run e2e < e2e/calculator.sh

# Open the web version of the app
open http://localhost:8081

# Wait for page to load
sleep 3

# Navigate to calculator tab
find text "時差計算" click

# Wait for tab change
sleep 1

# Take snapshot
snapshot

# Select departure city
find text "出発地" click
sleep 1
find text "東京" click

# Select arrival city
find text "到着地" click
sleep 1
find text "ロンドン" click

# Wait for calculation
sleep 1

# Verify time difference is shown
snapshot
get text "時間"

# Take screenshot
screenshot e2e/screenshots/calculator-result.png
