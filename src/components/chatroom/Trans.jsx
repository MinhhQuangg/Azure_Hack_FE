import axios from "axios";

const translateText = async (text, targetLanguage) => {
  const apiKey = "";
  const region = "";
  const url = `https://${region}.api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${targetLanguage}`;

  const headers = {
    "Ocp-Apim-Subscription-Key": apiKey,
    "Content-Type": "application/json",
  };

  const data = [{ Text: text }];
  try {
    const response = await axios.post(url, data, { headers });
    return response.data[0].translations[0].text;
  } catch (error) {
    console.error("Error translating text:", error);
    return text;
  }
};
const handleSendMessageWithTranslation = async () => {
  if (newMessage.trim() === "") return;

  let translatedMessage = newMessage;
  if (language !== "en") {
    translatedMessage = await translateText(newMessage, language);
  }
  socket.emit("sendMessage", {
    text: translatedMessage,
    language: language,
    sender: currentChat.name,
    timestamp: new Date().toISOString(),
  });

  setNewMessage("");
};

useEffect(() => {
  socket.on("newMessage", async (message) => {
    let translatedText = message.text;

    if (language !== "en" && message.language !== language) {
      translatedText = await translateText(message.text, language);
    }

    setNewMessage((prevMessages) => [
      ...prevMessages,
      { ...message, translatedText },
    ]);
  });

  return () => {
    socket.off("newMessage");
  };
}, [language]);
