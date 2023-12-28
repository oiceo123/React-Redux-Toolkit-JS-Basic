import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signinAsync } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleSignin = () => {
    dispatch(signinAsync({ email, password })).then((res) => {
      if (res.type === "signin/fulfilled") {
        navigate("/");
      }
    });
  };

  return (
    <div className="form">
      <label>Email</label>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignin}>
        {loading ? "Loading..." : "Submit"}
      </button>
      {error && (
        <p style={{ color: "red", fontSize: "16px", textAlign: "left" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default Signin;
