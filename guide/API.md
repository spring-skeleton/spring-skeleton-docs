# API规范

## 接口鉴权

项目中使用JWT做鉴权[参考文章](https://mp.weixin.qq.com/s/6HWIA0qSA5ZxCdMavlw0nw)

- 1、获取授权token

AuthService的generateApiUserAuthToken负责生成token

- 2、token鉴定

InterceptorConfig中配置了需要鉴权的路由AdminApiAuthInterceptor中负责拦截请求头中的Authorization字段进行权限校验


## 返回值统一处理

项目中`Controller`的返回格式是统一的:

成功响应结构体

- http状态码只能为200
- result只能为对象或null，不能直接为list

```json
{
  "ok": true,
  "result": {
  }
}
```

失败响应结构体
```json
{
  "ok": false,
  "code": 40401011,
  "message": "user not found",
  "traceId": "xxxxxxxx",
  "details": "[xxx]"
}
```

对于返回值的统一封装，项目已经完成。`Controller`只要返回业务实体即可，不用额外操作。

``` java
@RestController
@RequestMapping("/api/user")
public class UserController {

  @GetMapping("/get")
  public UserDto get(@RequestParam Long id) { ... }
}

/**
 * 将会返回
 * {
 *   "ok": true,
 *   "result": {
 *     "id": 1,
 *     "name": "tony",
 *     ***
 *   }
 * }
 * 自动的将 UserDto 塞进了返回值里
 * 同理，在程序任意地方抛出异常，会自动返回失败响应的结构体
 */
```

## 源码了解：如何实现此种机制？

成功响应：

``` java
// 实现了springboot提供的ResponseBodyAdvice接口
// src/main/java/com/example/demo/response/common/CommonResponseHandler.java

@RestControllerAdvice
public class CommonResponseHandler implements ResponseBodyAdvice {
  @Override
  public boolean supports(MethodParameter methodParameter, Class aClass) {
      return true;
  }

  @Override
  public Object beforeBodyWrite(Object o,
                                MethodParameter methodParameter,
                                MediaType mediaType,
                                Class aClass,
                                ServerHttpRequest serverHttpRequest,
                                ServerHttpResponse serverHttpResponse) {
      if (o instanceof CommonResponse || o instanceof ExceptionResponse) {
          return o;
      }

      return new CommonResponse<>(o);
  }
}
```

``` java
// 返回结构体
// src/main/java/com/example/demo/response/common/CommonResponse.java

@Data
@NoArgsConstructor
public class CommonResponse<T> {
    @Setter(AccessLevel.NONE)
    private Boolean ok = true;

    private T result;

    public CommonResponse(T resultBody) {
        this.result = resultBody;
    }
}
```

失败响应：

> 代码过长，可在项目中自行查看

```
# 继承了 springboot 的 ResponseEntityExceptionHandler，并对各种异常进行自定义
# src/main/java/com/example/demo/response/exception/GlobalExceptionHandler.java
```

```
# 返回结构体
# src/main/java/com/example/demo/response/exception/ExceptionResponse.java
```

## 失败响应traceId设置

```nginx
server {
 server_name spring.cloud.kzdev.work;
 add_header X-Request-ID $request_id;
 location / {
   proxy_pass http://127.0.0.1:8080;
   proxy_set_header X-Request-ID $request_id;
   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;              
   proxy_set_header X-Forwarded-Proto $scheme;              
   proxy_set_header X-Forwarded-Port $server_port;
 }

 error_log /var/log/nginx/dev.spring_error.log;
 access_log /var/log/nginx/dev.spring_access.log;
}
```