### LangChain.js 前端集成

**LangChain** 是多语言的 LLM 应用开发框架，封装了 **Prompt 模板、Memory、Agent、RAG** 等模式；**LangChain.js** 可在 Node 与浏览器中运行（浏览器版需注意打包体积与 API Key 安全）。

---

#### 一、核心概念

| 模块 | 作用 |
| ---- | ---- |
| **Model** | 调用 LLM（OpenAI、Claude 等）或 Embedding 模型 |
| **Prompt Template** | 参数化 Prompt，避免字符串拼接错误 |
| **Chain** | 串联多步骤（如「检索 → 总结 → 回答」） |
| **Memory** | 维持对话历史（短期 Buffer、摘要、向量检索） |
| **Agent** | 动态决策调用工具（计算器、搜索、数据库等） |
| **Vector Store** | 对接向量数据库（Pinecone、Chroma 等） |

---

#### 二、安装与基础使用

```bash
npm install langchain
# 若用 OpenAI
npm install @langchain/openai
```

##### 简单调用 LLM

```ts
import { ChatOpenAI } from '@langchain/openai';

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY, // 浏览器环境需后端代理
  modelName: 'gpt-3.5-turbo',
  temperature: 0.7
});

const resp = await model.invoke('什么是闭包？');
console.log(resp.content);
```

---

#### 三、Prompt 模板

```ts
import { PromptTemplate } from '@langchain/core/prompts';

const template = new PromptTemplate({
  inputVariables: ['tech', 'question'],
  template: `
你是 {tech} 专家。
用户问题：{question}
请给出简洁专业的回答。
  `
});

const prompt = await template.format({ tech: 'React', question: '什么是 Fiber？' });
const answer = await model.invoke(prompt);
```

---

#### 四、链（Chain）—— 串联多步骤

```ts
import { LLMChain } from 'langchain/chains';

const chain = new LLMChain({
  llm: model,
  prompt: template
});

const result = await chain.call({ tech: 'Vue', question: 'computed 原理？' });
```

进阶：**SequentialChain** 可串多个子 Chain；**MapReduceChain** 用于并行处理多文档。

---

#### 五、Memory（对话记忆）

```ts
import { BufferMemory } from 'langchain/memory';
import { ConversationChain } from 'langchain/chains';

const memory = new BufferMemory();
const conversation = new ConversationChain({ llm: model, memory });

await conversation.call({ input: '我叫小明' });
// => "你好小明！"
await conversation.call({ input: '我叫什么名字？' });
// => "你叫小明。"（Memory 保留了上轮）
```

| Memory 类型 | 说明 |
| ----------- | ---- |
| **BufferMemory** | 保留所有历史（Token 会增长） |
| **SummaryMemory** | 定期让 LLM 总结旧对话 |
| **VectorStoreMemory** | 向量检索相关历史（超长对话） |

---

#### 六、Agent（工具调用）

Agent 让模型动态决定**调哪个工具**（搜索、计算器、数据库等），并根据结果再思考下一步。

```ts
import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { SerpAPI } from 'langchain/tools';
import { Calculator } from 'langchain/tools/calculator';

const tools = [new SerpAPI(), new Calculator()];
const agent = await initializeAgentExecutorWithOptions(tools, model, {
  agentType: 'zero-shot-react-description'
});

const result = await agent.call({
  input: '北京今天天气如何？最高温度的平方根是多少？'
});
// 模型会先调搜索工具 → 得到温度 → 再调计算器 → 返回结果
```

**前端注意**：Agent 多次调用，Token 消耗大；适合后端或由前端按步骤展示中间过程。

---

#### 七、RAG 示例

```ts
import { OpenAIEmbeddings } from '@langchain/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { RetrievalQAChain } from 'langchain/chains';

// 1. 构建向量库（离线或初始化时）
const docs = [
  { pageContent: 'React 是...' },
  { pageContent: 'Vue 是...' }
];
const embeddings = new OpenAIEmbeddings();
const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

// 2. 在线检索 + 问答
const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
const answer = await chain.call({ query: 'React 和 Vue 区别？' });
```

---

#### 八、前端集成建议

- **API Key 安全**：浏览器直连时 Key 暴露；推荐**后端代理**（`/api/langchain` → 调实际 API）。
- **打包体积**：LangChain.js 依赖多，生产按需导入；浏览器端仅保留 UI 与调用逻辑，复杂 Chain 放服务端。
- **流式响应**：LangChain 支持 **Streaming**，可在 `callbacks` 里逐 token 回调更新 UI。

```ts
const resp = await model.invoke('解释闭包', {
  callbacks: [
    {
      handleLLMNewToken(token: string) {
        appendToUI(token); // 逐字更新
      }
    }
  ]
});
```

---

#### 九、学习资源

- [LangChain.js 官方文档](https://js.langchain.com/docs/)
- 示例项目：ChatBot、文档问答、代码助手等（可在 GitHub 搜 `langchain js example`）

---

与本站对应章节：[AI 基础](/ai/)、[RAG](/ai/rag)、[Prompt Engineering](/ai/prompt)。
