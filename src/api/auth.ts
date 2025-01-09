"use server";

export const auth = async () => {
  try {
    const name = "tetes";
    return name;
  } catch (error) {
    console.error("An error occurred in the auth function:", error);
    return null; // Retorna um valor padrão em caso de erro
  }
};
