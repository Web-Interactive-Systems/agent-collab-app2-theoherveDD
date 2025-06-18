export function extractJSONString(text = "") {
    text = text.replace(/<think>[\s\S]*?<\/think>/gi, "");
    const markdownJsonPattern = /```(?:json)?\s*([\s\S]*?)\s*```/;
    const match = text.match(markdownJsonPattern);
    const jsonStr = match ? match[1].trim() : text.trim();

    const jsonLikePattern = /^[\s\n\r]*\{[\s\S]*\}|\[[\s\S]*\]/;
    if (jsonLikePattern.test(jsonStr)) {
        try {
            const jsonObj = JSON.parse(jsonStr);
            return jsonObj;
        } catch (error) {
            return null;
        }
    }

    return null;
}
