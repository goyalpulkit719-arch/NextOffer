const {ai, model} = await import("../config/gemini.js");

const analyzeResumeWithGemini = async ( pdfBuffer, prompt ) => {

    const pdfBase64 = pdfBuffer.toString("base64");

    const response = await ai.models.generateContent({

        model,

        contents: [

            {
                inlineData: {
                    mimeType: "application/pdf",
                    data: pdfBase64,
                },
            },

            {
                text: prompt,
            },

        ],
        config: {
            responseMimeType: "application/json",
        }

    });
    if(!response.text) {
        throw new Error("Failed to generate resume analysis");
    }

    try{
        const analysis = JSON.parse(response.text);
        return analysis;
    }
    catch{
        throw new Error("Gemini returned an invalid JSON response");
    }

};

export default analyzeResumeWithGemini;