const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');

describe('Testando salesModel', () => { 
    describe('Testa a funcao getAll', () => {
        describe('Retorna todos as vendas', () => {
            const sales = [[
                {
                    saleId: 1,
                    date: "2022-02-23T22:13:54.000Z",
                    productId: 1,
                    quantity: 5
                },
                {
                    saleId: 1,
                    date: "2022-02-23T22:13:54.000Z",
                    productId: 2,
                    quantity: 10
                }
            ]]

            before(() => {
                sinon.stub(connection, 'execute').resolves(sales)
            });
            after(() => {
                connection.execute.restore();
            });

            it('O retorno é um array não-vazio', async () => {
                const result = await salesModel.getAll();

                expect(result).to.be.an('array');
                expect(result).to.be.not.empty;
            });
            it('Todos os elementos do array possuem as propriedades saleId, date, productId e quantity', async () => {
                const result = await salesModel.getAll();

                result.forEach((elem) => expect(elem).to.have.all.keys(['saleId','date', 'quantity', 'productId']))
            })
        });
    });

    describe('Testa a funcão getById', () => {
        describe('Se não tiver nenhum id correspondente, joga um erro', () => {
            before(() => {
                sinon.stub(connection,'execute').resolves([[]]);
            });
            after(() => {
                connection.execute.restore();
            })

            it('Joga um erro com a propriedade message se não achar id correspondente', async () => {
                try {
                    await salesModel.getById(12)
                }
                catch(err) {
                    expect(err).to.be.have.property('message');
                }
            });
            it('Jogs um erro com a propriedade status 404 se não achar id correspondente', async () => {
                try {
                    await salesModel.getById(12)
                }
                catch(e) {
                    expect(e.status).to.equal(404);
                }
            })
        });

        describe('Se achar id correspondente retorna array com as vendas', () => {
            const example = [
                {
                    date: "2022-02-23T22:13:54.000Z",
                    productId: 1,
                    quantity: 5
                },
                {
                    date: "2022-02-23T22:13:54.000Z",
                    productId: 2,
                    quantity: 10
                }
            ];
            const sales = [example];

            before(() => {
                sinon.stub(connection, 'execute').resolves(sales)
            });
            after(() => {
                connection.execute.restore()
            });
            
            it('Retorna um array não vazio', async () => {
                const result = await salesModel.getById(1)

                expect(result).to.be.an('array');
                expect(result).to.be.not.empty;
            });
            it('Cada venda tem as propriedades date, productId e quantity', async () => {
                const result = await salesModel.getById(1);

                result.forEach((sale) => expect(sale).to.have.all.keys([ 'date', 'productId', 'quantity']));
            });
        })
    });

    describe('Testa a funcao create', () => {
        describe('Registra as informações no banco', () => {
            const sales = [
                {
                productId: 1,
                quantity: 2
                },
                {
                productId: 2,
                quantity: 5
                }
            ]
            const insertId = 2

            before(() => {
                sinon.stub(connection, 'execute').resolves([{insertId}]);
            });
            after(() => {
                connection.execute.restore();
            });

            it('Retorna um objeto', async () => {
                const result = await salesModel.create(sales);

                expect(result).to.be.an('object');
            });
            it('O objeto possui um array', async () => {
                const result = await salesModel.create(sales);

                expect(result.itemsSold).to.be.an('array');
            });
            it('Cada elemento desse array possui as propriedades productId e quantity', async () => {
                const result = await salesModel.create(sales);

                result.itemsSold.forEach((sale) => expect(sale).to.have.all.keys(['quantity', 'productId']));
            })
        });
    });

    describe('Testa a função uptdate', () => {
        describe('Atualiza as informações', () => {
            const sales = [
                {
                productId: 1,
                quantity: 2
                },
                {
                productId: 2,
                quantity: 5
                }
            ]

            before(() => {
                sinon.stub(connection, 'execute').resolves([[]]);
            });
            after(() => {
                connection.execute.restore();
            });

            it('Retorna um objeto', async () => {
                const result = await salesModel.update(sales,2);

                expect(result).to.be.an('object');
            });
            it('O objeto retornado contém um array não vazio', async () => {
                const result = await salesModel.update(sales, 2);

                expect(result.itemUpdated).to.be.an('array');
                expect(result.itemUpdated).to.be.not.empty;
            });
        });
    });
});