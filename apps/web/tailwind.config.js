/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				'gt-cyan-dark': '#2B788B',
				'gt-cyan-light': '#C3DCE3',
				'gt-pink-dark': '#945069',
				'gt-pink-light': '#F2D4DC',
				'gt-grey-light': '#F6F5F4',
				'gt-grey-medium': '#E0E0E0',
				'gt-grey-icon': '#BABABA',
				'gt-grey-dark': '#757575',
				'gt-cyan': '#5996A5',
				'gt-green': '#639B6D',
				'gt-pink': '#A15993',
				'gt-red': '#A95151',
				'gt-yellow': '#C4A24C',
				'gt-orange': '#CB5B43',
			},
			fontFamily: {
				header: ['var(--font-dela-gothic-one)'],
			},
			fontSize: {
				h1: ['3.5rem', '3.5rem'],
				h2: ['3rem', '3rem'],
				h3: ['2rem', '2rem'],
				h4: ['1.5rem', '1.5rem'],
				b1: ['1.125rem', '1.5625rem'],
				b2: ['1rem', '1.375'],
				b3: ['0.875rem', '1.25rem'],
				b4: ['0.75rem', '1.0625rem'],
				bt1: ['1.125rem', '1.5625rem'],
				bt2: ['1rem', '1rem'],
				l1: ['1rem', '1.25rem'],
				l2: ['0.875rem', '1.25rem'],
			},
			keyframes: {
				'open-menu': {
					'0%': { transform: 'scaleY(0)' },
					'80%': { transform: 'scaleY(1.2)' },
					'100%': { transform: 'scaleY(1)' },
				},
			},
			animation: {
				'open-menu': 'open-menu 0.5s ease-in-out forwards',
			},
		},
	},
	plugins: [],
};
