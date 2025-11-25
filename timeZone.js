
/**
 * 获取本地时区偏移
 * @returns 本地时区偏移 分钟 负数表示东时区
 *
 */
function getCurrentTimeZoneOffset() {
    return new Date().getTimezoneOffset();
}


/**
 * 获取本地时区
 */
function getCurrentTimeZone() {
    const offset = -getCurrentTimeZoneOffset(); // 转换为正数（东时区为正）
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset >= 0 ? '+' : '-';
    return `UTC${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}


/**
 * 需要封装一个方法  把UTC时间戳转换为指定 时区显示的时间 格式为YYYY-MM-DD HH:MM:SS
 * @param {number} utcTimestamp UTC时间戳
 * @param {string} timeZone 时区 格式为UTC+08:00或UTC-05:30
 * @returns 指定时区的时间 格式为YYYY-MM-DD HH:MM:SS
 */
function convertUtcTimeStampToTimeZone(utcTimestamp, timeZone = getCurrentTimeZone()) {
    const match = timeZone.trim().match(/^UTC([+-])(\d{2}):(\d{2})$/i);
    if (!match) {
        throw new Error(`Invalid timeZone format: ${timeZone}. Expected format: UTC+08:00 or UTC-05:30`);
    }

    const sign = match[1] === '+' ? 1 : -1;
    const hours = parseInt(match[2], 10);
    const minutes = parseInt(match[3], 10);
    const offsetMinutes = sign * (hours * 60 + minutes);

    const targetDate = new Date(utcTimestamp + offsetMinutes * 60 * 1000);

    const year = targetDate.getUTCFullYear();
    const month = String(targetDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getUTCDate()).padStart(2, '0');
    const hour = String(targetDate.getUTCHours()).padStart(2, '0');
    const minute = String(targetDate.getUTCMinutes()).padStart(2, '0');
    const second = String(targetDate.getUTCSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}




/**
 * 格式化本地时间为 YYYY-MM-DD HH:MM:SS
 * @param {Date} date 日期对象
 * @returns 格式化后的日期时间字符串 格式为YYYY-MM-DD HH:MM:SS
 */
function formatLocalTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需+1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }




console.log("getCurrentTimeZoneOffset():", getCurrentTimeZoneOffset());
console.log("getCurrentTimeZone():",  getCurrentTimeZone());
console.log("convertUtcTimeStampToTimeZone():", convertUtcTimeStampToTimeZone(Date.now(), "UTC+08:00"));
console.log("convertUtcTimeStampToTimeZone():", convertUtcTimeStampToTimeZone(Date.now(), "UTC+09:00"));



let utcTimestamp = Date.now();
console.log("utcTimestamp:", utcTimestamp);
let date = new Date(utcTimestamp);
console.log("date:", formatLocalTime(date),date.toLocaleString());