import { Page } from '@playwright/test';

export class FileManager {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  // Open File Manager
  async openFileManager() {
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('link').filter({ hasText: /^$/ }).nth(1).click();
    const FileManagerLink = this.page.locator('a').filter({ hasText: 'File Manager' }).nth(1);
    await FileManagerLink.click();
  }
  //   To "External Files" folder
  async navigateToExternalFiles() {
    await this.page
      .locator('iframe[name="itemscope"]')
      .contentFrame()
      .getByText('externalFiles')
      .nth(1)
      .dblclick();
  }
  // Press the "+" button
  async uploadFile(filePath: string) {
    await this.page.waitForTimeout(2000);
    const PlusButton = this.page
      .locator('iframe[name="itemscope"]')
      .contentFrame()
      .locator('label')
      .nth(1);
    await PlusButton.click();

    // Wait "filechooser"
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.page
        .locator('iframe[name="itemscope"]')
        .contentFrame()
        .getByRole('button', { name: 'Upload file' })
        .click(),
    ]);

    // Set the file for upload
    await fileChooser.setFiles(filePath);
  }
}
