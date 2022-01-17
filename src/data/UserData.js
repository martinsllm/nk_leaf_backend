const { generateHash } = require('../config/bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {

    List: () => {
        return prisma.user.findMany({
            include: {
                endereco_enderecoTouser: true,
                atribuicao_atribuicaoTouser: {
                    select: {
                        nome: true
                    }
                }
            }
        });
    },

    ListFirst: (params) => {
        return prisma.user.findFirst({
            where: { 
                ...params 
            }
        });
    },

    ListEmail: (email) => {
        return prisma.user.findFirst({
            where: { 
                email
            }
        });
    },

    ListOne: (id) => {
        return prisma.user.findUnique({ 
            where: { 
                id_user: Number(id) 
            },
            include: {
                foto_user: {
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                endereco_enderecoTouser: true,
                atribuicao_atribuicaoTouser: {
                    select: {
                        nome: true
                    }
                }   
            }
        });
    },

    Create: async (params) => {
        
        return prisma.user.create({
            data: {
                ...params,
                senha: await generateHash(params.senha),
                permissao: false
            }
        })
    },

    Update: (id, params) => {
        return prisma.user.update({
            where: { 
                id_user: Number(id) 
            },
            data: {
                ...params
            }
        })
    },

    UpdatePassword: async (email, senha) => {
        return prisma.user.updateMany({
            where: { 
                email
            },
            data: {
                senha: await generateHash(senha)
            }
        })
    },

    Delete: (id) => {
        return prisma.user.delete({
            where: {
                id_user: Number(id)
            }
        })
    }


}