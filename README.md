# 虞书欣主题 · DSH 外观插件集（完整版）1218

一套 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web 界面外观插件：玫瑰粉主题、可循环滑动的 107 张照片胶片、右下角 Q 版欣宝挂件（设置菜单 + DeepSeek 余额显示），以及「小石榴」粉丝元素。

> 本仓库为**完整版**：代码、素材与已生成的 `client.js` 全部包含，clone 后可直接安装使用，无需自备素材或重新构建。

## 效果

- 🌸 **玫瑰粉主题**：背景 / 层级 / 边框 / 品牌色 / 侧栏，浅色深色各一套，通过 `theme.overrideTokens()` 叠加，不改动内置主题
- 🎞️ **107 张照片循环胶片**：3 份拷贝无缝循环、自动从右到左缓慢滑动；悬停只减速不停；拖拽 / 箭头 / 上滑手势都能浏览；点击或上滑放大为灯箱 + 粒子特效；hover 有 3D 倾斜浮动 + 嗒声音效
- 🍎 **小石榴元素**：顶栏徽章、会话头像、Hero 肖像、全屏飘落粒子、胶片齿孔与石榴摆件
- 🐾 **Q 版欣宝**：右下角常驻、拖拽记忆、Q 弹、随机音效；右键 / 长按 / ⚙ 打开设置菜单（音效、台词、体型、余额、位置）
- 💰 **DeepSeek 余额**：Host 侧读取 `DEEPSEEK_API_KEY`，浏览器只拿到归一化余额（总余额 / 赠金 / 充值余额 / 今日已用），60 秒自动刷新

## 目录

```text
packages/
  yushuxin-appearance/   主题 + 循环胶片（含 client.js）
  qyu-companion/         Q版欣宝 + 设置 + 余额客户端（含 client.js）
  qyu-balance/           Host 侧余额路由
assets/
  photos/                107 张照片
  character/             Q版形象
  audio/                 两段音频
docs/                     两份中文设计说明
scripts/build_all.py      重新生成 client.js（可选）
```

## 安装

在 Harness 会话里让 Agent 执行：

```
install_bundle  target = <仓库路径>/packages/yushuxin-appearance
install_bundle  target = <仓库路径>/packages/qyu-companion
install_bundle  target = <仓库路径>/packages/qyu-balance
```

也可：

```bash
dsh plugin --profile web add link:<仓库路径>/packages/yushuxin-appearance
```

安装后 **Ctrl+F5 强制刷新** Web GUI。想看余额需先配置 DeepSeek API Key 或登录 DeepSeek 账号。

### 版本确认

- 胶片标题「小石榴」徽章右侧应显示 `v2.0`
- 欣宝设置菜单标题右侧应显示 `v2.0`

看不到就说明浏览器还在用旧模块：Ctrl+F5；仍不行则重启 Harness（改完 `client.js` 后需要让 Host 重新扫描模块图，移除再安装 bundle 也会触发）。

## 重新构建（可选）

```bash
pip install Pillow numpy
python scripts/build_all.py
```

会从 `assets/` 重新内嵌素材生成两个 `client.js`。

## 说明

- 三个包互相独立，可只装需要的部分
- `qyu-companion` 的余额卡需要 Host 侧路由（`qyu-balance`）才能出数据
- 代码 MIT（`LICENSE`）。素材随本仓库一并提供，请自行确认使用范围与授权情况
- 参考 [DeepSeek-Balance-Whale-Widget](https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget) 的交互与 [DeepSeek 余额 API](https://api-docs.deepseek.com/zh-cn/api/get-user-balance)
