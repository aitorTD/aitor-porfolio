/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'space-black': '#050505',
				'void-gray': '#0A0A0A',
				'bone-white': '#F2F2F2',
				'space-orange': '#FF5500', // El naranja
				'dim-gray': '#333333',
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				display: ['Space Grotesk', 'sans-serif'],
			},
		},
	},
	plugins: [],
}