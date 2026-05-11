import {
  ItemView,
  Notice,
  Plugin,
  PluginSettingTab,
  App,
  Setting,
  TFile,
  WorkspaceLeaf,
  setIcon
} from "obsidian";

const OD_VIEW_TYPE = "odaily-home-view";
const EMPTY_VIEW_TYPE = "empty";

const NOTES_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 3 100 94">
  <path d="M5 36.4v18.1h90V32.7H5v3.7zM93.5 38c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zm-3 0c.4 0 .7.4.7.8s-.3.7-.7.7-.7-.4-.7-.8.3-.7.7-.7zM6.5 82c2 5.4 6.1 9.5 11.5 11.5C22.9 95 27.4 95 36.4 95h27.2c9 0 13.5 0 18.5-1.6 5.3-1.9 9.5-6.1 11.4-11.4.6-2.1 1-4.1 1.2-6.5H5.3c.2 2.4.5 4.4 1.2 6.5zM5 63.6c0 4.8 0 8.3.2 11.2h89.6c.2-3 .2-6.5.2-11.2v-8.4H5v8.4z" fill="#fff"/>
  <path d="M5 74.8v.7h.3c0-.2 0-.5-.1-.7H5zM95 75.5v-.7h-.2c0 .2 0 .5-.1.7h.3zM5 54.5h90v.7H5z" fill-opacity=".29"/>
  <path d="M5.3 75.5h89.5c0-.2 0-.5.1-.7H5.2c0 .2.1.5.1.7z" fill-opacity=".29"/>
  <path d="M72.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM75.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM66.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM78.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM69.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM63.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM81.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM90.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM60.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM93.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM84.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM87.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM54.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM18.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM21.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM57.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM15.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM6.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM27.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM12.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM9.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM24.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM45.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM48.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM30.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM51.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM42.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM33.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM36.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8zM39.5 39.5c.4 0 .7-.3.7-.7 0-.4-.3-.8-.7-.8s-.7.3-.7.7c0 .4.3.8.7.8z" fill="#aaa"/>
  <defs><linearGradient id="notes-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFDB4C"/><stop offset="1" stop-color="#FFCD02"/></linearGradient></defs>
  <path fill="url(#notes-grad)" d="M82 6.5C77.1 5 72.6 5 63.6 5H36.4C27.3 5 22.8 5 18 6.6 12.6 8.5 8.5 12.7 6.5 18 5.2 22.2 5 26.1 5 32.7h90c0-6.7-.2-10.6-1.6-14.8-1.9-5.3-6.1-9.5-11.4-11.4z"/>
</svg>`;

const REMINDERS_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <path fill="#fff" d="M26,0H94a25.94821,25.94821,0,0,1,26,26V94a25.94821,25.94821,0,0,1-26,26H26A25.94822,25.94822,0,0,1,0,94V26A26.07645,26.07645,0,0,1,26,0Z"/>
  <circle cx="21" cy="30" r="9" fill="none" stroke="#196aff"/>
  <circle cx="21" cy="30" r="6" fill="#196aff"/>
  <circle cx="21" cy="60" r="9" fill="none" stroke="#f22d22"/>
  <circle cx="21" cy="60" r="6" fill="#f22d22"/>
  <circle cx="21" cy="90" r="9" fill="none" stroke="#ff9500"/>
  <circle cx="21" cy="90" r="6" fill="#ff9500"/>
  <path fill="#c7c7cc" fill-rule="evenodd" d="M44 29h60a.94477.94477 0 0 1 1 1h0a.94477.94477 0 0 1-1 1H44a.94477.94477 0 0 1-1-1h0A1.07539 1.07539 0 0 1 44 29ZM44 59h60a.94477.94477 0 0 1 1 1h0a.94477.94477 0 0 1-1 1H44a.94477.94477 0 0 1-1-1h0A1.07539 1.07539 0 0 1 44 59zM44 89h60a.94477.94477 0 0 1 1 1h0a.94477.94477 0 0 1-1 1H44a.94477.94477 0 0 1-1-1h0A1.07539 1.07539 0 0 1 44 89z"/>
</svg>`;

interface ObsidianCommandManager {
  findCommand(id: string): unknown;
  executeCommandById(id: string): boolean;
}

interface OdailySettings {
  lightBackground: string;
  darkBackground: string;
}

const DEFAULT_SETTINGS: OdailySettings = {
  lightBackground: "",
  darkBackground: ""
};

export default class OdailyHomePlugin extends Plugin {
  settings: OdailySettings = DEFAULT_SETTINGS;
  private replacingLeaves = new WeakSet<WorkspaceLeaf>();

  async onload(): Promise<void> {
    await this.loadSettings();

    this.registerView(
      OD_VIEW_TYPE,
      (leaf) => new OdailyHomeView(leaf, this)
    );

    this.addCommand({
      id: "open-odaily-home",
      name: "Open Odaily home",
      callback: () => this.openHomeInNewTab()
    });

    this.addRibbonIcon("layout-dashboard", "Open Odaily home", () => {
      void this.openHomeInNewTab();
    });

    this.registerEvent(
      this.app.workspace.on("active-leaf-change", (leaf) => {
        void this.replaceEmptyLeaf(leaf);
      })
    );

    this.app.workspace.onLayoutReady(() => {
      void this.replaceEmptyLeaf(this.app.workspace.activeLeaf);
    });

    this.addSettingTab(new OdailySettingTab(this.app, this));
  }

  async loadSettings(): Promise<void> {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }

  async openHomeInNewTab(): Promise<void> {
    const leaf = this.app.workspace.getLeaf("tab");
    await leaf.setViewState({ type: OD_VIEW_TYPE, active: true });
  }

  async createNote(): Promise<void> {
    const { fileName, folder } = this.getDailyNotePath();
    const existingFile = this.app.vault.getAbstractFileByPath(fileName);

    if (existingFile instanceof TFile) {
      await this.app.workspace.getLeaf("tab").openFile(existingFile);
      return;
    }

    if (folder) {
      await this.app.vault.createFolder(folder).catch(() => undefined);
    }

    const today = new Date();
    const file = await this.app.vault.create(
      fileName,
      `# ${formatDisplayDate(today)}\n\n`
    );

    await this.app.workspace.getLeaf("tab").openFile(file);
  }

  async createRawDocument(): Promise<void> {
    const folder = "00_raw";
    await this.app.vault.createFolder(folder).catch(() => undefined);

    const basePath = `${folder}/untitled`;
    let filePath = `${basePath}.md`;
    let counter = 1;

    while (this.app.vault.getAbstractFileByPath(filePath)) {
      filePath = `${basePath} ${counter}.md`;
      counter += 1;
    }

    const file = await this.app.vault.create(filePath, "");
    await this.app.workspace.getLeaf("tab").openFile(file);
  }

  private getDailyNotePath(): { fileName: string; folder: string } {
    const dailyNotesPlugin = (this.app as typeof this.app & {
      internalPlugins?: {
        getPluginById(id: string): {
          enabled: boolean;
          instance?: { options?: { format?: string; folder?: string } };
        } | null;
      };
    }).internalPlugins?.getPluginById("daily-notes");

    if (dailyNotesPlugin?.enabled && dailyNotesPlugin.instance?.options) {
      const { format = "YYYY-MM-DD", folder = "" } = dailyNotesPlugin.instance.options;
      const baseName = (window as any).moment().format(format);
      return {
        fileName: folder ? `${folder}/${baseName}.md` : `${baseName}.md`,
        folder
      };
    }

    const today = new Date();
    return {
      fileName: `Odaily/${formatDate(today)}.md`,
      folder: "Odaily"
    };
  }

  executeCommandById(commandId: string): boolean {
    const commands = (this.app as typeof this.app & {
      commands?: ObsidianCommandManager;
    }).commands;
    const command = commands?.findCommand(commandId);

    if (commands && command) {
      commands.executeCommandById(commandId);
      return true;
    }

    return false;
  }

  findAndExecuteQuickAddCommand(name: string): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const commandsRecord = (this.app as any).commands?.commands as
      | Record<string, { id: string; name: string }>
      | undefined;
    if (!commandsRecord) return false;

    const lower = name.toLowerCase();
    const target = Object.values(commandsRecord).find(
      (cmd) => cmd.id.startsWith("quickadd:") && cmd.name.toLowerCase().includes(lower)
    );

    if (target) {
      return this.executeCommandById(target.id);
    }

    return false;
  }

  openQuickSwitcher(): void {
    if (!this.executeCommandById("switcher:open")) {
      new Notice("Quick switcher is not available.");
    }
  }

  private async replaceEmptyLeaf(leaf: WorkspaceLeaf | null): Promise<void> {
    if (!leaf || this.replacingLeaves.has(leaf)) {
      return;
    }

    if (leaf.view.getViewType() !== EMPTY_VIEW_TYPE) {
      return;
    }

    this.replacingLeaves.add(leaf);

    try {
      await leaf.setViewState({ type: OD_VIEW_TYPE, active: true });
    } finally {
      this.replacingLeaves.delete(leaf);
    }
  }
}

class OdailyHomeView extends ItemView {
  constructor(
    leaf: WorkspaceLeaf,
    private readonly plugin: OdailyHomePlugin
  ) {
    super(leaf);
  }

  getViewType(): string {
    return OD_VIEW_TYPE;
  }

  getDisplayText(): string {
    return "Odaily Home";
  }

  getIcon(): string {
    return "layout-dashboard";
  }

  async onOpen(): Promise<void> {
    this.render();
  }

  async onClose(): Promise<void> {
    this.contentEl.empty();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("odaily-home");
    this.contentEl.removeClass("odaily-home--with-background");
    this.contentEl.style.background = "";
    this.contentEl.style.backgroundSize = "";
    this.contentEl.style.backgroundPosition = "";

    const isDark = document.body.hasClass("theme-dark");
    const bg = isDark
      ? this.plugin.settings.darkBackground
      : this.plugin.settings.lightBackground;
    if (bg) {
      const resolved = this.resolveBackground(bg);
      if (resolved) {
        this.contentEl.addClass("odaily-home--with-background");
        this.contentEl.style.background = resolved;
        this.contentEl.style.backgroundSize = "cover";
        this.contentEl.style.backgroundPosition = "center";
      }
    }

    const shell = this.contentEl.createDiv({ cls: "odaily-home__shell" });

    const header = shell.createDiv({ cls: "odaily-home__header" });
    header.createEl("h1", { text: "创建" });

    const actionGrid = shell.createDiv({ cls: "odaily-home__actions" });
    this.createActionCard(actionGrid, {
      title: "快速笔记",
      subtitle: "捕捉今日灵感",
      variant: "quick-note",
      onClick: () => void this.plugin.createNote()
    });
    this.createActionCard(actionGrid, {
      title: "新文档",
      subtitle: "你在想什么？",
      variant: "new-document",
      onClick: () => void this.plugin.createRawDocument()
    });
    this.createActionCard(actionGrid, {
      title: "待办列表",
      subtitle: "追踪你的任务",
      variant: "todo-list",
      onClick: () => this.openTodoList()
    });

    const searchButton = shell.createEl("button", {
      cls: "odaily-home__search",
      attr: {
        type: "button"
      }
    });
    setIcon(searchButton.createSpan({ cls: "odaily-home__search-icon" }), "search");
    searchButton.createSpan({ text: "快速开启" });
    searchButton.addEventListener("click", () => {
      void this.plugin.openQuickSwitcher();
    });

    const recentPanel = shell.createDiv({ cls: "odaily-home__recent-panel" });
    const recentHeader = recentPanel.createDiv({ cls: "odaily-home__recent-header" });
    recentHeader.createEl("h2", { text: "最近打开的文档" });
    const refreshBtn = recentHeader.createEl("button", {
      cls: "odaily-home__refresh-btn",
      attr: { type: "button", "aria-label": "刷新" }
    });
    setIcon(refreshBtn, "refresh-cw");
    refreshBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (refreshBtn.hasClass("odaily-home__refresh-btn--spinning")) {
        return;
      }

      refreshBtn.addClass("odaily-home__refresh-btn--spinning");
      window.setTimeout(() => {
        this.render();
      }, 520);
    });

    const list = recentPanel.createDiv({ cls: "odaily-home__recent-list" });
    const files = this.getRecentFiles();

    if (files.length === 0) {
      const empty = list.createDiv({ cls: "odaily-home__empty" });
      setIcon(empty.createSpan(), "file-text");
      empty.createSpan({ text: "还没有最近打开的文档" });
    } else {
      for (const file of files) {
        this.createRecentItem(list, file);
      }
    }

    this.createBottomBar();
  }

  private createActionCard(
    parent: HTMLElement,
    options: {
      title: string;
      subtitle: string;
      variant: "new-document" | "quick-note" | "todo-list";
      onClick: () => void;
    }
  ): void {
    const card = parent.createEl("button", {
      cls: `odaily-home__card odaily-home__card--${options.variant}`,
      attr: {
        type: "button"
      }
    });

    const top = card.createDiv({ cls: "odaily-home__card-top" });

    const iconWrap = top.createDiv({ cls: "odaily-home__card-icon" });

    if (options.variant === "quick-note") {
      const today = new Date();
      const badge = iconWrap.createDiv({ cls: "odaily-home__date-badge" });
      badge.createSpan({ cls: "odaily-home__date-month", text: `${today.getMonth() + 1}月` });
      badge.createSpan({ cls: "odaily-home__date-day", text: String(today.getDate()) });
    } else if (options.variant === "new-document") {
      iconWrap.innerHTML = NOTES_ICON_SVG;
    } else if (options.variant === "todo-list") {
      iconWrap.innerHTML = REMINDERS_ICON_SVG;
    }

    const titleArea = top.createDiv({ cls: "odaily-home__card-title-area" });
    titleArea.createEl("strong", { text: options.title });

    if (options.subtitle) {
      titleArea.createSpan({ cls: "odaily-home__card-subtitle", text: options.subtitle });
    }

    if (options.variant === "todo-list") {
      const todos = card.createDiv({ cls: "odaily-home__todo-preview" });

      for (let index = 0; index < 3; index += 1) {
        const row = todos.createDiv({ cls: "odaily-home__todo-row" });
        row.createSpan({ cls: "odaily-home__todo-box" });
        row.createSpan({ cls: "odaily-home__wave odaily-home__wave--short" });
        row.createSpan({ cls: "odaily-home__wave" });
      }
    } else {
      const lines = card.createDiv({ cls: "odaily-home__card-lines" });
      lines.createSpan();
      lines.createSpan();
      lines.createSpan();
    }

    if (options.variant === "new-document") {
      card.createDiv({ cls: "odaily-home__note-patch" });
    }

    card.addEventListener("click", options.onClick);
  }

  private createRecentItem(parent: HTMLElement, file: TFile): void {
    const item = parent.createEl("button", {
      cls: "odaily-home__recent-item",
      attr: {
        type: "button"
      }
    });

    const thumb = item.createDiv({
      cls: `odaily-home__thumb odaily-home__thumb--${parent.children.length % 4}`
    });
    thumb.createSpan();
    thumb.createSpan();
    thumb.createSpan();

    const body = item.createDiv({ cls: "odaily-home__recent-body" });
    body.createDiv({ cls: "odaily-home__recent-title", text: file.basename });
    body.createDiv({
      cls: "odaily-home__recent-meta",
      text: formatRelativeTime(file.stat.mtime)
    });

    item.addEventListener("click", () => {
      void this.app.workspace.getLeaf("tab").openFile(file);
    });
  }

  private getRecentFiles(): TFile[] {
    const lastOpenFiles = this.app.workspace.getLastOpenFiles();
    const recentFiles = lastOpenFiles
      .map((path) => this.app.vault.getAbstractFileByPath(path))
      .filter((file): file is TFile => file instanceof TFile)
      .slice(0, 8);

    if (recentFiles.length > 0) {
      return recentFiles;
    }

    return this.app.vault
      .getMarkdownFiles()
      .sort((a, b) => b.stat.mtime - a.stat.mtime)
      .slice(0, 8);
  }

  private resolveBackground(raw: string): string | null {
    const trimmed = raw.trim();
    if (!trimmed) return null;

    // 已经是完整 CSS 值（url(...)、颜色、渐变）
    const cssPrefixes = ["#", "rgb", "hsl", "linear-gradient", "radial-gradient", "url("];
    if (cssPrefixes.some((p) => trimmed.startsWith(p))) {
      return trimmed;
    }

    // 外部链接
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return `url(${trimmed})`;
    }

    // vault 内图片路径，转换为本地资源 URL
    const file = this.app.vault.getAbstractFileByPath(trimmed);
    if (file instanceof TFile) {
      const resourcePath = this.app.vault.getResourcePath(file);
      return `url(${resourcePath})`;
    }

    // 兜底：当作普通 CSS 值
    return trimmed;
  }

  private openTodoList(): void {
    if (!this.plugin.findAndExecuteQuickAddCommand("todo")) {
      const leaf = this.app.workspace.getLeaf("tab");
      void leaf.setViewState({
        type: "search",
        state: { query: "task-todo:/- \\[ \\]/" },
        active: true
      });
    }
  }

  private createBottomBar(): void {
    const isDark = document.body.hasClass("theme-dark");
    const bottomBar = this.contentEl.createDiv({ cls: "odaily-home__bottom-bar" });

    const settingsBtn = bottomBar.createEl("button", {
      cls: "odaily-home__bottom-btn",
      attr: { type: "button", "aria-label": "设置" }
    });
    setIcon(settingsBtn, "settings");
    settingsBtn.addEventListener("click", () => {
      this.openSettings();
    });

    const themeBtn = bottomBar.createEl("button", {
      cls: "odaily-home__bottom-btn",
      attr: { type: "button", "aria-label": isDark ? "切换浅色模式" : "切换深色模式" }
    });
    setIcon(themeBtn, isDark ? "sun" : "moon");
    themeBtn.addEventListener("click", () => {
      this.toggleTheme();
    });
  }

  private openSettings(): void {
    const setting = (this.app as any).setting;
    setting.open();
    window.setTimeout(() => {
      const tabs = document.querySelectorAll(".vertical-tab-header-group .vertical-tab-nav-item");
      for (const tab of tabs) {
        if (tab.textContent?.includes("Odaily")) {
          (tab as HTMLElement).click();
          break;
        }
      }
    }, 50);
  }

  private toggleTheme(): void {
    const isDark = document.body.hasClass("theme-dark");
    const newTheme = isDark ? "moonstone" : "obsidian";
    (this.app as any).vault.setConfig("theme", newTheme);
    window.setTimeout(() => {
      this.render();
    }, 100);
  }
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDisplayDate(date: Date): string {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(date);
}

function formatRelativeTime(timestamp: number): string {
  const deltaMs = Date.now() - timestamp;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (deltaMs < minute) {
    return "刚刚";
  }

  if (deltaMs < hour) {
    return `${Math.floor(deltaMs / minute)} 分钟前`;
  }

  if (deltaMs < day) {
    return `${Math.floor(deltaMs / hour)} 小时前`;
  }

  return `${Math.floor(deltaMs / day)} 天前`;
}

class OdailySettingTab extends PluginSettingTab {
  constructor(
    app: App,
    private readonly plugin: OdailyHomePlugin
  ) {
    super(app, plugin);
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h2", { text: "Odaily Home 设置" });

    new Setting(containerEl)
      .setName("浅色模式背景")
      .setDesc("支持：Vault 图片路径（如 Attachments/bg.jpg）、外部链接、CSS 颜色、渐变。留空使用默认。")
      .addText((text) =>
        text
          .setPlaceholder("如: Attachments/light.jpg 或 #f0f0f0")
          .setValue(this.plugin.settings.lightBackground)
          .onChange(async (value) => {
            this.plugin.settings.lightBackground = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("深色模式背景")
      .setDesc("支持：Vault 图片路径（如 Attachments/bg.jpg）、外部链接、CSS 颜色、渐变。留空使用默认。")
      .addText((text) =>
        text
          .setPlaceholder("如: Attachments/dark.jpg 或 #1a1a2e")
          .setValue(this.plugin.settings.darkBackground)
          .onChange(async (value) => {
            this.plugin.settings.darkBackground = value;
            await this.plugin.saveSettings();
          })
      );

    const help = containerEl.createDiv({ cls: "setting-item-description" });
    help.style.marginTop = "24px";
    help.style.lineHeight = "1.8";
    help.innerHTML =
      '<b>使用说明</b><br>' +
      "1. 将图片放入 Vault 中（如 <code>Attachments/bg.jpg</code>），在上方输入该路径即可<br>" +
      '2. 也可输入网络图片链接，如 <code>https://example.com/bg.jpg</code><br>' +
      '3. 支持 CSS 原生写法：颜色 <code>#f0f0f0</code>、渐变 <code>linear-gradient(135deg, #667eea, #764ba2)</code><br>' +
      "4. 浅色和深色模式可分别设置不同的背景";
  }
}
