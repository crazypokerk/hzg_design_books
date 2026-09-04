// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import pagePlugin from '@pelagornis/page';
import netlify from '@astrojs/netlify';

export default defineConfig({
	output: 'server',
	adapter: netlify(),
	integrations: [
		starlight({
			title: 'HAC 文档',
			plugins: [
				pagePlugin({
					footerText: '© ' + new Date().getFullYear() + ' HAC 文档',
				}),
			],
			social: [{ icon: 'github', label: 'HAC 源码', href: 'https://github.com/kadbbz/HAC_lowcode_app_for_android_based_on_webview' }],
			sidebar: [
				{
					label: 'HAC 入门',
					items: [
						{ label: 'HAC 是什么', slug: 'introduction' },
					],
				},
				{
					label: '安装与调试',
					items: [
						{ label: '安装与配置', slug: 'installation' },
						{ label: '调试HAC', slug: 'installation/debugging' },
						{ label: 'HAC 日志', slug: 'installation/logging' },
					],
				},
				{
					label: '功能用法',
					items: [
						{ label: '总览', slug: 'features' },
						{ label: '插件功能列表', slug: 'features/command-index' },
						{ label: '「功能」 生物识别认证', slug: 'features/biometric-authentication' },
						{ label: '「功能」 BLE 设备读写', slug: 'features/ble-device' },
						{ label: '「功能」 定位', slug: 'features/gps-location-demo' },
						{ label: '「功能」 NFC', slug: 'features/nfc-tag-reading' },
						{ label: '「功能」 离线模式', slug: 'features/offline-model-hac' },
						{ label: '「功能」 拍摄', slug: 'features/camera-capture' },
						{ label: '「功能」 扫描', slug: 'features/scanner' },
						{ label: '「功能」 APP 交互', slug: 'features/app-interaction' },
						{ label: '「功能」 APP 个性化配置', slug: 'features/app-personalization' },
						{ label: '「功能」 物理按键监听', slug: 'features/physical-key-listening' },
					],
				},
				{
					label: '典型解决方案',
					items: [
						{ label: '方案总览', slug: 'solutions' },
						{ label: '采购入库：PDA 现场收货', slug: 'solutions/pda-inventory-counting' },
					],
				},
				{
					label: '原则与最佳实践',
					items: [
						{ label: '原则总览', slug: 'principles' },
						{ label: '任务与场景定义', slug: 'principles/goals-scenarios' },
						{ label: '信息架构', slug: 'principles/information-architecture' },
						{ label: '交互行为', slug: 'principles/interaction-behavior' },
						{ label: '视觉可读性', slug: 'principles/visual-perception' },
						{ label: '性能与稳定性', slug: 'principles/performance' },
					],
				},
			],
		}),
	],
});
