# Serpent Agent 对接指南

> Serpent 后端通过 HTTP API 暴露全部资产管理能力。任何能发 HTTP 请求的 AI Agent（Claude、GPT、自定义工具链）都可以直接集成。

---

## 快速开始

### 1. 启动后端

```powershell
# 开发环境（项目根目录）
.\scripts\serpent-process.ps1 start

# 验证健康
.\scripts\serpent-process.ps1 health
# {"port":19880,"status":"ok","libraries":0,"version":"0.3.3"}
```

### 2. 获取 API Token

Token 在首次启动时自动生成，存放于：

```
%APPDATA%\Serpent\api-token                    # 安装版
%APPDATA%\Serpent\dev-instances\<pid>\api-token  # 开发隔离实例
```

```bash
TOKEN=$(cat "$APPDATA/Serpent/api-token")
```

### 3. 发起第一个请求

```bash
curl -X POST http://127.0.0.1:19880/commands/serpent_library_list_open \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

## 架构概览

```
Agent (HTTP client)
    │
    ▼
POST /commands/{toolName}     ← 统一入口
    │
    ▼
Automation Gateway            ← 参数校验 + 能力检查 + 审计日志
    │
    ▼
LibraryService (27 域)        ← SQLite Worker 进程
    │
    ▼
SQLite + 文件系统             ← 资产存储
```

- **传输**：HTTP/1.1，JSON 请求/响应
- **认证**：Bearer token（静态长期凭据，无过期）
- **绑定**：默认 `127.0.0.1:19880`（仅本机），设 `SERPENT_HTTP_HOST=0.0.0.0` 可开放到局域网
- **命令数量**：59 个公开命令

---

## API 端点

| 方法 | 路径 | 认证 | 说明 |
|------|------|------|------|
| `GET` | `/ping` | ❌ | 存活探针 |
| `GET` | `/commands` | ✅ | JSON 命令目录（含参数 schema） |
| `GET` | `/openapi.json` | ✅ | OpenAPI 3.1 规范（可导入 API 工具） |
| `GET` | `/docs` | ✅ | HTML 文档页 |
| `POST` | `/commands/{toolName}` | ✅ | 执行命令 |

---

## 认证

所有端点（除 `/ping`）要求 Bearer token：

```http
Authorization: Bearer <token>
```

也支持 `X-Serpent-Token` 头。无 token 或 token 错误返回：

```json
{"ok": false, "code": "API_UNAUTHORIZED", "message": "Missing or invalid bearer token."}
```

---

## 命令调用格式

### 请求

```http
POST /commands/{toolName}
Authorization: Bearer <token>
Content-Type: application/json

{
  "libraryId": "uuid-of-library",    ← library 作用域命令必填
  "...command specific params...": ...
}
```

### 成功响应

```json
{
  "ok": true,
  "executed": true,
  "commandId": "asset.search",
  "result": { "...": "..." },
  "historyEntryId": "uuid",           ← 可撤销操作返回
  "undoGroupId": "uuid",              ← 批量撤销组
  "libraryChangeSequence": 42         ← 变更序号（乐观并发）
}
```

### 错误响应

```json
{
  "ok": false,
  "code": "ASSET_NOT_FOUND",
  "message": "Asset not found.",
  "retryable": false
}
```

### HTTP 状态码映射

| 状态码 | 含义 |
|--------|------|
| 200 | 成功（或结构化挑战） |
| 400 | 通用错误 |
| 404 | 资源/命令不存在 |
| 405 | 方法不允许 |
| 409 | 版本冲突 |
| 413 | 响应超预算 |
| 422 | 参数校验失败 |
| 429 | 执行数上限 |
| 500 | 内部错误 |
| 503 | 可重试（LIBRARY_BUSY 等） |

---

## 工作流：标准 Agent 会话

### 步骤 1：发现资源库

```bash
POST /commands/serpent_library_list_open   → 已打开的库
POST /commands/serpent_library_list_recent → 最近使用
```

### 步骤 2：打开资源库（如果没有打开的）

```bash
POST /commands/serpent_library_open
{"selectedLibraryPath": "D:/MyAssets/MyLibrary"}
```

或通过 libraryId 打开：

```bash
POST /commands/serpent_library_open
{"libraryId": "uuid-from-list-recent"}
```

### 步骤 3：浏览资产

```bash
POST /commands/serpent_asset_search
{"libraryId": "...", "query": "性能优化"}
```

```bash
POST /commands/serpent_asset_list
{"libraryId": "...", "folderId": "...", "limit": 50}
```

### 步骤 4：读取详情

```bash
POST /commands/serpent_asset_metadata_get
{"libraryId": "...", "assetId": "..."}
```

### 步骤 5：执行操作

```bash
# 修改评分
POST /commands/serpent_asset_rating_set
{"libraryId": "...", "assetId": "...", "rating": 5}

# 打标签
POST /commands/serpent_tag_create
{"libraryId": "...", "name": "性能优化"}

# 移入回收站
POST /commands/serpent_asset_trash
{"libraryId": "...", "assetIds": ["..."]}
```

### 步骤 6：撤销（如果需要）

```bash
POST /commands/serpent_history_undo
{"libraryId": "...", "expectedHistoryEntryId": "..."}
```

---

## 命令目录（59 个）

### 资源库管理

| 命令 | 说明 | 危险 |
|------|------|------|
| `serpent_library_list_open` | 列出已打开的库 | |
| `serpent_library_list_recent` | 列出最近使用的库 | |
| `serpent_library_create` | 创建新库 | |
| `serpent_library_open` | 打开库（按路径或 ID） | |
| `serpent_library_close` | 关闭库 | |
| `serpent_library_rename` | 重命名库 | |
| `serpent_library_inspect` | 检查库结构和状态 | |
| `serpent_library_export` | 导出库 | ⚠️ |
| `serpent_library_import_folder` | 从文件夹导入库 | |
| `serpent_library_import_zip` | 从 ZIP 导入库 | |
| `serpent_library_delete_from_disk` | 从磁盘删除库 | 🔴 |
| `serpent_library_change_sequence` | 获取变更序号 | |

### 文件夹

| 命令 | 说明 |
|------|------|
| `serpent_folder_list` | 列出文件夹和链接文件夹 |
| `serpent_folder_create` | 创建文件夹 |
| `serpent_folder_rename` | 重命名文件夹 |
| `serpent_folder_move` | 移动文件夹 |
| `serpent_folder_delete_empty` | 删除空文件夹 |

### 链接文件夹

| 命令 | 说明 |
|------|------|
| `serpent_linked_folder_create` | 创建链接文件夹 |
| `serpent_linked_folder_list` | 列出链接文件夹 |
| `serpent_linked_folder_refresh` | 刷新链接文件夹 |
| `serpent_linked_folder_relink` | 重新链接 |
| `serpent_linked_folder_remove` | 移除链接文件夹 |
| `serpent_linked_folder_rules_get` | 获取规则 |
| `serpent_linked_folder_rules_set` | 设置规则 |

### 资产

| 命令 | 说明 |
|------|------|
| `serpent_asset_list` | 列出/搜索资产 |
| `serpent_asset_search` | 全文搜索 |
| `serpent_asset_metadata_get` | 获取元数据 |
| `serpent_asset_metadata_set` | 设置元数据（单个） |
| `serpent_asset_metadata_set_many` | 批量设置元数据 |
| `serpent_asset_ai_content_get` | 获取 AI 分析结果 |
| `serpent_asset_extracted_metadata_get` | 获取提取的元数据 |
| `serpent_asset_preview_get` | 获取预览 |
| `serpent_asset_thumbnail_get` | 获取缩略图 |
| `serpent_asset_palette_aggregate_recent` | 聚合色板 |
| `serpent_asset_content_read` | 读取内容 |
| `serpent_asset_content_stage` | 暂存内容替换 |
| `serpent_asset_content_replace` | 替换内容 |
| `serpent_asset_content_replace_batch` | 批量替换内容 |
| `serpent_asset_move` | 移动资产 |
| `serpent_asset_copy` | 复制资产 |
| `serpent_asset_rename_file` | 重命名文件 |
| `serpent_asset_rename_files` | 批量重命名 |
| `serpent_asset_paths_copy` | 复制资产路径到剪贴板 |
| `serpent_asset_trash` | 移入回收站 |
| `serpent_asset_restore_if_original_vacant` | 恢复回收站资产 |
| `serpent_asset_list_trash` | 列出回收站 |
| `serpent_asset_delete_permanent` | 永久删除 | 🔴 |
| `serpent_asset_refresh` | 刷新资产 |

### 标签

| 命令 | 说明 |
|------|------|
| `serpent_tag_create` | 创建标签 |
| `serpent_tag_list` | 列出标签 |

### 合集

| 命令 | 说明 |
|------|------|
| `serpent_collection_list` | 列出合集 |
| `serpent_collection_create` | 创建合集 |
| `serpent_collection_update` | 更新合集 |
| `serpent_collection_delete` | 删除合集 |
| `serpent_collection_assets_add` | 添加资产到合集 |
| `serpent_collection_assets_remove` | 从合集移除资产 |
| `serpent_collection_assets_reorder` | 重排合集资产 |
| `serpent_collection_assets_list` | 列出合集资产 |
| `serpent_collection_reorder` | 重排合集 |

### AI 分析

| 命令 | 说明 |
|------|------|
| `serpent_ai_enqueue` | 入队 AI 分析 |
| `serpent_ai_jobs_status` | AI 任务状态 |

### 媒体任务

| 命令 | 说明 |
|------|------|
| `serpent_media_jobs_list` | 列出媒体任务 |
| `serpent_media_jobs_cancel` | 取消媒体任务 |
| `serpent_media_binaries_get` | 获取媒体二进制路径 |

### 历史操作

| 命令 | 说明 |
|------|------|
| `serpent_history_status` | 历史状态 |
| `serpent_history_undo` | 撤销 |
| `serpent_history_redo` | 重做 |
| `serpent_execution_status` | 执行状态 |

### 导入

| 命令 | 说明 |
|------|------|
| `serpent_file_import` | 文件导入 |

---

## 危险操作（两阶段确认）

标记 🔴 / ⚠️ 的命令需要两阶段确认。第一次调用返回 `executed: false` 和一个 challenge 对象：

```json
{
  "ok": true,
  "executed": false,
  "commandId": "asset.delete_permanent",
  "challenge": {
    "operation": "delete_permanent",
    "targetCount": 3,
    "message": "即将永久删除 3 个资产，此操作不可撤销。"
  }
}
```

Agent 收到 challenge 后，向用户展示确认信息，用户确认后使用对应的确认命令重新调用。

> **注意**：Bearer token 持有者视为操作员。当前实现中，challenge 为透传结构化信息，Agent 可根据自身策略决定是否重试执行。

---

## Agent 集成模式

### Claude (Anthropic)

使用 `claude code` 的 MCP 或直接 HTTP tool：

```json
{
  "name": "serpent_api",
  "description": "Serpent digital asset management API",
  "input_schema": {
    "type": "object",
    "properties": {
      "toolName": { "type": "string", "description": "Command name from /commands" },
      "input": { "type": "object", "description": "Command parameters" }
    }
  }
}
```

Claude 的 tool use 调用映射为：

```bash
curl -X POST "http://127.0.0.1:19880/commands/${toolName}" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "$input"
```

### OpenAI Function Calling

```json
{
  "type": "function",
  "function": {
    "name": "serpent_command",
    "description": "Execute a Serpent asset management command",
    "parameters": {
      "type": "object",
      "properties": {
        "toolName": { "type": "string" },
        "input": { "type": "object" }
      }
    }
  }
}
```

### 自定义 Python Agent

```python
import requests

class SerpentClient:
    def __init__(self, token: str, base_url: str = "http://127.0.0.1:19880"):
        self.base = base_url
        self.headers = {"Authorization": f"Bearer {token}"}

    def execute(self, tool_name: str, **kwargs) -> dict:
        resp = requests.post(
            f"{self.base}/commands/{tool_name}",
            headers=self.headers,
            json=kwargs,
            timeout=30,
        )
        resp.raise_for_status()
        return resp.json()

    def search(self, library_id: str, query: str) -> list:
        return self.execute("serpent_asset_search",
                            libraryId=library_id, query=query)["result"]["items"]

    def open_library(self, path: str) -> dict:
        return self.execute("serpent_library_open",
                            selectedLibraryPath=path)["result"]
```

---

## 发现 API

### 获取全部命令

```bash
curl -H "Authorization: Bearer $TOKEN" http://127.0.0.1:19880/commands
```

返回每个命令的：`toolName`、`commandId`、`summary`、`requiredCapabilities`、`inputSchema`（JSON Schema）。

### OpenAPI 集成

`/openapi.json` 可以直接导入：

- **Postman** → Import → OpenAPI 3.0
- **Insomnia** → Import → OpenAPI
- **Swagger UI** → 交互式浏览
- **LangChain** → `OpenAPISpec.from_spec()`

---

## 进程管理

```powershell
# 启动 / 停止 / 重启
.\scripts\serpent-process.ps1 start
.\scripts\serpent-process.ps1 stop
.\scripts\serpent-process.ps1 restart

# 状态 / 健康
.\scripts\serpent-process.ps1 status
.\scripts\serpent-process.ps1 health
```

---

## 安全模型

| 层 | 机制 |
|----|------|
| 网络 | 默认绑定 `127.0.0.1`（仅本机），`SERPENT_HTTP_HOST=0.0.0.0` 开放局域网 |
| 认证 | Bearer token（32 字节 hex，首次启动生成） |
| 授权 | Token = 操作员，全能力 |
| 审计 | 所有操作记录在 automation-execution-journal |
| 危险操作 | 结构化 challenge（Agent 自主决策） |
| 撤销 | 可逆操作自动记录 undo/redo 条目 |

> **注意**：token 持有者拥有全部能力，与桌面版操作员等同。请勿将 token 暴露给不受信任的网络。
