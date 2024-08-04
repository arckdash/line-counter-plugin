import { Plugin } from 'obsidian';

class SamplePlugin extends Plugin {
  statusBarTextElement: HTMLSpanElement;

  onload(): void {
    this.statusBarTextElement = this.addStatusBarItem().createEl('span')
    this.readActiveFileAndUpdateLineCount()

    this.app.workspace.on('active-leaf-change', async () => {
      this.readActiveFileAndUpdateLineCount()
    })

    this.app.workspace.on('editor-change', (editor) => {
      const content = editor.getDoc().getValue()
      this.updateLineCount(content);
    })
  }

  private updateLineCount(fileContent?: string) {
    const linesCount = fileContent ? fileContent.split(/\r\n|\r|\n/).length : 0;

    this.statusBarTextElement.textContent = `${linesCount} ${linesCount === 1 ? "line" : "lines"}`;
  }

  private async readActiveFileAndUpdateLineCount() {
    const file = this.app.workspace.getActiveFile()
    if (file) {
      const content = await this.app.vault.read(file)
      this.updateLineCount(content)
    } else {
      this.updateLineCount()
    }
  }
}

export default SamplePlugin;