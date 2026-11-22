# Q版欣宝挂件 · 设计说明

## 一、参考对象：鲸鱼娘插件

参考 [MeteorNOX/DeepSeek-Balance-Whale-Widget](https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget)（`dsh-whale-widget@0.4.2`）：右下角常驻、可拖拽、点击冒泡泡、按压 Q 弹、自定义角色图，以及**设置菜单 + DeepSeek 余额 / 今日已用 / 每轮消耗 + 音效四通道**。本插件用更贴合 Harness 的方式实现（Client `shell.overlay` 插槽 + Client 侧设置面板 + Host 侧余额路由），不注入外部脚本。

余额接口依据 [DeepSeek 官方文档](https://api-docs.deepseek.com/zh-cn/api/get-user-balance)：`GET https://api.deepseek.com/user/balance`，`Authorization: Bearer <DEEPSEEK_API_KEY>`，返回 `balance_infos[].total_balance / granted_balance / topped_up_balance`。凭据通过 `ctx.credentials.resolve('DEEPSEEK_API_KEY')` 读取（与鲸鱼娘一致），**API Key 不会离开 Host 进程、不写进浏览器**。

## 二、素材处理

- 源文件：`q版/1795280000653.png`，实际是 JPEG（1259×1259），已按真实格式读取。
- 抠图：从四角做容差 52 的漫水填充去掉纯白背景，边缘 0.7px 羽化，得到 63% 透明的贴纸；保留原画中的淡粉星星与作者水印（尊重署名）。
- 输出：`qyu-companion/character.png`（480×479，PNG 透明），以 base64 内嵌进 `client.js`，不依赖外部图片服务。
- 图标：由角色图缩放到 256×256 粉色圆角卡片，生成 `icon.png`（约 34 KB）。
- 音频：`音频/1.mp3` 与 `音频/2.mp3` 实际是 MP4/M4A 容器（`ftypmp42`），以 `data:audio/mp4;base64` 内嵌进 `client.js`（约 5.4 MB），无需 Host 路由、无需重启；浏览器解码为 AAC 播放。仅在点击（用户手势）时播放，符合自动播放策略。

## 三、已实现效果

| 效果 | 说明 |
|---|---|
| 🐾 右下角常驻 | 注册到 `shell.overlay`，层级高于所有列，不受会话滚动影响 |
| 🖱️ 拖拽移动 | Pointer Events + `setPointerCapture`，带边界约束；位置写入 `localStorage` (`qyu-companion-pos`)，刷新后保留 |
| 💬 点击冒话 | 每点一下推进一条台词（共 8 条，中英双语），5.2 秒后自动收起；首次进入 1.5 秒自动打招呼 |
| 🧸 按压 Q 弹 | 按下 `scale(.9) translateY(6px)`，松开用弹性 cubic-bezier 回弹；底部坐标不变，和鲸鱼娘一致 |
| 🔊 点击随机音效 | 点击时从 `音频/1.mp3`、`音频/2.mp3` 中随机播放一段，且不会连续抽到同一段；播放时角色旁冒出 ♪ 动画，音频结束自动消失 |
| ✨ 漂浮星星 | 三颗 CSS 星星错峰闪烁，呼应原画背景 |
| 🎨 主题适配 | 气泡使用 `--dsw-alias-bg-overlay` / `--dsw-alias-border-l2` / `--dsw-alias-label-primary`，自动跟随浅色/深色与前面装的玫瑰粉主题 |
| ♿ 无障碍 | `role="button"` + `aria-label`；文案优先走 Client locale 服务，服务不可用时回退到浏览器语言字典 |
| 🏷️ 欣宝铭牌 | 角色下方玫红小胶囊「欣宝」，右下角常驻可辨认 |
| 🎬 入场动画 | 每次加载从下方弹跳淡入（0.75s 弹性曲线），刷新后能明确看到它出现 |
| ⚙️ 设置菜单 | **右键角色 / 长按 0.9s / 悬停 ⚙ 按钮**打开；草稿态编辑，底部「取消 / 恢复默认 / 保存」，设置存 `localStorage` (`qyu-settings`) |
| 💰 DeepSeek 余额 | 角色下方常驻 `💰 CNY xx.xx` 胶囊，点开明细卡：总余额 / 赠金 / 充值余额 / 今日已用 / 更新时间 / 立即刷新；60 秒自动刷新，余额下降累加为「今日已用」，充值上升不计 |
| 🔔 余额预警 | 设置里可填阈值（默认 0 = 关闭），低于阈值冒一次提醒泡 |
| 🔊 音效设置 | 点击音效开关 + 音量滑块（0–100%）+ 试听按钮 |
| 💬 台词设置 | 台词泡泡开关、进场打招呼开关 |
| 🎚️ 外观设置 | 体型滑块 90–200px |
| 🧭 位置设置 | 一键「回到右下角」 |

## 三之二、余额服务的拆分

余额必须走 Host（Node）侧：DeepSeek 接口**没有 CORS 头**，浏览器直连读不到响应。但 `qyu-companion/index.js` 在宿主启动时已加载成空模块，改它必须重启 Harness 才生效。因此拆出一个**独立的 Host-only bundle** `@local/qyu-balance`：

- `qyu-balance/index.js` 注册 `GET /qyu-balance/balance.json`，读凭据 → 请求官方接口 → 归一化返回；带 `sec-fetch-site` / Origin 同源校验。
- 新 bundle 安装即通过 HMR 生效，**无需重启**。实测已返回真实数据：`CNY 5.38`（赠金 2.86 / 充值 2.52）。
- 客户端依次尝试三条路由：`/qyu-balance/balance.json` → `/qyu-companion/balance.json`（重启后可用）→ `/dsh-whale/balance.json`（若鲸鱼娘已挂载），任一可用即显示。
- 三个 `@local` bundle 均在 profile 中且 `enabled: true / active`。

## 四、安装与状态

- 插件包：`qyu-companion/`，包名 `@local/qyu-companion`；配套余额服务 `qyu-balance/`，包名 `@local/qyu-balance`
- 安装结果：两个 bundle 均 `application: applied`，无警告
- Host 行：`include:qyu-companion`、`include:qyu-balance` 均为 `enabled: true`，`fiberPhase: active`
- 与 `@local/yushuxin-appearance`（玫瑰粉主题 + 照片胶卷）共存，互不冲突
- 已配置 `DEEPSEEK_API_KEY` 时余额自动生效；未配置会显示提示，不报错

## 五、查看与自定义

1. 刷新 Web GUI（F5，若没生效请用 Ctrl+F5 强制刷新）加载新的客户端模块。
2. 右下角出现 Q 版欣宝，下方 `💰` 胶囊显示余额；点击角色说话 + 随机音效、按住拖动、松手回弹；**右键或长按打开设置**，改完点「保存」。
3. 改台词：`qyu-companion/client.template.js` 里的 `zh` / `en` 字典，重跑 `build_assets.py` 生成 `client.js`，再在插件管理器重装 bundle。
4. 改角色图：替换 `q版/` 里的源图后重跑 `build_assets.py`（脚本里 `src` 路径需同步）。
5. 换音效：替换 `音频/1.mp3`、`音频/2.mp3` 后重跑 `build_assets.py` 生成 `client.js`，再强制刷新页面（插件是 link 安装，无需重装）。
6. 卸载：插件管理器移除 `@local/qyu-companion` 与 `@local/qyu-balance`；`localStorage` 里的位置 / 设置数据可手动清除。

## 六、「欣宝不见了」排查与加固

用户反馈刷新后看不到右下角欣宝。核验结果：**模块文件完好**（5.6 MB、2 段音频 + 1 张角色图齐全）、**Host 行仍 `enabled: true / active`**、profile 的 link 目标完好 —— 不是被卸载或文件损坏，而是渲染层面的隐患。本次一次性加固：

| 隐患 | 修复 |
|---|---|
| 拖拽位置存 `localStorage` 时**读取端没有边界钳制**，窗口变小 / 换端口后可能记录了一个屏幕外的坐标 → 角色跑到可视区外 | 读取时统一 `clampPos()`；拖拽时也钳制；并监听 `resize` 自动拉回屏内 |
| `apply()` 同步调用 `ctx.locale.bind()`，若 locale 服务不可用会抛错**导致整个挂载中断** | locale 改为 `ctx.get('locale')` 可选依赖并 try/catch 包裹；`slots.inject` 只依赖 slots，保证一定执行 |
| `shell.overlay` 里后来加入的全屏氛围层/粒子 z-index 更高 | 欣宝 z-index 提到 `2147483647`（浏览器上限），`order` 提到 999，永远最上层 |
| 元素较小、和新加的主界面装饰混在一起不易发现 | 尺寸 120→132px、加入场弹跳动画、加玫红「欣宝」铭牌 |

**如果仍然看不到**：按 Ctrl+F5 强制刷新；或在浏览器控制台执行 `localStorage.removeItem('qyu-companion-pos')` 后刷新，即可回到右下角默认位置。

**版本确认（重要）**：打开设置菜单，标题右侧应显示 `v2.0`（含设置面板、余额卡的这一版）。如果显示旧版本或没有设置面板，说明浏览器仍在用缓存的旧 `client.js` —— 先 Ctrl+F5；若仍不行，需要让 Host 重新扫描客户端模块图（在插件管理器里移除再安装该 bundle 即可，或重启一次 Harness）。改完 `client.js` 后单纯刷新有时不够，就是这个原因。

## 七、验证边界

- 已验证：抠图透明度、图标尺寸、JS 语法、JSON 元数据、manifest、安装结果、Host 行激活、资源落盘、加固项逐条落在已安装模块中；**余额路由已用本地 HTTP 实测返回 200 + 真实余额数据**。
- 未验证：浏览器实际渲染像素、设置面板交互手感（本会话无浏览器自动化控制），需用户刷新后目视确认。
- 暂未实现（可作为下一轮）：每轮对话消耗（需读 Session token 投影）、峰谷定价、自定义泡泡模块库、多厂商余额。
