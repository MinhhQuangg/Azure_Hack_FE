const Avatar = ({ color, text, size = "md" }) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={`${color} ${sizeClasses[size]} rounded-full flex items-center justify-center text-white font-bold`}
    >
      <span>{text}</span>
    </div>
  );
};

export default Avatar;

const IconButton = ({ icon, onClick, color = "text-gray-600" }) => {
  return (
    <button
      className={`p-2 rounded-full hover:bg-gray-100 transition duration-200 ${color}`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

const TabButton = ({ text, isActive, onClick }) => {
  return (
    <button
      className={`font-['Montserrat'] px-4 py-1 text-sm font-semibold rounded-full ${
        isActive ? "bg-[#FFD254]" : "bg-white border border-gray-300"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export { Avatar, IconButton, TabButton };
