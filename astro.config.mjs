// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import netlify from '@astrojs/netlify';
import starlightThemeVintagePlugin from 'starlight-theme-vintage';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: netlify(),
	integrations: [
		starlight({
			title: '活字格设计手册',
			customCss: ['./src/styles/starlight-fonts.css'],
			plugins: [starlightThemeVintagePlugin()],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: '移动端最佳实践',
					items: [
						{
							label: 'PDA 页面设计最佳规范',
							items: [
								{ label: '手册总览', slug: 'guides/mobile' },
								{ label: '1. 先把页面想清楚', slug: 'guides/mobile/goals-scenarios' },
								{ label: '2. 页面内容怎么摆', slug: 'guides/mobile/information-architecture' },
								{ label: '3. 扫码、按钮和表单怎么动', slug: 'guides/mobile/interaction-behavior' },
								{ label: '4. 小屏上怎么看得清', slug: 'guides/mobile/visual-perception' },
								{ label: '5. 弱网、旧设备和真机怎么验', slug: 'guides/mobile/performance' },
							],
						},
						{
							label: '典型场景和功能',
							items: [
								{ label: '总览', slug: 'guides/scenarios' },
								{ label: '安卓容器（PDA）', slug: 'guides/scenarios/hac-android-container-pda' },
								{ label: '调试', slug: 'guides/scenarios/how-to-debug-hac' },
								{ label: '日志', slug: 'guides/scenarios/logs-hac' },
								{ label: '「功能」 定位', slug: 'guides/scenarios/gps-location-demo' },
								{ label: '「功能」 NFC', slug: 'guides/scenarios/nfc-tag-reading' },
								{ label: '「功能」 离线模式', slug: 'guides/scenarios/offline-model-hac' },
								{ label: '「功能」 拍摄', slug: 'guides/scenarios/camera-capture' },
							],
						},
						{
							label: '实战训练和演示',
							items: [
								{ label: '总览', slug: 'guides/practice' },
								{ label: 'PDA 盘点扫码页设计演示', slug: 'guides/practice/pda-inventory-counting' },
							],
							
						},
					],
				},
			],
		}),
	],
});
