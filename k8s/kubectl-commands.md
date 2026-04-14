# kubectl 常用命令速查表

## 1. 基础资源管理

### 查看资源
```bash
# 查看所有命名空间下的 Pod
kubectl get pods -A

# 查看特定命名空间的资源
kubectl get pods -n <namespace>

# 查看所有命名空间
kubectl get namespaces

# 查看节点信息
kubectl get nodes

# 查看 Pod 详细信息
kubectl get pods -o wide

# 查看所有资源（简洁输出）
kubectl get all -n <namespace>

# 查看资源详细信息
kubectl describe pod <pod-name> -n <namespace>

# 查看资源配置（YAML格式）
kubectl get pod <pod-name> -o yaml
```

### 创建与删除资源
```bash
# 从 YAML 文件创建资源
kubectl apply -f <file.yaml>

# 从多个文件创建资源
kubectl apply -f <file1.yaml> -f <file2.yaml>

# 从目录创建所有资源
kubectl apply -f <dir/>

# 删除资源
kubectl delete -f <file.yaml>

# 删除特定类型的资源
kubectl delete pod <pod-name> -n <namespace>

# 删除命名空间（慎用）
kubectl delete namespace <namespace>

# 删除所有资源
kubectl delete all --all -n <namespace>
```

### 编辑资源
```bash
# 编辑资源配置
kubectl edit <resource> <name> -n <namespace>

# 原地更新镜像（不修改 YAML 文件）
kubectl set image deployment/<name> <container>=<image> -n <namespace>
```

---

## 2. Pod 管理

### Pod 操作
```bash
# 查看 Pod 日志
kubectl logs <pod-name> -n <namespace>

# 实时查看日志
kubectl logs -f <pod-name> -n <namespace>

# 查看多个容器的日志
kubectl logs <pod-name> -c <container-name> -n <namespace>

# 查看上一个实例的日志（Pod 重启后）
kubectl logs --previous <pod-name> -n <namespace>

# 在 Pod 中执行命令
kubectl exec <pod-name> -n <namespace> -- <command>

# 进入 Pod 终端（交互式）
kubectl exec -it <pod-name> -n <namespace> -- /bin/sh
# 或
kubectl exec -it <pod-name> -n <namespace> -- /bin/bash
```

### Pod 调试
```bash
# 复制文件到 Pod
kubectl cp <file> <namespace>/<pod-name>:/path/

# 复制文件从 Pod
kubectl cp <namespace>/<pod-name>:/path/file <local-file>

# 端口转发（用于本地调试）
kubectl port-forward pod/<pod-name> <local-port>:<pod-port> -n <namespace>
```

---

## 3. Deployment 管理

### 部署操作
```bash
# 创建 Deployment
kubectl create deployment <name> --image=<image> -n <namespace>

# 查看 Deployment
kubectl get deployments -n <namespace>

# 扩缩容
kubectl scale deployment <name> --replicas=<num> -n <namespace>

# 查看滚动更新状态
kubectl rollout status deployment/<name> -n <namespace>

# 查看历史版本
kubectl rollout history deployment/<name> -n <namespace>

# 回滚到上一个版本
kubectl rollout undo deployment/<name> -n <namespace>

# 回滚到指定版本
kubectl rollout undo deployment/<name> --to-revision=<num> -n <namespace>

# 重启 Deployment
kubectl rollout restart deployment/<name> -n <namespace>
```

### 镜像更新
```bash
# 更新镜像
kubectl set image deployment/<name> <container>=<image:tag> -n <namespace>

# 检查更新是否成功
kubectl rollout status deployment/<name> -n <namespace>
```

---

## 4. Service 管理

```bash
# 查看 Service
kubectl get svc -n <namespace>

# 创建 Service（暴露 Deployment）
kubectl expose deployment <name> --port=<port> --target-port=<target> -n <namespace>

# 创建 NodePort 类型 Service
kubectl expose deployment <name> --type=NodePort --port=<port> -n <namespace>

# 创建 LoadBalancer 类型 Service
kubectl expose deployment <name> --type=LoadBalancer --port=<port> -n <namespace>
```

---

## 5. Ingress 管理

```bash
# 查看 Ingress
kubectl get ingress -n <namespace>

# 查看 Ingress 详细信息
kubectl describe ingress <name> -n <namespace>
```

---

## 6. ConfigMap 和 Secret

### ConfigMap
```bash
# 从文件创建 ConfigMap
kubectl create configmap <name> --from-file=<file> -n <namespace>

# 从环境变量文件创建
kubectl create configmap <name> --from-env-file=<file> -n <namespace>

# 从字面值创建
kubectl create configmap <name> --from-literal=key=value -n <namespace>

# 查看 ConfigMap
kubectl get configmap -n <namespace>

# 编辑 ConfigMap
kubectl edit configmap <name> -n <namespace>
```

### Secret
```bash
# 创建 Generic Secret
kubectl create secret generic <name> --from-literal=key=value -n <namespace>

# 从文件创建
kubectl create secret generic <name> --from-file=<file> -n <namespace>

# 查看 Secret（Base64 解码）
kubectl get secret <name> -o yaml -n <namespace>

# 解码 Secret 值
kubectl get secret <name> -o jsonpath='{.data.<key>}' -n <namespace> | base64 -d
```

---

## 7. 资源配额与限制

```bash
# 查看 ResourceQuota
kubectl get resourcequota -n <namespace>

# 查看 LimitRange
kubectl get limitrange -n <namespace>
```

---

## 8. 节点管理

```bash
# 查看节点状态
kubectl get nodes

# 查看节点详情
kubectl describe node <node-name>

# 查看节点资源使用
kubectl top nodes

# 标记节点为不可调度
kubectl cordon <node-name>

# 驱逐节点上的 Pod
kubectl drain <node-name> --ignore-daemonsets --delete-emptydir-data

# 解除节点不可调度状态
kubectl uncordon <node-name>
```

---

## 9. 集群信息

```bash
# 查看集群信息
kubectl cluster-info

# 查看集群详情
kubectl cluster-info dump

# 查看 API 资源
kubectl api-resources

# 查看支持的 API 版本
kubectl api-versions

# 查看 Kubernetes 版本
kubectl version

# 查看客户端和服务端版本
kubectl version --client

# 显示当前上下文
kubectl config current-context

# 查看所有上下文
kubectl config get-contexts
```

---

## 10. 上下文与命名空间切换

```bash
# 切换命名空间（永久切换）
kubectl config set-context --current --namespace=<namespace>

# 切换上下文
kubectl config use-context <context-name>

# 查看当前命名空间
kubectl config view --minify
```

---

## 11. 标签与选择器

```bash
# 为资源添加标签
kubectl label pods <pod-name> env=prod -n <namespace>

# 更新标签
kubectl label pods <pod-name> env=staging --overwrite -n <namespace>

# 删除标签
kubectl label pods <pod-name> env- -n <namespace>

# 按标签筛选资源
kubectl get pods -l env=prod -n <namespace>

# 按多个标签筛选
kubectl get pods -l 'env in (prod,staging)' -n <namespace>
```

---

## 12. 事件与故障排查

```bash
# 查看集群事件
kubectl get events -n <namespace>

# 按时间排序查看事件
kubectl get events --sort-by='.lastTimestamp' -n <namespace>

# 查看特定资源相关事件
kubectl get events --field-selector involvedObject.name=<pod-name> -n <namespace>

# 健康检查端点
kubectl get --raw='/healthz'

# 组件健康状态
kubectl get componentstatuses    # 旧版本
kubectl get --raw='/api/v1/namespaces/kube-system/componentstatuses'
```

---

## 13. 资源清理

```bash
# 删除已终止的 Pod
kubectl delete pods --field-selector=status.phase=Failed -n <namespace>

# 删除所有 evicted 的 Pod
kubectl delete pods -n <namespace> --field-selector=status.phase=Evicted

# 删除空 PV 和 PVC
kubectl delete pvc --field-selector=status.phase=Bound -n <namespace>
```

---

## 14. 常用别名

```bash
# 建议添加到 ~/.bashrc 或 ~/.zshrc
alias k='kubectl'
alias kgp='kubectl get pods'
alias kgs='kubectl get svc'
alias kgd='kubectl get deployments'
alias kga='kubectl get all'
alias klf='kubectl logs -f'
alias kex='kubectl exec -it'
alias kdp='kubectl describe pod'
alias kdd='kubectl describe deployment'
alias kd='kubectl delete'
alias kaf='kubectl apply -f'
alias kcf='kubectl create -f'
```

---

## 15. 快速参考

| 操作 | 命令 |
|------|------|
| 查看所有 Pod | `kubectl get pods -A` |
| 查看日志 | `kubectl logs -f <pod> -n <ns>` |
| 进入容器 | `kubectl exec -it <pod> -n <ns> -- sh` |
| 应用配置 | `kubectl apply -f <file>` |
| 删除资源 | `kubectl delete -f <file>` |
| 扩缩容 | `kubectl scale deploy/<name> --replicas=N` |
| 查看节点 | `kubectl get nodes` |
| 端口转发 | `kubectl port-forward pod/<pod> 8080:80` |
| 临时调试 Pod | `kubectl run debug --image=busybox --rm -it -- sh` |
| 导出配置 | `kubectl get deploy <name> -o yaml > backup.yaml` |

---

> **提示**: 使用 `kubectl <command> --help` 可以查看任何命令的详细帮助信息。
