import chai from 'chai'
import http from 'chai-http';
import subSet from 'chai-subset'
import App from '../app'

chai.use(http);
chai.use(subSet);

const equipmentSchema = {
  code: code => code,
  name: name => name,
  location: location => location,
  vessel_id: vessel_id => vessel_id,
};

describe('Test integration Equipment', () => {

  it('/equipment - POST', () => {
      chai.request(App) // Instância do express
          .post('/equipment') // Rota
          .send({
            code: '5310B5R7',
            name: 'Engine',
            location: 'Brazil',
            vessel_id: 'MV102',
          })
          .end((err, res) => {
              chai.expect(err).to.be.null;
              chai.expect(res).to.have.status(200);
              chai.expect(res.body).to.containSubset(equipmentSchema);
          });
  });
  it('/equipment/inactive - PUT', () => {
    chai.request(App) // Instância do express
        .put('/equipment/inactive') // Rota
        .send({
          equipments: [
            {
                code: '5f569c6c9675310b3428c19d'
            },
                {
                code: '5f569c9b3620400c72a40358'
            }
        ]
        })
        .end((err, res) => {
            chai.expect(err).to.be.null;
            chai.expect(res).to.have.status(200);
            chai.expect(res.body).to.containSubset(equipmentSchema);
        });
});
  it('/equipment - GET', () => {
      chai.request(App)
          .get('/equipment')
          .end((err, res) => {
              chai.expect(err).to.be.null;
              chai.expect(res).to.have.status(200);
              chai.expect(res.body.length).to.be.equal(1);
              chai.expect(res.body).to.containSubset([equipmentSchema]);
          });
  });
});
