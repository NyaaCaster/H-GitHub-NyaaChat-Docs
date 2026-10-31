# QinyApi设置
![](https://cdn.nlark.com/yuque/0/2026/png/64496860/1789261465480-c0a2ee91-2dbc-4298-924e-1cd7da1543d4.png)

| API | 聊天补全 |
| --- | --- |
| 聊天补全来源 | 自定义（兼容OpenAI） |
| 自定义端点（基础 URL） | [https://love.qinyan.icu/v1](https://love.qinyan.icu/register?aff=btB0)<br/>(可在[兑换码购买页](https://qyapi.qinyan.xyz/)面查看) |
| 自定义 API 密钥 | 在[令牌管理页面](https://love.qinyan.icu/console/token)复制<br/>注意正确的密钥开头为`sk-`<br/>令牌分组建议使用<br/>`Gemini-Antigravity Ultra` 分组<br/>![img](https://cdn.nlark.com/yuque/0/2026/png/64496860/1792167199580-99f47ab2-7b8d-403b-80aa-f7e92e5342b6.png) |
| 输入模型名 | ！！！不要手动输入！！！ |
| 可用模型名 | 在下方点击`连接`后，当连接状态显示为`🟢Valid`后可下拉选择<br/>`gemini-3.8-flash` |
| 提示词后处理 | 未选择<br/>！！！不要瞎改！！！ |
| 发送测试消息 | ！！！不要点！！！ |
| 自动连接到上次的服务器 | 请勾选 |


---

# 安装 酒馆助手
### 进入 扩展-安装扩展
![](https://cdn.nlark.com/yuque/0/2026/png/64496860/1782015471591-bccfa845-0ee1-48c5-980c-ca7704b2ae06.png)

### 在地址栏中输入安装地址
![](https://cdn.nlark.com/yuque/0/2026/png/64496860/1782015503824-4f9200f2-fa6a-4364-bd54-c72e135a0342.png)

#### 安装地址
+ 需要开梯子，用日美节点，电脑要打开Tun（虚拟网卡）模式

```plain
https://github.com/n0vi028/JS-Slash-Runner.git
```

### 调整 渲染器
1. 在`扩展`列表找到`酒馆助手`，进入`渲染器`标签页
2. 把`渲染深度`改为：`3`或`5`或`7`

![](https://cdn.nlark.com/yuque/0/2026/png/64496860/1768557588956-5f28f0b0-70a2-429f-b137-b1d8cbee5017.png)

注意：非必要 **不要开启小白X的渲染器**，避免冲突

---

# 安装 记忆插件+隐藏楼层
## 安装 增强记忆表格
用于加强聊天记忆，防止模型失忆

### 进入 扩展-安装扩展
![](https://cdn.nlark.com/yuque/0/2026/png/64496860/1782015471591-bccfa845-0ee1-48c5-980c-ca7704b2ae06.png)

### 在地址栏中输入安装地址
![](https://cdn.nlark.com/yuque/0/2026/png/64496860/1782015503824-4f9200f2-fa6a-4364-bd54-c72e135a0342.png)

#### 安装地址
+ 需要开梯子，用日美节点，电脑要打开Tun（虚拟网卡）模式

```plain
https://github.com/muyoou/st-memory-enhancement.git
```

### ⚠安装完后不要改任何东西⚠
+ 安装成功后顶部菜单会出`增强记忆表格`界面
+ ⚠安装完后不要改任何东西⚠

![](https://cdn.nlark.com/yuque/0/2026/png/64496860/1782016500211-1d1989ba-c766-49eb-84b6-fb0d2ed67500.png)

:::warning
**注意**：装记忆插件前的旧对话别要了，开新对话

:::

## 导入 楼层屏蔽正则
用于减少对话记录造成的Token开销叠加

### 下载正则文件
【regex-🐈️楼层屏蔽正则.nyaa】

下载地址：[http://h.nyaa.host:5244/sd/77lQQ1k0](http://h.nyaa.host:5244/sd/77lQQ1k0)

### 进入 扩展-正则
![](https://cdn.nlark.com/yuque/0/2026/png/64496860/1782016728890-c90c01e2-4272-49a4-baa4-de2467ead4be.png)

### 导入至 全局正则
![](https://cdn.nlark.com/yuque/0/2026/png/64496860/1782017026378-f77e3289-2c00-4f71-af41-0f9e377c2d14.png)

把`regex-🐈️楼层屏蔽正则.nyaa`导入至`全局正则脚本`

![](https://cdn.nlark.com/yuque/0/2026/png/64496860/1782016921232-0c8e4dd2-90f9-4673-a113-b6fb38bff2e5.png)

### 保持【🐈楼层屏蔽正则】开启状态
在全局正则中打开【🐈楼层屏蔽正则】的开关，保持不要关闭

![](https://cdn.nlark.com/yuque/0/2026/png/64496860/1782017140811-90b2e022-9fa3-4d37-a915-6f29816ae59d.png)

---

# 调整预设
![](https://cdn.nlark.com/yuque/0/2026/png/64496860/1782014618325-43235996-4f42-4c79-a95a-e3ff2e418499.png)

| **项目** | **内容** |
| --- | --- |
| **选用预设** | Default（默认预设） |
| **上下文长度** | 1000000 |
| **最大回复长度** | 65535 |
| **流式传输** | 关闭 |

# 5. 临时对话

上述 1~4 配置完成后，回到`酒馆主页`

- 如果在对话中，从输入栏左侧三道杠图标打开菜单，使用`关闭聊天`回到`酒馆主页`

![img](https://cdn.nlark.com/yuque/0/2026/png/64496860/1790987568681-1e54206c-679d-4cd6-854d-595b2832e513.png)![](https://cdn.nlark.com/yuque/0/2026/png/64496860/1790987633130-45f21af1-7289-400c-b4ba-d28354936b57.png)

然后进入`临时聊天`，发一句`你好`，看是否成功回复

- 如果成功，可以去找角色卡和预设正式开始聊天了（gemini3.8flash破甲推荐`类脑`的`小猫之神`预设）
- 如果没有成功，全窗口截图`酒馆控制台`发到群里咨询

- - PC上是`酒馆控制台`是启动`start.bat`后出现的命令行窗口
  - 安卓手机上`酒馆控制台`是输入酒馆启动命令的`Termux`应用窗口

- - - 注意安卓手机上保持`Termux`应用窗口小窗模式保持在前台，否则进程容易休眠导致服务无响应
