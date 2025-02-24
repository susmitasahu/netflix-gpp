import HEADER from "./Header";
import { useState, useRef } from "react";
import checkValidData from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const disPatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSigninForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null); // Clear any error messages when toggling form
  };

  const handleButtonClick = async () => {
    // Validate the form data
    const message = checkValidData(
      name.current ? name.current.value : "",
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);
    console.log("message", message);
    if (!message) {
      // Form is valid, proceed with sign in/sign up
      if (!isSignInForm) {
        // Sign up logic
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then(userCredential => {
            // Signed up
            //   const user = userCredential;
            updateProfile(auth.currentUser, {
              displayName: name.current.value
            })
              .then(() => {
                const { uid, email, displayName } = auth.currentUser;
                disPatch(
                  addUser({ uid: uid, email: email, displayName: displayName })
                );
              })
              .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage);
              });
          })
          .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
          });
      } else {
        // Sign in logic
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then(userCredential => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
          })
          .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
          });
      }
    }
  };

  return (
    <div className="relative">
      <div>
        <HEADER />
        <div>
          <img
            src="https://assets.nflxext.com/ffe/siteui/vlv3/f268d374-734d-474f-ad13-af5ba87ef9fc/web/IN-en-20250210-TRIFECTA-perspective_92338d5d-6ccd-4b1a-8536-eb2b0240a55e_large.jpg"
            alt="background-img"
            className="h-screen object-cover w-screen"
          />
        </div>
      </div>
      <form
        onSubmit={e => e.preventDefault()}
        className="w-3/12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 p-12 rounded-lg"
      >
        <h1 className="text-3xl text-white mb-6">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm &&
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 rounded text-white"
          />}
        <input
          ref={email}
          type="text"
          placeholder="Email address"
          className="p-4 my-4 w-full bg-gray-700 rounded text-white"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 rounded text-white"
        />
        {errorMessage &&
          <p className="text-red-500 text-sm py-2">
            {errorMessage}
          </p>}
        <button
          onClick={handleButtonClick}
          className="bg-red-600 text-white p-4 my-6 w-full rounded hover:bg-red-700"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="text-white cursor-pointer hover:underline text-center"
          onClick={toggleSigninForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
