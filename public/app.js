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

function login() {
  const form = document.getElementById('signInForm');

  const textEmail = document.getElementById('email');
  const textPassword = document.getElementById('password');

  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');

  const errorWrapper = document.querySelector('.container__error');
  const errorMsg = document.querySelector('.container__error--text');

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
  //Log in valid, redirect to main.html and render welcome message
  if (firebaseUser) {
    let user = firebase.auth().currentUser;
    console.log('Logged in');

    if (window.location.href === 'http://127.0.0.1:5500/public/index.html') {
      window.location.href = 'http://127.0.0.1:5500/public/main.html';
    } else if (
      window.location.href === 'http://127.0.0.1:5500/public/main.html'
    ) {
      const userWelcome = document.getElementById('userWelcome');
      userWelcome.textContent = `Welcome ${user.email}`;
    }
  }
  //Log in invalid, redirect to index.html
  else {
    if (window.location.href === 'http://127.0.0.1:5500/public/main.html') {
      window.location.href = 'http://127.0.0.1:5500/public/index.html';
    }
    console.log('You are not a user/ User is not logged in');
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

  const mainHeading = document.getElementById('mainHeading');
  const tabLinks = document.querySelectorAll('.tabs__links');
  const tabPanels = document.querySelectorAll('.tabs__panel');

  const patientsLink = document.getElementById('patientsLink');
  const exercisesLink = document.getElementById('exercisesLink');
  const accountLink = document.getElementById('accountLink');

  const patientsContent = document.getElementById('patientsContent');
  const exercisesContent = document.getElementById('exercisesContent');
  const accountContent = document.getElementById('accountContent');

  const btnAddPatient = document.getElementById('btnAddPatient');
  const btnSubmitPatient = document.getElementById('btnSubmitPatient');
  const modalExit = document.querySelectorAll('.modal__exit');

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

  const btnAddExercise = document.getElementById('btnAddExercise');
  const modalInnerExercise = document.querySelector('.modal__inner--exercise');
  const addExerciseForm = document.querySelector('.form__addExercise');
  const exerciseNameInput = document.getElementById('exerciseNameInput');
  const instructionsInput = document.getElementById('instructionsInput');
  const addExerciseImage = document.getElementById('addExerciseImage');
  const addExerciseFile = document.getElementById('addExerciseFile');
  const btnSubmitExercise = document.getElementById('btnSubmitExercise');

  //Logout event
  btnLogOut.addEventListener('click', (e) => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        window.alert('Log Out Successful!');
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
    tabLinks.forEach((tabLink) => {
      tabLink.style.borderRight = 'none';
      tabLink.style.background = 'none';
      tabLink.style.color = 'black';
    });
    switch (tabName) {
      case 'patientsTab':
        //test
        patientsContent.classList.add('active');
        patientsLink.style.background = '#03396c';
        patientsLink.style.color = '#ffffff';
        mainHeading.textContent = 'Patients';
        break;
      case 'exercisesTab':
        exercisesContent.classList.add('active');
        exercisesLink.style.background = '#03396c';
        exercisesLink.style.color = '#ffffff';
        mainHeading.textContent = 'Exercises';
        break;
      case 'accountTab':
        accountContent.classList.add('active');
        accountLink.style.background = '#03396c';
        accountLink.style.color = '#ffffff';
        mainHeading.textContent = 'Account';
        break;
    }
  }

  //Add Patient Modal
  btnAddPatient.addEventListener('click', enterModalPatient);
  modalExit.forEach((exit) => {
    exit.addEventListener('click', exitModal);
  });
  modalOuterPatient.addEventListener('click', exitModal);
  btnSubmitPatient.addEventListener('click', submitPatientForm);

  function enterModalPatient() {
    modalOuterPatient.style.display = 'block';
    modalInnerPatient.style.display = 'block';
  }

  function exitModal() {
    //Exit and reset patient form
    modalOuterPatient.style.display = 'none';
    modalInnerPatient.style.display = 'none';
    addPatientForm.reset();

    //Exit and reset exercise form
    modalInnerExercise.style.display = 'none';
    addExerciseForm.reset();
    addExerciseImage.src = '';
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

    exitModal();
  }

  // Grab Patient data and render as list item
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

  ////////Load Patient
  // db.collection('Patients')
  //   .get()
  //   .then((snapshot) => {
  //     snapshot.docs.forEach((doc) => {
  //       renderPatientList(doc);
  //       //Adds query selector and event listener after patient list is finished rendering
  //       delPatientIcon = document.querySelectorAll('.fa-trash-alt');
  //       delPatientIcon.forEach((icon) => {
  //         icon.addEventListener('click', deletePatient);
  //       });
  //     });
  //   });
  //////////

  ////Observer for INITAL RENDER of exercises when exercises tab is active.
  // Options for the exercise content observer
  const obConfig = { attributes: true };

  //Should log only once, therefore
  // Callback function to execute when mutations are observed
  const callback = function (mutationsList, observer) {
    if (exercisesContent.classList.contains('active')) {
      console.log('This tab is activated!');

      //Stop observing after tab is clicked for the first time
      exerciseLoadOb.disconnect();
    }

    //  else if (mutation.type === 'attributes') {
    //   console.log(
    //     'The ' + mutation.attributeName + ' attribute was modified.'
    // );
  };

  // Create an observer instance linked to the callback function
  const exerciseLoadOb = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  exerciseLoadOb.observe(exercisesContent, obConfig);

  function enterModalAddExercise() {
    modalOuterPatient.style.display = 'block';
    modalInnerExercise.style.display = 'block';
    addExerciseFile.value = '';

    //File reader - Preview image before sending form
    addExerciseFile.onchange = function () {
      let reader = new FileReader();

      reader.onload = function (e) {
        //Get loaded data, render thumbnail.
        addExerciseImage.src = e.target.result;
      };

      //Read Image file as data URL
      reader.readAsDataURL(this.files[0]);
    };

    function submitExerciseForm(e) {
      e.preventDefault();

      //Store the image into firestore, retrieve URL, then store THAT URL into the image location of exercise DB.
      let storageRef = firebase.storage().ref();

      // Create a reference to 'exerciseName.jpg'
      let uploadRef = storageRef.child(`${exerciseNameInput.value}.jpg`);

      // Create a reference to 'exercises/exercisesname.jpg'
      let uploadImagesRef = storageRef.child(
        `test/${exerciseNameInput.value}.jpg`
      );

      // While the file names are the same, the references point to different files
      uploadRef.name === [exerciseNameInput.value].name; // true
      uploadImagesRef.fullPath === [exerciseNameInput.value].fullPath; // false

      //upload image to storage
      let file = addExerciseFile.files[0];

      uploadImagesRef.put(file).then(function (snapshot) {
        console.log('Uploaded image!');

        //After uploading, grab image url to put in firestore
        uploadImagesRef.getDownloadURL().then(function (url) {
          let uploadURL = url;
          console.log(
            exerciseNameInput.value,
            instructionsInput.value,
            uploadURL
          );

          db.collection('testrcises').doc(`${exerciseNameInput.value}`).set({
            name: exerciseNameInput.value,
            instructions: instructionsInput.value,
            image: uploadURL,
          })
              // .then((docRef) => {
              //   console.log('Document successfully written!');

              //   let newDoc = db.collection('Exercises').doc(docRef.id);
              //   newDoc.get().then(function (doc) {
              //     if (doc.exists) {
              //       let li = document.createElement('li');
              //       let editIcon = document.createElement('i');
              //       let deleteIcon = document.createElement('i');

              //       li.setAttribute('data-id', doc.id);

              //       li.textContent = `${doc.data().lastName}, ${doc.data().firstName}`;
              //       editIcon.setAttribute('class', 'fas fa-edit');
              //       deleteIcon.setAttribute('class', 'fas fa-trash-alt');

              //       li.appendChild(deleteIcon);
              //       li.appendChild(editIcon);

              //       patientList.appendChild(li);
              //     }
              //   });
              // })
              // .catch(function (error) {
              //   console.error('Error writing document: ', error);
              // });
        });
      });

      //

      // exitModal();
      console.log('form submitted');
    }
    btnSubmitExercise.addEventListener('click', submitExerciseForm);
  }

  btnAddExercise.addEventListener('click', enterModalAddExercise);
}
