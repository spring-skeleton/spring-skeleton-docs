# 缓存

缓存使用`SpringBoot`自带的`spring-boot-starter-cache`。在配置好`Redis`后会自动存入其中。

- [SpringBootCache基本用法](https://my.oschina.net/sdlvzg/blog/1608871)

> 需要在启动类中加入注解 @EnableCaching

## 行级缓存

简单应用：基于单个资源，行级别缓存策略

``` java
// 指定本类全局的缓存名称
@CacheConfig(cacheNames = "User")
public class UserService {

  // 假设对 userId = 1 这条数据进行缓存

  // 更新/创建 key 为 User1 的缓存
  @CachePut(key="'User'.contact(#result.id)")
  User create(User user) { ... }

  // 更新 key 为 User1 的缓存
  @CachePut(key="'User'.contact(#user.id)")
  User update(User user) { ... }

  // 获取 key 为 User1 的缓存，如果没有，则将该函数的返回值赋值给 User1
  @Cacheable(key="'User'.contact(#id)")
  User get(Long id) { ... }

  // 删除 key 为 User1 的缓存
  @CacheEvict(key="'User'.contant(#id)")
  Boolean delete(Long id) { ... }
}
```

### 列表缓存

简单应用：缓存男性用户列表页，当新男性用户增加时，重建缓存

``` java
// 假设类中注解@CacheConfig(cacheNames = "xxx")

// 结果为空时不缓存

@Cacheable(key = "findBySexMan", unless = "#result.size() == 0")
List<User> findBySex(String sex) {
  var builder = new BooleanBuilder();
  builder.and(qUser.sex.eq(sex));

  return repo.findAll(builder);
}

// 新增男性用户时，删除缓存，下次访问findBySex时会自动重建缓存
@CacheEvict(key="findBySexMan", condition="#user.sex == 'man'")
User create(User user) {
  ...
}
```

### 聚合数据缓存

简单应用：班级里带有课程信息

``` java
// 假设类中注解@CacheConfig(cacheNames = "xxx")

// 单条数据缓存
@Cacheable(key="'Course'.contact(#id)")
Course get(Long id) { ... }

// 单条数据缓存
@Cacheable(key="'ClassRoom'.contact(#id)")
ClassRoom get(Long id) { ... }

// 数据聚合时，因为来源被缓存，所以该方法不必缓存
Map<String, Object> getClassRoomAndCourse(Long classroomId) {
  var map = new HashMap<String, Object>();

  var classRoom = classRoomService.get(classroomId);
  var course = courseService.get(classRoom.getCourseId());

  map.put("classRoom", classRoom);
  map.put("course", course);

  return map;
}
```

### 接入Redis

新建`RedisConfig.java`继承`CachingConfigurerSupport`并实现`cacheManager`

``` java
@Configuration
@EnableCaching
public class RedisConfig extends CachingConfigurerSupport {
    @Bean
    public CacheManager cacheManager(RedisConnectionFactory factory) {
        var jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<>(Object.class);

        //解决查询缓存转换异常的问题
        var om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.activateDefaultTyping(om.getPolymorphicTypeValidator(), ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);

        // 配置序列化（解决乱码的问题）
        var config = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofSeconds(600))
            .prefixKeysWith("eduine:")
            .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
            .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(jackson2JsonRedisSerializer))
            // 是否允许控制存储
            .disableCachingNullValues();

        return RedisCacheManager.builder(factory)
            .cacheDefaults(config)
            .build();
    }
}
```