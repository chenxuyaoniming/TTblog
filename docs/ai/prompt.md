### Prompt Engineering（提示词工程）

与 LLM（大语言模型）对话时，**如何提问**直接影响回复质量；Prompt Engineering 是一套让模型更准、更符合需求的技巧集合。

---

#### 一、基础原则

| 原则 | 说明 |
| ---- | ---- |
| **清晰具体** | 明确任务边界、输出格式；避免模糊的「帮我写代码」 |
| **提供上下文** | 背景信息、角色设定、约束条件 |
| **分步引导** | 复杂任务拆解为子问题（Chain-of-Thought） |
| **示例学习** | Few-shot：给 1–3 组输入输出示例 |

---

#### 二、常用技巧

##### 1. 角色扮演（Role Prompting）

```
你是一位精通 React 性能优化的高级前端工程师。
请分析以下组件的性能瓶颈，并给出重构建议...
```

##### 2. 思维链（Chain-of-Thought, CoT）

```
请一步步推理：
1. 首先分析原型链查找路径
2. 然后说明 this 绑定规则
3. 最后给出输出结果与原因
```

##### 3. 格式约束

```
以 JSON 格式返回，包含以下字段：
{ "summary": "摘要", "tags": ["标签1", "标签2"], "score": 85 }
```

##### 4. Few-shot 示例

```
示例 1：
输入：const a = [1,2]; a.push(3);
输出：改变原数组，返回新长度 3

示例 2：
输入：const b = [1,2]; b.concat(3);
输出：不改变原数组，返回新数组 [1,2,3]

现在请分析：const c = [1,2]; c.slice(0, 1);
```

---

#### 三、在前端应用中集成

##### 系统提示（System Prompt）

多数 API（OpenAI、Claude）支持 **system** 消息设定行为；可预设角色、输出格式、禁止事项等，减少每次用户消息重复。

```ts
const messages = [
  {
    role: 'system',
    content: '你是代码审查助手，只返回 JSON 格式 {issues: [...], score: 0-100}。'
  },
  { role: 'user', content: userInput }
];
```

##### 动态拼接上下文

```ts
const context = `
当前项目技术栈：${tech}
用户权限：${role}
上次对话摘要：${history}

用户问题：${question}
`;
```

---

#### 四、进阶策略

| 策略 | 说明 |
| ---- | ---- |
| **ReAct** | 推理（Reasoning） + 行动（Acting），让模型先思考、再决定调用什么工具 |
| **Self-Consistency** | 同一问题生成多次，投票选最优 |
| **反思（Reflection）** | 让模型评审自己的输出，再改进 |

---

#### 五、常见坑与优化

- **Token 超限**：长对话需**截断、摘要或向量检索**相关部分，避免超上下文窗口。
- **幻觉**：模型可能编造事实；**关键逻辑需校验**（如代码跑测试、数据查数据库）。
- **成本**：频繁调大模型贵；可**前端缓存**相同问题、用小模型分流简单意图。
- **安全**：用户输入可能含**Prompt Injection**（绕过限制），需过滤或在 system 中声明拒绝策略。

---

#### 六、学习资源

- [OpenAI Prompt 工程指南](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic Claude Prompt 库](https://docs.anthropic.com/claude/docs/prompt-library)
- [LangChain 文档](https://js.langchain.com/)（前端可用 JS 版封装 Prompt 模板与工具链）

---

与本站对应：AI 应用开发可配合 [JS Promise](/js/promise)（异步处理）、[React](/react/) / [Vue](/vue/)（UI 交互）、[HTTP](/http/)（API 调用）章节。
