const firebaseConfig = {
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

//Get elements
function login() {
  const form = document.getElementById('signInForm');

  const textEmail = document.getElementById('email');
  const textPassword = document.getElementById('password');

  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');

  const errorWrapper = document.querySelector('.container__error');
  const errorMsg = document.querySelector('.container__error--text');

  //Login event

  btnLogin.addEventListener('click', (e) => {
    //get email and pass
    //TODO: Check for real email address
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
}

//Add real time listener, checks to see if user exists
firebase.auth().onAuthStateChanged((firebaseUser) => {
  if (firebaseUser) {
    console.log('Logged in');
    if (window.location.href === 'http://127.0.0.1:5500/public/index.html') {
      window.location.href = 'http://127.0.0.1:5500/public/main.html';
    }
  } else {
    if (window.location.href === 'http://127.0.0.1:5500/public/main.html') {
      window.location.href = 'http://127.0.0.1:5500/public/index.html';
    }
    console.log('Not a user/ User not logged in');
  }
});

if (window.location.href === 'http://127.0.0.1:5500/public/index.html') {
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

  const btnAddPatient = document.getElementById('btnAddPatient');
  const btnSubmitPatient = document.getElementById('btnSubmitPatient');
  const modalExit = document.querySelector('.modal__exit');

  const patientList = document.getElementById('patientList');
  let delPatientIcon;
  const delPatientText = document.getElementById('delPatient');
  const yesPatientDel = document.getElementById('yesPatientDel');
  const noPatientDel = document.getElementById('noPatientDel');

  const modalOuterPatient = document.querySelector('.modal__outer--patient');
  const modalInnerPatient = document.querySelector('.modal__inner--patient');

  const modalPatientDeleteOuter = document.getElementById('modalOuterSmall');
  const modalPatientDelete = document.querySelector('.modal__inner--small');

  const addPatientForm = document.querySelector('.form__addPatient');
  const firstNameForm = document.querySelector('#firstNameForm');
  const lastNameForm = document.querySelector('#lastNameForm');
  const dayForm = document.querySelector('#dayForm');
  const monthForm = document.querySelector('#monthForm');
  const yearForm = document.querySelector('#yearForm');

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

  //Add Patient Modal
  btnAddPatient.addEventListener('click', enterModalPatient);
  modalExit.addEventListener('click', exitModalPatient);
  modalOuterPatient.addEventListener('click', exitModalPatient);
  btnSubmitPatient.addEventListener('click', submitPatientForm);

  function enterModalPatient() {
    modalOuterPatient.style.display = 'block';
    modalInnerPatient.style.display = 'block';
  }

  function exitModalPatient() {
    modalOuterPatient.style.display = 'none';
    modalInnerPatient.style.display = 'none';
    addPatientForm.reset();
  }

  //Add Patient to collection
  function submitPatientForm(e) {
    e.preventDefault();

    db.collection('Patients')
      .add({
        firstName: firstNameForm.value,
        lastName: lastNameForm.value,
        DOB: `${monthForm.value}/${dayForm.value}/${yearForm.value}`,
      })
      //Write the new patient into list after successful write to collection.
      .then((docRef) => {
        console.log('Document successfully written!');

        let newDoc = db.collection('Patients').doc(docRef.id);
        newDoc.get().then(function (doc) {
          if (doc.exists) {
            let li = document.createElement('li');
            let editIcon = document.createElement('i');
            let deleteIcon = document.createElement('i');

            li.setAttribute('data-id', doc.id);

            li.textContent = `${doc.data().lastName}, ${doc.data().firstName}`;
            editIcon.setAttribute('class', 'fas fa-edit');
            deleteIcon.setAttribute('class', 'fas fa-trash-alt');

            li.appendChild(deleteIcon);
            li.appendChild(editIcon);

            patientList.appendChild(li);
          }
        });
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });

    exitModalPatient();
  }

  // Create patient and render to list
  function renderPatientList(doc) {
    let li = document.createElement('li');
    let editIcon = document.createElement('i');
    let deleteIcon = document.createElement('i');

    li.setAttribute('data-id', doc.id);
    li.textContent = `${doc.data().lastName}, ${doc.data().firstName}`;
    editIcon.setAttribute('class', 'fas fa-edit');
    deleteIcon.setAttribute('class', 'fas fa-trash-alt');

    li.appendChild(deleteIcon);
    li.appendChild(editIcon);

    patientList.appendChild(li);
  }

  function enterDeleteModal() {
    modalPatientDeleteOuter.style.display = 'block';
    modalPatientDelete.style.display = 'block';
  }

  function exitDeleteModal() {
    modalPatientDeleteOuter.style.display = 'none';
    modalPatientDelete.style.display = 'none';
  }

  function deletePatient(event) {
    let listItem = event.currentTarget.parentNode;
    let id = event.currentTarget.parentNode.getAttribute('data-id');
    console.log(listItem);
    console.log(id);
    let name = event.currentTarget.parentNode.textContent;
    // //Open Modal -- applied once on function click to fix repeating previous deletes, before logging newest delete.
    enterDeleteModal();
    
    // //Display "Are you sure you want to remove xxxx, xxx?" Delete Cancel
    delPatientText.textContent = `Are you sure you want to delete ${name}?`;

    //Delete on "Yes"
    yesPatientDel.addEventListener(
      'click',
      function () {
        db.collection('Patients')
          .doc(id)
          .delete()
          .then(function () {
            console.log('Document successfully deleted!');
          })
          .catch(function (error) {
            console.error('Error removing document: ', error);
          });
        patientList.removeChild(listItem);
        exitDeleteModal();
      },
      { once: true }
    );
    //Exit Modal on "No"
    noPatientDel.addEventListener('click', exitDeleteModal);
  }

  //Load Patient
  db.collection('Patients')
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        renderPatientList(doc);
        //Adds query selector and event listener after patient list is finished rendering
        delPatientIcon = document.querySelectorAll('.fa-trash-alt');
        delPatientIcon.forEach((icon) => {
          icon.addEventListener('click', deletePatient);
        });
      });
    });

  //Create read for exercises only when clicked on!
}
