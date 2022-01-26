const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {

    ListNoAccepts: () => {
        return prisma.pedido.findMany({
            where: {
                designer: null,

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
    ListAccepts: () => {
        return prisma.pedido.findMany({
            where: {
                pronto: false
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
    ListAcceptsAproved: () => {
        return prisma.pedido.findMany({
            where: {
                pronto: true,
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



}