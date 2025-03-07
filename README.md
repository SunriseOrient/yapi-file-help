# Yapi File Help

> 通过 Yapi 提供的 OpenApi 自动生成接口列表、typescript 接口文件，支持自定义生成模版。

### 使用

在工作空间根目录下新建 yapi.conf.json

```json
  "yapiConfig": {
    "token": "a4816309xxxd078761255xxx5fbd7ffc5da5ed9xxxc6c2608",
    "baseUrl": "http://yapi.dev.xxxx.net"
  },
  // 该值不配置则不显示通过模版生成api按钮
  "template": "apiTemp.tmpl"
```

### 核心功能

- 提供可视化的侧边窗口
- 生成 api 至剪贴板
- 生成 typing 至剪贴板
- 通过自定义模版生成至剪贴板

### 通过自定义模版生成至剪贴板说明

模版解析引擎使用：Handlebars
模版参数：
- 名称：***interfaces***，类型：集合，元素：[yapi接口文档](https://hellosean1025.github.io/yapi/openapi.html)中"/api/interface/get"返回对象

助手代码：

path：/api/jxplus/invoice/account/commitAccountData

- {{api_1 path}} ==> commitAccountData
- {{api_2 path}} ==> accountCommitAccountData
- {{api_3 path}} ==> invoiceAccountCommitAccountData

模版示例：

```txt
{{#each interfaces}}
/**
 * {{title}}
 * @author {{username}}
 */
export function {{api_1 path}}(data?: Params) {
  return ajax.post("{{path}}", data);
}
{{/each}}
```