"use client";
import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import firebase_app from "@/lib/firebase";
import { useState } from "react";

const auth = getAuth(firebase_app);


export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const Register= async (e) => {
    // e.preventDefault();
    if(password.length <= 6){
      alert("password must contain more than 6 digits")

      return
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password).then((data) => {
        alert("Signed in", data);
        localStorage.setItem('user','user')
      });
      window.location = '/homepage'
    
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  const SignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password).then((data) => {
        alert("logged in", data);
        localStorage.setItem('user','user')
      });
      window.location = '/homepage'
    
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <>
      <div className="min-h-screen w-[50%] m-auto  items-center justify-center  ">
        <div className=" border-8 ">
          <div className="py-10">
            <div
              className=" py-16 p-8 rounded-lg text-xl "
              
            >
              <h2 className="text-4xl font-bold ">Login</h2>
              <br />
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex flex-auto  text-end justify-between">
                <button onClick={SignIn} className="bg-blue-900 select-none hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded">
                  Login
                </button>
                <span>
                  <button
                   
                    className="px-3 select-none cursor-pointer text-2xl align-text-bottom font-mono
                     text-gray-200 border-gray-200 bg-black border-2 hover:bg-gray-300
                      hover:text-black" onClick={()=>{
                        Register()
                      }}
                  >
                    SignUp
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
