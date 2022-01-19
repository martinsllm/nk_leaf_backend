const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {

    List: () => {
        return prisma.pedido.findMany({
            where: {
                designer: null
            },
            include: {
                user_pedidoTouser: {
                    select: {
                        nome_completo: true
                    }
                },
                user_pedido_designerTouser: {
                    select: {
                        nome_completo: true
                    }
                },
            },
            orderBy: {
                data: 'asc'
            }
        });
    },

    ListAccepts: (id) => {
        return prisma.pedido.findMany({
            where: {
                designer: Number(id)
            },
            include: {
                user_pedidoTouser: {
                    select: {
                        nome_completo: true
                    }
                },
                user_pedido_designerTouser: {
                    select: {
                        nome_completo: true
                    }
                },
            },
            orderBy: {
                data: 'asc'
            }
        });
    },


    ListOne: (id) => {
        return prisma.pedido.findUnique({
            where: { 
                id_pedido: Number(id) 
            },
            include: {
                foto_pedido: {
                    orderBy: {
                        createdAt: 'asc'
                    }
                },
                user_pedidoTouser: true,
                user_pedido_designerTouser: true 
            }
        })
    },

    Create: (params) => {
        return prisma.pedido.create({
            data: {
                ...params,
                pronto: false
            }
        })
    },

    Update: (id, params) => {
        return prisma.pedido.update({
            where: {
                id_pedido: Number(id)
            },
            data: {
                ...params
            }
        })
    },

    Delete: (id) => {
        return prisma.pedido.delete({
            where: { 
                id_pedido: Number(id) 
            }
        })
    }
}