export async function categorizeWithGemini(fullReceiptText, totalAmount) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=' + apiKey,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
You are a financial assistant AI.

The user has scanned a receipt. Based on the full text of the receipt and the total amount, infer the *most appropriate expense category*.

Do not choose from a fixed list — use the best category you can based on context (e.g., hotel stay, business meal, cab fare, subscription, etc.).

Return only valid JSON in the format:
{
  "amount": 205.00,
  "category": "hotel accommodation"
}

Here is the receipt:
${fullReceiptText}
`

                }
              ]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      console.error("❌ Gemini API error:", errData);
      throw new Error("Gemini request failed");
    }

    const data = await response.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    const clean = raw.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    return {
      item: 'Total',
      amount: parsed.amount || totalAmount,
      category: parsed.category || 'uncategorized'
    };

  } catch (err) {
    console.error('❌ Failed to parse Gemini response:', err);
    return {
      item: 'Total',
      amount: totalAmount,
      category: 'uncategorized'
    };
  }
}
