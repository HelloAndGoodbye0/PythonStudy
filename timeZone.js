/**
 * 获取当前时区偏移，单位为分钟
 * @returns {number} 当前时区偏移分钟数
 */
function getTimeZoneOffset() {
    return new Date().getTimezoneOffset();
}

/**
 * 获取当前时区
 * @returns {string} 时区字符串，如 UTC+08:00
 */
function getCurrentTimeZone() {
    const offset = -getTimeZoneOffset(); // 转换为正数（东时区为正）
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset >= 0 ? '+' : '-';
    return `UTC${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

/**
 * 获取当前时间的UTC时间戳，单位为毫秒
 * @returns {number} 当前UTC时间戳，单位为毫秒
 */
function getCurrentUTCTimestamp() {
    const localTimestamp = Date.now(); // 本地时间戳
    const timeZoneOffset = getTimeZoneOffset(); // 时区偏移（分钟，负数表示东时区）
    // 本地时间戳 - 偏移 = UTC时间戳
    return localTimestamp + timeZoneOffset * 60 * 1000;
}

/**
 * UTC时间戳转换为本地时间戳
 * @param {number} utcTimestamp UTC时间戳，单位为毫秒
 * @returns {number} 本地时间戳，单位为毫秒
 */
function utcToLocalTimeStamp(utcTimestamp) {
    const timeZoneOffset = getTimeZoneOffset();
    // UTC时间戳 + 偏移 = 本地时间戳
    return utcTimestamp - timeZoneOffset * 60 * 1000;
}

/**
 * 指定UTC时间戳转换为指定时区的时间（返回格式化字符串）
 * @param {number} utcTimestamp UTC时间戳，单位为毫秒
 * @param {string} timeZone 指定时区字符串，如 "UTC+08:00"
 * @returns {string} 指定时区的格式化时间字符串
 */
function convertUtcTimeStampToTimeZone(utcTimestamp, timeZone) {
   // 解析时区字符串，如 "UTC+08:00" -> 480 分钟 (8*60)
    const match = timeZone.match(/^UTC([+-])(\d{2}):(\d{2})$/);
    if (!match) {
        throw new Error(`Invalid timeZone format: ${timeZone}. Expected format: UTC+08:00 or UTC-05:00`);
    }
    
    const sign = match[1] === '+' ? 1 : -1;
    const hours = parseInt(match[2], 10);
    const minutes = parseInt(match[3], 10);
    const offsetMinutes = sign * (hours * 60 + minutes);
    // 目标时区对应的瞬时毫秒数
    const targetTs = utcTimestamp + offsetMinutes * 60 * 1000;

    // 使用 UTC getter 格式化，避免受运行环境本地时区影响
    return formatTimeStamp(targetTs);
}
/**
 * 本地时间戳转换为UTC时间戳
 * @param {number} localTimestamp 本地时间戳，单位为毫秒
 * @returns {number} UTC时间戳，单位为毫秒
 */
function localToUtcTimeStamp(localTimestamp) {
    const timeZoneOffset = getTimeZoneOffset();
    return localTimestamp - timeZoneOffset * 60 * 1000;
}



/**
 * 格式化输出时间戳
 * @param {number} timestamp 时间戳，单位为毫秒
 * @returns {string} 格式化后的时间字符串
 */
function formatTimeStamp(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// ===== 测试代码 =====
console.log("Current Time Zone:", getCurrentTimeZone());

const nowTimeStamp = Date.now();
console.log("Current Local Time:", formatTimeStamp(nowTimeStamp), `(${nowTimeStamp})`);

const utcTimeStamp = getCurrentUTCTimestamp();
// 打印 UTC 时间请用 UTC 格式化
console.log("Current UTC Time:", formatTimeStamp(utcTimeStamp), `(${utcTimeStamp})`);

const localTimeStamp = utcToLocalTimeStamp(utcTimeStamp);
console.log("UTC to Local Time:", formatTimeStamp(localTimeStamp), `(${localTimeStamp})`);

const localTimeStamp2 = convertUtcTimeStampToTimeZone(utcTimeStamp, "UTC+08:00");
console.log("UTC to UTC+08:00 Time:", localTimeStamp2);