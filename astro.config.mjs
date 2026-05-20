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
							label: '设计思路和方向',
							items: [
								{ label: '手册总览', slug: 'guides/mobile' },
								{ label: '1. 目标与场景', slug: 'guides/mobile/goals-scenarios' },
								{ label: '2. 信息架构', slug: 'guides/mobile/information-architecture' },
								{ label: '3. 交互与行为', slug: 'guides/mobile/interaction-behavior' },
								{ label: '4. 视觉与感知', slug: 'guides/mobile/visual-perception' },
								{ label: '5. 性能', slug: 'guides/mobile/performance' },
							],
						},
						{
							label: '实战训练和演示',
							items: [{ label: '总览', slug: 'guides/practice' }],
						},
						{
							label: '典型场景和功能',
							items: [{ label: '总览', slug: 'guides/scenarios' }],
						},
					],
				},
			],
		}),
	],
});
