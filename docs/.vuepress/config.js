

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
                text: '首页',
                link: '/'
            },
            {
                text: '个人介绍',
                link: '/aboutMe'
            },
            {
                text: '学习路线',
                link: '/guide/'
            }
        ],
        sidebar: [
            '/',
            '/guide/',
            {
                title: 'HTTP',
                path: '/http',
                children: [
                    '/http/',
                    '/http/http',
                    '/http/enterUrl',
                    '/http/status'
                ]
            },
            {
                title: 'HTML',
                path: '/html',
                children: [
                    '/html/',
                    '/html/message',
                    '/html/event',
                    '/html/cache'
                ]
            },
            {
                title: 'CSS',
                path: '/css',
                children: [
                    '/css/',
                    '/css/bfc',
                    '/css/flex'
                ]
            },
            {
                title: 'JS',
                path: '/js',
                children: [
                    '/js/',
                    '/js/array',
                    '/js/prototype',
                    '/js/promise',
                    '/js/myPromise',
                    '/js/designModal',
                    '/js/event',
                    '/js/class'
                ]
            },
            {
                title: 'React',
                path: '/react',
                children: [
                    '/react/',
                    '/react/vdom',
                    '/react/router',
                    '/react/setState',
                    '/react/lifecycle',
                    '/react/getDrived',
                    '/react/optimize',
                    '/react/stack&fiber',
                    '/react/redux',
                    '/react/mobx',
                    '/react/event'
                ]
            },
            {
                title: 'Vue',
                path: '/vue',
                children: [
                    '/vue/',
                    '/vue/composition',
                    '/vue/defineProperty',
                    '/vue/vueArray',
                    '/vue/vuex'
                ]
            },
            {
                title: 'Webpack',
                path: '/webpack',
                children: [
                    '/webpack/',
                    '/webpack/loader',
                    '/webpack/plugin'
                ]
            },
            {
                title: 'Vite',
                path: '/vite',
                children: [
                    '/vite/',
                    '/vite/plugin'
                ]
            },
            {
                title: 'TypeScript',
                path: '/ts',
                children: [
                    '/ts/',
                    '/ts/generic',
                    '/ts/create'
                ]
            },
            {
                title: 'AI 前端应用',
                path: '/ai',
                children: [
                    '/ai/',
                    '/ai/prompt',
                    '/ai/rag',
                    '/ai/langchain'
                ]
            },
            {
                title: '数据结构与算法',
                path: '/alg',
                children: [
                    '/alg/',
                    '/alg/sort',
                    '/alg/linked',
                    '/alg/hfman'
                ]
            },{
                title: '设计模式',
                path: '/design',
                children: [
                    '/design/',
                    '/design/singleton',
                    '/design/observer'
                ]
            },
            {
                title: '面试题',
                path: '/face',
                children: [
                    '/face/',
                    '/face/promise',
                    '/face/js-core',
                    '/face/browser',
                    '/face/security',
                    '/face/layout',
                    '/face/react',
                    '/face/vue',
                    '/face/engineering',
                    '/face/call'
                ]
            }
        ]
    }
}