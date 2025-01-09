import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoctorForm = () => {
  const [formData, setFormData] = useState({
    doctorName: "",
    clinicPhone: "",
    clinicEmail: "",
    personalPhone: "",
    personalEmail: "",
    clinicAddress: "",
    clinicAvailability: "",
    domainOption: "no", // Default value is "no"
    domainName: "",
    publications: "",
    articles: "",
    extraNotes: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    console.log("Submitting form data:", formData);

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbz7kKU38kFzpaoE26OlsMihWlvEgUY9ur-Uf7fbI-bnYp_4Fee2mrWW9aJOBd4uuGhi/exec";

    try {
      const formDataToSubmit = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSubmit.append(key, formData[key]);
      });

      console.log(
        "FormData prepared for submission:",
        Object.fromEntries(formDataToSubmit)
      );

      const response = await fetch(scriptURL, {
        method: "POST",
        body: formDataToSubmit,
      });

      const jsonResponse = await response.json();

      if (response.ok) {
        console.log("Server response:", jsonResponse);
        toast.success("Doctor details successfully submitted!");
        setFormData({
          doctorName: "",
          clinicPhone: "",
          clinicEmail: "",
          personalPhone: "",
          personalEmail: "",
          clinicAddress: "",
          clinicAvailability: "",
          domainOption: "no",
          domainName: "",
          publications: "",
          articles: "",
          extraNotes: "",
        });
      } else {
        throw new Error("Failed to submit the form");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Error submitting the form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "domainOption" && value === "no") {
      setFormData({ ...formData, domainOption: "no", domainName: "" });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Submit Doctor Details
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 text-left">
          <label className="block font-medium mb-1">Doctor Name</label>
          <input
            placeholder="Dr. John Doe"
            type="text"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4 text-left">
          <label className="block font-medium mb-1">Clinic Phone</label>
          <input
            placeholder="123-456-7890"
            maxLength={10}
            type="number"
            name="clinicPhone"
            value={formData.clinicPhone}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4 text-left">
          <label className="block font-medium mb-1">Clinic Email</label>
          <input
            placeholder="Email"
            type="email"
            name="clinicEmail"
            value={formData.clinicEmail}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4 text-left">
          <label className="block font-medium mb-1">Personal Phone</label>
          <input
            type="number"
            placeholder="123-456-7890"
            name="personalPhone"
            maxLength={10}
            value={formData.personalPhone}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4 text-left">
          <label className="block font-medium mb-1">Personal Email</label>
          <input
            type="email"
            placeholder="Email"
            name="personalEmail"
            value={formData.personalEmail}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4 text-left">
          <label className="block font-medium mb-1">Clinic Address</label>
          <textarea
            placeholder="123 Street, City, Country"
            name="clinicAddress"
            value={formData.clinicAddress}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4 text-left">
          <label className="block font-medium mb-1">Clinic Availability</label>
          <input
            placeholder="Mon-Fri: 9am-5pm"
            type="text"
            name="clinicAvailability"
            value={formData.clinicAvailability}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4 text-left">
          <label className="block font-medium mb-1">
            Do you have a domain?
          </label>
          <div className="flex items-center space-x-4">
            <label>
              <input
                type="radio"
                name="domainOption"
                value="yes"
                checked={formData.domainOption === "yes"}
                onChange={handleChange}
                className="mr-2"
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="domainOption"
                value="no"
                checked={formData.domainOption === "no"}
                onChange={handleChange}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        {formData.domainOption === "yes" && (
          <div className="mb-4 text-left text-left">
            <label className="block font-medium mb-1">Domain Name</label>
            <input
              placeholder="www.example.com"
              type="text"
              name="domainName"
              value={formData.domainName}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
        )}

        <div className="mb-4 text-left">
          <label className="block font-medium mb-1">Publications</label>
          <textarea
          placeholder="List your publications (e.g. Journal A, Journal B, etc.)"
            name="publications"
            value={formData.publications}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4 text-left text-left">
          <label className="block font-medium mb-1">Articles</label>
          <textarea
            placeholder="List your articles (e.g. Article A, Article B, etc.)"
            name="articles"
            value={formData.articles}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4 text-left">
          <label className="block font-medium mb-1">Extra Notes</label>
          <textarea
            placeholder="Any extra notes you'd like to add"
            name="extraNotes"
            value={formData.extraNotes}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default DoctorForm;
