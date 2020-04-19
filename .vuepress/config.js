module.exports = {
    title: 'Codeages Framework',
    description: 'Codeages Framework',
    base: '/spring-skeleton-docs/',
    themeConfig: {
        sidebar: [
          {
            title: '概述',
            children: [
              '/'
            ]
          },
          {
            title: 'Start Guide',
            children: [
                {
                    title: 'JAVA环境安装',
                    path: '/start-guide/install-java.md'
                },
                {
                    title: 'Maven环境安装',
                    path: '/start-guide/install-maven.md'
                },
                {
                    title: 'IDE安装及设置',
                    path: '/start-guide/install-ide.md'
                },
                {
                    title: '创建项目',
                    path: '/start-guide/create-project.md'
                },
                {
                    title: 'Entity',
                    path: '/start-guide/entity.md'
                },
                {
                    title: 'Repository',
                    path: '/start-guide/repository.md'
                },
                {
                    title: 'Service',
                    path: '/start-guide/service.md'
                },
                {
                    title: 'Scheduler',
                    path: '/start-guide/scheduler.md'
                },
                {
                    title: 'JsonRpc',
                    path: '/start-guide/jsonrpc.md'
                },
                {
                    title: 'Validation',
                    path: '/start-guide/validation.md'
                },
                {
                    title: 'Mapper',
                    path: '/start-guide/mapper.md'
                },
                {
                    title: 'Cache',
                    path: '/start-guide/cache.md'
                },
                {
                    title: 'Transactional',
                    path: '/start-guide/transactional.md'
                },
                {
                    title: 'Restful',
                    path: '/start-guide/restful.md'
                },
                {
                    title: 'Test Framework',
                    path: '/start-guide/test-framework.md'
                },
                {
                    title: 'Monitor',
                    path: '/start-guide/monitor.md'
                },
                {
                    title: 'Build',
                    path: '/start-guide/build.md'
                }
            ]
          },
          {
            title: 'Framework',
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