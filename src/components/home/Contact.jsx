import React, { useState } from "react";
import { styles } from "../../styles";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: "",
  });

  const content = {
    tagline: "Contact Us",
    heading: "Get in Touch With Our Team",
    description:
      "Have questions or feedback about our Auto-Translator Chat Room? We'd love to hear from you!",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({
      submitted: true,
      error: false,
      message: "Thank you for your message! We'll get back to you soon.",
    });
  };

  const inputStyles = `w-full font-["Inter"] text-base md:text-lg px-4 py-3 border border-gray-200 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200`;

  const buttonStyles = {
    primary: `bg-primary hover:bg-[#ECE17F] text-base md:text-lg lg:text-[1.45rem] font-bold font-["Inter"] py-2 px-6 md:py-3 md:px-8 rounded-[10px] transition-all duration-300 w-full md:w-auto`,
    boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
  };

  return (
    <div
      className={`${styles.paddingPageX} ${styles.paddingY} flex flex-col md:flex-row justify-between md:gap-10 w-full relative`}
    >
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary rounded-full opacity-20 translate-x-1/2 translate-y-1/3"></div>

      <div className="w-full md:w-2/5 flex flex-col justify-start gap-4 md:gap-6 mb-8 md:mb-0 relative">
        <div className="flex items-center gap-2">
          <div
            className={`font-["Inter"] font-semibold text-lg md:text-[1.45rem]`}
          >
            {content.tagline}
          </div>
        </div>

        <div
          className={`text-[#081C48] font-["Montserrat"] text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] font-bold leading-tight md:leading-[3rem] sm:leading-[2rem] lg:leading-[3.5rem]`}
        >
          {content.heading}
        </div>

        <div
          className={`font-["Inter"] text-base md:text-lg lg:text-[1.45rem] w-full md:w-[90%] text-gray-700`}
        >
          {content.description}
        </div>
      </div>

      <div className="w-full md:w-3/5 relative">
        <div className="bg-white p-6 md:p-8 rounded-[15px] border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary opacity-10 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-primary opacity-10 rounded-tr-full"></div>

          {formStatus.submitted ? (
            <div className={`text-center p-10 font-["Inter"] text-lg`}>
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-500"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <p
                className={
                  formStatus.error
                    ? "text-red-500 font-semibold"
                    : "text-green-500 font-semibold text-xl"
                }
              >
                {formStatus.message}
              </p>
              <button
                onClick={() =>
                  setFormStatus({ submitted: false, error: false, message: "" })
                }
                className="mt-6 text-[#081C48] font-medium py-2 px-6 border border-[#081C48] rounded-[10px] hover:bg-primary hover:border-primary transition-all duration-200"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative">
              <div className="relative">
                <label
                  htmlFor="name"
                  className={`block mb-2 font-["Inter"] font-medium text-base md:text-lg text-gray-700`}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputStyles}
                  required
                  placeholder="John Doe"
                />
                <div className="absolute right-3 top-10 w-3 h-3 bg-primary opacity-60 rounded-full"></div>
              </div>

              <div className="relative">
                <label
                  htmlFor="email"
                  className={`block mb-2 font-["Inter"] font-medium text-base md:text-lg text-gray-700`}
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputStyles}
                  required
                  placeholder="johndoe@example.com"
                />
                <div className="absolute right-3 top-10 w-3 h-3 bg-primary opacity-60 rounded-full"></div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className={`block mb-2 font-["Inter"] font-medium text-base md:text-lg text-gray-700`}
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`${inputStyles} resize-none`}
                  required
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className={buttonStyles.primary}
                  style={{ boxShadow: buttonStyles.boxShadow }}
                >
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
