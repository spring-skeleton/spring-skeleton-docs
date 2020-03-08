# 常用注解

## @RestController

`@RestController`是`@Controller`和`@ResponseBody`两个注解的结合体，标注于`Controller`类上。由于该注解无法返回`jsp`等视图文件，故多用于前后端分离的`API`项目。

## @RequestMapping

`@RequestMapping`常用于`Controller`类上，表示该类路由前缀。

``` java
@RestController
@RequestMapping("/api/user")
public class UserController {

  // 这个方法的路由为 /api/user/get
  @GetMapping("/get")
  public User get(Long id) { ... } 
}
```

## @GetMapping / @PostMapping

常用于`Controller`类中的方法上，表示该方法的路由。

``` java
@RestController
public class UserController {

  // 这个方法的路由为 /api/user/get 请求类型为 get
  @GetMapping("/api/user/get")
  public User get(Long id) { ... } 

  // 这个方法的路由为 /api/user 请求类型为 post
  @PostMapping(/api/user)
  public User create(@RequestBody User user) { ... }
}
```

## @Service

标注于`Service`的实现类上，相当于注册一个`Bean`。在`MVC`架构的项目中，相当于一个语义化的`Bean`。注册了`Bean`后，可以用自动注入的方式在各个类中使用。

> @Repository 是数据访问层的Bean，也是语义化的表现

``` java
@Service
public class UserServiceImpl implements UserService {

  public User get(Long id) { ... } 
}
```

## @Entity

标注于实体类上，表示该类是对应数据表的映射类。

``` java
@Entity
public class User {

  private Long id;

  ...
}
```

## @Data

是[lombok](https://www.jianshu.com/p/365ea41b3573)提供的注解，用于生成实体类的`setter`和`getter`方法

``` java
@Entity
@Data
public class User {

  private Long id;

  ...
}

// mvn clean compile后在 target 目录中观察 User 类，发现自动生成了 getter 和 setter 方法
```

## @Autowired

自动注入其它类时使用，被注入的类必须被注册为`Bean`。使用`@Controller`、`@RestController`、`@Service`、`@Repository`、`@Component`等注解类即可注册。

``` java
@Service
public class UserServiceImpl implements UserService {

  @Autowired
  UserRepository userRepository;

  public User get(Long id) { 
    return userRepository.findById(id);
  } 
}
```