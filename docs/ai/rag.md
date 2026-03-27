### 向量检索（RAG 基础）

RAG（Retrieval-Augmented Generation，检索增强生成）：在 LLM 生成前，先从外部知识库**检索**相关文档，拼入上下文，让回复更准确、可控。前端参与的是 **UI 与调用流程**；向量检索本身多在后端 + 向量数据库。

---

#### 一、基本原理

```
用户问题 → embedding(文本→向量) → 向量数据库相似度搜索 → Top K 文档 → 拼入 Prompt → LLM 生成
```

1. **离线构建**：把知识库文档（FAQ、产品文档等）切块、**嵌入（Embedding）** 转成向量，存向量数据库（如 Pinecone、Milvus、Qdrant、Chroma）。
2. **在线查询**：用户问题也转向量 → 数据库 **余弦相似度** 或 **欧氏距离** 查询 → 返回最相关 K 条。
3. **LLM 调用**：把检索文档 + 用户问题 → 组装 Prompt → 调用模型 → 得到有依据的回复。

---

#### 二、前端职责

| 环节 | 前端做什么 |
| ---- | ---------- |
| **输入** | 用户提问框、参数配置（Top K、相似度阈值） |
| **调用** | `fetch('/api/search', { query })` 或直接调向量数据库（需鉴权） |
| **展示结果** | 渲染引用来源（`[文档标题]`）、相似度分数、高亮匹配片段 |
| **LLM 对话** | 结合检索结果拼 Prompt，调 LLM，流式展示回复 |

---

#### 三、前端示例（简化）

```tsx
import { useState } from 'react';

function RAGChat() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [sources, setSources] = useState([]);

  async function handleSearch() {
    // 1. 向量检索
    const searchResp = await fetch('/api/vector-search', {
      method: 'POST',
      body: JSON.stringify({ query, topK: 3 })
    });
    const { results } = await searchResp.json();
    setSources(results); // [{ text, score, meta }]

    // 2. 拼接上下文调 LLM
    const context = results.map((r) => r.text).join('\n\n');
    const prompt = `参考以下资料回答：\n${context}\n\n问题：${query}`;

    const llmResp = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ prompt })
    });
    const { answer: ans } = await llmResp.json();
    setAnswer(ans);
  }

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>提问</button>
      {answer && <div>{answer}</div>}
      <h4>参考来源</h4>
      {sources.map((s, i) => (
        <div key={i}>
          [{s.meta.title}] 相似度: {s.score.toFixed(2)}
        </div>
      ))}
    </div>
  );
}
```

---

#### 四、Embedding 模型选择

| 模型 | 说明 |
| ---- | ---- |
| **OpenAI text-embedding-ada-002** | 通用，API 调用方便 |
| **sentence-transformers（开源）** | 可自部署，中文需选对应版本 |
| **M3E、bge 系列** | 国内社区中文效果好 |

前端通常**不直接做 Embedding**（模型几百 MB、推理慢），由后端或专门服务完成；若需浏览器内可用 **Transformers.js** 加载小型 embedding 模型。

---

#### 五、向量数据库（后端，前端了解概念）

| 数据库 | 说明 |
| ------ | ---- |
| **Pinecone** | 托管服务，上手快 |
| **Milvus** | 开源，功能强 |
| **Qdrant** | Rust 实现，性能好 |
| **Chroma** | Python，开发友好 |
| **Weaviate** | GraphQL 接口 |

前端通过 **HTTP API** 或 SDK 查询即可。

---

#### 六、与本站其他章节关系

- **HTTP 与异步**：[HTTP](/http/)、[Promise](/js/promise) 用于调 API。
- **性能**：向量检索结果可前端缓存（`localStorage` / `IndexedDB`），参考 [缓存](/html/cache)。
- **工程化**：打包配置排除大模型文件（若有），参考 [Webpack](/webpack/) / [Vite](/vite/)。

---

#### 七、学习建议

先理解 **embedding + 余弦相似度** 概念；可用 OpenAI Embedding API 快速验证；再深入可学 **LangChain.js**（封装 RAG、Agent 等模式）。
