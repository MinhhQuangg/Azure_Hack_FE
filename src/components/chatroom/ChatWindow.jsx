import { useState, useRef } from "react";
import Avatar from "./ReusableComponents";
import { IconButton } from "./ReusableComponents";
import {
  SpeechConfig,
  AudioConfig,
  SpeechRecognizer,
  SpeechSynthesizer,
} from "microsoft-cognitiveservices-speech-sdk";

import { styles } from "../../styles";
import {
  FaPaperclip,
  FaImage,
  FaPaperPlane,
  FaInfoCircle,
  FaGlobe,
  FaBars,
  FaMicrophone,
  FaRegStopCircle,
} from "react-icons/fa";
import { languages } from "../../constants";

const MessageBubble = ({ message }) => {
  if (message.typing) {
    return (
      <div
        className={`flex mb-4 ${
          message.fromUser ? "justify-end" : "justify-start"
        }`}
      >
        {!message.fromUser && (
          <div className="mr-2">
            <Avatar
              color={message.senderColor}
              text={message.sender}
              size="sm"
            />
          </div>
        )}
        <div className="bg-gray-200 rounded-lg p-3 inline-block max-w-md">
          <div className="flex space-x-1">
            <div
              className="h-2 w-2 bg-gray-500 rounded-full animate-pulse"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="h-2 w-2 bg-gray-500 rounded-full animate-pulse"
              style={{ animationDelay: "75ms" }}
            ></div>
            <div
              className="h-2 w-2 bg-gray-500 rounded-full animate-pulse"
              style={{ animationDelay: "150ms" }}
            ></div>
          </div>
          <div className="font-['Inter'] text-xs text-[#65686C] mt-1">
            {message.sender} is typing...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex mb-4 ${
        message.fromUser ? "justify-end" : "justify-start"
      }`}
    >
      {!message.fromUser && (
        <div className="mr-2">
          <Avatar color={message.senderColor} text={message.sender} size="sm" />
        </div>
      )}
      <div>
        <div className="font-['Inter'] text-xs text-[#65686C]">
          {message.sender}
        </div>
        <div
          className={`font-['Inter'] rounded-lg p-3 inline-block max-w-md ${
            message.fromUser
              ? "bg-yellow-300 text-black"
              : "bg-gray-200 text-black"
          }`}
        >
          {message.content}
          <div className="font-['Inter'] text-xs text-[#65686C] mt-1 text-right">
            {message.timestamp
              ? new Date(message.timestamp).toLocaleTimeString([], {
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
}) => {
  const [language, setLanguage] = useState("en");
  const speechKey =
    "5Bb2AZsg21fCKHpKJCJOErhN3gUVx4NBANBX6ydwCZ1pqT66lfWsJQQJ99BCACYeBjFXJ3w3AAAYACOGpEct";
  const speechRegion = "eastus";
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const recognizerRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

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

          <Avatar
            color={currentChat.avatar_color}
            text={currentChat.avatar_text}
          />
          <div className="ml-3">
            <h2 className="font-['Montserrat'] font-bold text-[1.35rem]">
              {currentChat.name}
            </h2>
            <p className="font-['Inter'] text-xs text-gray-500">
              {currentChat.description || ""}
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
              {/* <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option> */}
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
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
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
