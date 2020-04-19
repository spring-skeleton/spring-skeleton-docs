# Entity


Entity是一类用于表映射的对象，通过Repository可以对Entity进行增删改查操作，其本质是对数据库的增删改查操作。

### 创建Entity

```
import com.codeages.framework.biz.BaseEntity;
import lombok.Data;

import javax.persistence.Entity;

@Entity
@Data
public class Role extends BaseEntity {
    private String name;
    private String code;
}
```

* Entity对象必须继承 **BaseEntity** , **BaseEntity** 来自于脚手架
* **@Entity** 注解，表示该对象为实体对象。在项目启动时，项目会自动扫描标注了 **@Entity** 注解的对象
* **@Data** 注解，表示无需在实体类中添加 **set、get** 方法

### BaseEntity


```
@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public abstract class BaseEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    private Date createdTime;

    @LastModifiedDate
    private Date updatedTime;
}
```

* BaseEntity默认带了 **id**, **createdTime**, **updatedTime**
* **id** 为自增长字段
* **createdTime** 在Entity insert的时候自动会赋值
* **updateddTime** 在Entity update的时候自动会赋值

### 表字段类型和Entity属性类型的映射

TODO

### 约定

* Entity名字和表名保持一致，表名用下划线隔开，Entity名用驼峰模式
* 表字段名用下划线隔开，Entity的属性名用驼峰
* 不允许用 **@OneToOne** **@ManyToOne** **@OneToMany** **@ManyToMany** 等表示对象与对象关系的注解

### FAQ

#### Entity名和表名不一致如何映射？

TODO

#### Entity的属性名和字段名不一致如何映射？

TODO

#### 如何忽略Entity属性的映射？

### 注解参考文档

* [JPA官方文档](https://docs.oracle.com/javaee/5/tutorial/doc/bnbpy.html)
* [JPA注解简介](https://blog.csdn.net/yswKnight/article/details/79257372?utm_source=blogxgwz3)