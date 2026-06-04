# SSH 免密登录配置步骤

## 原理

使用 SSH 密钥对（公钥 + 私钥）替代密码认证。将本机生成的公钥放到服务器上，之后每次连接时自动完成认证，无需输入密码。

---

## 步骤

### 1. 在本机生成 SSH 密钥

打开命令行（PowerShell 或 CMD），执行：

```cmd
ssh-keygen -t rsa -b 4096
```

- 提示 `Enter file in which to save the key` 时直接回车（使用默认路径）
- 提示 `Enter passphrase` 时**直接回车，不要输入任何内容**（否则每次连接还是要输入 passphrase）
- 提示 `Enter same passphrase again` 时再次直接回车

> 如果已有密钥，这一步可以跳过。

### 2. 将公钥复制到服务器

```cmd
type %USERPROFILE%\.ssh\id_rsa.pub | ssh root@192.168.0.102 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && chmod 700 ~/.ssh"
```

- 将 `192.168.0.102` 替换为你的服务器 IP
- 执行时需要输入**最后一次**服务器密码

> 如果你的系统支持 `ssh-copy-id`，也可以直接用：
> ```cmd
> ssh-copy-id root@192.168.0.102
> ```

### 3. 验证免密登录

```cmd
ssh root@192.168.0.102 "echo success"
```

如果直接输出 `success` 而不需要输入密码，说明配置成功。

---

## 注意事项

- 生成密钥时**不要设置 passphrase**，否则每次仍要输入密码
- 服务器上的 `~/.ssh/authorized_keys` 权限必须是 `600`，`~/.ssh` 目录权限必须是 `700`，否则免密可能失效
- 如果修改了服务器的 SSH 配置或更换了服务器，需要重新执行步骤 2
