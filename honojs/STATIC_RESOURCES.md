# 静态资源配置指南

## 目录结构
```
project/
├── src/
│   └── index.ts       # 主入口文件
├── public/            # 静态资源根目录
│   ├── css/           # 样式文件
│   ├── js/            # JavaScript 文件
│   ├── images/        # 图片资源
│   │   ├── avatars/   # 头像
│   │   ├── uploads/   # 上传图片
│   │   └── banners/   # 轮播图
│   └── uploads/       # 文件上传目录
└── logs/              # 日志文件
```

## 访问规则

静态资源可通过以下方式访问：

| 物理路径 | 访问URL |
|---------|---------|
| `public/css/style.css` | `http://localhost:3000/static/css/style.css` |
| `public/js/app.js` | `http://localhost:3000/static/js/app.js` |
| `public/images/avatar.png` | `http://localhost:3000/static/images/avatar.png` |
| `public/uploads/file.pdf` | `http://localhost:3000/static/uploads/file.pdf` |

## 文件上传配置

建议的上传目录：
- `public/uploads/` - 通用文件上传
- `public/images/uploads/` - 图片上传
- `public/documents/` - 文档类文件

## 安全建议

1. **限制文件类型**：在上传时验证文件扩展名
2. **文件大小限制**：设置最大上传文件大小（如 10MB）
3. **文件名处理**：使用随机文件名或时间戳避免冲突
4. **访问控制**：敏感文件不应放在 public 目录
