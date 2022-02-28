const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('Testa o GET do model dos produtos', () => {
  describe('Retorna todos os produtos', () => {
      const products = [[
          {
              id: 1,
              name: "Martelo de Thor",
              quantity: 10
          },
          {
              id: 2,
              name: "Traje de encolhimento",
              quantity: 20
          }]]

      before(() => {
          sinon.stub(connection, 'execute').resolves(products)
      });
      after(() => {
          connection.execute.restore();
      });
      
      it('O retorno é um array não-vazio', async () => {
          const result = await productsModel.getAll();
          expect(result).to.be.an('array');
          expect(result).to.be.not.empty;
      });
      it('Todos os elementos do array possuem as propriedades id, name e quantity', async () => {
          const result = await productsModel.getAll();
          result.forEach((elem) => expect(elem).to.have.all.keys(['id','name', 'quantity']))
      })
  });

  describe('2 - Testando getByid', () => {
    const mockGetById = [
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      }
    ];
    
    before(() => {
      sinon.stub(connection, 'execute').resolves([[[mockGetById]]]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Deveria retornar um array', async () => {
      const [result] = await productsModel.getById();

      expect(result).to.be.an('array');
    });
    it('Deveria retornar mockGetById', async () => {
      const [result] = await productsModel.getById();
      
      expect(result).to.be.equal(mockGetById);
    });
    it('Joga um erro com a propriedade message se não achar id correspondente', async () => {
        try {
            await productsModel.getById(12)
        }
        catch(err) {
            expect(err).to.be.have.property('Product not found');
        }
    });
  });

  describe('Testa o POST do model dos produtos', () => {
    describe('Registra as informações no banco', () => {
        const insertId = 2

        before(() => {
            sinon.stub(connection, 'execute').resolves([{insertId}]);
        });
        after(() => {
            connection.execute.restore();
        });

        it('Retorna um objeto', async () => {
            const result = await productsModel.create('nameExample',2);
            expect(result).to.be.an('object');
        });
        it('O objeto contém a chave id com o valor da insertId', async () => {
            const result = await productsModel.create('nameExample',2);
            expect(result.id).to.equal(insertId);
        });
    });
});

describe('Testa a função PUT do model dos produtos', () => {
  describe('Atualiza as informações', () => {
      before(() => {
          sinon.stub(connection, 'execute').resolves();
      });
      after(() => {
          connection.execute.restore();
      });
      it('Retorna um objeto', async () => {
          const result = await productsModel.update('superName',5, 2);
          expect(result).to.be.an('object');
      });
      it('O objeto retornado contém os mesmos valores da entrada', async () => {
          const result = await productsModel.update('superName', 5, 25);
          expect(result.name).to.equal('superName');
          expect(result.quantity).to.equal(5);
      });
  });
});

describe('Testa a função DELETE do model dos produtos', () => {
  describe('Deleta um produto', () => {
      before(() => {
          sinon.stub(connection,'execute').resolves();
      });
      after(() => {
          connection.execute.restore();
      });
      it('A função não retorna nada', async () => {
          const result = await productsModel.exclude(1);
          expect(result).to.be.undefined;
      })
  })
})
});


