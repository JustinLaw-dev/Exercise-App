// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

//Get elements
const textEmail = document.getElementById("email");
const textPassword = document.getElementById("password");
const btnLogin = document.getElementById("btnLogin");
const btnSignUp = document.getElementById("btnSignUp");

//login event
btnLogin.addEventListener("click", (e) => {
  //get email and pass
  //TODO: Check for real email address
  const email = textEmail.value;
  const pass = textPassword.value;
  const auth = firebase.auth();

  //Sign in
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch((e) => console.log(e.message));
});

//sign up event
btnSignUp.addEventListener("click", (e) => {
  //get email and pass
  //TODO: Check for real email address
  const email = textEmail.value;
  const pass = textPassword.value;
  const auth = firebase.auth();

  //Sign in
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch((e) => console.log(e.message));
});
