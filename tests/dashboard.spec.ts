import { test, expect } from '@playwright/test';

const DEFAULT_EMAIL = 'carldominiccueva@gmail.com';
const DEFAULT_PASSWORD = 'CDNC19960308.nico';

async function loginpayroll(page, email = DEFAULT_EMAIL, password = DEFAULT_PASSWORD) {
  await page.goto('https://theabbapayroll.com/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  // Focus password and fill it directly
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Sign In' }).click();
  // Wait for network idle to reduce flakiness after sign in
  await page.waitForLoadState('networkidle');
}

//Kylo
test('Verify Dashboard main widgets are visible', async ({ page }) => {
  await loginpayroll(page);
  await expect(page.getByText('Present Today')).toBeVisible();
  await expect(page.getByText('Absent Today')).toBeVisible();
  await expect(page.getByText('Overtime Requests')).toBeVisible();
});

test('Verify Dashboard Present Today is visible', async ({ page }) => {
  await loginpayroll(page);
  await expect(page.getByText('Present Today')).toBeVisible();
});


test('Verify Dashboard Overtime Requests redirects correctly', async ({ page }) => {
  await loginpayroll(page);
  const page1Promise = page.waitForEvent('popup');
  await page.getByText('Overtime Requests').click();
  const page1 = await page1Promise;
  await expect(page1).toHaveURL(/overtime/i);
});


test('Verify Dashboard Absent Today is visible', async ({ page }) => {
  await loginpayroll(page);
  await expect(page.getByText('Absent Today')).toBeVisible();
});


// Carl
test('User should redirect to Timesheet Corrections page', async ({ page }) => {
  await loginpayroll(page);
  const page1Promise = page.waitForEvent('popup');
  await page.getByText('Timesheet Corrections').click();
  const page1 = await page1Promise;
  await page1.goto('https://theabbapayroll.com/approvals/timesheet');
});

test('Verify Dashboard Holiday Request is visible', async ({ page }) => {
  await loginpayroll(page);
  await expect(page.getByRole('heading', { name: 'Holiday Requests' })).toBeVisible();
});

test('User should redirect to Holiday Request page', async ({ page }) => {
  await loginpayroll(page);
  const page1Promise = page.waitForEvent('popup');
  await page.getByText('Holiday Requests').click();
  const page1 = await page1Promise;
});

test('Verify Dashboard Rest Day Requests is visible', async ({ page }) => {
  await loginpayroll(page);
  await expect(page.getByRole('heading', { name: 'Rest Day Requests' })).toBeVisible();
});

test('User should redirect to Rest Day Request page', async ({ page }) => {
  await loginpayroll(page);
  const page1Promise = page.waitForEvent('popup');
  await page.getByText('Rest Day Requests').click();
  const page1 = await page1Promise;
});

test('Verify Dashboard Undertime Requests is visible', async ({ page }) => {
  await loginpayroll(page);
  await expect(page.getByRole('heading', { name: 'Undertime Requests' })).toBeVisible();
  const page1Promise = page.waitForEvent('popup');
  await page.getByText('Undertime Requests').click();
  const page1 = await page1Promise;
  await expect(page1.getByRole('heading', { name: 'Undertime Approvals' })).toBeVisible();
});

test('User should redirect to Undertime Request page', async ({ page }) => {
  await loginpayroll(page);
  const page1Promise = page.waitForEvent('popup');
  await page.getByText('Undertime Requests').click();
  const page1 = await page1Promise;
  await page1.getByText('Undertime ApprovalsActions').click();
});

test('Verify Dashboard By Department is visible', async ({ page }) => {
  await loginpayroll(page);
  await expect(page.getByRole('heading', { name: 'By Department' })).toBeVisible();
});

test('Verify Dashboard By Location is visible', async ({ page }) => {
  await loginpayroll(page);
  await expect(page.getByRole('heading', { name: 'By Location' })).toBeVisible();
});

test('Verify Dashboard By Employment Type is visible', async ({ page }) => {
  await loginpayroll(page);
  await expect(page.getByRole('heading', { name: 'By Employment Type' })).toBeVisible();
});

// I added edit here