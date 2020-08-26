
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Get elements
function login() {
  const textEmail = document.getElementById('email');
  const textPassword = document.getElementById('password');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');

  //Login event
  btnLogin.addEventListener('click', (e) => {
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
  btnSignUp.addEventListener('click', (e) => {
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

//Add real time listener, checks to see if user exists
firebase.auth().onAuthStateChanged((firebaseUser) => {
  if (firebaseUser) {
    console.log('logged in');
    if (window.location.href === 'http://127.0.0.1:5500/public/index.html') {
      window.location.href = 'http://127.0.0.1:5500/public/main.html';
    }
  } else {
    if (window.location.href === 'http://127.0.0.1:5500/public/main.html') {
      window.location.href = 'http://127.0.0.1:5500/public/index.html';
    }
    console.log('not a user/not logged in');
  }
});

if (window.location.href === 'http://127.0.0.1:5500/public/index.html') {
  console.log('correct page');
  login();
}

/////
// Main Page scripts
//
/////

if (window.location.href === 'http://127.0.0.1:5500/public/main.html') {
  const btnLogOut = document.getElementById('btnLogOut');
  const tabButtons = document.querySelectorAll('.tabs__links');
  const tabPanels = document.querySelectorAll('.tabs__panel');
  const patientsButton = document.getElementById('patientsButton');
  const exercisesButton = document.getElementById('exercisesButton');
  const accountButton = document.getElementById('accountButton');
  const patientsContent = document.getElementById('patientsContent');
  const exercisesContent = document.getElementById('exercisesContent');
  const accountContent = document.getElementById('accountContent');

  //Logout event
  btnLogOut.addEventListener('click', (e) => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log('Signed out succesfully');
        window.location.href = 'index.html';
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  //Tab switching functionality
  function openTab(tabName) {
    tabPanels.forEach((tabPanel) => {
      tabPanel.classList.remove('active');
    });
    tabButtons.forEach((tabButton) => {
      tabButton.style.background = 'none';
      tabButton.style.color = 'black';
    });
    if (tabName === 'patientsTab') {
      patientsContent.classList.add('active');
      patientsButton.style.background = '#a9dbff';
      patientsButton.style.color = '#ffffff';
    } else if (tabName === 'exercisesTab') {
      exercisesContent.classList.add('active');
      exercisesButton.style.background = '#a9dbff';
      exercisesButton.style.color = '#ffffff';
    } else if (tabName === 'accountTab') {
      accountContent.classList.add('active');
      accountButton.style.background = '#a9dbff';
      accountButton.style.color = '#ffffff';
    }
  }

}
