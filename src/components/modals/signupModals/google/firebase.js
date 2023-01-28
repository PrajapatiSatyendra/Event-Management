import { initializeApp } from "firebase/app";
import {
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { googleSignUp } from "../../../../Urls/baseurl";

const firebaseConfig = {
  apiKey: "AIzaSyBZZQyAGRFxxlNYAAYk7LsQALFUFyuhkIw",
  authDomain: "lucknow-junction-eff1b.firebaseapp.com",
  projectId: "lucknow-junction-eff1b",
  storageBucket: "lucknow-junction-eff1b.appspot.com",
  messagingSenderId: "1096041110202",
  appId: "1:1096041110202:web:a359596d332236dcb98083",
  measurementId: "G-7KEZ6JGFX7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const providers = new FacebookAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const firstName = result.user.displayName;
      const email = result.user.email;
      // const profilePic = result.user.photoURL;


      fetch(googleSignUp, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ firstName, email }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("userID", data[0]._id);
          localStorage.setItem("userId", data[0]._id);
          localStorage.setItem("Token", data[1]);
          localStorage.setItem("Name", firstName);
          localStorage.setItem("Email", email);
          localStorage.setItem("IsLoggedIn", true);
          // console.log(data);
        });

      window.location.reload();

      // localStorage.setItem("token", "gjghjjkghkj5645yb6y6y565u647u67u567iu7u57758678ikmuti8mhjjhjjh")
      // localStorage.setItem("profilePic", profilePic)
    })
    .catch((error) => console.log(error.message));
};

export const signInWithFacebook = () => {
  signInWithPopup(auth, providers)
    .then((result) => {
      const firstName = result.user.displayName;
      const email = result.user.email;
      // const profilePic = result.user.photoURL;
      // console.log(result);
      fetch(googleSignUp, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ firstName, email }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("userID", data[0]._id);
          localStorage.setItem("userId", data[0]._id);
          localStorage.setItem("Token", data[1]);
          localStorage.setItem("Name", firstName);
          localStorage.setItem("Email", email);
          localStorage.setItem("IsLoggedIn", true);
          // console.log(data);
        });

      window.location.reload();

      // localStorage.setItem("token", "gjghjjkghkj5645yb6y6y565u647u67u567iu7u57758678ikmuti8mhjjhjjh")
      // localStorage.setItem("profilePic", profilePic)
    })
    .catch((error) => console.log(error.message));
};

// logout
export const logoutGoogle = () => {
  signOut(auth)
    .then(() => {
      localStorage.setItem("IsLoggedIn", false);
      localStorage.removeItem("Name");
      localStorage.removeItem("Email");
      localStorage.removeItem("Token");
      localStorage.removeItem("userID");
      // console.log("logout");
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};
