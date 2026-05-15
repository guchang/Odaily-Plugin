# Odaily

[English](README.md)

一款以日程为视角的 Obsidian 插件，快速捕捉想法、管理笔记与待办任务，提升个人生产力。

## 截图

![主页视图](screenshots/home_view.png)

## 功能

### 主页视图（新标签页）
- **快速笔记** — 一键打开今天的日记
- **新文档** — 在 Obsidian 设置的新建笔记存放位置创建无标题文档
- **待办列表** — 添加任务到当天日记或指定文件
- **快速切换** — 在主页中直接搜索并打开文件
- **最近文件** — 显示最近打开或修改的笔记
- **自定义背景** — 分别为浅色/深色模式设置背景（vault 图片、URL、CSS 颜色或渐变）
- **主题切换** — 在主页底部一键切换浅色/深色模式

### 侧边栏（概览面板）
- **日历周/月视图** — 按天、周、月导航，支持月选择器
- **每日想法** — 捕获带 `#memo` 标签和时间戳的想法
- **今日文档** — 查看当天（或选中日期）修改的文件
- **待办事项** — 查看和管理未完成任务，勾选后 1 秒内可撤销
- **今日完成** — 查看当天已完成的事项及完成时间
- **标签筛选** — 按自定义标签过滤任务（如 `#todo`、`#待办`）
- **复制当日摘要** — 一键复制选中日期的想法、文档、待办和完成事项到剪贴板
- **搜索** — 在侧边栏各板块中搜索并高亮关键词

## 快捷命令
- `Open Odaily home` — 在新标签页打开主页
- `Open Odaily sidebar` — 在右侧边栏打开概览面板
- `Odaily: add memo` — 快速捕捉想法到当天日记
- `Odaily: add todo` — 添加待办到配置的目标文件

## 设置
- **浅色/深色模式背景**：使用 vault 图片路径、外部链接、CSS 颜色或 CSS 渐变分别设置
- **任务标签筛选**：只显示包含指定标签的任务
- **待办目标文件**：选择新待办的保存位置（留空则使用当天日记）
- **待办追加位置**：新待办追加到文件开头还是末尾

## 安装

### 从社区插件市场安装
1. 打开 Obsidian 设置 > 第三方插件
2. 关闭安全模式
3. 点击浏览，搜索 "Odaily Home"
4. 安装并启用

### 手动安装
1. 从 [GitHub Releases](https://github.com/guchang/Odaily/releases) 下载最新版 `main.js`、`manifest.json`、`styles.css`
2. 复制到 `<vault>/.obsidian/plugins/odaily-home/`
3. 重启 Obsidian 或重新加载插件
4. 在设置中启用

### BRAT（测试版）
1. 安装 [BRAT](https://github.com/TfTHacker/obsidian42-brat) 插件
2. 添加 `guchang/Odaily` 作为 Beta 插件
3. BRAT 会自动保持更新

## 开发

```bash
git clone https://github.com/guchang/Odaily.git
cd Odaily
npm install
npm run dev    # 监听模式
npm run build  # 生产构建
```

本地测试，创建软链接：

```bash
ln -s $(pwd) "<vault>/.obsidian/plugins/odaily-home"
```

## 许可证

MIT。详见 [LICENSE](LICENSE)。
