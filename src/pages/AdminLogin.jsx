import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      if (user.user.email?.toLowerCase().trim() === "markyousry@gmail.com") {
        toast.success("Welcome Admin");
        navigate("/dashboard/portfolio");
      } else {
        toast.error("You are not allowed to access this page");
        navigate("/");
      }
    } catch (error) {
      toast.error("Incorrect email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent-10 px-4 font-hacen">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm border border-accent-20"
        autoComplete="off"
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-accent-20 p-4 rounded-full">
            <LogIn size={40} className="text-accent" />
          </div>
        </div>

        <h2 className="text-center text-2xl font-bold text-accent mb-6">
          Admin Login
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-accent text-sm mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-accent-20 focus:ring-2 focus:ring-accent outline-none p-2.5 w-full 
            rounded-lg text-accent "
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label className="block text-accent text-sm mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-accent-20 focus:ring-2 focus:ring-accent outline-none p-2.5 w-full
             rounded-lg pr-10 text-accent "
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-10 text-accent hover:text-accent-30 transition"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-accent hover:bg-accent-30 text-white font-semibold py-2.5 rounded-lg w-full transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
}
