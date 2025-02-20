const Mock = require('mockjs');

const Random = Mock.Random;



const mockList = [
    {
        url: '/api/user/sendVerifyCode',
        method: 'post',
        response(req) {
            console.log("body", req.request.body);
            return {
                errno: 0,
                data: {
                    code: 200,
                    data: 6899,
                }
            }
        }
    },
];

module.exports = mockList;