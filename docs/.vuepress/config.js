

const basePath = process.env.NODE_ENV === 'production' ? '/CCblog/' : '/'

module.exports = {
    title: 'TTblog',
    description: '努力！奋斗！',
    base: basePath,
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
                title: 'css学习',
                path: '/css',
                children: [
                    '/css/',
                    '/css/bfc'
                ]
            }
        ]
    }
}