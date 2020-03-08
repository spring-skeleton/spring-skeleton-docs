## API文档生成

- `Controller`测试类继承`BaseControllerTest`
- `mvc.perform().andExpect().andDo(document(?, ...))` 在`?`处调用`buildRestDocsSnippetsFolderName`方法，第二个参数为页面上想要显示的接口标题
- 在`src/test/java/com/example/demo/controller/ApiDocumentBuilder.java`中的`getModuleOrder`方法中写入排序信息（调整`Map`赋值顺序达到文档模块排序的效果）
- 执行`mvn clean package`，分别在`target/generated-docs/`和`src/main/asciidoc/`目录下找到`HTML`格式和`ASCIIDoc`格式的`API`文档
