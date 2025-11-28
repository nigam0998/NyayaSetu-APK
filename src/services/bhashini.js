
const BHASHINI_API_KEY = import.meta.env.VITE_BHASHINI_API_KEY;
const BHASHINI_ENDPOINT = 'https://dhruva-api.bhashini.gov.in/services/inference/pipeline';

// Helper to get the pipeline ID (this is often static or fetched via another call, 
// but for this implementation we'll use a common default or allow it to be passed)
// Note: In a real production app, you might need to fetch the available pipelines first.
// For now, we will implement a generic structure.

export const translateText = async (text, sourceLang = 'en', targetLang) => {
    if (!text || !targetLang || sourceLang === targetLang) return text;

    try {
        // This is a simplified implementation. 
        // Bhashini often requires a specific pipeline ID for the language pair.
        // Since we don't have the exact pipeline ID, we will structure the request 
        // based on common Bhashini API patterns.

        const response = await fetch(BHASHINI_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': BHASHINI_API_KEY
            },
            body: JSON.stringify({
                pipelineTasks: [
                    {
                        taskType: "translation",
                        config: {
                            language: {
                                sourceLanguage: sourceLang,
                                targetLanguage: targetLang
                            }
                        }
                    }
                ],
                inputData: {
                    input: [
                        {
                            source: text
                        }
                    ]
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Bhashini API Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Adjust based on actual response structure
        return data?.pipelineResponse?.[0]?.output?.[0]?.target || text;

    } catch (error) {
        console.error("Translation failed:", error);
        return text; // Fallback to original text
    }
};
