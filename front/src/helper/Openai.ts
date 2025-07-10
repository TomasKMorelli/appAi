

export async function translateText(text: string, language: string){

  try {
    const response = await fetch(`https://open-api-worker.workw-api-test.workers.dev`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, language }),
    });
    const data = await response.json();
  
    return data;
  } catch (error) {
    console.log("Error", error);
    return { error: "Error al conectar con el servidor" };
  }
}
export default translateText;