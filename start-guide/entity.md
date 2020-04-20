# Entity


Entity是一类用于表映射的对象，通过Repository可以对Entity进行增删改查操作，Entity遵循JPA规范。

### 创建Entity

```
package com.codeages.demo.biz.auth.entity;

import com.codeages.framework.biz.BaseEntity;
import lombok.Data;

import javax.persistence.Entity;

@Entity
@Data
public class Org extends BaseEntity {
    private String name;
    private String code;
}
```

* Entity对象必须继承 **BaseEntity** , **BaseEntity** 来自于脚手架
* **@Entity** 注解，表示该对象为实体对象。在项目启动时，项目会自动扫描标注了 **@Entity** 注解的对象
* **@Data** 注解，表示无需在实体类中添加 **set、get** 方法
* BaseEntity自带了 **id**, **createdTime**, **updatedTime** 属性
    + **id** 是Entity对象的唯一标识符，数据库里对应主键，自增字段
    + **createdTime** 是对象的创建时间，在Entity创建的时候自动赋值
    + **updateddTime** 是对象的修改时间，在Entity修改的时候自动赋值

### 约定

* 表名用下划线隔开，Entity名用驼峰命名
* 表字段名用下划线隔开，Entity的属性名用驼峰命名
* 不允许用 **@OneToOne** **@ManyToOne** **@OneToMany** **@ManyToMany** 等表示Entity关系的注解
* 不允许使用 **@SecondaryTable** 在Entity中聚合从表 
* 不允许使用 **@Column** 中的属性建约束，若需要建约束，应当建立在表定义中
* 不允许使用 **@IdClass** 复合主键，主键用自增长id表示，复合主键应当在应用程序中处理

### FAQ

#### Entity名和表名不一致如何映射？

```
@Entity
@Table(name = "organization")
public class Org { ... }
```

#### Entity的属性名和字段名不一致如何映射？

```
@Column(name = "org_name")
private String name;
```

#### 如何忽略Entity属性的映射？

**@Transient** 表示该属性并不是一个到数据库表字段的映射，指定的这些属性不会被持久化，ORM框架将忽略该属性。

```
@Transient
private Org parentOrg;
```

#### 常用的Entity属性类型和表字段类型的映射关系

 表字段类型 	| Entity属性类型 	| 备注 
------------|---------------|-----
int    		| Integer		
bigint 		| Long
tinyint(1) 	| Boolean
timestamp	| Date      
varchar		| String
text		| String
float(m,n)	| Float, Double
enum		| enum			| 建议不用enum类型

### 参考文档

* [JPA规范官方文档](https://docs.oracle.com/javaee/5/tutorial/doc/bnbpy.html)
* [JPA常用注解介绍](https://blog.csdn.net/yswKnight/article/details/79257372?utm_source=blogxgwz3)