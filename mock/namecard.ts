import Mock from 'mockjs';

export default {
  'GET /api/medal': {
    data: Mock.mock({
      'list|30-100': [
        {
          'id|+1': 1,
          logoImg: Mock.Random.image('48*48'),
          bg: Mock.Random.image('48*48'),
          name: '@cname',
          desc: '@ctitle',
          createdAt: '@datetime',
        },
      ],
    }),
  },

  'GET /api/cards': {
    data: Mock.mock({
      'list|30-100': [
        {
          'id|+1': 1,
          name: '@cname',
          mobile: /^1\d{10}/,
          title: '@ctitle',
          'medal|1-3': ['@ctitle'],
          createdAt: '@datetime',
        },
      ],
    }),
  },

  'GET /api/auth': {
    success: true,
    data: Mock.mock({
      'list|30-100': [
        {
          'id|+1': 1,
          name: '@cname',
          mobile: /^1\d{10}/,
          'title|0-3': [
            {
              'id+1': 1,
              name: '@ctitle',
            },
          ],
          company: '@ctitle',
          isAuth: '@boolean',
          createdAt: '@datetime',
        },
      ],
    }),
  },
};
