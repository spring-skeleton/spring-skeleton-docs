module.exports = {
    title: 'Codeages SpringBootSkeleton 二次开发指南',
    description: 'Codeages SpringBootSkeleton 二次开发指南',
    base: '/spring-skeleton-docs/',
    themeConfig: {
        sidebar: [
          {
            title: '基本概念',
            children: [
              '/'
            ]
          },
          {
            title: '快速入门',
            children: [ /* ... */ ]
          },
          {
            title: '开发指南',
            children: [
                {
                    title: '常用注解',
                    path: '/guide/ANNOATION.html'
                },
                {
                    title: 'API规范',
                    path: '/guide/API.html'
                },
                {
                    title: '异常处理',
                    path: '/guide/EXPECTION.html'
                },
                {
                    title: '缓存',
                    path: '/guide/CACHE.html'
                },
                {
                    title: '消息队列',
                    path: '/guide/QUEUE.html'
                },
                {
                    title: '任务调度',
                    path: '/guide/JOB.html'
                },
                {
                    title: '单元测试',
                    path: '/guide/UNITTEST.html'
                },
                {
                    title: 'API文档生成',
                    path: '/guide/GENERATEAPI.html'
                },
                {
                    title: 'Gitlab持续集成',
                    path: '/guide/GITLABCI.html'
                },
                {
                    title: 'Sentry',
                    path: '/guide/SENTRY.html'
                },
            ]
          },
          {
            title: '示例',
            children: [
                {
                    title: '文件上传',
                    path: '/'
                },
                {
                    title: 'XSS过滤',
                    path: '/'
                }
            ]
          }
        ]
      }
  }