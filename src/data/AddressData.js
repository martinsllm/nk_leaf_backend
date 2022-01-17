const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {

    List: () => {
        return prisma.endereco.findMany();
    },

    ListFirst: (params) => {
        return prisma.endereco.findFirst({
            where: { 
                ...params 
            }
        });
    },

    ListOne: (id) => {
        return prisma.endereco.findUnique({
            where: {
                id: Number(id)
            }
        })
    },

    Create: (params) => {
        return prisma.endereco.create({
            data: {
                ...params
            }
        })
    },

    Update: (id, params) => {
        return prisma.endereco.update({
            where: {
                id: Number(id)
            },
            data: {
                ...params
            }
        })
    },

    Delete: (id) => {
        return prisma.endereco.delete({
            where: {
                id: Number(id)
            }
        })
    }
}