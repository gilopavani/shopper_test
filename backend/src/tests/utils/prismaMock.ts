import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import { PrismaClient } from "@prisma/client";

export const prismaMock = mockDeep<PrismaClient>();

// Limpar todas as chamadas de mock entre os testes
afterEach(() => {
  mockReset(prismaMock);
});

// Substituir a importação padrão do Prisma pelo mock
jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => prismaMock),
}));
