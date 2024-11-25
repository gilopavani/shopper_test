import { prismaMock } from "./../../../../tests/utils/prismaMock";
import { GetDriversUseCase } from "./getDriversUseCase";

describe("GetDriversUseCase", () => {
  const getDriversUseCase = new GetDriversUseCase();

  it("deve retornar uma lista de motoristas", async () => {
    const driversMock = [
      {
        id: 1,
        name: "John Doe",
        description: "Experienced driver",
        car: "Toyota Prius",
        tax: 15,
        Review: [
          { rating: 5, comment: "Excelente motorista!" },
          { rating: 4, comment: "Bom, mas pode melhorar." },
        ],
      },
    ];

    prismaMock.driver.findMany.mockResolvedValue(driversMock);

    const result = await getDriversUseCase.execute();

    expect(result).toEqual(driversMock);
    expect(prismaMock.driver.findMany).toHaveBeenCalled();
  });

  it("deve lançar um erro se nenhum motorista for encontrado", async () => {
    prismaMock.driver.findMany.mockResolvedValue([]);

    await expect(getDriversUseCase.execute()).rejects.toThrow(
      "Nenhum motorista encontrado"
    );
  });
});
