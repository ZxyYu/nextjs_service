const axios = require('axios');
const crypto = require('crypto');
const moment = require('moment');

// 容联云账户信息
const accountSid = '2c94811c946f6bfb01952236cc8d1676';
const authToken = 'c4a2b466e4694b90b5c51eddeed1cb9a';
const appId = '2c94811c946f6bfb01952236ce47167d';

// 生成时间戳（格式：YYYYMMDDHHmmss）
const timestamp = moment().format('YYYYMMDDHHmmss');

// 生成签名（格式：MD5(accountSid + authToken + timestamp)）
const sig = crypto.createHash('md5').update(accountSid + authToken + timestamp).digest('hex').toUpperCase();

// 生成授权信息（格式：Base64(accountSid:timestamp)）
const authorization = Buffer.from(`${accountSid}:${timestamp}`).toString('base64');

// 构造请求头
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
    'Authorization': authorization
};

// 构造请求 URL
const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${accountSid}/SMS/TemplateSMS?sig=${sig}`;


// 发送请求
async function sendVerificationCode(requestBody) {
    try {
        const response = await axios.post(url, {...requestBody, appId: appId}, { headers });
        console.log('Response data:', response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};

module.exports = sendVerificationCode;