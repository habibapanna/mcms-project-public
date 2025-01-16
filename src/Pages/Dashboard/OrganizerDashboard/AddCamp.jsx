import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";


const AddCamp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // Add participantCount field with default value of 0
    data.participantCount = 0;

    // Save data to the database
    fetch("http://localhost:5000/add-camp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        toast.success("Camp added successfully!");
        reset(); // Clear the form
      })
      .catch((error) => {
        console.error("Error adding camp:", error);
        toast.error("An error occurred. Please try again.");
      });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto border border-gray-200 mt-10">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-teal-blue mb-6 text-center">
        Add A Camp
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Camp Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Camp Name:</label>
          <input
            type="text"
            {...register("campName", { required: "Camp name is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter the camp name"
          />
          {errors.campName && (
            <p className="text-red-600 text-sm">{errors.campName.message}</p>
          )}
        </div>

        {/* Image */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Image URL:</label>
          <input
            type="url"
            {...register("image", { required: "Image URL is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter the image URL"
          />
          {errors.image && (
            <p className="text-red-600 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Camp Fees */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Camp Fees:</label>
          <input
            type="number"
            {...register("campFees", {
              required: "Camp fees are required",
              min: { value: 0, message: "Fees must be a positive number" },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter the camp fees"
          />
          {errors.campFees && (
            <p className="text-red-600 text-sm">{errors.campFees.message}</p>
          )}
        </div>

        {/* Date & Time */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Date & Time:</label>
          <input
            type="datetime-local"
            {...register("dateTime", { required: "Date and time are required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.dateTime && (
            <p className="text-red-600 text-sm">{errors.dateTime.message}</p>
          )}
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Location:</label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter the camp location"
          />
          {errors.location && (
            <p className="text-red-600 text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Healthcare Professional */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Healthcare Professional:</label>
          <input
            type="text"
            {...register("healthcareProfessional", {
              required: "Healthcare professional's name is required",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter the professional's name"
          />
          {errors.healthcareProfessional && (
            <p className="text-red-600 text-sm">{errors.healthcareProfessional.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Description:</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="Write a brief description of the camp"
          />
          {errors.description && (
            <p className="text-red-600 text-sm">{errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Add Camp
        </button>
      </form>
    </div>
  );
};

export default AddCamp;
