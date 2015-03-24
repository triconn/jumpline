var request = require('supertest');

describe('UsersController', function () {

  describe('#login()', function () {
    it('should redirect to /mypage', function (done) {
      request(sails.hooks.http.app)
        .post('/')
        .expect(200);
    });
  });

});
