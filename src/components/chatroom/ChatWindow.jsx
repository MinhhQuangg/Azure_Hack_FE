import {
  AudioConfig,
  SpeechConfig,
  SpeechRecognizer,
} from "microsoft-cognitiveservices-speech-sdk";
import { useEffect, useRef, useState } from "react";
import { AvatarChat, AvatarPerson, IconButton } from "./ReusableComponents";

import {
  FaBars,
  FaGlobe,
  FaImage,
  FaInfoCircle,
  FaMicrophone,
  FaPaperclip,
  FaPaperPlane,
  FaRegStopCircle,
} from "react-icons/fa";
import { languages } from "../../constants";

const MessageBubble = ({ message }) => {
  // console.log(message);
  return (
    <div
      className={`flex mb-4 ${
        message?.fromUser ? "justify-end" : "justify-start"
      }`}
    >
      {!message.fromUser && (
        <div className="mr-2">
          <AvatarPerson person={message?.sender} size="sm" />
        </div>
      )}
      <div>
        <div className="font-['Inter'] text-xs text-[#65686C]">
          {message?.sender?.given_name}
        </div>
        <div
          className={`font-['Inter'] rounded-lg p-3 inline-block max-w-md ${
            message.fromUser
              ? "bg-yellow-300 text-black"
              : "bg-gray-200 text-black"
          }`}
        >
          {message?.content}
          <div className="font-['Inter'] text-xs text-[#65686C] mt-1 text-right">
            {message?.timestamp
              ? new Date(message?.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatWindow = ({
  messages,
  currentChat,
  newMessage,
  setNewMessage,
  onSendMessage,
  messageContainerRef,
  toggleSidebar,
  toggleChatInfo,
  showChatInfo,
  onFileUpload,
  onImageUpload,
  onLoadMoreMessages,
  
}) => {
  const [language, setLanguage] = useState("en");
  const speechKey = import.meta.env.VITE_SPEECH_KEY;
  const speechRegion = import.meta.env.VITE_SPEECH_REGION;
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const recognizerRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  // const [translatedMessages, setTranslatedMessages] = useState([]);

  // scroll
  useEffect(() => {
    const container = messageContainerRef.current;
    if (!container) return;
  
    const handleScroll = () => {
      if (container.scrollTop < 100 && currentChat?.id) {
        onLoadMoreMessages(currentChat.id);
      }
    };
  
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [currentChat, onLoadMoreMessages]);

  
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageButtonClick = () => {
    imageInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
      e.target.value = "";
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      onImageUpload(file);
      e.target.value = "";
    }
  };
  const handleSpeechToTextStart = () => {
    const speechConfig = SpeechConfig.fromSubscription(speechKey, speechRegion);
    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
    speechConfig.setProperty("speechServiceConnection_Language", "auto");
    const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

    recognizerRef.current = recognizer;
    setIsRecording(true);

    recognizer.startContinuousRecognitionAsync(
      () => {},
      (err) => {
        console.error(err);
        setIsRecording(false);
      }
    );

    recognizer.recognizing = (s, e) => {
      setNewMessage(e.result.text);
    };
  };

  const handleSpeechToTextStop = () => {
    if (recognizerRef.current) {
      recognizerRef.current.stopContinuousRecognitionAsync(
        () => {
          setIsRecording(false);
        },
        (err) => {
          console.error(err);
          setIsRecording(false);
        }
      );
    }
  };

  // const translateText = async (text, targetLanguage) => {
  //   try {
  //     const response = await fetch(
  //       `https://api.cognitive.microsofttranslator.com//translate?api-version=3.0&to=${targetLanguage}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Ocp-Apim-Subscription-Key": import.meta.env.VITE_TRANS_KEY,
  //           // "7HB3rVe0Q0q91WulZqatlV9uz3JLs2Km8emcQ8wdKWADxHhnsR0lJQQJ99BCACYeBjFXJ3w3AAAbACOGJqVY",
  //           "Ocp-Apim-Subscription-Region": import.meta.env.VITE_TRANS_REGION,
  //           //  "eastus",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify([{ Text: text }]),
  //       }
  //     );
  //     const data = await response.json();
  //     const translated = data[0].translations[0].text;
  //     return translated;
  //   } catch (error) {
  //     console.error("Translation Error:", error);
  //   }
  // };

  // useEffect(() => {
  //   const translateIncomingMessages = async () => {
  //     console.log(messages);
  //     const updatedMessages = await Promise.all(
  //       messages.map(async (message) => {
  //         if (message?.language !== language) {
  //           const translatedContent = await translateText(
  //             message?.content,
  //             language
  //           );
  //           return { ...message, content: translatedContent };
  //         }
  //         return message;
  //       })
  //     );
  //     setTranslatedMessages(updatedMessages);
  //   };

  //   translateIncomingMessages();
  // }, [language, messages]);

  return (
    <div
      className={`xl:pt-18 lg:pt-16 md:pt-12 sm:pt-8 pt-6 mt-10 lg:mt-2 flex-1 flex flex-col bg-gray-50`}
    >
      <div className="p-4 border-b bg-white flex items-center justify-between">
        <div className="flex items-center">
          <button
            className="md:hidden mr-2 text-gray-600"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>

          <AvatarChat
            color={currentChat?.avatar_color}
            text={currentChat?.avatar_text}
          />
          <div className="ml-3">
            <h2 className="font-['Montserrat'] font-bold text-[1.35rem]">
              {currentChat?.name}
            </h2>
            <p className="font-['Inter'] text-xs text-gray-500">
              {currentChat?.description || ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center">
            <IconButton icon={<FaGlobe />} />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="font-['Inter'] w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              {languages.map((lang, i) => (
                <option key={i} value={lang.code}>
                  {lang.language}
                </option>
              ))}
            </select>
          </div>
          <IconButton
            icon={<FaInfoCircle />}
            onClick={toggleChatInfo}
            className={showChatInfo ? "bg-gray-200" : ""}
          />
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto" ref={messageContainerRef}>
        {
          // translatedMessages
          messages.map((message, i) => (
            <MessageBubble key={i} message={message} />
          ))
        }
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        type="file"
        ref={imageInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />

      <div className="p-4 bg-white border-t flex items-center">
        <IconButton
          icon={<FaPaperclip color="#081C48" />}
          className="hidden sm:block"
          onClick={handleFileButtonClick}
        />
        <IconButton
          icon={<FaImage color="#081C48" />}
          className="hidden sm:block"
          onClick={handleImageButtonClick}
        />
        <IconButton
          icon={
            isRecording ? (
              <FaRegStopCircle color="#081C48" />
            ) : (
              <FaMicrophone color="#081C48" />
            )
          }
          className="hidden sm:block"
          onClick={
            isRecording ? handleSpeechToTextStop : handleSpeechToTextStart
          }
        />
        <div className="flex-1 mx-2">
          <textarea
            className="font-['Inter'] placeholder-[#65686C] border rounded-lg p-2 w-full resize-none focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
          />
        </div>
        <IconButton
          icon={<FaPaperPlane color="#081C48" />}
          onClick={onSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
