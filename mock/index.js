const Mock = require('mockjs');
const sendVerificationCode = require('./verify');
const Random = Mock.Random;



const mockList = [
    {
        url: '/api/user/sendVerifyCode',
        method: 'post',
        response(req) {
            console.log("body", req.request.body);
            const { to, templateId } = req.request.body;
            if (to) {
                sendVerificationCode({ to, templateId, datas: [Random.integer(1000,9999), '5']})
                return {
                    errno: 0,
                    data: {
                        code: 200,
                    },
                };
            };
            return {
                errno: 1,
                data: {
                    code: 400,
                },
            }
        }
    },
];

module.exports = mockList;