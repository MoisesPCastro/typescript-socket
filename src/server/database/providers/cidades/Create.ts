import { ETableNames } from "../../ETableNames";
import { ICidade } from "../../models";
import { Knex } from "../../knex";
import { notifiAll } from "../../../config/socketRoutes";

export const create = async (
  cidade: Omit<ICidade, "id">
): Promise<number | Error> => {
  try {
    await Knex(ETableNames.cidade).insert(cidade);
    const result = await Knex(ETableNames.cidade).first().orderBy("id", "desc");

    notifiAll({
      name: "@Create_cidade",
      details: result,
    });
    if (typeof result?.id === "object") {
      return result.id;
    } else if (typeof result?.id === "number") {
      return result?.id;
    }

    return new Error("Erro ao cadastrar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao cadastrar o registro");
  }
};
