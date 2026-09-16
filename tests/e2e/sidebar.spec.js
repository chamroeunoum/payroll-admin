import { test, expect } from '@playwright/test'

/**
 * Smoke tests for the admin sidebar.
 *
 * The app builds its route table from localStorage at boot (see
 * src/plugins/route.js -> isBackend()), and there is no seeded e2e user, so we
 * inject a Super-admin session before the page scripts run.
 */
const TOKEN = { token_type: 'Bearer', access_token: 'e2e-token', expires_at: null }
const USER = {
  id: 1,
  firstname: 'E2E',
  lastname: 'Runner',
  avatar_url: null,
  people: { firstname: 'E2E', lastname: 'Runner' },
  roles: [{ id: 1, name: 'Super' }],
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(([token, user]) => {
    localStorage.setItem('token', JSON.stringify(token))
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.removeItem('sidebar_rail_collapsed')
  }, [TOKEN, USER])
})

const rows = (page) => page.locator('.sidebar .sidebar-item')
// row order: 0 dashboard, 1 attendance, 2 officer, 3 usersalaryadjustment,
//            4 payroll, 5 setting, 6 rail toggle, 7 logout
const ATTENDANCE = 1

test('sidebar renders the attendance group', async ({ page }) => {
  await page.goto('/#/dashboard')
  await expect(rows(page)).toHaveCount(8)
  await expect(rows(page).nth(ATTENDANCE).locator('.item-label')).toHaveText('វត្តមាន')
})

test('parent menu item toggles its submenu on click', async ({ page }) => {
  await page.goto('/#/dashboard')
  const row = rows(page).nth(ATTENDANCE)
  const submenu = row.locator('.sidebar-children')

  await expect(submenu).toBeHidden()
  await row.locator('.item-content').click()

  await expect(submenu).toBeVisible()
  await expect(row.locator('.item-caret')).toHaveClass(/item-caret-open/)
  await expect(row.locator('.child-item-label')).toHaveText([
    'សំណើរឈប់សម្រាក',
    'ការកែតម្រូវវត្តមាន',
  ])
})

test('every sidebar item carries its own colour on icon and label', async ({ page }) => {
  await page.goto('/#/dashboard')

  // all 8 rows (6 modules + rail toggle + logout) must be visually distinct
  const rowColors = await rows(page).evaluateAll((els) =>
    els.map((el) => getComputedStyle(el).color),
  )
  expect(rowColors).toHaveLength(8)
  expect(new Set(rowColors).size).toBe(8)

  // icon and label in a row both take that row's colour
  const row = rows(page).nth(ATTENDANCE)
  const rowColor = await row.evaluate((el) => getComputedStyle(el).color)
  const iconColor = await row.locator('.item-icon').evaluate((el) => getComputedStyle(el).color)
  const labelColor = await row.locator('.item-label').evaluate((el) => getComputedStyle(el).color)
  expect(iconColor).toBe(rowColor)
  expect(labelColor).toBe(rowColor)
  expect(rowColor).toBe('rgb(5, 150, 105)') // #059669 emerald

  // the SVG icon must actually paint in it, not fall back to a default fill
  const svgColor = await row
    .locator('.item-icon svg')
    .evaluate((el) => getComputedStyle(el).color)
  expect(svgColor).toBe(rowColor)

  // children inherit their group's colour
  await row.locator('.item-content').click()
  const childColor = await row
    .locator('.child-item-label')
    .first()
    .evaluate((el) => getComputedStyle(el).color)
  expect(childColor).toBe(rowColor)
})

test('sidebar collapses to an icon rail and shifts page content', async ({ page }) => {
  await page.goto('/#/dashboard')
  const rail = page.locator('.sidebar')
  const content = page.locator('.left-40').first()

  await expect(rail).not.toHaveClass(/sidebar-collapsed/)
  await expect
    .poll(() => content.evaluate((el) => Math.round(el.getBoundingClientRect().left)))
    .toBe(160)

  await page.locator('.sidebar .sidebar-item[title] .item-content').click()

  await expect(rail).toHaveClass(/sidebar-collapsed/)
  await expect(page.locator('body')).toHaveClass(/sidebar-rail-collapsed/)
  await expect
    .poll(() => content.evaluate((el) => Math.round(el.getBoundingClientRect().left)))
    .toBe(48)
})
