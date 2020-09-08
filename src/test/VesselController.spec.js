import chai from 'chai'
import http from 'chai-http';
import subSet from 'chai-subset'
import App from '../app'

chai.use(http);
chai.use(subSet);

const vesselSchema = {
  code: code => code,
};

describe('Test integration Vessel', () => {

  it('/vessel - POST', () => {
      chai.request(App)
          .post('/vessel')
          .send({
              code: 'MV4523',
          })
          .end((err, res) => {
              chai.expect(err).to.be.null;
              chai.expect(res).to.have.status(200);
              chai.expect(res.body).to.containSubset(vesselSchema);
          });
  });

  it('/vessel - GET', () => {
      chai.request(App)
          .get('/vessel')
          .end((err, res) => {
              chai.expect(err).to.be.null;
              chai.expect(res).to.have.status(200);
              chai.expect(res.body.length).to.be.equal(1);
              chai.expect(res.body).to.containSubset([vesselSchema]);
          });
  });
});
