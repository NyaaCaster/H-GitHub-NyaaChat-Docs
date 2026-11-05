# QinyApi设置
![](/images/sillytavern-qinyapi/qinyapi-settings.png)

| API | 聊天补全 |
| --- | --- |
| 聊天补全来源 | 自定义（兼容OpenAI） |
| 自定义端点（基础 URL） | 国内使用：`https://openai.chatnewai.com/v1`<br/>海外使用：`https://love.qinyan.icu/v1`<br/>(可在[兑换码购买页](https://qyapi.qinyan.xyz/)面查看) |
| 自定义 API 密钥 | 在[令牌管理页面](https://love.qinyan.icu/console/token)复制<br/>注意正确的密钥开头为`sk-`<br/>令牌分组建议使用<br/>`Gemini-Antigravity Ultra` 分组<br/>![img](/images/sillytavern-qinyapi/qinyapi-token-group.png) |
| 输入模型名 | ！！！不要手动输入！！！ |
| 可用模型名 | 在下方点击`连接`后，当连接状态显示为`🟢Valid`后可下拉选择<br/>`gemini-3.8-flash` |
| 提示词后处理 | 未选择<br/>！！！不要瞎改！！！ |
| 发送测试消息 | ！！！不要点！！！ |
| 自动连接到上次的服务器 | 请勾选 |


---

# 安装 酒馆助手
### 进入 扩展-安装扩展
![](/images/sillytavern-qinyapi/install-extension-menu.png)

### 在地址栏中输入安装地址
![](/images/sillytavern-qinyapi/install-extension-url.png)

#### 安装地址
+ 需要开梯子，用日美节点，电脑要打开Tun（虚拟网卡）模式

```plain
https://github.com/n0vi028/JS-Slash-Runner.git
```

### 调整 渲染器
1. 在`扩展`列表找到`酒馆助手`，进入`渲染器`标签页
2. 把`渲染深度`改为：`3`或`5`或`7`

![](/images/sillytavern-qinyapi/tavern-helper-renderer.png)

注意：非必要 **不要开启小白X的渲染器**，避免冲突

---

# 安装 记忆插件+隐藏楼层
## 安装 增强记忆表格
用于加强聊天记忆，防止模型失忆

### 进入 扩展-安装扩展
![](/images/sillytavern-qinyapi/install-extension-menu.png)

### 在地址栏中输入安装地址
![](/images/sillytavern-qinyapi/install-extension-url.png)

#### 安装地址
+ 需要开梯子，用日美节点，电脑要打开Tun（虚拟网卡）模式

```plain
https://github.com/muyoou/st-memory-enhancement.git
```

### ⚠安装完后不要改任何东西⚠
+ 安装成功后顶部菜单会出`增强记忆表格`界面
+ ⚠安装完后不要改任何东西⚠

![](/images/sillytavern-qinyapi/memory-enhancement.png)

:::warning
**注意**：装记忆插件前的旧对话别要了，开新对话

:::

## 导入 楼层屏蔽正则
用于减少对话记录造成的Token开销叠加

### 下载正则文件
【regex-🐈️楼层屏蔽正则.nyaa】

下载地址：[http://h.nyaa.host:5244/sd/77lQQ1k0](http://h.nyaa.host:5244/sd/77lQQ1k0)

### 进入 扩展-正则
![](/images/sillytavern-qinyapi/regex-menu.png)

### 导入至 全局正则
![](/images/sillytavern-qinyapi/import-global-regex.png)

把`regex-🐈️楼层屏蔽正则.nyaa`导入至`全局正则脚本`

![](/images/sillytavern-qinyapi/global-regex-script.png)

### 保持【🐈楼层屏蔽正则】开启状态
在全局正则中打开【🐈楼层屏蔽正则】的开关，保持不要关闭

![](/images/sillytavern-qinyapi/enable-floor-filter.png)

---

# 调整预设
![](/images/sillytavern-qinyapi/preset-settings.png)

| **项目** | **内容** |
| --- | --- |
| **选用预设** | Default（默认预设） |
| **上下文长度** | 1000000 |
| **最大回复长度** | 65535 |
| **流式传输** | 关闭 |

# 5. 临时对话

上述 1~4 配置完成后，回到`酒馆主页`

- 如果在对话中，从输入栏左侧三道杠图标打开菜单，使用`关闭聊天`回到`酒馆主页`

![img](/images/sillytavern-qinyapi/close-chat.png)![](/images/sillytavern-qinyapi/temporary-chat.png)

然后进入`临时聊天`，发一句`你好`，看是否成功回复
- 如果没有成功，全窗口截图`酒馆控制台`发到群里咨询
  - PC上是`酒馆控制台`是启动`start.bat`后出现的命令行窗口
  - 安卓手机上`酒馆控制台`是输入酒馆启动命令的`Termux`应用窗口
    - 注意安卓手机上保持`Termux`应用窗口小窗模式保持在前台，否则进程容易休眠导致服务无响应
- 如果成功，可以去找角色卡和预设正式开始聊天了
  - 现在公共API如：Gemini、Claude、GPT，都开启了主动学习能力反破甲，无法有效破开，对话时如果使用第三方预设，请不要`开启`对话中的破甲功能，并主要角色卡中`不要`出现色情暴力反社会等违禁内容。
