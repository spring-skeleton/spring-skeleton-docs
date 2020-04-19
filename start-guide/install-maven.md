# Maven环境安装

### 一、Mac

安装

```
cd ~/Downloads
wget https://mirror.bit.edu.cn/apache/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.zip
unzip apache-maven-3.6.3-bin.zip
cp -r apache-maven-3.6.3-bin ~/workspace/.
echo 'export M2_HOME=~/workspace/apache-maven-3.6.3' >> ~/.zshrc
echo 'export PATH=$PATH:$M2_HOME/bin' >> ~/.zshrc
source ~/.zshrc
```

测试

```
mvn -v
```

### 二、Ubuntu

```
TODO
```

