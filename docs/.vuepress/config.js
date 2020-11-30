

const basePath = process.env.NODE_ENV === 'production' ? '/CCblog/' : '/'

module.exports = {
    title: 'TTblog',
    description: '努力！奋斗！',
    base: basePath,
    head: [
        ['script', { src: 'https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js' }],
        ['script', { src: 'https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js' }],
        ['script', { src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js' }],
        ['script', { src: 'https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js' }],
    ],
    plugins: [
        'demo-block'
    ],
    themeConfig: {
        nav: [
            {
                'text':'个人介绍',
                link: '/aboutMe'
            }, {
                text: '学习',
                link: 'teach'
            }
        ],
        sidebar: [
            '/',
            {
                title: 'HTTP',
                path: '/http',
                children: [
                    '/http/'
                ]
            },
            {
                title: 'CSS',
                path: '/css',
                children: [
                    '/css/',
                    '/css/bfc'
                ]
            },
            {
                title: 'JS',
                path: '/js',
                children: [
                    '/js/'
                ]
            },
            {
                title: 'React',
                path: '/react',
                children: [
                    '/react/',
                    '/react/vdom'
                ]
            },
            {
                title: 'Vue',
                path: '/vue',
                children: [
                    '/vue/'
                ]
            },
            {
                title: 'Webpack',
                path: '/webpack',
                children: [
                    '/webpack/'
                ]
            },
            {
                title: 'TypeScript',
                path: '/ts',
                children: [
                    '/ts/'
                ]
            }
        ]
    }
}