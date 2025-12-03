import 'package:flutter/material.dart';

/// 通用弹框工具类
class CommonDialog {
  CommonDialog._();

  /// 显示确认对话框，返回 true 表示用户确认，false 表示取消或关闭
  static Future<bool> showConfirm(
    BuildContext context, {
    String title = '确认',
    required String content,
    String confirmText = '确认',
    String cancelText = '取消',
    bool confirmIsDestructive = false,
  }) async {
    final result = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(title),
        content: Text(content),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(false),
            child: Text(cancelText),
          ),
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(true),
            child: Text(confirmText,
                style: TextStyle(
                    color: confirmIsDestructive ? Colors.red : Theme.of(ctx).colorScheme.primary)),
          ),
        ],
      ),
    );

    return result ?? false;
  }

  /// 显示信息弹框（只有一个确认按钮）
  static Future<void> showAlert(
    BuildContext context, {
    String title = '提示',
    required String content,
    String buttonText = '确定',
  }) async {
    await showDialog<void>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(title),
        content: Text(content),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(),
            child: Text(buttonText),
          ),
        ],
      ),
    );
  }
}
