import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
  const { login, googleLogIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data.email, data.password)
        .then((result) => {
            const user = result.user;

            // Extract relevant user fields for the database
            const newUser = {
                name: user.displayName || "Anonymous User", // Fallback if displayName is null
                email: user.email,
                photo: user.photoURL || "https://via.placeholder.com/150", // Fallback placeholder
            };

            // Store user in the database
            fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("User stored in database:", data);
                })
                .catch((err) => {
                    console.error("Error storing user in database:", err);
                    toast.error("Failed to save user information in the database!", {
                        position: "top-right",
                    });
                });

            // Login successful toast and navigation
            toast.success("Login successful!", { position: "top-right" });
            navigate("/");
        })
        .catch((error) => {
            console.error("Login failed:", error);
            toast.error(`Login failed: ${error.message}`, { position: "top-right" });
        });
};


const handleGoogleLogin = () => {
  googleLogIn()
      .then((result) => {
          console.log(result.user); // Fixed typo

          const userInfo = {
              email: result.user?.email,
              name: result.user?.displayName,
          };

          fetch("http://localhost:5000/users", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(userInfo),
          })
              .then((res) => res.json())
              .then((data) => {
                  if (data.insertedId) {
                      console.log("User added to database:", data);
                      toast.success("Google login successful!", { position: "top-right" });
                      navigate("/"); // Navigate after successful data save
                  } else if (data.message === "user already exists") {
                      toast.info("User already exists!", { position: "top-right" });
                      navigate("/"); // Navigate if the user exists
                  } else {
                      toast.error("Unexpected response from server.", { position: "top-right" });
                  }
              })
              .catch((err) => {
                  console.error("Error storing user:", err);
                  toast.error("Failed to store user in database.", { position: "top-right" });
              });
      })
      .catch((error) => {
          console.error("Google login error:", error);
          toast.error(`Google login failed: ${error.message}`, { position: "top-right" });
      });
};


  return (
    <div className="hero min-h-screen bg-gradient-to-r from-green-100 to-blue-100">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-blue-700">Welcome Back!</h1>
          <p className="text-lg text-gray-600 mt-2">
            Please log in to access your medical camp dashboard.
          </p>
        </div>
        <div className="card bg-white w-full max-w-lg shadow-2xl border border-blue-300">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-blue-700">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered border-blue-300 focus:ring focus:ring-blue-200"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-blue-700">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered border-blue-300 focus:ring focus:ring-blue-200"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-blue-500 hover:bg-blue-600 text-white border-none">
                Login
              </button>
            </div>
          </form>
          <div className="form-control mt-4">
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white w-1/2 mx-auto"
            >
              Login with Google
            </button>
          </div>
          <p className="text-center py-4 text-gray-700">
            New here?{" "}
            <Link className="text-blue-500 hover:underline" to="/register">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
