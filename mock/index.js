const Mock = require('mockjs');

const Random = Mock.Random;



const mockList = [
    {
        url: '/api/data',
        method: 'get',
        response() {
            return {
                errno: 0,
                data: {
                    id: Random.id(),
                }
            }
        }
    },
];

module.exports = mockList;