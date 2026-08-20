---
title: 安装与配置
description: 下载 HAC 和插件，完成应用配置、设备检查、扫码广播设置和首次运行验证。
sidebar:
  order: 1
---

本部分用于把活字格应用部署到 HAC 和 PDA。先准备应用、插件和设备，再完成配置码导入，最后用一个最小业务流程验证登录、网络和设备能力。

## 使用前提

- Android 版本不低于 `8.0`。
- 运行内存建议不低于 `2GB`。
- 活字格应用已发布到设备可访问的服务器。
- 设计器中已安装需要的 PDA / Android 交互命令插件。
- 目标 PDA 的 WebView、系统权限、网络和硬件能力已验证。

这些是当前文档的验证基线，不替代具体设备和版本的厂商要求。

## 下载地址

- HAC 应用：[下载地址](https://github.com/kadbbz/HAC_lowcode_app_for_android_based_on_webview/releases)
- HAC 插件：[插件市场](https://marketplace.grapecity.com.cn/ApplicationDetails?productID=SP2209070004)
- 配置码生成器：<a href="https://hac.app.hzgcloud.cn/config" target="_blank" rel="noopener noreferrer">一键生成和导出配置码</a>

## 首次部署

```text
安装 PDA / Android 交互命令插件
-> 发布活字格应用
-> 在配置码生成器中填写应用 URL 和容器配置
-> 导出配置二维码
-> 在 PDA 上安装 HAC
-> 使用 HAC 扫描配置二维码
-> 验证登录、网络、扫码和关键页面
```

![HAC 配置入口](../../../assets/HAC.png)

配置完成后，先确认应用能打开并登录，再逐项验证设备能力。不要在设备能力尚未确认时直接进入连续作业。

## 设备与权限检查

| 检查项 | 验证内容 |
| --- | --- |
| 网络 | 设备可以访问活字格应用地址，弱网时页面能给出明确状态 |
| WebView | 版本满足目标应用要求；页面异常时先记录设备和 WebView 版本 |
| 权限 | 按功能授予相机、麦克风、文件、定位、蓝牙或 NFC 权限 |
| 硬件 | 扫描头、UHF / RFID、NFC、BLE、摄像头和物理按键已由设备系统开启 |
| 插件 | 设计器和发布应用使用同一套 PDA / Android 交互命令插件版本 |

## 扫码广播配置

扫描头或 UHF 通常需要在设备厂商工具中开启“广播”或 `Intent` 模式，并配置 Action 和 Extra key。HAC 中的配置必须和设备侧保持一致。

| 厂商 | 广播 Action | Extra key |
| --- | --- | --- |
| 东大集成（Q9 等老产品，扫描头） | `com.android.server.scan` | `scannerdata` |
| 东大集成（小码哥等新产品，扫描头 / UHF） | `com.android.server.scannerservice.broadcast` | `scannerdata` |
| 亿博讯（扫描头） | `android.intent.ACTION_DECODE_DATA` | `barcode_string` |
| 亿博讯（UHF） | `com.ubx.scan.rfid` | `rfid_data` |
| 盈达 iData | `android.intent.action.SCANRESULT` | `value` |
| 成为（扫描头） | `com.scanner.broadcast` | `data` |
| 成为（UHF） | `com.rscja.scanner.action.scanner.RFID` | `data` |
| 商米 | `com.sunmi.scanner.ACTION_DATA_CODE_RECEIVED` | `data` |
| 斑马 / Zebra | 参考厂商配置教程 | 参考厂商配置教程 |

:::caution[先验证配置]
同一厂商的不同型号和系统版本可能使用不同默认值。现场配置前，先用厂商工具确认 Action、Extra key、扫码模式和 UHF 模式，再进入 HAC 验证。
:::

## 兼容设备基线

| 设备型号 | 基础功能 | 照片上传 | 文件上传 | 摄像头扫码 | 扫描头扫码 | RFID |
| --- | :---: | :---: | :---: | :---: | :---: | :---: |
| 东大集成 Q9 / Q9C / Q7 / 小码哥A / 小码哥5G / UTOUCH / UTOUCH2 | √ | √ | √ | √ | √ | UTOUCH / UTOUCH2 |
| 亿博讯 DT40 / DT50 / DT50U（Android 11） | √ | √ | √ | √ | √ | DT50U |
| 盈达 P50 / iData50（Android 9） | √ | √ | √ | √ | √ |  |
| 成为 C72（Android 11） | √ | √ | √ | √ | √ | √ |

蓝牙打印机验证：

| 设备型号 | 功能验证 |
| --- | --- |
| 德佟 DP30 | √ |
| 佳博 GP-M322 | √ |

兼容性表是当前验证记录，不代表所有型号、系统版本或厂商配置都具备相同能力。

## 首次运行验收

- HAC 能打开配置的活字格应用并完成登录。
- 页面加载后能显示当前任务、网络状态和关键操作入口。
- 目标扫描方式能返回码值，页面能显示成功、重复和失败反馈。
- 需要权限的功能能在拒绝权限后给出恢复路径，而不是让页面无响应。
- 断网或提交超时时，页面保留必要数据并允许重试或补传。

遇到页面运行时问题，请查看[调试](./debugging/)；需要收集容器信息时，请查看[日志](./logging/)。功能命令和页面流程见[功能用法](/features/)。

