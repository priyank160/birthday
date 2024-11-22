import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Envelope from "../animation";
import { FaRegUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdOutlineContentCopy } from "react-icons/md";

const Landing = () => {
  const [customUrlEnabled, setCustomUrlEnabled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState("");
  const [animation, setAnimation] = useState(false);

  const baseCustomUrl = "http://192.168.29.47:3000/user/";

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      message: "",
      customUrlPart: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      age: Yup.number()
        .required("Age is required")
        .positive("Age must be a positive number")
        .integer("Age must be an integer"),
      message: Yup.string().required("Message is required"),
      customUrlPart: customUrlEnabled
        ? Yup.string().required("Custom URL part is required")
        : Yup.string().notRequired(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const requestData = {
          ...values,
          customUrl: customUrlEnabled ? values.customUrlPart : undefined,
        };

        const response = await axios.post(
          "http://192.168.29.119:5050/api/create-user",
          requestData
        );

        const newUser = response?.data.user;

        const dummyLink = `http://192.168.29.47:3000/user/${
          customUrlEnabled ? values.customUrlPart : newUser._id
        }`;

        setUser({
          ...newUser,
          dummyLink,
        });
        setAnimation(true);
        setTimeout(() => {
          setModalOpen(true);
          setAnimation(false);
        }, 7000);
        resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  const handleToggle = () => {
    setCustomUrlEnabled(!customUrlEnabled);
    if (!customUrlEnabled) {
      formik.setFieldValue("customUrlPart", "");
    }
  };

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(user?.dummyLink)
        .then(() => alert("URL copied to clipboard!"))
        .catch((error) => console.error("Failed to copy text:", error));
    } else {
      // Fallback for unsupported browsers
      const textArea = document.createElement("textarea");
      textArea.value = user?.dummyLink;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        alert("URL copied to clipboard!");
      } catch (error) {
        console.error("Failed to copy text:", error);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="lg:flex min-h-screen">
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-brightness-50 backdrop-blur-md px-5">
          <div className="bg-white p-5 rounded-lg shadow-xl max-w-md w-full text-center transform transition-all duration-300 scale-105 relative">
            <div className="right-2 absolute top-2 text-3xl">
              <IoClose
                className=""
                onClick={() => {
                  setModalOpen(false);
                  setAnimation(false);
                }}
              />
            </div>
            <p className="mb-4 text-gray-600 text-lg font-semibold flex items-center gap-3">
              <img src="/assets/c-url-icon.png" alt="url" />
              Send This Link
            </p>
            <div className="relative text-blue-600 font-medium text-lg underline mb-4 p-2 flex items-center border w-full">
              <span className="truncate text-[16px]">
                {user?.dummyLink?.length > 40
                  ? `${user?.dummyLink.slice(0, 42)}...`
                  : user?.dummyLink}
              </span>
              <div
                className="absolute right-0 p-3 cursor-pointer border-2 border-blue-500 bg-blue-500 text-white hover:bg-blue-700"
                onClick={handleCopy}
              >
                <MdOutlineContentCopy />
              </div>
            </div>
          </div>
        </div>
      )}
      {animation && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-brightness-50 z-50 backdrop-blur-md">
          <div className="flex justify-center items-center m-auto">
            <Envelope name={user?.name} />
          </div>
        </div>
      )}

      <div
        className="flex-1 bg-cover bg-center flex items-center justify-center relative py-[6rem]"
        style={{ backgroundImage: "url(/assets/fir.jpg)" }}
      >
        <div className="absolute lg:top-4 top-1 lg:left-7 left-0">
          <img
            src="/assets/balloon.png"
            alt="text"
            className="lg:w-[76%] w-[45%]"
          />
        </div>
        <div className="absolute lg:top-7  top-1 lg:right-7 -right-3">
          <img
            src="/assets/gift.png"
            alt="text"
            className="lg:w-[80%] w-[50%]"
          />
        </div>
        <img
          src="/assets/text.png"
          alt="text"
          className="lg:max-w-[75%] w-[70%] "
        />
        <div className="absolute lg:bottom-9 bottom-1 lg:left-14 left-3">
          <img
            src="/assets/choc.png"
            alt="text"
            className="lg:w-[85%] w-[50%]"
          />
        </div>
        <div className="absolute lg:bottom-28 bottom-4 lg:right-8 right-0">
          <img
            src="/assets/cak.png"
            alt="text"
            className="lg:w-[85%] w-[50%]"
          />
        </div>
      </div>

      <div
        className="flex-1 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url(/assets/secc.jpg)" }}
      >
        <div className="  flex items-center flex-col justify-center h-full lg:w-[70%] py-14 lg:py-0 w-[90%] text-black">
          <div className="rounded-lg  bg-white shadow-md p-4 relative">
            <div className="absolute top-[-54px] lg:left-[50%] left-[45%] transform -translate-x-[50%] flex gap-4">
              <img src="./assets/candle.png" alt="Candle" className="w-16 " />
              <img src="./assets/candle.png" alt="Candle" className="w-16" />
              <img src="./assets/candle.png" alt="Candle" className="w-16" />
            </div>
            <div className="w-full p-6 rounded-md ">
              <>
                <h2 className="lg:text-lg text-sm font-semibold mb-4">
                  Enter the birthday person's name, age, and a custom message
                  that will appear after they blow out their candles.
                </h2>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-gray-700 font-medium flex items-center text-lg gap-3">
                      <FaRegUser />
                      Name*
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-gray-700 font-medium lg:text-lg   flex items-center gap-3">
                      <img
                        src="/assets/age-icon.png"
                        alt="age"
                        className="w-5"
                      />
                      Age*
                    </label>
                    <input
                      type="number"
                      placeholder="Age"
                      name="age"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.age}
                      className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.age && formik.errors.age && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.age}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-gray-700 font-medium text-lg flex items-center gap-3">
                      <img src="/assets/msg-icon.png" alt="age" width={20} />
                      Message*
                    </label>
                    <textarea
                      name="message"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Message"
                      value={formik.values.message}
                      className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="2"
                    ></textarea>
                    {formik.touched.message && formik.errors.message && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.message}
                      </p>
                    )}
                  </div>
                  <label className="inline-flex items-center cursor-pointer border-2 border-[#619FEB] p-2 w-full rounded-md">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={customUrlEnabled}
                      onChange={handleToggle}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    <span className="ms-3 lg:text-lg  text-sm  font-medium">
                      Get a custom URL for $0.99!
                    </span>
                  </label>
                  {customUrlEnabled && (
                    <div>
                      <label className="block text-gray-700 font-medium">
                        Custom URL*
                      </label>
                      <input
                        type="text"
                        name="customUrlPart"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.customUrlPart}
                        className="w-full p-2 mt-1 border rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter custom  (e.g., test-test)"
                      />
                      <p className="text-sm text-gray-400">{`${baseCustomUrl}${formik.values.customUrlPart}`}</p>
                      {formik.touched.customUrlPart &&
                        formik.errors.customUrlPart && (
                          <p className="text-red-500 text-sm">
                            {formik.errors.customUrlPart}
                          </p>
                        )}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Submit
                  </button>
                </form>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
