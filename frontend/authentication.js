import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

const auth = getAuth();
const provider = new GoogleAuthProvider();

window.signInWithGoogle = async function () {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const token = await user.getIdToken();

    // 👉 Send token + email to backend
    await fetch("http://localhost:3000/store-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: token,
        email: user.email
      })
    });

    alert("Signed in as " + user.displayName);
  } catch (error) {
    alert("Error: " + error.message);
    console.error(error);
  }
};
