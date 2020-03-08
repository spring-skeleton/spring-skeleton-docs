消息队列使用`RabbitMQ`。
- [交换机的基本概念](https://www.jianshu.com/p/469f4608ce5d)

比如我要实现创建用户后发送邮件的功能

``` java
/* src/main/java/com/example/demo/config/RabbitConfig.java */

@Configuration
public class RabbitConfig {

    public final static String TOPIC_EXCHANGE_USER = "topic_exchange_user";

    public final static String QUEUE_USER_REGISTER = "user.register";

    // 新建队列
    @Bean
    Queue queueUserRegister() {
        return new Queue(QUEUE_USER_REGISTER);
    }

    // 新建交换机
    @Bean
    TopicExchange topicExchangeUser() {
        return new TopicExchange(TOPIC_EXCHANGE_USER);
    }

    // 将交换机-队列使用路由键绑定
    @Bean
    Binding bindQueueMain2TopicExchangeMainWithKeyUser(Queue queueUserRegister, TopicExchange topicExchangeUser) {
        return BindingBuilder.bind(queueUserRegister).to(topicExchangeUser).with("user.#");
    }
}
```
``` java
/** 
 * producer
 * src/main/java/com/example/demo/biz/adminuser/service/impl/AdminUserServiceImpl.java
 */

public class AdminUserServiceImpl {

  @Autowired
  AmqpTemplate amqpTemplate;

  User create(User user) {
    // ...create user
    
    // 生产者发送信息
    amqpTemplate.convertAndSend(RabbitConfig.TOPIC_EXCHANGE_USER, RabbitConfig.QUEUE_USER_REGISTER, user);
  }
}
```
``` java
/** 
 * consumer
 * UserReceiver.java
 */

@Component
public class UserReceiver {

    // 消费者指定队列消费信息
    @RabbitListener(queues = RabbitConfig.QUEUE_USER_REGISTER)
    public void sendEmail(AdminUser adminUser) {
        System.out.println("用户【" + adminUser.getName() + "】注册成功，发送Email完成");
    }
}
```