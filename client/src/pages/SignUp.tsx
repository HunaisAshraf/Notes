import { FormEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  console.log(authContext);
  const { setUser, user } = authContext;

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const data = await fetch("http://localhost:3000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const json = await data.json();
      if (json.success) {
        localStorage.setItem("user", JSON.stringify(json.user));
        localStorage.setItem("token", JSON.stringify(json.token));
        setUser(json.user);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.email) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="min-h-screen flex justify-center md:items-center w-full">
      <div className="w-1/3">
        <h1 className="text-2xl font-semibold my-6 text-center">
          Create New Account
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-slate-600 mx-2">Name </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="outline-none border-2 p-2 rounded-2xl w-full bg-slate-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-slate-600 mx-2">Email </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="outline-none border-2 p-2 rounded-2xl w-full bg-slate-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-slate-600 mx-2">Password </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="outline-none border-2 p-2 rounded-2xl w-full bg-slate-300"
            />
          </div>
          <div className="text-center">
            <button className="mx-2 bg-yellow-300 text-slate-600 font-semibold px-3 py-2 rounded w-28">
              Login
            </button>
          </div>
        </form>
        <p className="my-6">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
