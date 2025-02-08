async function geminiApiService(input, setLoading, setMessages, messages) {
    try {
        const response = await fetch("/api/gemini", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: input }),
        });

        const data = await response.json();

        if (data.error) {
            setLoading(false);
            setMessages([
                ...messages,
                { text: input, sender: "user" },
                { text: `Error: ${data.error}`, sender: "bot", isError: true },
            ]);
        } else {
            setLoading(false);
            setMessages([
                ...messages,
                { text: input, sender: "user" },
                {
                    text: data.data.raw,
                    sender: "bot",
                    structured: data.data,
                },
            ]);
        }
    } catch (error) {
        console.error("Error sending message:", error);
        setLoading(false);
        setMessages([
            ...messages,
            { text: input, sender: "user" },
            { text: "Failed to send message.", sender: "bot", isError: true },
        ]);
    }
}

export default geminiApiService;
