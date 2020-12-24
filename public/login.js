//API key
var firebaseConfig = {
  apiKey: 'AIzaSyA55DpRmm4DNgT8w_EJnLAzGmBC0qg0RB4',
  authDomain: 'los-alamitos-pt-exercise-app.firebaseapp.com',
  databaseURL: 'https://los-alamitos-pt-exercise-app.firebaseio.com',
  projectId: 'los-alamitos-pt-exercise-app',
  storageBucket: 'los-alamitos-pt-exercise-app.appspot.com',
  messagingSenderId: '587818075107',
  appId: '1:587818075107:web:782b5b32806bd55ad0d6d6',
  measurementId: 'G-J3TZX37KTF',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//Add real time listener, checks to see if user exists
firebase.auth().onAuthStateChanged((firebaseUser) => {
  //Log in valid, redirect to main.html and render welcome message
  if (firebaseUser) {
    let user = firebase.auth().currentUser;
    console.log('Logged in');

    //Sub this link below in, for live version
    //https://los-alamitos-pt-exercise-app.web.app/
    if (
      window.location.href ===
        'https://los-alamitos-pt-exercise-app.web.app/' ||
      'https://los-alamitos-pt-exercise-app.web.app/index.html'
    ) {
      window.location.href =
        'https://los-alamitos-pt-exercise-app.web.app/main.html';
    } else if (
      window.location.href ===
      'https://los-alamitos-pt-exercise-app.web.app/main.html'
    ) {
      const userWelcome = document.getElementById('userWelcome');
      userWelcome.textContent = `Welcome ${user.email}`;
    }
  }
  //Log in invalid, redirect to index.html
  else if (
    window.location.href ===
    'https://los-alamitos-pt-exercise-app.web.app/index.html'
  ) {
    console.log('made it!');
  } else {
    window.location.href =
      'https://los-alamitos-pt-exercise-app.web.app/index.html';

    console.log('You are not a user/ User is not logged in');
  }
});

const form = document.getElementById('signInForm');

const textEmail = document.getElementById('email');
const textPassword = document.getElementById('password');

const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');

const errorWrapper = document.querySelector('.container__error');
const errorMsg = document.querySelector('.container__error--text');

btnLogin.addEventListener('click', (e) => {
  //get email and pass
  //TODO: Regex for domain address
  const email = textEmail.value;
  const pass = textPassword.value;
  const auth = firebase.auth();

  //Sign in
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch((e) => {
    errorWrapper.style.display = 'block';

    errorMsg.textContent = e.message;
  });
});

//sign up event
btnSignUp.addEventListener('click', (e) => {
  //get email and pass
  //TODO: Check for real email address
  const email = textEmail.value;
  const pass = textPassword.value;
  const auth = firebase.auth();

  //Sign in
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch((e) => {
    errorWrapper.style.display = 'block';
    errorMsg.textContent = e.message;
  });
});

form.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const email = textEmail.value;
    const pass = textPassword.value;
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch((e) => {
      errorWrapper.style.display = 'block';

      errorMsg.textContent = e.message;
    });
  }
});
