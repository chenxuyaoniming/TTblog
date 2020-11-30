

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
                title: 'http知识点',
                path: '/http',
                children: [
                    '/http/'
                ]
            },
            {
                title: 'css知识点',
                path: '/css',
                children: [
                    '/css/',
                    '/css/bfc'
                ]
            },
            {
                title: 'js知识点',
                path: '/js',
                children: [
                    '/js/'
                ]
            },
            {
                title: 'react知识点',
                path: '/react',
                children: [
                    '/react/',
                    '/react/vdom'
                ]
            },
            {
                title: 'vue知识点',
                path: '/vue',
                children: [
                    '/vue/'
                ]
            },
            {
                title: 'webpack',
                path: '/webpack',
                children: [
                    '/webpack/'
                ]
            },
            {
                title: 'typescript',
                path: '/ts',
                children: [
                    '/ts/'
                ]
            }
        ]
    }
}