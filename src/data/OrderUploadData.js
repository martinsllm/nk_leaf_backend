const { PrismaClient } = require('@prisma/client');
const uuid = require('uuid');

const prisma = new PrismaClient();

module.exports = {

    List: () => {
        return prisma.foto_pedido.findMany();
    },

    ListOne: (id) => {
        return prisma.foto_pedido.findFirst({
            where: { pedido: Number(id) }
        });
    },

    Create: (id, url) => {
        return prisma.foto_pedido.create({
            data: {
                nome: uuid.v4().toString() + '.jpg',
                url,
                pedido: Number(id)
            }
        });
    },

    Delete: (id) => {
        return prisma.foto_pedido.delete({
            where: { id: Number(id) }
        });
    }
}