## 单元测试

单元测试分为`API`单元测试和`Service`单元测试。对应`src/test`目录项目包下`controller`和`service`目录。

### 测试方法的命名

测试方法的命名遵循最佳实践：`method_condition_result`

``` java
// service方法
User get(Long id) {
  return repo.findById(id).orElseThrow(() -> {
    throw new NotFoundException("User not found");
  })
}

// 单元测试方法命名
@Test
void get_ExistUser_ReturnUser();

@Test
void get_NonExistUser_ThrowNotFoundException();
```

### 测试数据的构建

在`src/test/resource/fixtures`目录下新增`xxx.sql`

``` sql
TRUNCATE TABLE `admin_user`;

INSERT INTO `admin_user` (`id`, `name`, `email`, `mobile`, `roles`, `ding_talk_user_id`, `locked`, `created_at`, `updated_at`)
VALUES (1, 'sunny', 'sunny@test.com', '17376578182', '[ROLE_ADMIN]', 123123, 0, 1581535439194, 1581535439194),
       (2, 'tom', 'tom@test.com', '17376578182', '[ROLE_ADMIN]', 123123, 0, 1581535439194, 1581535439194),
       (3, 'lucy', 'lucy@test.com', '17376578182', '[ROLE_ADMIN]', 123123, 0, 1581535439194, 1581535439194);
```

在测试类上注解，便会在测试允许时自动注入数据，测试完成后回滚

``` java
@SpringBootTest
@Sql("/fixtures/xxx.sql")
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
@Transactional
public class AdminUserServiceTest {
    ...
}
```

`@Sql`可以加在类上，也可以加在方法上。对于`CRUD`可以直接注解在类上，供本类中所有测试方法使用。面对复杂业务，为排除其它数据干扰，建议单独配置数据

### API的单元测试

`API`的单元测试使用了`Spring REST Docs`，目的在于编写单元测试的同时，能够自动生成文档。

> 本项目中API的约定为：读操作使用GET，写操作使用POST。不再引入第三种请求类型

> 例子中使用了JsonPath定位返回值进行断言。[JsonPath简单语法](https://blog.csdn.net/luxideyao/article/details/77802389)

``` java
// 新建的API测试类应该继承 BaseControllerTest 类
public class xxxControllerTest extends BaseControllerTest {

    /** GET类型的请求
      *
      * GET /api/admin/user/get?id=1
      *
      * Response 
      * {
      *  "ok" : true,
      *  "result" : {
      *    "id" : 1,
      *    "name" : "sunny",
      *    "email" : "sunny@test.com",
      *    "mobile" : "17376578182",
      *    "dingTalkUserId" : "123123",
      *    "locked" : 0
      *  }
      * }
      *
      */
    @Test
    public void get_ExistUser_ReturnUser() throws Exception {

      // org.springframework.test.web.servlet.MockMvc mvc
      mvc.perform(
        get("/api/admin/user/get")
          .param("id", "1") // 带上请求参数(Request Params)
      )
      .andExpect(status().isOk()) // 断言HTTP状态码
      .andExpect(jsonPath("$.result.id").value(1)) // 断言返回值，使用JsonPath
      .andDo(
        document(
          // 封装于BaseControllerTest中的方法，拼接API文档的标题
          buildRestDocsSnippetsFolderName(this, "根据id获取后台用户信息"),
          requestParameters(
            // 对Request Params的注解
            parameterWithName("id").description("【必须】待获取信息的用户ID")
          ),
          // 对返回值的注解
          responseFields(
            fieldWithPath("ok").description("固定返回格式，请求状态"),
            fieldWithPath("result").description("固定返回格式，返回体"),
            fieldWithPath("result.id").description("用户ID"),
            fieldWithPath("result.name").description("用户名"),
            fieldWithPath("result.email").description("电子邮件"),
            fieldWithPath("result.mobile").description("手机号"),
            fieldWithPath("result.dingTalkUserId").description("钉钉用户Id"),
            fieldWithPath("result.locked").description("是否被锁定")
          )
        )
      )
      .andDo(print());
  }

  /** POST类型的请求
   *
   * POST /api/admin/user/lock
   *
   * Request Body
   * {
   *  "id" : 1
   * }
   * 
   * Response
   * {
   *  "ok" : true,
   *  "result" : {
   *    "success" : true
   *  }
   * }
   *
   */
  @Test
  public void lock_ExistUser_ReturnSuccess() throws Exception {
    
    // 构建数据，Controller 中使用 @RequestBody 接收
    Map<String, Integer> map = new HashMap<>();
    map.put("id", 1);

    mvc.perform(
      post("/api/admin/user/lock")
        
        // 指定Accept Type
        .contentType(MediaType.APPLICATION_JSON)

        // 使用 com.fasterxml.jackson.databind.ObjectMapper 格式化Request Body参数
        .content(objectMapper.writeValueAsString(map)) 
    )
    .andExpect(status().isOk())
    .andExpect(jsonPath("$.ok").value(true))
    .andExpect(jsonPath("$.result.success").value(true))
    .andDo(
      document(
        buildRestDocsSnippetsFolderName(this, "锁定后台用户"),

        // 对Request Body的注解
        requestFields(
          fieldWithPath("id").description("【必须】后台用户Id")
        ),
        
        // 对返回值的注解
        responseFields(
          fieldWithPath("ok").description("固定返回格式，请求状态"),
          fieldWithPath("result").description("固定返回格式，返回体"),
          fieldWithPath("result.success").description("锁定成功")
        )
      )
    )
    .andDo(print());
  }
}
```