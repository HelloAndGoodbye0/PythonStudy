# https://github.com/szad670401/HyperLPR
# 识别车牌
# import opencv
import cv2
# import hyperlpr3
import hyperlpr3 as lpr3
# 初始化识别器
catcher = lpr3.LicensePlateCatcher()

# 识别单张图片
image = cv2.imread("car.jpg")
results = catcher(image)

for plate in results:
    print(f"车牌号: {plate[0]},  置信度: {plate[1]:.2f},  位置: {plate[2]}")

