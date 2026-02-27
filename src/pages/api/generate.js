export const prerender = false;

export const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const { prompt, formato, categoria } = data;
    const apiKey = import.meta.env.OPENAI_API_KEY;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Eres un experto en estructuras de documentos profesionales.",
          },
          {
            role: "user",
            content: `Genera el contenido para una plantilla de ${categoria} en formato ${formato}. Descripción: ${prompt}`,
          },
        ],
      }),
    });

    const result = await response.json();

    // Verificación de seguridad por si OpenAI devuelve error (ej. sin saldo)
    if (!response.ok) {
      return new Response(JSON.stringify({ error: result.error.message }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ text: result.choices[0].message.content }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};