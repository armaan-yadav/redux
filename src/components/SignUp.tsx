import React, { useEffect, useState } from "react";
import { sendOtp, verifyOtp } from "../services/authServices";
import { Input } from "./ui/input";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPthoneNumber] = useState("+91");
  const [otp, setOtp] = useState("");
  const [userId, setuserId] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (email && password) {
    //   signUp({ email: email, password: password });
    // }
    if (phoneNumber) {
      const userId = await sendOtp({ phoneNumber });
      setuserId(userId);
    }
  };

  useEffect(() => {
    // getCurrentUser();
  }, []);

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Phone:</label>
          {/* <input
            type="text"
            maxLength={10}
            value={phoneNumber}
            onChange={(e) => setPthoneNumber(e.target.value)}
          /> */}

          <Input
            type="text"
            maxLength={10}
            value={phoneNumber}
            onChange={(e) => setPthoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label>OTP:</label>
          <Input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        {/* <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div> */}
        <button type="submit">Sign Up</button>
      </form>
      <button
        onClick={async () => {
          const res = await verifyOtp({ otp: otp, userId });
          console.log(res);
        }}
      >
        verify otp
      </button>
    </div>
  );
};

export default SignUp;
