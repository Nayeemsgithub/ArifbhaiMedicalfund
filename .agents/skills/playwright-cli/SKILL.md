---
name: playwright-cli
description: >-
  Automated browser testing, full-page screenshot capture, viewport inspection, and visual regression
  verification using the Playwright CLI and test runner. Use this skill when verifying UI changes,
  generating screenshots across viewports (mobile, tablet, desktop), or executing E2E UI tests.
---

# Playwright CLI Skill

Use this skill to perform automated browser verification, capture visual screenshots, and test interactive components across multiple screen dimensions.

---

## 1. Quick CLI Commands

### A. Quick Visual Screenshot Capture
```bash
# Capture full page screenshot of a running dev server
npx playwright screenshot --full-page http://localhost:3000 screenshot.png

# Capture mobile viewport screenshot (iPhone 14 / Pixel)
npx playwright screenshot --device="iPhone 14" http://localhost:3000 screenshot-mobile.png

# Capture tablet viewport screenshot
npx playwright screenshot --viewport-size="768,1024" http://localhost:3000 screenshot-tablet.png
```

### B. Running Playwright Tests
```bash
# Run all tests
npx playwright test

# Run tests in headed browser mode
npx playwright test --headed

# Run specific test file
npx playwright test tests/portfolio.spec.ts

# View HTML Test Report
npx playwright show-report
```

---

## 2. Standard Playwright Visual Verification Script

Create or execute a verification script in `tests/visual.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Medical Portfolio UI & Responsive Validation', () => {
  test('should render hero section with high aesthetic quality', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page.locator('h1')).toBeVisible();
    await page.screenshot({ path: 'artifacts/hero-desktop.png', fullPage: false });
  });

  test('should look crisp on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:3000');
    await page.screenshot({ path: 'artifacts/portfolio-mobile.png', fullPage: true });
  });
});
```

---

## 3. UI Quality Assurance Checklist with Playwright
1. **No Horizontal Scroll**: Assert that `document.body.scrollWidth === window.innerWidth` across all viewports.
2. **Interactive States**: Click modal triggers, toggle dark/light themes, and verify animations complete without layout shifting (CLS).
3. **Contrast & Load**: Verify images, charts, and icons load without 404s or layout jumps.
