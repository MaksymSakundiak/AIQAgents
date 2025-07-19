"use client";

import { useState } from "react";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn, FaHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import "./page.css";

export default function SignupPage() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(true);

  // Form states
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpEmailConfirm, setSignUpEmailConfirm] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Feedback states
  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState("");
  const [signInError, setSignInError] = useState("");
  const [signInSuccess, setSignInSuccess] = useState("");

  const router = useRouter();

  // Handle Sign Up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError("");
    setSignUpSuccess("");
    if (signUpEmail !== signUpEmailConfirm) {
      setSignUpError("Emails do not match.");
      return;
    }
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signUpName,
          email: signUpEmail,
          password: signUpPassword,
        }),
      });
      if (res.ok) {
        setSignUpSuccess("Account created! You can now sign in.");
        setSignUpName("");
        setSignUpEmail("");
        setSignUpEmailConfirm("");
        setSignUpPassword("");
        setTimeout(() => setIsRightPanelActive(false), 1200);
      } else {
        const data = await res.json();
        setSignUpError(data.error || "Sign up failed.");
      }
    } catch (err) {
      setSignUpError("Sign up failed. Please try again.");
    }
  };

  // Handle Sign In
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError("");
    setSignInSuccess("");
    try {
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signInEmail,
          password: signInPassword,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setSignInSuccess("Signed in! Redirecting...");
        // Store user's name and id in localStorage
        if (data.user && data.user.name && data.user.id) {
          localStorage.setItem("userName", data.user.name);
          localStorage.setItem("userId", data.user.id);
        }
        setTimeout(() => router.push("/dashboard"), 1200);
      } else {
        const data = await res.json();
        setSignInError(data.error || "Sign in failed.");
      }
    } catch (err) {
      setSignInError("Sign in failed. Please try again.");
    }
  };

  return (
    <div className="signup-root">
      {/* Starfield background */}
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>

      <div className={`container${isRightPanelActive ? " right-panel-active" : ""}`} id="container">
        {/* Sign Up */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social"><FaFacebookF /></a>
              <a href="#" className="social"><FaGooglePlusG /></a>
              <a href="#" className="social"><FaLinkedinIn /></a>
            </div>
            <span>or use your email for registration</span>
            <input
              type="text"
              placeholder="Name"
              value={signUpName}
              onChange={e => setSignUpName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={e => setSignUpEmail(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Confirm Email"
              value={signUpEmailConfirm}
              onChange={e => setSignUpEmailConfirm(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={e => setSignUpPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
            {signUpError && <p style={{ color: "red", margin: "10px 0" }}>{signUpError}</p>}
            {signUpSuccess && <p style={{ color: "green", margin: "10px 0" }}>{signUpSuccess}</p>}
          </form>
        </div>
        {/* Sign In */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleSignIn}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social"><FaFacebookF /></a>
              <a href="#" className="social"><FaGooglePlusG /></a>
              <a href="#" className="social"><FaLinkedinIn /></a>
            </div>
            <span>or use your account</span>
            <input
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={e => setSignInEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={e => setSignInPassword(e.target.value)}
              required
            />
            <a href="#">Forgot your password?</a>
            <button type="submit">Sign In</button>
            {signInError && <p style={{ color: "red", margin: "10px 0" }}>{signInError}</p>}
            {signInSuccess && <p style={{ color: "green", margin: "10px 0" }}>{signInSuccess}</p>}
          </form>
        </div>
        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => setIsRightPanelActive(false)}
                type="button"
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => setIsRightPanelActive(true)}
                type="button"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <p>
          Created with ❤️ by Maksym
        </p>
      </footer>
    </div>
  );
}