---
title: 安卓容器（PDA）
description: 面向 HAC 和 PDA 场景的部署、设备能力、扫码广播和兼容性检查。
sidebar:
  order: 2
---

## 适用场景

`HAC` 是活字格安卓容器，用来在 Android 手机、PDA 或兼容设备上运行活字格 Web 应用，并调用扫码、定位、拍摄、NFC、BLE、物理按键等本地能力。

它特别适合仓储、物流、门店、巡检和生产线现场作业。这类页面通常面对小屏、弱网、扫码枪、物理按键和连续高频操作，不能直接照搬 PC 页面。

## 使用前提

- Android 版本不低于 `8.0`。
- 运行内存建议不低于 `2GB`。
- 活字格应用已发布到设备可访问的服务器。
- 设计器中已安装需要的 PDA / Android 交互命令插件。
- PDA 厂商的扫码、UHF、NFC、BLE 等硬件能力已在系统侧开启并配置。
- 目标设备的 WebView 版本、权限和网络环境已验证。

## 下载与配置

- HAC APP：[下载地址](https://github.com/kadbbz/HAC_lowcode_app_for_android_based_on_webview/releases)
- HAC 插件：[插件市场](https://marketplace.grapecity.com.cn/ApplicationDetails?productID=SP2209070004)
- 配置码生成器：<a href="https://hac.app.hzgcloud.cn/config" target="_blank" rel="noopener noreferrer">一键生成和导出配置码</a>

推荐部署流程：

```text
安装 PDA 交互命令插件
-> 发布活字格应用
-> 在配置码生成器中填写应用 URL 和容器配置
-> 导出配置二维码
-> PDA 安装 HAC
-> HAC 扫描配置二维码
-> 验证登录、扫码、网络和关键页面
```

![HAC](../../../../assets/HAC.png)

## 扫码广播配置

扫码头或 UHF 通常需要在设备厂商工具中开启“广播”或 `Intent` 模式，并配置 Action 和 Extra key。HAC 中的扫描头配置必须和设备侧保持一致。

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
同一厂商不同型号、不同系统版本的默认值可能不同。现场配置前，先用厂商工具确认 Action、Extra key、扫码模式和 UHF 模式，再进入 HAC 验证。
:::

## 兼容设备

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

## 设计要点

- 不要直接在低端 PDA 中展示复杂 PC 页面；优先做小屏、少控件、少数据量的现场页面。
- 扫码、UHF、NFC、BLE 等能力要有明确的设备配置检查和失败提示。
- 弱网场景要考虑离线暂存、重试和重复提交防护。
- WebView 过旧时，优先联系设备厂商升级；临时跳过兼容性检查只能作为兜底方案。
- 配置类入口应由运维或管理员使用，普通操作员只看到业务流程。

## 常见问题

| 问题 | 处理建议 |
| --- | --- |
| 手机能否使用 HAC | 可以。只要 Android 版本和内存满足要求即可，但没有 PDA 硬件时不能使用扫描头、UHF 等能力。 |
| 能否直接展示 PC 页面 | 高性能平板或手机可以尝试；低端 PDA 应重新设计小屏页面并做性能优化。 |
| 能否定制名称和图标 | 可以，需要修改 HAC 源码并重新打包。 |
| 一台 PDA 能否安装两个 HAC | 默认不能。需要改包名、图标和应用名后分别打包。 |
| 能否内置首页和扫码参数 | 可以，需要修改 HAC 配置源码后自行编译，适合批量定制部署。 |
| 如何启用 UHF / RFID 广播 | 在厂商 RFID / UHF 工具中开启广播，确认 Action 和 Extra key；必要时联系厂商支持。 |
| 什么时候关闭硬件加速 | PDA 页面出现模糊、渲染异常或兼容性问题时，建议关闭。 |
| WebView 版本过低 | 在 HAC 设置中查看 WebView 版本，优先联系设备厂商升级。 |

