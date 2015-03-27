var request = require('supertest');
var expect = require('code').expect();

describe('Homepage', function () {

  it('should return iQueue', function (done) {
    request(sails.hooks.http.app)
      .post('/')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.contain('iQueue');
        done();
      });
  });

});
