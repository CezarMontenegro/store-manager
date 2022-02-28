const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('Testa a funcao getAll', () => {
    describe('Retorna todos os produtos', () => {
        const products = [
            {
                id: 1,
                name: "Martelo de Thor",
                quantity: 10
            },
            {
                id: 2,
                name: "Traje de encolhimento",
                quantity: 20
            }]

        before(() => {
            sinon.stub(productsModel, 'getAll').resolves(products)
        });
        after(() => {
            productsModel.getAll.restore()
        });

        it('O retorno é um array não-vazio', async () => {
            const result = await productsService.getAll();

            expect(result).to.be.an('array');
            expect(result).to.be.not.empty;
        });
        it('Todos os elementos do array possuem as propriedades id, name e quantity', async () => {
            const result = await productsService.getAll();

            result.forEach((elem) => expect(elem).to.have.all.keys(['id','name', 'quantity']))
        })
    })
});

describe('Testa a funcao getById', () => {
    describe('Se não tiver nenhum id correspondente, joga um erro', () => {
        before(() => {
            sinon.stub(productsModel,'getById').rejects({ message: 'Product not found', status: 404});
        });
        after(() => {
            productsModel.getById.restore();
        })

        it('Joga um erro com a propriedade message se não achar id correspondente', async () => {
            try {
               await productsService.getById(12)
            }
            catch(e) {
                expect(e).to.be.have.property('message');
            }
        });
        it('Joga um erro com a propriedade status 404 se não achar id correspondente', async () => {
            try {
                await productsService.getById(12)
            }
            catch(e) {
                expect(e.status).to.equal(404);
            }
        })
    });
    describe('Se achar id correspondente retorna objeto do produto', () => {
        const product = {
            id: 1,
            name: "Martelo de Thor",
            quantity: 10
        }

        before(() => {
            sinon.stub(productsModel, 'getById').resolves(product)
        });
        after(() => {
            productsModel.getById.restore()
        });

        it('Retorna um objeto', async () => {
            const result = await productsService.getById(1)

            expect(result).to.be.an('object');
        });
        it('O objeto tem as propriedades id, name e quantity', async () => {
            const result = await productsService.getById(1);
            
            expect(result).to.have.all.keys(['id', 'name', 'quantity'])
        });
    });
});
