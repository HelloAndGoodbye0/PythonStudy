# https://github.com/szad670401/HyperLPR
# 识别车牌
# import opencv
import cv2
# import hyperlpr3
import hyperlpr3 as lpr3
import sys

# 从命令行参数获取图片路径
if len(sys.argv) < 2:
    print("用法: python recognize_plate.py <图片路径>")
    sys.exit(1)

image_path = sys.argv[1]
print(f"正在识别图片 '{image_path}'...")
# 初始化识别器
catcher = lpr3.LicensePlateCatcher()

# 识别单张图片
image = cv2.imread(image_path)
if image is None:
    print(f"错误: 无法读取图片文件 '{image_path}'")
    sys.exit(1)

results = catcher(image)
print(results)
for plate in results:
    print(f"车牌号: {plate[0]},  置信度: {plate[1]:.2f},  type: {plate[2]}  位置: {plate[3]}")

