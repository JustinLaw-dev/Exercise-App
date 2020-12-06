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
}

//Add real time listener, checks to see if user exists
firebase.auth().onAuthStateChanged((firebaseUser) => {
  //Log in valid, redirect to main.html and render welcome message
  if (firebaseUser) {
    let user = firebase.auth().currentUser;
    console.log('Logged in');
    //Sub this link below in, for live version
    //https://los-alamitos-pt-exercise-app.web.app/
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

  // const mainHeading = document.getElementById('mainHeading');
  const tabLinks = document.querySelectorAll('.tabs__link');
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

  const exerciseList = document.getElementById('exerciseList');

  const addPatientForm = document.querySelector('.form__addPatient');
  const firstNameForm = document.querySelector('#firstNameForm');
  const lastNameForm = document.querySelector('#lastNameForm');
  const emailForm = document.querySelector('#emailForm');

  const btnAddExercise = document.getElementById('btnAddExercise');
  const modalInnerExercise = document.querySelector('.modal__inner--exercise');
  const addExerciseForm = document.querySelector('.form__addExercise');
  const exerciseNameInput = document.getElementById('exerciseNameInput');
  const instructionsInput = document.getElementById('instructionsInput');
  const addExerciseImage = document.getElementById('addExerciseImage');
  const addExerciseFile = document.getElementById('addExerciseFile');
  const btnSubmitExercise = document.getElementById('btnSubmitExercise');

  const modalInnerExerciseView = document.querySelector(
    '.modal__inner--ExerciseView'
  );
  const headingExerciseView = document.getElementById('heading--exerciseView');
  const exerciseViewImg = document.getElementById('exerciseViewImg');
  const exerciseViewText = document.querySelector(
    '.modal__inner--exerciseView-text'
  );

  const listAddedExercises = document.getElementById('listAddedExercises');

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
      tabLink.classList.remove('tabs__link--active');
    });
    switch (tabName) {
      case 'patientsTab':
        //test
        patientsContent.classList.add('active');
        patientsLink.classList.add('tabs__link--active');
        // mainHeading.textContent = 'Patients';
        break;
      case 'exercisesTab':
        exercisesContent.classList.add('active');
        exercisesLink.classList.add('tabs__link--active');
        // mainHeading.textContent = 'Exercises';
        break;
      case 'accountTab':
        accountContent.classList.add('active');
        accountLink.classList.add('tabs__link--active');
        // mainHeading.textContent = 'Account';
        break;
    }
  }

  tabLinks.forEach((tabLink) => {
    tabLink.addEventListener('mouseover', function (e) {
      e.currentTarget.style.background = '#a9dbff';
      e.currentTarget.style.color = '#03396c';
    });
    tabLink.addEventListener('mouseout', function (e) {
      e.currentTarget.style.background = '#ffffff';
      e.currentTarget.style.color = 'black';
    });
  });

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
    modalInnerExerciseView.style.display = 'none';
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
        Email: emailForm.value,
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
    li.classList.add('patientLI');

    li.setAttribute('data-id', doc.id);
    li.textContent = `${doc.data().lastName}, ${doc.data().firstName}`;
    // editIcon.setAttribute('class', 'fas fa-edit');
    deleteIcon.setAttribute('class', 'fas fa-trash-alt');

    li.appendChild(deleteIcon);
    // li.appendChild(editIcon);

    patientList.appendChild(li);
  }

  function renderExerciseList(doc) {
    let li = document.createElement('li');
    let img = document.createElement('img');
    let p = document.createElement('p');
    let button = document.createElement('button');
    let addIcon = document.createElement('i');

    li.classList.add('list__exercises__item', 'exerciseClick');
    li.setAttribute('data-id', doc.id);
    p.textContent = doc.data().name;
    //Breaking Point

    img.setAttribute('src', doc.data().image);
    // img.setAttribute('src', doc.image);
    img.classList.add('list__exercises__img', 'exerciseClick');
    // editIcon.setAttribute('class', 'fas fa-edit');
    addIcon.setAttribute('class', 'fas fa-plus');
    button.setAttribute('class', 'exercise-plus');

    li.appendChild(img);
    li.appendChild(p);
    button.appendChild(addIcon);
    li.appendChild(button);

    exerciseList.appendChild(li);
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
    delPatientText.textContent = `Are you sure you want to delete ${name}? If deleted, the patient will be removed and cannot be retrieved.`;

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

  //Initialize Patient List on startup
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

  function addExerciseToList(e) {
    target = e.currentTarget;
    parent = target.parentNode;

    let name = parent.getAttribute('data-id');
    let imageSrc = parent.firstChild.src;
    // ul = listaddedExercise
    console.table(name, imageSrc);

    let li = document.createElement('li');
    li.classList.add('list__addedExercises--item');

    let img = document.createElement('img');
    img.classList.add('list__addedExercises--image');
    img.src = imageSrc;

    let p = document.createElement('p');
    p.classList.add('list__addedExercises--text');
    p.textContent = name;

    let div = document.createElement('div');
    div.classList.add('list__addedExercises--details');

    let btn = document.createElement('button');
    btn.classList.add('list__removeExercise--icon');

    let icon = document.createElement('i');
    icon.setAttribute('class', 'fas fa-times list__removeExercise--iconX');
    btn.appendChild(icon);

    div.appendChild(p);
    div.appendChild(btn);

    li.appendChild(img);
    li.appendChild(div);

    listAddedExercises.appendChild(li);
  }
  //

  // Observer to initialize render of exercises when exercises tab is Clicked for the first time.
  // Options for the exercise content observer
  const obConfig = { attributes: true };

  // Callback function to execute when mutations are observed
  const callback = function (mutationsList, observer) {
    if (exercisesContent.classList.contains('active')) {
      console.log('This tab is activated!');

      let firstExercises = db.collection('testrcises').limit(3);

      firstExercises.get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          renderExerciseList(doc);
          //doesnt work
          const addIcons = document.querySelectorAll('.exercise-plus');

          addIcons.forEach((icon) => {
            icon.addEventListener('click', addExerciseToList);
          });
        });
      });
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

  //Add Exercise Modal
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
          });
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

      setTimeout(exitModal, 500);
      alert('upload complete!');
    }
    btnSubmitExercise.addEventListener('click', submitExerciseForm);
  }

  btnAddExercise.addEventListener('click', enterModalAddExercise);

  //Exercise search function
  const exerciseSearchbar = document.querySelector('#exerciseSearchbar');
  const exerciseSearchIcon = document.getElementById('exerciseSearchIcon');

  function exerciseSearch() {
    let searchInput = exerciseSearchbar.value;
    let searchInputLower = searchInput.toString().toLowerCase();
    console.log(searchInputLower);
    let exerciseItems = document.querySelectorAll('.list__exercises__item');

    exerciseItems.forEach((item) => {
      let itemLower = item.textContent.toLowerCase();
      let itemLowerStr = itemLower.toString();

      if (itemLowerStr.includes(searchInputLower)) {
        item.style.display = 'inline-block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  function patientSearch() {
    let searchInput = patientSearchbar.value;
    let searchInputLower = searchInput.toString().toLowerCase();
    console.log(searchInputLower);
    let patients = document.querySelectorAll('.list__patients li');

    patients.forEach((item) => {
      let itemLower = item.textContent.toLowerCase();
      let itemLowerStr = itemLower.toString();

      if (itemLowerStr.includes(searchInputLower)) {
        item.style.display = 'inline-block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  patientSearchbar.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      patientSearch();
    } else return;
  });

  document
    .querySelector('.searchbar__wrapper i')
    .addEventListener('click', patientSearch);

  exerciseSearchbar.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      exerciseSearch();
    } else return;
  });

  exerciseSearchIcon.addEventListener('click', exerciseSearch);

  // View exercise
  // https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript
  //Image is placed on top of div background. This lists a way to always use the LI text content.
  //WIP
  //https://stackoverflow.com/questions/23504528/dynamically-remove-items-from-list-javascript

  document.body.addEventListener('click', function (e) {
    if (
      // e.target.classList.contains('list__removeExercise--icon') ||
      e.target.classList.contains('list__removeExercise--iconX')
    ) {
      iconParent = e.target.parentNode;
      let detailDiv = iconParent.parentNode;
      let li = detailDiv.parentNode;

      listAddedExercises.removeChild(li);
    } else if (e.target.classList.contains('exerciseClick')) {
      modalOuterPatient.style.display = 'block';
      modalInnerExerciseView.style.display = 'block';
      let target = e.target;
      let nodeName = e.target.nodeName;
      let dataID;
      if (nodeName === 'IMG') {
        headingExerciseView.textContent = target.parentNode.textContent;
        exerciseViewImg.src = target.src;

        dataID = target.parentNode.getAttribute('data-id');
        db.collection('testrcises')
          .where('name', '==', dataID)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.data().instructions);
              exerciseViewText.textContent = doc.data().instructions;
            });
          })
          .catch(function (error) {
            console.log('Error getting documents: ', error);
          });
        //prettier-ignore
        exerciseViewText.textContent = target.getAttribute('data-desc');
      } else if (nodeName === 'LI') {
        console.log(target);
        headingExerciseView.textContent = target.textContent;
        exerciseViewImg.src = target.children[0].src;
        dataID = target.getAttribute('data-id');
        db.collection('testrcises')
          .where('name', '==', dataID)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.data().instructions);
              exerciseViewText.textContent = doc.data().instructions;
            });
          })
        //prettier-ignore
        // db.collection('testrcises').where()
        // exerciseViewText.textContent = target.children[0].getAttribute(
        //   'data-desc'
        // );
      }
    }
  });

  //WIP Work in Progress
  // document
  // listAddedExercises.addEventListener('click', function (e) {
  //   target = e.currentTarget.children[0];
  //   console.log(target.children[1]);
  // });

  const printButton = document.querySelector('.button__print');
  printButton.addEventListener('click', function () {
    let width = modalInnerExerciseView.style.width;
    let height = modalInnerExerciseView.style.height;

    modalInnerExerciseView.style.width = '100vw';
    modalInnerExerciseView.style.height = '100vh';
    modalInnerExerciseView.style.top = 0;
    modalInnerExerciseView.style.left = 0;
    printButton.style.opacity = 0;

    window.print();

    modalInnerExerciseView.style.width = width;
    modalInnerExerciseView.style.height = height;
    modalInnerExerciseView.style.top = '6%';
    modalInnerExerciseView.style.left = '25%';
    printButton.style.opacity = 1;
  });

  // TODO
  // click on add exercise icon by exercise name where does it go? model for adding to patient list of exercises, or shopping cart style checkout
  //print functionh for either current exercise list or patient exercise list
  // for patient, can list their name at the top
}
