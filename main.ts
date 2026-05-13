import {
  ItemView,
  Modal,
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
const OD_SIDEBAR_VIEW_TYPE = "odaily-sidebar-view";
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
  taskTags: string;
  todoFile: string;
  todoPosition: "top" | "bottom";
}

const DEFAULT_SETTINGS: OdailySettings = {
  lightBackground: "",
  darkBackground: "",
  taskTags: "",
  todoFile: "",
  todoPosition: "bottom"
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

    this.registerView(
      OD_SIDEBAR_VIEW_TYPE,
      (leaf) => new OdailySidebarView(leaf, this)
    );

    this.addCommand({
      id: "open-odaily-home",
      name: "Open Odaily home",
      callback: () => this.openHomeInNewTab()
    });

    this.addCommand({
      id: "open-odaily-sidebar",
      name: "Open Odaily sidebar",
      callback: () => this.openSidebar()
    });

    this.addCommand({
      id: "odaily-add-memo",
      name: "Odaily: add memo",
      callback: () => void this.addMemo()
    });

    this.addCommand({
      id: "odaily-add-todo",
      name: "Odaily: add todo",
      callback: () => {
        new TodoInputModal(this.app, (text) => {
          if (text.trim()) void this.addTodo(text);
        }).open();
      }
    });

    this.addRibbonIcon("layout-dashboard", "Open Odaily home", () => {
      void this.openHomeInNewTab();
    });

    this.addRibbonIcon("list-checks", "Open Odaily sidebar", () => {
      void this.openSidebar();
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
    const existing = this.app.workspace.getLeavesOfType(OD_VIEW_TYPE)[0];
    if (existing) {
      this.app.workspace.revealLeaf(existing);
      return;
    }
    const leaf = this.app.workspace.getLeaf("tab");
    await leaf.setViewState({ type: OD_VIEW_TYPE, active: true });
  }

  async openSidebar(): Promise<void> {
    const existing = this.app.workspace.getLeavesOfType(OD_SIDEBAR_VIEW_TYPE)[0];
    if (existing) {
      this.app.workspace.revealLeaf(existing);
      return;
    }
    const leaf = this.app.workspace.getRightLeaf(false);
    if (leaf) {
      await leaf.setViewState({ type: OD_SIDEBAR_VIEW_TYPE, active: true });
    }
  }

  openFileSmart(file: TFile): void {
    const openLeaf = this.app.workspace.getLeavesOfType("markdown").find(
      (l) => (l.view as any).file?.path === file.path
    );
    if (openLeaf) {
      this.app.workspace.revealLeaf(openLeaf);
    } else {
      void this.app.workspace.getLeaf("tab").openFile(file);
    }
  }

  async openDailyNote(date?: Date): Promise<void> {
    const { fileName, folder } = this.getDailyNotePath(date);
    const existingFile = this.app.vault.getAbstractFileByPath(fileName);

    if (existingFile instanceof TFile) {
      this.openFileSmart(existingFile);
      return;
    }

    if (folder) {
      await this.app.vault.createFolder(folder).catch(() => undefined);
    }

    const content = await this.getTemplateContent();
    const file = await this.app.vault.create(fileName, content);

    this.openFileSmart(file);

    await this.applyTemplater(file);
  }

  async createNote(): Promise<void> {
    const { fileName, folder } = this.getDailyNotePath();
    const existingFile = this.app.vault.getAbstractFileByPath(fileName);

    if (existingFile instanceof TFile) {
      this.openFileSmart(existingFile);
      return;
    }

    if (folder) {
      await this.app.vault.createFolder(folder).catch(() => undefined);
    }

    const content = await this.getTemplateContent();
    const file = await this.app.vault.create(fileName, content);

    this.openFileSmart(file);

    await this.applyTemplater(file);
  }

  private async getTemplateContent(): Promise<string> {
    const dailyNotesPlugin = (this.app as typeof this.app & {
      internalPlugins?: {
        getPluginById(id: string): {
          enabled: boolean;
          instance?: { options?: { format?: string; folder?: string; template?: string } };
        } | null;
      };
    }).internalPlugins?.getPluginById("daily-notes");

    const templatePath = dailyNotesPlugin?.enabled
      ? dailyNotesPlugin.instance?.options?.template
      : undefined;

    if (templatePath) {
      const normalizedPath = templatePath.replace(/\.md$/, "") + ".md";
      const templateFile = this.app.vault.getAbstractFileByPath(normalizedPath);
      if (templateFile instanceof TFile) {
        return await this.app.vault.read(templateFile);
      }
    }

    const today = new Date();
    return `# ${formatDisplayDate(today)}\n\n`;
  }

  private async applyTemplater(file: TFile): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const appPlugins = (this.app as any).plugins?.plugins;
    if (!appPlugins) return;

    const templaterPlugin = appPlugins["templater-obsidian"];
    if (!templaterPlugin?.api) return;

    try {
      const templaterApi = templaterPlugin.api;
      if (templaterApi.parse_template) {
        const content = await this.app.vault.read(file);
        const processed = await templaterApi.parse_template({}, content);
        if (typeof processed === "string" && processed !== content) {
          await this.app.vault.modify(file, processed);
        }
      }
    } catch {
      // Templater processing failed, file already has raw content
    }
  }

  async createRawDocument(): Promise<void> {
    const folder = this.getNewNoteFolder();
    if (folder) {
      await this.app.vault.createFolder(folder).catch(() => undefined);
    }

    const basePath = `${folder}/untitled`;
    let filePath = `${basePath}.md`;
    let counter = 1;

    while (this.app.vault.getAbstractFileByPath(filePath)) {
      filePath = `${basePath} ${counter}.md`;
      counter += 1;
    }

    const file = await this.app.vault.create(filePath, "");
    this.openFileSmart(file);
  }

  getNewNoteFolder(): string {
    const vault = this.app.vault as typeof this.app.vault & {
      getConfig(key: string): string | undefined;
    };
    const location = vault.getConfig("newFileLocation") ?? "root";
    if (location === "folder") {
      return vault.getConfig("newFileFolderPath") ?? "";
    }
    if (location === "current") {
      const active = this.app.workspace.getActiveFile();
      return active?.parent?.path ?? "";
    }
    return "";
  }

  getDailyNotePath(date?: Date): { fileName: string; folder: string } {
    const target = date ?? new Date();

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
      const baseName = (window as any).moment(target).format(format);
      return {
        fileName: folder ? `${folder}/${baseName}.md` : `${baseName}.md`,
        folder
      };
    }

    return {
      fileName: `Odaily/${formatDate(target)}.md`,
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

  async addMemo(date?: Date): Promise<void> {
    const { fileName, folder } = this.getDailyNotePath(date);
    const existing = this.app.vault.getAbstractFileByPath(fileName);
    let file: TFile;

    if (existing instanceof TFile) {
      file = existing;
    } else {
      if (folder) {
        await this.app.vault.createFolder(folder).catch(() => undefined);
      }
      const content = await this.getTemplateContent();
      file = await this.app.vault.create(fileName, content);
      await this.applyTemplater(file);
    }

    const target = date ?? new Date();
    const isToday = target.toDateString() === new Date().toDateString();
    const modalTitle = isToday
      ? "今日想法"
      : `${target.getMonth() + 1}月${target.getDate()}日想法`;

    new MemoInputModal(this.app, modalTitle, async (text) => {
      if (!text.trim()) return;
      const now = new Date();
      const ts = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      const memoLine = `\n#memo ${text.trim()}  ➕ ${ts}`;
      await this.app.vault.append(file, memoLine);
      const sidebarLeaf = this.app.workspace.getLeavesOfType(OD_SIDEBAR_VIEW_TYPE)[0];
      if (sidebarLeaf?.view instanceof OdailySidebarView) {
        void (sidebarLeaf.view as OdailySidebarView).renderSidebar();
      }
    }).open();
  }

  async addTodo(text: string, date?: Date): Promise<void> {
    const todoFileSetting = this.settings.todoFile.trim();
    let file: TFile;

    if (todoFileSetting) {
      // Fixed file mode
      const normalized = todoFileSetting.replace(/\.md$/, "") + ".md";
      const existing = this.app.vault.getAbstractFileByPath(normalized);
      if (existing instanceof TFile) {
        file = existing;
      } else {
        const parts = normalized.split("/");
        if (parts.length > 1) {
          await this.app.vault.createFolder(parts.slice(0, -1).join("/")).catch(() => undefined);
        }
        file = await this.app.vault.create(normalized, "");
      }
    } else {
      // Daily note mode
      const { fileName: dnName, folder } = this.getDailyNotePath(date);
      const existing = this.app.vault.getAbstractFileByPath(dnName);
      if (existing instanceof TFile) {
        file = existing;
      } else {
        if (folder) {
          await this.app.vault.createFolder(folder).catch(() => undefined);
        }
        const content = await this.getTemplateContent();
        file = await this.app.vault.create(dnName, content);
        await this.applyTemplater(file);
      }
    }

    const now = new Date();
    const ts = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const todoLine = `- [ ] #task ${text.trim()} ➕ ${ts}\n`;

    if (this.settings.todoPosition === "top") {
      const currentContent = await this.app.vault.read(file);
      await this.app.vault.modify(file, todoLine + currentContent);
    } else {
      await this.app.vault.append(file, "\n" + todoLine.trimEnd());
    }

    const sidebarLeaf = this.app.workspace.getLeavesOfType(OD_SIDEBAR_VIEW_TYPE)[0];
    if (sidebarLeaf?.view instanceof OdailySidebarView) {
      void (sidebarLeaf.view as OdailySidebarView).renderSidebar();
    }
  }
}

class TodoInputModal extends Modal {
  private onSubmit: (text: string) => void;
  private inputEl!: HTMLInputElement;

  constructor(app: App, onSubmit: (text: string) => void) {
    super(app);
    this.onSubmit = onSubmit;
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.createEl("h3", { text: "新增待办" });

    this.inputEl = contentEl.createEl("input", {
      attr: { type: "text", placeholder: "输入待办事项..." }
    });
    Object.assign(this.inputEl.style, {
      width: "100%",
      padding: "8px 12px",
      borderRadius: "6px",
      border: "1px solid var(--background-modifier-border)",
      background: "var(--background-primary)",
      color: "var(--text-normal)",
      fontSize: "14px",
      outline: "none"
    });

    const btnRow = contentEl.createDiv();
    Object.assign(btnRow.style, {
      display: "flex",
      justifyContent: "flex-end",
      gap: "8px",
      marginTop: "12px"
    });

    const cancelBtn = btnRow.createEl("button", { text: "取消" });
    Object.assign(cancelBtn.style, {
      padding: "6px 14px",
      borderRadius: "4px",
      border: "1px solid var(--background-modifier-border)",
      background: "transparent",
      color: "var(--text-muted)",
      cursor: "pointer"
    });
    cancelBtn.addEventListener("click", () => this.close());

    const confirmBtn = btnRow.createEl("button", { text: "保存" });
    Object.assign(confirmBtn.style, {
      padding: "6px 14px",
      borderRadius: "4px",
      border: "none",
      background: "var(--text-accent)",
      color: "var(--text-on-accent)",
      cursor: "pointer"
    });
    confirmBtn.addEventListener("click", () => {
      this.onSubmit(this.inputEl.value);
      this.close();
    });

    this.inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.onSubmit(this.inputEl.value);
        this.close();
      }
      if (e.key === "Escape") this.close();
    });

    setTimeout(() => this.inputEl.focus(), 50);
  }

  onClose(): void {
    this.contentEl.empty();
  }
}

class MemoInputModal extends Modal {
  private onSubmit: (text: string) => void;
  private title: string;
  private inputEl!: HTMLInputElement;

  constructor(app: App, title: string, onSubmit: (text: string) => void) {
    super(app);
    this.title = title;
    this.onSubmit = onSubmit;
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.createEl("h3", { text: this.title });

    this.inputEl = contentEl.createEl("input", {
      cls: "odaily-memo-input",
      attr: { type: "text", placeholder: "记录此刻的想法..." }
    });
    this.inputEl.style.width = "100%";
    this.inputEl.style.padding = "8px 12px";
    this.inputEl.style.borderRadius = "6px";
    this.inputEl.style.border = "1px solid var(--background-modifier-border)";
    this.inputEl.style.background = "var(--background-primary)";
    this.inputEl.style.color = "var(--text-normal)";
    this.inputEl.style.fontSize = "14px";
    this.inputEl.style.outline = "none";

    const btnRow = contentEl.createDiv({ cls: "odaily-memo-btnrow" });
    btnRow.style.display = "flex";
    btnRow.style.justifyContent = "flex-end";
    btnRow.style.gap = "8px";
    btnRow.style.marginTop = "12px";

    const cancelBtn = btnRow.createEl("button", { text: "取消" });
    cancelBtn.style.padding = "6px 14px";
    cancelBtn.style.borderRadius = "4px";
    cancelBtn.style.border = "1px solid var(--background-modifier-border)";
    cancelBtn.style.background = "transparent";
    cancelBtn.style.color = "var(--text-muted)";
    cancelBtn.style.cursor = "pointer";
    cancelBtn.addEventListener("click", () => this.close());

    const confirmBtn = btnRow.createEl("button", { text: "保存" });
    confirmBtn.style.padding = "6px 14px";
    confirmBtn.style.borderRadius = "4px";
    confirmBtn.style.border = "none";
    confirmBtn.style.background = "var(--text-accent)";
    confirmBtn.style.color = "var(--text-on-accent)";
    confirmBtn.style.cursor = "pointer";
    confirmBtn.addEventListener("click", () => {
      this.onSubmit(this.inputEl.value);
      this.close();
    });

    this.inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.onSubmit(this.inputEl.value);
        this.close();
      }
      if (e.key === "Escape") {
        this.close();
      }
    });

    // Auto-focus
    setTimeout(() => this.inputEl.focus(), 50);
  }

  onClose(): void {
    const { contentEl } = this;
    contentEl.empty();
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
      subtitle: "捕捉今日想法",
      variant: "quick-note",
      onClick: () => void this.plugin.createNote()
    });
    this.createActionCard(actionGrid, {
      title: "新文档",
      subtitle: "你在记录什么？",
      variant: "new-document",
      onClick: () => void this.plugin.createRawDocument()
    });
    this.createActionCard(actionGrid, {
      title: "待办列表",
      subtitle: "追踪你的任务",
      variant: "todo-list",
      onClick: () => {
        new TodoInputModal(this.app, (text) => {
          if (text.trim()) void this.plugin.addTodo(text);
        }).open();
      }
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

interface TaskInfo {
  file: TFile;
  text: string;
  line: number;
  createdAt: number;
  tags: string[];
}

function parseTaskTime(text: string, fileMtime: number): number {
  const created = text.match(/➕\s*(\d{4}-\d{2}-\d{2}(?:\s+\d{2}:\d{2})?)/);
  if (created) return new Date(created[1].replace(/(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})/, "$1T$2:00")).getTime();
  const scheduled = text.match(/[📅⏳]\s*(\d{4}-\d{2}-\d{2})/);
  if (scheduled) return new Date(scheduled[1]).getTime();
  return fileMtime;
}

function parseTags(text: string): string[] {
  const tags: string[] = [];
  const re = /#([\w一-鿿\-\/]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (!tags.includes(m[1])) tags.push(m[1]);
  }
  return tags;
}

function cleanTaskText(text: string): string {
  return text
    .replace(/#[\w一-鿿\-\/]+/g, "")
    .replace(/[➕✅⏳📅]\s*\d{4}-\d{2}-\d{2}(\s+\d{2}:\d{2})?/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function formatTaskTime(ts: number): string {
  const d = new Date(ts);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

class OdailySidebarView extends ItemView {
  private pendingTimers = new Map<string, ReturnType<typeof setTimeout>>();
  private selectedDate: Date = new Date();
  private showMonthPicker = false;

  constructor(
    leaf: WorkspaceLeaf,
    private readonly plugin: OdailyHomePlugin
  ) {
    super(leaf);
  }

  getViewType(): string {
    return OD_SIDEBAR_VIEW_TYPE;
  }

  getDisplayText(): string {
    return "Odaily 概览";
  }

  getIcon(): string {
    return "list-checks";
  }

  async onOpen(): Promise<void> {
    await this.render();
  }

  async onClose(): Promise<void> {
    this.contentEl.empty();
  }

  async renderSidebar(): Promise<void> {
    await this.render();
  }

  private async render(): Promise<void> {
    this.contentEl.empty();
    this.contentEl.addClass("odaily-sidebar");

    this.renderCalendar();

    const body = this.contentEl.createDiv({ cls: "odaily-sidebar__body" });

    this.renderTodayMemos(body);
    this.renderTodayDocs(body);
    await this.renderTasks(body);
    await this.renderTodayCompleted(body);
  }

  private renderCalendar(): void {
    const cal = this.contentEl.createDiv({ cls: "odaily-sidebar__calendar" });

    const calHeader = cal.createDiv({ cls: "odaily-sidebar__calendar-header" });
    const sel = this.selectedDate;
    const fmtMD = (d: Date) => `${d.getMonth() + 1}月${d.getDate()}日`;

    const weekStart = new Date(sel);
    weekStart.setDate(sel.getDate() - sel.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    // Clickable title — toggles month picker
    const titleEl = calHeader.createSpan({
      cls: "odaily-sidebar__calendar-title",
      text: `${fmtMD(weekStart)} - ${fmtMD(weekEnd)}`
    });
    titleEl.addEventListener("click", (e) => {
      e.stopPropagation();
      this.showMonthPicker = !this.showMonthPicker;
      void this.render();
    });

    const nav = calHeader.createDiv({ cls: "odaily-sidebar__calendar-nav" });

    const prevBtn = nav.createEl("button", { cls: "odaily-sidebar__calendar-nav-btn", attr: { type: "button", "aria-label": "前一天" } });
    setIcon(prevBtn, "chevron-left");
    prevBtn.addEventListener("click", (e) => { e.stopPropagation(); const d = new Date(sel); d.setDate(sel.getDate() - 1); this.selectedDate = d; void this.render(); });

    const todayBtn = nav.createEl("button", { cls: "odaily-sidebar__calendar-nav-btn odaily-sidebar__calendar-nav-btn--today", attr: { type: "button" } });
    todayBtn.createSpan({ text: "今天" });
    todayBtn.addEventListener("click", (e) => { e.stopPropagation(); this.selectedDate = new Date(); this.showMonthPicker = false; void this.render(); });

    const diaryBtn = nav.createEl("button", { cls: "odaily-sidebar__calendar-nav-btn", attr: { type: "button", "aria-label": "打开日记" } });
    setIcon(diaryBtn, "book-open");
    diaryBtn.addEventListener("click", (e) => { e.stopPropagation(); void this.plugin.openDailyNote(sel); });

    const nextBtn = nav.createEl("button", { cls: "odaily-sidebar__calendar-nav-btn", attr: { type: "button", "aria-label": "后一天" } });
    setIcon(nextBtn, "chevron-right");
    nextBtn.addEventListener("click", (e) => { e.stopPropagation(); const d = new Date(sel); d.setDate(sel.getDate() + 1); this.selectedDate = d; void this.render(); });

    // Day-of-week headers
    const dowRow = cal.createDiv({ cls: "odaily-sidebar__calendar-dow" });
    const dowLabels = ["日", "一", "二", "三", "四", "五", "六"];
    for (const d of dowLabels) {
      dowRow.createSpan({ cls: "odaily-sidebar__calendar-dow-item", text: d });
    }

    const today = new Date();

    if (this.showMonthPicker) {
      // Month navigation row
      const monthNav = cal.createDiv({ cls: "odaily-sidebar__calendar-monthnav" });
      const prevMonBtn = monthNav.createEl("button", { cls: "odaily-sidebar__calendar-nav-btn", attr: { type: "button", "aria-label": "上个月" } });
      setIcon(prevMonBtn, "chevron-left");
      prevMonBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.selectedDate = new Date(sel.getFullYear(), sel.getMonth() - 1, Math.min(sel.getDate(), new Date(sel.getFullYear(), sel.getMonth(), 0).getDate()));
        void this.render();
      });

      monthNav.createSpan({ cls: "odaily-sidebar__calendar-monthlabel", text: `${sel.getFullYear()}年${sel.getMonth() + 1}月` });

      const nextMonBtn = monthNav.createEl("button", { cls: "odaily-sidebar__calendar-nav-btn", attr: { type: "button", "aria-label": "下个月" } });
      setIcon(nextMonBtn, "chevron-right");
      nextMonBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.selectedDate = new Date(sel.getFullYear(), sel.getMonth() + 1, Math.min(sel.getDate(), new Date(sel.getFullYear(), sel.getMonth() + 2, 0).getDate()));
        void this.render();
      });

      // Month picker: full month grid
      const grid = cal.createDiv({ cls: "odaily-sidebar__calendar-grid" });
      const year = sel.getFullYear();
      const month = sel.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let i = 0; i < firstDay; i++) {
        grid.createDiv({ cls: "odaily-sidebar__calendar-day odaily-sidebar__calendar-day--empty" });
      }
      for (let d = 1; d <= daysInMonth; d++) {
        const cell = grid.createDiv({ cls: "odaily-sidebar__calendar-day" });
        cell.createSpan({ cls: "odaily-sidebar__calendar-day-num", text: String(d) });
        const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        const isSelected = d === sel.getDate() && month === sel.getMonth() && year === sel.getFullYear();
        if (isToday) cell.addClass("odaily-sidebar__calendar-day--today");
        if (isSelected) cell.addClass("odaily-sidebar__calendar-day--selected");
        cell.addEventListener("click", (e) => {
          e.stopPropagation();
          this.selectedDate = new Date(year, month, d);
          this.showMonthPicker = false;
          void this.render();
        });
      }
    } else {
      // Week view: single row of 7 days
      const grid = cal.createDiv({ cls: "odaily-sidebar__calendar-grid" });
      for (let i = 0; i < 7; i++) {
        const d = new Date(weekStart);
        d.setDate(weekStart.getDate() + i);
        const cell = grid.createDiv({ cls: "odaily-sidebar__calendar-day" });
        cell.createSpan({ cls: "odaily-sidebar__calendar-day-num", text: String(d.getDate()) });
        const isToday = d.toDateString() === today.toDateString();
        const isSelected = d.toDateString() === sel.toDateString();
        if (isToday) cell.addClass("odaily-sidebar__calendar-day--today");
        if (isSelected) cell.addClass("odaily-sidebar__calendar-day--selected");
        cell.addEventListener("click", (e) => {
          e.stopPropagation();
          this.selectedDate = new Date(d);
          void this.render();
        });
      }
    }
  }

  private async renderTodayMemos(parent: HTMLElement = this.contentEl): Promise<void> {
    const sel = this.selectedDate;
    const isToday = sel.toDateString() === new Date().toDateString();
    const section = parent.createDiv({ cls: "odaily-sidebar__section" });
    const headerEl = section.createEl("h3");
    headerEl.createSpan({ text: isToday ? "今日想法" : `${sel.getMonth() + 1}月${sel.getDate()}日想法` });
    const addBtn = headerEl.createEl("button", {
      cls: "odaily-sidebar__add-btn",
      attr: { "aria-label": "创建新想法" }
    });
    setIcon(addBtn, "plus");
    addBtn.addEventListener("click", () => {
      void this.plugin.addMemo(sel);
    });

    const { fileName } = this.plugin.getDailyNotePath(sel);
    const file = this.app.vault.getAbstractFileByPath(fileName);
    if (!(file instanceof TFile)) {
      const empty = section.createDiv({ cls: "odaily-sidebar__empty" });
      setIcon(empty.createSpan(), "lightbulb");
      empty.createSpan({ text: isToday ? "今日暂无日记" : "暂无日记" });
      return;
    }

    const content = await this.app.vault.read(file);
    const lines = content.split("\n");
    const memos: { text: string; ts: string }[] = [];
    for (const line of lines) {
      const match = line.match(/^#memo\s+(.+?)\s*➕\s*(.+)/);
      if (match) {
        memos.push({ text: match[1].trim(), ts: match[2].trim() });
      }
    }

    if (memos.length === 0) {
      const empty = section.createDiv({ cls: "odaily-sidebar__empty" });
      setIcon(empty.createSpan(), "lightbulb");
      empty.createSpan({ text: "还没有想法" });
      return;
    }

    const list = section.createDiv({ cls: "odaily-sidebar__list" });
    for (const memo of memos) {
      const item = list.createDiv({ cls: "odaily-sidebar__item" });
      setIcon(item.createSpan({ cls: "odaily-sidebar__item-icon" }), "lightbulb");
      const body = item.createDiv({ cls: "odaily-sidebar__item-body" });
      body.createDiv({ cls: "odaily-sidebar__item-title", text: memo.text });
      body.createDiv({ cls: "odaily-sidebar__item-meta", text: memo.ts });
      item.addEventListener("click", () => {
        if (file) {
          this.plugin.openFileSmart(file);
        }
      });
    }
  }

  private renderTodayDocs(parent: HTMLElement = this.contentEl): void {
    const sel = this.selectedDate;
    const isToday = sel.toDateString() === new Date().toDateString();
    const section = parent.createDiv({ cls: "odaily-sidebar__section" });
    section.createEl("h3", { text: isToday ? "今日文档" : `${sel.getMonth() + 1}月${sel.getDate()}日文档` });

    const dayStart = new Date(sel.getFullYear(), sel.getMonth(), sel.getDate()).getTime();
    const dayEnd = dayStart + 86400000;

    const todayFiles = this.app.vault
      .getMarkdownFiles()
      .filter((f) => f.stat.mtime >= dayStart && f.stat.mtime < dayEnd)
      .sort((a, b) => b.stat.mtime - a.stat.mtime);

    if (todayFiles.length === 0) {
      const empty = section.createDiv({ cls: "odaily-sidebar__empty" });
      setIcon(empty.createSpan(), "file-text");
      empty.createSpan({ text: "暂无" });
      return;
    }

    const list = section.createDiv({ cls: "odaily-sidebar__list" });
    for (const file of todayFiles.slice(0, 20)) {
      const item = list.createDiv({ cls: "odaily-sidebar__item" });
      setIcon(item.createSpan({ cls: "odaily-sidebar__item-icon" }), "file-text");
      const body = item.createDiv({ cls: "odaily-sidebar__item-body" });
      body.createDiv({ cls: "odaily-sidebar__item-title", text: file.basename });
      body.createDiv({
        cls: "odaily-sidebar__item-meta",
        text: formatRelativeTime(file.stat.mtime)
      });
      item.addEventListener("click", () => {
        this.plugin.openFileSmart(file);
      });
    }
  }

  private async renderTasks(parent: HTMLElement = this.contentEl): Promise<void> {
    const rawTags = this.plugin.settings.taskTags.trim();
    const filterTags = rawTags
      ? rawTags.split(/[,，]/).map((t) => t.trim().replace(/^#/, "").toLowerCase()).filter(Boolean)
      : [];

    const sel = this.selectedDate;
    const isToday = sel.toDateString() === new Date().toDateString();
    const section = parent.createDiv({ cls: "odaily-sidebar__section" });
    const title = isToday ? "待办事项" : `${sel.getMonth() + 1}月${sel.getDate()}日事项`;
    const headerEl = section.createEl("h3");
    headerEl.createSpan({ text: title });
    const addBtn = headerEl.createEl("button", {
      cls: "odaily-sidebar__add-btn",
      attr: { "aria-label": "创建新事项" }
    });
    setIcon(addBtn, "plus");
    addBtn.addEventListener("click", () => {
      new TodoInputModal(this.app, (text) => {
        if (text.trim()) {
          void this.plugin.addTodo(text, sel);
        }
      }).open();
    });

    const dayStart = new Date(sel.getFullYear(), sel.getMonth(), sel.getDate()).getTime();
    const dayEnd = dayStart + 86400000;

    const tasks: TaskInfo[] = [];
    const files = this.app.vault
      .getMarkdownFiles()
      .sort((a, b) => b.stat.mtime - a.stat.mtime)
      .slice(0, 100);

    for (const file of files) {
      const content = await this.app.vault.read(file);
      const lines = content.split("\n");
      for (let i = 0; i < lines.length; i++) {
        const match = lines[i].match(/^\s*- \[ \]\s+(.+)/);
        if (match) {
          const rawText = match[1];
          const tags = parseTags(rawText);
          if (filterTags.length > 0) {
            if (!tags.some((t) => filterTags.includes(t.toLowerCase()))) continue;
          }
          const createdAt = parseTaskTime(rawText, file.stat.mtime);
          if (createdAt >= dayEnd) continue;
          tasks.push({ file, text: rawText, line: i, createdAt, tags });
          if (tasks.length >= 30) break;
        }
      }
      if (tasks.length >= 30) break;
    }

    // Sort by creation time, newest first
    tasks.sort((a, b) => b.createdAt - a.createdAt);

    if (tasks.length === 0) {
      const empty = section.createDiv({ cls: "odaily-sidebar__empty" });
      setIcon(empty.createSpan(), "clipboard-list");
      empty.createSpan({ text: "没有待办事项" });
      return;
    }

    const list = section.createDiv({ cls: "odaily-sidebar__list" });
    for (const task of tasks) {
      const key = `${task.file.path}::${task.line}`;
      const item = list.createDiv({ cls: "odaily-sidebar__item" });
      if (this.pendingTimers.has(key)) {
        item.addClass("odaily-sidebar__item--pending");
      }
      const box = item.createSpan({ cls: "odaily-sidebar__item-checkbox odaily-sidebar__item-checkbox--active" });
      setIcon(box, this.pendingTimers.has(key) ? "check-small" : "square");
      if (this.pendingTimers.has(key)) {
        box.removeClass("odaily-sidebar__item-checkbox--active");
      }
      box.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleTask(key, task, item, box);
      });

      const body = item.createDiv({ cls: "odaily-sidebar__item-body" });
      const titleRow = body.createDiv({ cls: "odaily-sidebar__item-title" });

      for (const tag of task.tags) {
        const tagEl = titleRow.createSpan({ cls: "odaily-sidebar__item-tag", text: `#${tag}` });
        tagEl.style.color = "var(--text-accent)";
      }
      titleRow.createSpan({ text: cleanTaskText(task.text) });

      body.createDiv({
        cls: "odaily-sidebar__item-meta",
        text: `${formatTaskTime(task.createdAt)}  ·  ${task.file.basename}`
      });

      item.addEventListener("click", () => {
        this.plugin.openFileSmart(task.file);
      });
    }
  }

  private toggleTask(
    key: string,
    task: TaskInfo,
    item: HTMLElement,
    box: HTMLElement
  ): void {
    const existing = this.pendingTimers.get(key);
    if (existing) {
      clearTimeout(existing);
      this.pendingTimers.delete(key);
      item.removeClass("odaily-sidebar__item--pending");
      setIcon(box, "square");
      box.addClass("odaily-sidebar__item-checkbox--active");
      return;
    }

    item.addClass("odaily-sidebar__item--pending");
    setIcon(box, "check-small");
    box.removeClass("odaily-sidebar__item-checkbox--active");

    const timer = setTimeout(() => {
      this.pendingTimers.delete(key);
      void this.executeCompletion(task, item);
    }, 1000);

    this.pendingTimers.set(key, timer);
  }

  private async executeCompletion(
    task: TaskInfo,
    item: HTMLElement
  ): Promise<void> {
    const now = new Date();
    const ts = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const content = await this.app.vault.read(task.file);
    const lines = content.split("\n");
    const oldLine = lines[task.line];
    const hasCompletionTs = /✅\s*\d{4}-\d{2}-\d{2}/.test(oldLine);
    lines[task.line] = oldLine.replace(/^(\s*)- \[ \]/, "$1- [x]") + (hasCompletionTs ? "" : ` ✅ ${ts}`);
    await this.app.vault.modify(task.file, lines.join("\n"));

    // Collapse and remove item from DOM
    item.style.transition = "opacity 280ms ease, max-height 280ms ease, margin-top 280ms ease, margin-bottom 280ms ease, padding-top 280ms ease, padding-bottom 280ms ease";
    item.style.overflow = "hidden";
    const height = item.offsetHeight;
    item.style.maxHeight = height + "px";
    item.offsetHeight; // force reflow
    item.style.opacity = "0";
    item.style.maxHeight = "0";
    item.style.marginTop = "0";
    item.style.marginBottom = "0";
    item.style.paddingTop = "0";
    item.style.paddingBottom = "0";
    item.style.pointerEvents = "none";

    const cleanText = cleanTaskText(task.text.replace(/✅.*$/, "").trim());
    const file = task.file;
    const isToday = this.selectedDate.toDateString() === new Date().toDateString();

    item.addEventListener("transitionend", () => {
      item.remove();
      if (isToday) this.addToTodayCompleted(cleanText, file, ts);
    }, { once: true });
  }

  private addToTodayCompleted(text: string, file: TFile, completedTs: string): void {
    const scrollBody = this.contentEl.querySelector(".odaily-sidebar__body") ?? this.contentEl;
    const sections = scrollBody.querySelectorAll(".odaily-sidebar__section");
    let doneSection: HTMLElement | null = null;
    for (const s of sections) {
      if (s.querySelector("h3")?.textContent === "今日完成") {
        doneSection = s as HTMLElement;
        break;
      }
    }

    if (!doneSection) {
      doneSection = scrollBody.createDiv({ cls: "odaily-sidebar__section" });
      doneSection.createEl("h3", { text: "今日完成" });
    }

    // Remove empty state if present
    const empty = doneSection.querySelector(".odaily-sidebar__empty");
    if (empty) empty.remove();

    // Get or create list
    let list = doneSection.querySelector(".odaily-sidebar__list");
    if (!list) {
      list = doneSection.createDiv({ cls: "odaily-sidebar__list" });
    }

    const item = list.createDiv({ cls: "odaily-sidebar__item odaily-sidebar__item--done" });
    setIcon(item.createSpan({ cls: "odaily-sidebar__item-checkbox" }), "check-circle");
    const body = item.createDiv({ cls: "odaily-sidebar__item-body" });
    body.createDiv({ cls: "odaily-sidebar__item-title", text });
    body.createDiv({ cls: "odaily-sidebar__item-meta", text: `${completedTs}  ·  ${file.basename}` });
    item.addEventListener("click", () => {
      this.plugin.openFileSmart(file);
    });
  }

  private async renderTodayCompleted(parent: HTMLElement = this.contentEl): Promise<void> {
    const sel = this.selectedDate;
    const isToday = sel.toDateString() === new Date().toDateString();
    const section = parent.createDiv({ cls: "odaily-sidebar__section" });
    section.createEl("h3", { text: isToday ? "今日完成" : `${sel.getMonth() + 1}月${sel.getDate()}日完成` });

    const dateStr = `${sel.getFullYear()}-${String(sel.getMonth() + 1).padStart(2, "0")}-${String(sel.getDate()).padStart(2, "0")}`;
    const completed: { file: TFile; text: string; completedTs: string }[] = [];

    const files = this.app.vault
      .getMarkdownFiles()
      .sort((a, b) => b.stat.mtime - a.stat.mtime)
      .slice(0, 100);

    for (const file of files) {
      const content = await this.app.vault.read(file);
      const lines = content.split("\n");
      for (const line of lines) {
        const match = line.match(/^\s*- \[[xX]\]\s+(.+)/);
        if (match && line.includes(`✅ ${dateStr}`)) {
          const tsMatch = line.match(/✅\s*(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2})/);
          completed.push({
            file,
            text: cleanTaskText(match[1].replace(/✅.*$/, "").trim()),
            completedTs: tsMatch ? tsMatch[1] : dateStr
          });
        }
      }
      if (completed.length >= 20) break;
    }

    // Sort by completion time, newest first
    completed.sort((a, b) => b.completedTs.localeCompare(a.completedTs));

    if (completed.length === 0) {
      const empty = section.createDiv({ cls: "odaily-sidebar__empty" });
      setIcon(empty.createSpan(), "clipboard-list");
      empty.createSpan({ text: "没有已完成的事项" });
      return;
    }

    const list = section.createDiv({ cls: "odaily-sidebar__list" });
    for (const task of completed) {
      const item = list.createDiv({ cls: "odaily-sidebar__item odaily-sidebar__item--done" });
      setIcon(item.createSpan({ cls: "odaily-sidebar__item-checkbox" }), "check-circle");
      const body = item.createDiv({ cls: "odaily-sidebar__item-body" });
      body.createDiv({ cls: "odaily-sidebar__item-title", text: task.text });
      body.createDiv({
        cls: "odaily-sidebar__item-meta",
        text: `${task.completedTs}  ·  ${task.file.basename}`
      });
      item.addEventListener("click", () => {
        this.plugin.openFileSmart(task.file);
      });
    }
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

    new Setting(containerEl)
      .setName("未完成任务筛选标签")
      .setDesc("只显示包含指定标签的任务，多个标签用逗号分隔。如: todo, 待办。留空显示所有未完成任务。")
      .addText((text) =>
        text
          .setPlaceholder("如: todo, 待办")
          .setValue(this.plugin.settings.taskTags)
          .onChange(async (value) => {
            this.plugin.settings.taskTags = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("待办添加目标文件")
      .setDesc("新待办写入的文件路径。留空则写入当天日记。如: 00_inbox/待办清单。")
      .addText((text) =>
        text
          .setPlaceholder("留空 = 当天日记")
          .setValue(this.plugin.settings.todoFile)
          .onChange(async (value) => {
            this.plugin.settings.todoFile = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("待办追加位置")
      .setDesc("新待办追加到文件最前面还是最后面。")
      .addDropdown((dropdown) =>
        dropdown
          .addOption("bottom", "文件末尾")
          .addOption("top", "文件开头")
          .setValue(this.plugin.settings.todoPosition)
          .onChange(async (value: string) => {
            this.plugin.settings.todoPosition = value as "top" | "bottom";
            await this.plugin.saveSettings();
          })
      );

    const help = containerEl.createDiv({ cls: "setting-item-description" });
    help.style.marginTop = "24px";
    help.style.lineHeight = "1.8";
    help.createEl("b", { text: "使用说明" });
    help.createEl("br");
    help.createSpan({ text: "1. 将图片放入 Vault 中（如 " });
    help.createEl("code", { text: "Attachments/bg.jpg" });
    help.createSpan({ text: "），在上方输入该路径即可" });
    help.createEl("br");
    help.createSpan({ text: "2. 也可输入网络图片链接，如 " });
    help.createEl("code", { text: "https://example.com/bg.jpg" });
    help.createEl("br");
    help.createSpan({ text: "3. 支持 CSS 原生写法：颜色 " });
    help.createEl("code", { text: "#f0f0f0" });
    help.createSpan({ text: "、渐变 " });
    help.createEl("code", { text: "linear-gradient(135deg, #667eea, #764ba2)" });
    help.createEl("br");
    help.createSpan({ text: "4. 浅色和深色模式可分别设置不同的背景" });
  }
}
