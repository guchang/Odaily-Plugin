import {
  ItemView,
  Notice,
  Plugin,
  TFile,
  WorkspaceLeaf,
  setIcon
} from "obsidian";

const OD_VIEW_TYPE = "odaily-home-view";
const EMPTY_VIEW_TYPE = "empty";

interface ObsidianCommandManager {
  findCommand(id: string): unknown;
  executeCommandById(id: string): boolean;
}

export default class OdailyHomePlugin extends Plugin {
  private replacingLeaves = new WeakSet<WorkspaceLeaf>();

  async onload(): Promise<void> {
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
  }

  async openHomeInNewTab(): Promise<void> {
    const leaf = this.app.workspace.getLeaf("tab");
    await leaf.setViewState({ type: OD_VIEW_TYPE, active: true });
  }

  async createNote(): Promise<void> {
    const today = new Date();
    const fileName = `Odaily/${formatDate(today)}.md`;
    const existingFile = this.app.vault.getAbstractFileByPath(fileName);

    if (existingFile instanceof TFile) {
      await this.app.workspace.getLeaf("tab").openFile(existingFile);
      return;
    }

    await this.app.vault.createFolder("Odaily").catch(() => undefined);

    const file = await this.app.vault.create(
      fileName,
      `# ${formatDisplayDate(today)}\n\n`
    );

    await this.app.workspace.getLeaf("tab").openFile(file);
  }

  async openQuickSwitcher(): Promise<void> {
    // Obsidian exposes core commands through the command manager, but not all
    // command IDs are typed in the public API.
    const commands = (this.app as typeof this.app & {
      commands?: ObsidianCommandManager;
    }).commands;
    const command = commands?.findCommand("switcher:open");

    if (commands && command) {
      commands.executeCommandById("switcher:open");
      return;
    }

    new Notice("Quick switcher is not available.");
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

    const shell = this.contentEl.createDiv({ cls: "odaily-home__shell" });

    const header = shell.createDiv({ cls: "odaily-home__header" });
    header.createEl("h1", { text: "创建" });

    const actionGrid = shell.createDiv({ cls: "odaily-home__actions" });
    this.createActionCard(actionGrid, {
      title: "快速笔记",
      subtitle: "",
      variant: "quick-note",
      onClick: () => void this.plugin.createNote()
    });
    this.createActionCard(actionGrid, {
      title: "新文档",
      subtitle: "你在想什么？",
      variant: "new-document",
      onClick: () => void this.plugin.createNote()
    });
    this.createActionCard(actionGrid, {
      title: "待办列表",
      subtitle: "",
      variant: "todo-list",
      onClick: () => this.openTodoSearch()
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
    recentPanel.createEl("h2", { text: "最近打开的文档" });

    const list = recentPanel.createDiv({ cls: "odaily-home__recent-list" });
    const files = this.getRecentFiles();

    if (files.length === 0) {
      const empty = list.createDiv({ cls: "odaily-home__empty" });
      setIcon(empty.createSpan(), "file-text");
      empty.createSpan({ text: "还没有最近打开的文档" });
      return;
    }

    for (const file of files) {
      this.createRecentItem(list, file);
    }
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
    top.createEl("strong", { text: options.title });

    if (options.variant === "quick-note") {
      const today = new Date();
      const badge = top.createDiv({ cls: "odaily-home__date-badge" });
      badge.createSpan({ cls: "odaily-home__date-month", text: `${today.getMonth() + 1}月` });
      badge.createSpan({ cls: "odaily-home__date-day", text: String(today.getDate()) });
    }

    if (options.subtitle) {
      card.createSpan({ cls: "odaily-home__card-subtitle", text: options.subtitle });
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
      const notePatch = card.createDiv({ cls: "odaily-home__note-patch" });
      notePatch.createSpan();
      notePatch.createSpan();
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

  private openTodoSearch(): void {
    const leaf = this.app.workspace.getLeaf("tab");

    void leaf.setViewState({
      type: "search",
      state: {
        query: "task-todo:/- \\[ \\]/"
      },
      active: true
    });
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
