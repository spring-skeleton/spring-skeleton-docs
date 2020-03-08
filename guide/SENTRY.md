## Sentry

项目集成了`Sentry`，配置文件位于`src/main/resources/sentry.properties`

可以配置不上报特定异常或信息，在配置文件中添加即可

``` properties
# 不上报的异常类型(String Equals匹配)
excluded.exceptions[0]=java.lang.RuntimeException

# 不上报的异常信息(String contain匹配)
excluded.messages[0]=user not found
```