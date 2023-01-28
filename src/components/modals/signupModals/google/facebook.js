// import React, { useState } from "react";
// import FacebookLogin from "react-facebook-login";

// function FacebookLoginComponent() {
//   const [login, setLogin] = useState(false);
//   const [data, setData] = useState({});
//   const [picture, setPicture] = useState("");

//   const responseFacebook = (response) => {
//     console.log(response);
//     // Login failed
//     if (response.status === "unknown") {
//       alert("Login failed!");
//       setLogin(false);
//       return false;
//     }
//     setData(response);
//     setPicture(response.picture.data.url);
//     if (response.accessToken) {
//       setLogin(true);
//     } else {
//       setLogin(false);
//     }
//   };
//   const logout = () => {
//     setLogin(false);
//     setData({});
//     setPicture("");
//   };

//   return (
//     <div className="container">
//       {!login && (
//         <FacebookLogin
//           appId="943573870356853"
//           autoLoad={false}
//           fields="name,email,picture"
//           scope="public_profile,email,user_friends"
//           callback={responseFacebook}
//           className="btnFacebook"
//         />
//       )}

//       {login && (
//         <div className="card">
//           <div className="card-body">
//             <img className="rounded" src={picture} alt="Profile" />
//             <h5 className="card-title">{data.name}</h5>
//             <p className="card-text">Email ID: {data.email}</p>
//             <a href="#" className="btn btn-danger btn-sm" onClick={logout}>
//               Logout
//             </a>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FacebookLoginComponent;

// Import the functions you need from the SDKs you need
// import { FacebookAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { googleSignUp } from "../../../../Urls/baseurl";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB4ycAHwhHrBZuDaGmYuWSAwzjHFXgM5Nw",
//   authDomain: "mansha-50dde.firebaseapp.com",
//   projectId: "mansha-50dde",
//   storageBucket: "mansha-50dde.appspot.com",
//   messagingSenderId: "642370212466",
//   appId: "1:642370212466:web:42d105c2d3e24fc6d828eb"
// };


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const provider = new FacebookAuthProvider();
// export const auth = getAuth(app);

// export const signInWithFacebook = () => {
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       const firstName = result.user.displayName;
//       const email = result.user.email;
//       // const profilePic = result.user.photoURL;


//       fetch(googleSignUp, {
//         method: "PUT",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify({ firstName, email })
//       }).then(res => res.json())
//         .then((data) => {
//           localStorage.setItem("userID", data[0]._id)
//           localStorage.setItem("userId", data[0]._id)
//           localStorage.setItem("Token", data[1])
//           console.log(data);
//         })

//       localStorage.setItem("Name", firstName)
//       localStorage.setItem("Email", email)
//       localStorage.setItem("IsLoggedIn", true)
//       // localStorage.setItem("token", "gjghjjkghkj5645yb6y6y565u647u67u567iu7u57758678ikmuti8mhjjhjjh")
//       // localStorage.setItem("profilePic", profilePic)
//     }).catch(error => console.log(error.message))
// }
// export const logoutFacebook = () => {
//   signOut(auth).then(() => {
//     localStorage.setItem("IsLoggedIn", false)
//     localStorage.removeItem("Name")
//     localStorage.removeItem("Email")
//     localStorage.removeItem("Token")
//     localStorage.removeItem("userID")
//     // Sign-out successful.
//   }).catch((error) => {
//     console.log(error)
//     // An error happened.
//   });
// }