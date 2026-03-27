### AI 前端应用

人工智能与前端结合主要体现在：**用户交互体验**（ChatBot、智能推荐、搜索）、**工程效能**（AI 辅助编码）与 **WebAI 运行时**（浏览器内跑模型）。

---

#### 一、前端调用 AI API

最常见方式：通过 **HTTP/WebSocket** 调用后端或第三方模型 API（OpenAI、Claude、文心一言等），前端负责 **UI 与流式响应**。

##### 典型流程

```
用户输入 → 前端发送 → 后端/LLM API → 流式返回（SSE/WebSocket）→ 前端逐字渲染
```

##### 流式响应示例（SSE）

```ts
async function chat(prompt: string, onChunk: (text: string) => void) {
  const resp = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });

  const reader = resp.body?.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader!.read();
    if (done) break;
    const chunk = decoder.decode(value);
    onChunk(chunk); // 逐块回调更新 UI
  }
}
```

---

#### 二、浏览器内运行模型（WebAI）

##### 技术栈

| 技术 | 说明 |
| ---- | ---- |
| **ONNX Runtime Web** | 运行 ONNX 格式模型（TensorFlow/PyTorch 可导出），支持 WebAssembly/WebGL/WebGPU |
| **TensorFlow.js** | 在浏览器训练/推理，API 与 Python 版类似 |
| **MediaPipe** | Google 视觉/姿态检测方案（Web 版） |
| **Transformers.js** | Hugging Face 模型在浏览器推理 |

##### 示例（ONNX 图像分类）

```js
import * as ort from 'onnxruntime-web';

const session = await ort.InferenceSession.create('/model.onnx');
const tensor = new ort.Tensor('float32', imageData, [1, 3, 224, 224]);
const result = await session.run({ input: tensor });
```

**权衡**：模型体积、推理速度 vs 隐私（不传后端）；小模型（几 MB）可行，大模型（几 GB）需后端。

---

#### 三、常见前端 AI 场景

| 场景 | 方案 | 说明 |
| ---- | ---- | ---- |
| **对话界面（ChatBot）** | 调 API + 流式渲染 | Markdown 渲染、代码高亮、输入防抖 |
| **智能搜索/推荐** | 向量检索 API | 用户输入 → embedding → 余弦相似度排序 |
| **实时字幕/翻译** | WebRTC + STT API | 捕获音频 → 语音识别 API → 渲染 |
| **AI 绘图** | Stable Diffusion API | 配置 prompt、负面词、参数；展示进度与结果 |
| **代码补全/生成** | Copilot 类 | IDE 插件或 Web IDE（Monaco + Language Server） |
| **OCR / 图像分类** | 浏览器内小模型 | TensorFlow.js 或 ONNX，隐私场景适用 |

---

#### 四、技术要点

##### 1. 流式渲染（打字机效果）

```tsx
function ChatMessage({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed((prev) => prev + text[i]);
        i++;
      } else clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [text]);
  
  return <div>{displayed}</div>;
}
```

##### 2. 防滥用与限流

- **前端防抖**：避免用户连发；显示「生成中」状态禁用发送。
- **后端**：Rate Limit、Token 计费、敏感词过滤。

##### 3. Markdown 与代码高亮

多数 LLM 返回 Markdown；前端用 **`marked` / `markdown-it`** 解析，配合 **`highlight.js`** 或 **Prism** 做代码块高亮。

---

#### 五、开发建议

- **隐私与合规**：用户数据传 LLM 需明示，遵守 GDPR 等；可考虑本地小模型或脱敏。
- **成本**：Token 计费，大模型贵；生产环境做好**缓存、摘要、分段**，减少重复调用。
- **错误处理**：API 限额、超时、生成违规内容等需优雅降级（重试、默认回复）。
- **用户体验**：加载态、打字机动画、停止生成按钮、历史对话管理。

---

#### 相关资源

- Vite 可配合本站 [Vite 基础](/vite/) 章节。
- OpenAI API 文档：<https://platform.openai.com/docs>
- Hugging Face Transformers.js：<https://huggingface.co/docs/transformers.js>
- ONNX Runtime Web：<https://onnxruntime.ai/docs/tutorials/web/>
