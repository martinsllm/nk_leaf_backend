const { PrismaClient } = require('@prisma/client');
const uuid = require('uuid');

const prisma = new PrismaClient();

module.exports = {

    List: () => {
        return prisma.foto_user.findMany();
    },

    ListOne: (id) => {
        return prisma.foto_user.findFirst({
            where: { id: Number(id) }
        });
    },

    Create: (id, url) => {
        return prisma.foto_user.create({
            data: {
                nome: uuid.v4().toString() + '.jpg',
                url,
                user: Number(id)
            }
        });
    },

    Delete: (id) => {
        return prisma.foto_user.delete({
            where: {
                id: Number(id)
            }
        })
    }
}