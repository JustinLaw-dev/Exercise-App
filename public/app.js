const firebaseConfig = {
  apiKey: "AIzaSyA55DpRmm4DNgT8w_EJnLAzGmBC0qg0RB4",
  authDomain: "los-alamitos-pt-exercise-app.firebaseapp.com",
  databaseURL: "https://los-alamitos-pt-exercise-app.firebaseio.com",
  projectId: "los-alamitos-pt-exercise-app",
  storageBucket: "los-alamitos-pt-exercise-app.appspot.com",
  messagingSenderId: "587818075107",
  appId: "1:587818075107:web:782b5b32806bd55ad0d6d6",
  measurementId: "G-J3TZX37KTF",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Get elements
function login() {
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
}

//add real time listener, checks to see if user exists
firebase.auth().onAuthStateChanged((firebaseUser) => {
  if (firebaseUser) {
    console.log("logged in");
    if (window.location.href === "http://127.0.0.1:5500/public/index.html") {
      window.location.href = "http://127.0.0.1:5500/public/main.html";
    }
  } else {
    console.log("not a user/not logged in");
  }
});

if (window.location.href === "http://127.0.0.1:5500/public/index.html") {
  console.log("correct page");
  login();
}
/////
// Main Page scripts
//
/////

//Log out
if (window.location.href === "http://127.0.0.1:5500/public/main.html") {
  const btnLogOut = document.getElementById("btnLogOut");
  btnLogOut.addEventListener("click", (e) => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("Signed out succesfully");
        window.location.href = "index.html";
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  //for switching active tabs on menu
  const tabs = document.querySelector(".tabs");
  const tabButtons = tabs.querySelectorAll('[role="tab"]');
  const tabPanels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));

  function handleTabClick(event) {
    // hide all tab panels
    tabPanels.forEach((panel) => {
      panel.hidden = true;
    });
    // mark all tabs as unselected
    tabButtons.forEach((tab) => {
      // tab.ariaSelected = false;
      tab.setAttribute("aria-selected", false);
    });
    // mark the clicked tab as selected
    event.currentTarget.setAttribute("aria-selected", true);
    // find the associated tabPanel and show it!
    const { id } = event.currentTarget;

    /*
    METHOD 1
  const tabPanel = tabs.querySelector(`[aria-labelledby="${id}"]`);
  console.log(tabPanel);
  tabPanel.hidden = false;
  */

    // METHOD 2 - find in the array of tabPanels
    console.log(tabPanels);
    const tabPanel = tabPanels.find(
      (panel) => panel.getAttribute("aria-labelledby") === id
    );
    tabPanel.hidden = false;
  }

  tabButtons.forEach((button) =>
    button.addEventListener("click", handleTabClick)
  );
}
