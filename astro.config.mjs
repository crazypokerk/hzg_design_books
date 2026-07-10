// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import pagePlugin from '@pelagornis/page';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: netlify(),
	integrations: [
		starlight({
			title: '活字格设计手册',
			plugins: [
				pagePlugin({
					footerText: `© ${new Date().getFullYear()} 活字格设计手册`,
				}),
			],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: '移动端最佳实践',
					items: [
						{
							label: 'PDA 页面设计原则与最佳实践',
							items: [
								{ label: '手册总览', slug: 'guides/mobile' },
								{ label: '1. 任务与场景定义', slug: 'guides/mobile/goals-scenarios' },
								{ label: '2. 信息架构', slug: 'guides/mobile/information-architecture' },
								{ label: '3. 交互行为', slug: 'guides/mobile/interaction-behavior' },
								{ label: '4. 视觉可读性', slug: 'guides/mobile/visual-perception' },
								{ label: '5. 性能与稳定性', slug: 'guides/mobile/performance' },
							],
						},
						{
							label: '典型场景和功能',
							items: [
								{ label: '总览', slug: 'guides/scenarios' },
								{ label: '插件功能列表', slug: 'guides/scenarios/plugin-function-list' },
								{ label: '安卓容器（PDA）', slug: 'guides/scenarios/hac-android-container-pda' },
								{ label: '调试', slug: 'guides/scenarios/how-to-debug-hac' },
								{ label: '日志', slug: 'guides/scenarios/logs-hac' },
								{ label: '「功能」 生物识别认证', slug: 'guides/scenarios/biometric-authentication' },
								{ label: '「功能」 BLE 设备读写', slug: 'guides/scenarios/ble-device' },
								{ label: '「功能」 定位', slug: 'guides/scenarios/gps-location-demo' },
								{ label: '「功能」 NFC', slug: 'guides/scenarios/nfc-tag-reading' },
								{ label: '「功能」 离线模式', slug: 'guides/scenarios/offline-model-hac' },
								{ label: '「功能」 拍摄', slug: 'guides/scenarios/camera-capture' },
								{ label: '「功能」 扫描', slug: 'guides/scenarios/scanner' },
								{ label: '「功能」 APP 交互', slug: 'guides/scenarios/app-interaction' },
								{ label: '「功能」 APP 个性化配置', slug: 'guides/scenarios/app-personalization' },
								{ label: '「功能」 物理按键监听', slug: 'guides/scenarios/physical-key-listening' },
							],
						},
						{
							label: '实战训练和演示',
							items: [
								{ label: '总览', slug: 'guides/practice' },
								{ label: '「场景一」采购入库', slug: 'guides/practice/pda-inventory-counting' },
							],
							
						},
					],
				},
			],
		}),
	],
});
