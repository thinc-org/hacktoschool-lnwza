module.exports = {
	reactStrictMode: true,
	experimental: {
		transpilePackages: ['ui'],
	},
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'sv1.img.in.th',
				pathname: '/**',
			},
		],
	},
};
