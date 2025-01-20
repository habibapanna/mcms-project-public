import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";


const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { createUser, googleLogIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const { name, email, photo, password } = data;
    
        createUser(email, password, name, photo)
            .then((result) => {
                console.log("User registered:", result.user);
    
                const newUser = { name, email, photo };
                fetch("http://localhost:5000/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newUser),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log("User created:", data);
                        toast.success("Registration successful!", { position: "top-right" });
                        navigate("/");
                    })
                    .catch((err) => {
                        console.error("Failed to save user to database:", err);
                        toast.error("Failed to save user information!", { position: "top-right" });
                    });
            })
            .catch((error) => {
                console.error("Registration failed:", error);
                toast.error(`Registration failed: ${error.message}`, { position: "top-right" });
            });
    };  

    const handleGoogleLogin = () => {
        googleLogIn()
            .then((result) => {
                console.log(result.user); // Fixed typo
    
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photo: result.user?.photoURL,
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
        <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-100 flex items-center justify-center">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-blue-700">Join Us Today!</h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Create your account to manage medical camps effortlessly.
                    </p>
                </div>
                <div className="card bg-white w-full max-w-lg shadow-2xl border border-blue-300">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        {/* Name Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-blue-700">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="input input-bordered border-blue-300 focus:ring focus:ring-blue-200"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && (
                                <span className="text-red-500 text-sm">{errors.name.message}</span>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-blue-700">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Your email"
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

                        {/* Photo URI Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-blue-700">Photo URI</span>
                            </label>
                            <input
                                type="url"
                                placeholder="Photo URL"
                                className="input input-bordered border-blue-300 focus:ring focus:ring-blue-200"
                                {...register("photo", {
                                    required: "Photo URL is required",
                                    pattern: {
                                        value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                                        message: "Invalid URL",
                                    },
                                })}
                            />
                            {errors.photo && (
                                <span className="text-red-500 text-sm">{errors.photo.message}</span>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-blue-700">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Your password"
                                className="input input-bordered border-blue-300 focus:ring focus:ring-blue-200"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/,
                                        message: "Password must contain at least one uppercase letter, one lowercase letter, and one special character",
                                    },
                                })}
                            />
                            {errors.password && (
                                <span className="text-red-500 text-sm">{errors.password.message}</span>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className="btn bg-blue-500 hover:bg-blue-600 text-white border-none"
                            >
                                Register
                            </button>
                        </div>
                    </form>

                    {/* Social Login */}
                    <div className="mt-4 flex flex-col items-center">
                        <button
                            className="btn btn-outline border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white flex items-center gap-2"
                            onClick={handleGoogleLogin}
                        >
                            <FaGoogle />
                            Register with Google
                        </button>
                        <p className="mt-4 text-sm mb-5 text-gray-700">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-500 hover:underline">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
