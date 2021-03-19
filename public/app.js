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

// let linkIndex = 'https://los-alamitos-pt-exercise-app.web.app/index.html';
// let linkMain = 'https://los-alamitos-pt-exercise-app.web.app/main.html';
let linkIndex = 'http://127.0.0.1:5500/public/index.html';
let linkMain = 'http://127.0.0.1:5500/public/main.html';

//Add real time listener, checks to see if user exists
firebase.auth().onAuthStateChanged((firebaseUser) => {
  //When user is logged in, redirect to main.html and render welcome message
  if (firebaseUser) {
    let user = firebase.auth().currentUser;
    console.log('Logged in');

    if (window.location.href === /*link ||*/ linkIndex) {
      window.location.href = linkMain;
    } else if (window.location.href === linkMain) {
      const userWelcome = document.getElementById('userWelcome');
      userWelcome.textContent = `Welcome ${user.email}`;
      return;
    }
  }
  //Log in invalid, redirect to index.html
  else {
    window.location.href = linkIndex;

    console.log('You are not a user/ User is not logged in');
  }
});

/////
// Main Page scripts
//
/////

const btnLogOut = document.getElementById('btnLogOut');

// const mainHeading = document.getElementById('mainHeading');
const tabLinks = document.querySelectorAll('.tabs__link');
const tabPanels = document.querySelectorAll('.tabs__panel');

const patientsLink = document.getElementById('patientsLink');
const exercisesLink = document.getElementById('exercisesLink');
// const accountLink = document.getElementById('accountLink');
const workoutLink = document.getElementById('workoutLink');

const patientsContent = document.getElementById('patientsContent');
const exercisesContent = document.getElementById('exercisesContent');
// const accountContent = document.getElementById('accountContent');
const workoutContent = document.getElementById('workoutContent');

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
const modalPatientDelete = document.getElementById('modalPatientDelInner');

const patientModalName = document.getElementById('patientModalName');
const modalPatientWorkouts = document.getElementById('modalPatientWorkouts');
const modalPatientExercises = document.getElementById('modalPatientExercises');
const btnPtAddWorkout = document.getElementById('btnPtAddWorkout');
const ptExerciseBack = document.getElementById('ptExerciseBack');
let patientIDAddWorkout;
let patientNameAddWorkout;
const ptPrintModal = document.getElementById('ptPrintModal');
const ptPrintList = document.getElementById('ptPrintList');

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

const wrapperAddedExercises = document.querySelector(
  '.list__wrapper--addedExercises'
);
const listAddedExercises = document.getElementById('listAddedExercises');
const printList = document.getElementById('printList');

const exercisePrevPage = document.getElementById('exercisePrevPage');
const exerciseNextPage = document.getElementById('exerciseNextPage');

const clearExerciseModal = document.getElementById('clearExerciseModal');
const cancelClearList = document.getElementById('cancelClearList');
const confirmClearList = document.getElementById('confirmClearList');

const exercisePageButtons = document.getElementById('exercisePages');
const patientPageButtons = document.getElementById('patientPages');

const saveWorkoutModal = document.getElementById('saveWorkoutModal');
const saveWorkoutForm = document.getElementById('saveWorkoutForm');
const saveWorkoutList = document.getElementById('saveWorkoutList');
const btnSaveWorkout = document.getElementById('btnSaveWorkout');
const btnSaveWorkoutPatient = document.getElementById('btnSaveWorkoutPatient');

const workoutNameInput = document.getElementById('workoutNameInput');
const delWorkoutText = document.getElementById('delWorkout');
const yesWorkoutDel = document.getElementById('yesWorkoutDel');
const noWorkoutDel = document.getElementById('noWorkoutDel');

const modalWorkoutDelete = document.getElementById('modalWorkoutDelInner');
const workoutViewModal = document.getElementById('workoutViewModal');
const workoutListView = document.getElementById('workoutListView');
const headingWorkoutView = document.getElementById('headingWorkoutView');
const btnPrintWorkout = document.getElementById('btnPrintWorkout');

//Logout event
btnLogOut.addEventListener('click', (e) => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      window.alert('Log Out Successful!');
      window.location.href =
        'https://los-alamitos-pt-exercise-app.web.app/index.html';
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
    case 'workoutTab':
      workoutContent.classList.add('active');
      workoutLink.classList.add('tabs__link--active');
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

  modalPatientClicked.style.display = 'none';
  //Clear patient workout upon exiting modal
  modalPatientWorkouts.innerHTML = '';
  modalPatientExercises.innerHTML = '';
  backPatientExercises();

  //Exit and reset exercise form
  modalInnerExercise.style.display = 'none';
  modalInnerExerciseView.style.display = 'none';
  addExerciseForm.reset();
  addExerciseImage.src = '';

  saveWorkoutModal.style.display = 'none';
  saveWorkoutForm.reset();

  workoutViewModal.style.display = 'none';
  workoutListView.innerHTML = '';
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
          // let editIcon = document.createElement('i');
          let deleteIcon = document.createElement('i');

          li.setAttribute('data-id', doc.id);

          li.textContent = `${doc.data().lastName}, ${doc.data().firstName}`;
          // editIcon.setAttribute('class', 'fas fa-edit');
          deleteIcon.setAttribute('class', 'fas fa-trash-alt');

          li.appendChild(deleteIcon);
          // li.appendChild(editIcon);

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
  deleteIcon.setAttribute('class', 'fas fa-trash-alt pt-delete');

  li.appendChild(deleteIcon);
  // li.appendChild(editIcon);

  patientList.appendChild(li);
}

//Render Exercises
function renderExerciseList(doc) {
  let li = document.createElement('li');
  let img = document.createElement('img');
  let div = document.createElement('div');
  let p = document.createElement('p');
  let button = document.createElement('button');
  let addIcon = document.createElement('i');

  li.classList.add('list__exercises__item', 'exerciseClick');
  li.setAttribute('data-id', doc.id);

  button.appendChild(addIcon);
  div.appendChild(p);
  div.appendChild(button);
  div.classList.add('list__exercise__container');

  p.textContent = doc.data().name;
  p.classList.add('list__exercise__text');

  img.setAttribute('src', doc.data().image);
  img.classList.add('list__exercises__img', 'exerciseClick');
  addIcon.setAttribute('class', 'fas fa-plus');
  button.setAttribute('class', 'exercise-plus');

  li.appendChild(img);
  li.appendChild(div);

  exerciseList.appendChild(li);
}

function clearPatientList() {
  patientList.innerHTML = '';
}

function clearExerciseList() {
  exerciseList.innerHTML = '';
}

function clearWorkoutList() {
  workoutList.innerHTML = '';
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
  let name = event.currentTarget.parentNode.textContent;
  // //Open Modal -- applied once on function click to fix repeating previous deletes, before logging newest delete.
  enterDeleteModal();

  // //Display "Are you sure you want to remove xxxx, xxx?" Delete Cancel
  delPatientText.textContent = `Are you sure you want to delete ${name}? If deleted, the patient will be removed and cannot be retrieved.`;

  //Confirm delete
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

let patientPageSize = 9;
let firstVisiblePatient;
let lastVisiblePatient;
let absolutePatient;
const patientRef = db.collection('Patients');

//Render Patient List on startup
patientRef
  .orderBy('lastName', 'asc')
  .limit(patientPageSize)
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      renderPatientList(doc);
      //Adds query selector and event listener after patient list is finished rendering
      delPatientIcon = document.querySelectorAll('.pt-delete');
      delPatientIcon.forEach((icon) => {
        icon.addEventListener('click', deletePatient);
      });
    });
    absoluteFirstPatient = `${snapshot.docs[0].data().lastName}, ${
      snapshot.docs[0].data().firstName
    }`;
    firstVisiblePatient = snapshot.docs[0].data().lastName;
    lastVisiblePatient = snapshot.docs[snapshot.docs.length - 1].data()
      .lastName;
    // console.log('abs = ', absoluteFirstPatient);
    patientPrev.disabled = true;
  });

function nextPatientPage() {
  console.log('next pt page');
  //clear patient list
  patientRef
    .orderBy('lastName', 'asc')
    .limit(patientPageSize)
    .startAfter(lastVisiblePatient)
    .get()
    .then((snapshot) => {
      //Disable next button on last page,
      //case for when length of list matches page size
      //TODO -- query for pageSize + 1, display pageSize # of items only.
      // if length of query list < pageSize + 1, disable fwd button
      if (snapshot.docs.length == 0) {
        patientNext.disabled = true;
        return;
      } else {
        clearPatientList();
        snapshot.docs.forEach((doc) => {
          renderPatientList(doc);
          //Adds query selector and event listener after patient list is finished rendering
          delPatientIcon = document.querySelectorAll('.pt-delete');
          delPatientIcon.forEach((icon) => {
            icon.addEventListener('click', deletePatient);
          });
        });
        firstVisiblePatient = snapshot.docs[0].data().lastName;
        // }
        lastVisiblePatient = snapshot.docs[snapshot.docs.length - 1].data()
          .lastName;
        patientPrev.disabled = false;
        //disable if query render list is any less than maximum page # allowed.
        if (snapshot.docs.length < patientPageSize) {
          patientNext.disabled = true;
        } else return;
      }
    })
    .catch((error) => {});
}

function prevPatientPage() {
  console.log('prev pt page');
  //clear patient list
  clearPatientList();
  patientRef
    .orderBy('lastName', 'asc')
    .endBefore(firstVisiblePatient)
    .limitToLast(patientPageSize)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        renderPatientList(doc);
        //Adds query selector and event listener after patient list is finished rendering
        delPatientIcon = document.querySelectorAll('.pt-delete');
        delPatientIcon.forEach((icon) => {
          icon.addEventListener('click', deletePatient);
        });
      });
      firstVisiblePatient = snapshot.docs[0].data().lastName;
      lastVisiblePatient = snapshot.docs[snapshot.docs.length - 1].data()
        .lastName;
      console.log('last Name =', lastVisiblePatient);

      patientNext.disabled = false;
      //prettier-ignore
      if (absoluteFirstPatient == patientList.children[0].textContent) {
          patientPrev.disabled = true;
        } else patientPrev.disabled = false;
    });
}
const patientNext = document.getElementById('patientNextPage');
const patientPrev = document.getElementById('patientPrevPage');

patientNext.addEventListener('click', nextPatientPage);
patientPrev.addEventListener('click', prevPatientPage);

function addExerciseToList(e) {
  target = e.currentTarget;
  parent = target.parentNode.parentNode;

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

// Observer to initialize render of exercises when exercises tab is Clicked for the first time.
// Options for the exercise content observer
const obConfig = { attributes: true };

let exerciseRef = db.collection('Exercises');
let exercisePageSize = 8;
let firstVisibleExercise;
let lastVisibleExercise;
let absoluteFirstExercise;

// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
  if (exercisesContent.classList.contains('active')) {
    // console.log('This tab is activated!');
    exerciseRef
      .limit(exercisePageSize)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          renderExerciseList(doc);
          const addIcons = document.querySelectorAll('.exercise-plus');
          addIcons.forEach((icon) => {
            icon.addEventListener('click', addExerciseToList);
          });
        });
        absoluteFirstExercise = snapshot.docs[0].data().name;
        firstVisibleExercise = snapshot.docs[0].data().name;
        lastVisibleExercise = snapshot.docs[snapshot.docs.length - 1].data()
          .name;
        exercisePrev.disabled = true;
        // dont thinik needed
        // console.log('absolute first exercise = ', absoluteFirstExercise);
        // console.log('first exercise =', firstVisibleExercise);
        // console.log('last exercise =', lastVisibleExercise);

        // return {
        //   firstVisibleExercise,
        //   lastVisibleExercise,
        // };
      });
    //Stop observing after tab is clicked for the first time
    exerciseLoadOb.disconnect();
  }
  //optional else if condition
  //  else if (mutation.type === 'attributes') {
  //   console.log(
  //     'The ' + mutation.attributeName + ' attribute was modified.'
  // );
};

// Create an observer instance linked to the callback function
const exerciseLoadOb = new MutationObserver(callback);

// Start observing the target node for configured mutations
exerciseLoadOb.observe(exercisesContent, obConfig);

function nextExercisePage() {
  exerciseRef
    .orderBy('name', 'asc')
    .limit(exercisePageSize)
    .startAfter(lastVisibleExercise)
    .get()
    .then((snapshot) => {
      //Disable next button on last page,
      //case for when length of list matches page size
      if (snapshot.docs.length == 0) {
        exerciseNext.disabled = true;
        return;
      } else {
        clearExerciseList();
        snapshot.docs.forEach((doc) => {
          renderExerciseList(doc);
          //doesnt work
          const addIcons = document.querySelectorAll('.exercise-plus');
          addIcons.forEach((icon) => {
            icon.addEventListener('click', addExerciseToList);
          });
        });
        firstVisibleExercise = snapshot.docs[0].data().name;
        // console.log('first exercise =', firstVisibleExercise);
        lastVisibleExercise = snapshot.docs[snapshot.docs.length - 1].data()
          .name;
        // console.log('last exercise =', lastVisibleExercise);
        console.log('absolute first exercise = ', absoluteFirstExercise);
        exercisePrev.disabled = false;
        if (snapshot.docs.length < exercisePageSize) {
          // console.log('disable exercise next');
          exerciseNext.disabled = true;
        } else return;
      }
    });
}

//After page 3, not querying correctly. goes back to page 1
function prevExercisePage() {
  console.log('previous exercise page');
  //clear patient list
  clearExerciseList();
  exerciseRef
    .orderBy('name', 'asc')
    .endBefore(firstVisibleExercise)
    .limitToLast(exercisePageSize)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        renderExerciseList(doc);
        //doesnt work
        const addIcons = document.querySelectorAll('.exercise-plus');
        addIcons.forEach((icon) => {
          icon.addEventListener('click', addExerciseToList);
        });
      });
      firstVisibleExercise = snapshot.docs[0].data().name;
      // console.log('first exercise =', firstVisibleExercise);
      lastVisibleExercise = snapshot.docs[snapshot.docs.length - 1].data().name;
      // console.log('last exercise =', lastVisibleExercise);
      exerciseNext.disabled = false;
      //prettier-ignore
      if (absoluteFirstExercise === exerciseList.children[0].getAttribute('data-id')        ) {
          exercisePrev.disabled = true;
        } else exercisePrev.disabled = false;
    });
}

function renderPatientWorkouts(id) {
  patientRef
    .doc(id)
    .collection('workouts')
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        let patientWorkoutName = doc.data().name;
        let li = document.createElement('li');
        let p = document.createElement('p');
        p.textContent = patientWorkoutName;
        p.classList.add('list__workout--text');
        li.appendChild(p);
        li.classList.add('list__workout--item');
        modalPatientWorkouts.appendChild(li);
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
}

//Open Patient Workout Modal
function openPatientModal(target) {
  modalOuterPatient.style.display = 'block';
  modalPatientClicked.style.display = 'block';

  let id = target.getAttribute('data-id');
  patientNameAddWorkout = target.textContent;
  patientIDAddWorkout = id;

  renderPatientWorkouts(id);
  // target.childNode;
  let patientName = target.textContent;
  patientModalName.textContent = `Workouts for ${patientName}`;
}

patientList.addEventListener('click', function (e) {
  target = e.target;
  if (target.tagName == 'LI') {
    openPatientModal(target);
  }
});

function openPatientExercises() {
  modalPatientWorkouts.style.opacity = '0';
  modalPatientWorkouts.style.visibility = 'hidden';

  modalPatientExercises.style.opacity = '1';
  modalPatientExercises.style.visibility = 'visible';
  modalPatientExercises.style.transform = 'translate(0)';
  btnPtAddWorkout.style.display = 'none';
  btnPrintPtWorkout.style.display = 'block';
}

function backPatientExercises() {
  modalPatientWorkouts.style.opacity = '1';
  modalPatientWorkouts.style.visibility = 'visible';

  modalPatientExercises.style.opacity = '0';
  modalPatientExercises.style.visibility = 'hidden';
  modalPatientExercises.style.transform = 'translate(2vw)';
  ptExerciseBack.style.display = 'none';
  btnPtAddWorkout.style.display = 'block';
  btnPrintPtWorkout.style.display = 'none';
}

function renderPatientExercises(workoutID) {
  let docRef = patientRef
    .doc(patientIDAddWorkout)
    .collection('workouts')
    .doc(workoutID);
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        let patientExercises = doc.data().exerciseList;
        for (i = 0; i < patientExercises.length; i++) {
          let li = document.createElement('li');
          let p = document.createElement('p');
          p.textContent = patientExercises[i];
          p.classList.add('list__workout--text');
          li.appendChild(p);
          li.classList.add('list__workout--item');
          modalPatientExercises.appendChild(li);
        }
      } else {
        // doc.data() will be undefined in this case
        console.log('No such patient document!');
      }
    })
    .catch((error) => {
      console.log('Error getting patient exercises:', error);
    });
}

modalPatientWorkouts.addEventListener('click', function (e) {
  target = e.target;
  if (
    target.tagName == 'LI' ||
    target.classList.contains('list__workout--text')
  ) {
    let workoutID = target.textContent;

    openPatientExercises();
    ptExerciseBack.style.display = 'block';
    renderPatientExercises(workoutID);
  }
});

function moveToExercisePage() {
  console.log('clicked');
  exitModal();
  ptExerciseBack.style.display = 'none';
  openTab('exercisesTab');
  btnSaveWorkoutPatient.style.display = 'block';
  btnSaveWorkoutPatient.textContent = `Save to ${patientNameAddWorkout}`;
}

function openPtPrintModal() {
  ptPrintModal.style.display = 'block';
  ptPrintList.innerHTML = '';
}

function closePtPrintModal() {
  ptPrintModal.style.display = 'none';
  ptPrintList.innerHTML = '';
}

function printPtWorkout(e) {
  //loop through list, grabbing name
  let items = modalPatientExercises.children;
  openPtPrintModal();
  for (i = 0; i < items.length; i++) {
    let exerciseName = items[i].children[0].textContent;
    console.log(exerciseName);
    let exerciseDoc = exerciseRef.doc(`${exerciseName}`);

    exerciseDoc
      .get()
      .then(function (doc) {
        if (doc.exists) {
          let exerciseID = doc.data().name;
          let instructions = doc.data().instructions;
          let img = doc.data().image;
          console.log(exerciseID, instructions, img);

          //Fill modal with list items
          generatePtExercises(exerciseID, img, instructions);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
  }
}

//query for exercise name, instructions, and image
//display in printable list.

btnPtAddWorkout.addEventListener('click', moveToExercisePage);
ptExerciseBack.addEventListener('click', backPatientExercises);
btnPrintPtWorkout.addEventListener('click', printPtWorkout);

const exerciseNext = document.getElementById('exerciseNextPage');
const exercisePrev = document.getElementById('exercisePrevPage');

exerciseNext.addEventListener('click', nextExercisePage);
exercisePrev.addEventListener('click', prevExercisePage);

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
    const str = exerciseNameInput.value;
    const splitStr = str.split(' ');

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
          uploadURL,
          splitStr
        );

        exerciseRef.doc(`${exerciseNameInput.value}`).set({
          name: exerciseNameInput.value,
          instructions: instructionsInput.value,
          image: uploadURL,
          searchExerciseArray: splitStr,
        });
        //Renders exercise to list immediately after addition
        // .then((docRef) => {
        //   console.log('Document successfully written!');

        ////Function to immediately write a copy of exercise into list

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

let addScroll = function (section) {
  if (section === 'exercise') {
    //hide pagination
    exercisePageButtons.style.visibility = 'hidden';
    exerciseList.style.overflowY = 'scroll';
  } else if (section === 'patient') {
    patientPageButtons.style.visibility = 'hidden';
    patientList.style.overflowY = 'scroll';
  } else return;
};

let removeScroll = function (section) {
  if (section === 'exercise') {
    //show pagination
    exercisePageButtons.style.visibility = 'visible';
    exerciseList.style.overflowY = 'hidden';
  } else if (section === 'patient') {
    patientPageButtons.style.visibility = 'visible';
    patientList.style.overflowY = 'hidden';
  } else return;
};

//Exercise search function
const exerciseSearchbar = document.querySelector('#exerciseSearchbar');
const exerciseSearchIcon = document.getElementById('exerciseSearchIcon');

//Search limit
const searchLimit = 25;

function exerciseSearch() {
  let searchInput = exerciseSearchbar.value;
  // let searchInputLower = searchInput.toString().toLowerCase();
  // console.log(searchInputLower);
  let query = exerciseRef.where(
    'searchExerciseArray',
    'array-contains',
    `${searchInput}`
  );

  if (searchInput == '' || searchInput == null) {
    clearExerciseList();
    removeScroll('exercise');
    exerciseRef
      .limit(exercisePageSize)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          renderExerciseList(doc);
          const addIcons = document.querySelectorAll('.exercise-plus');
          addIcons.forEach((icon) => {
            icon.addEventListener('click', addExerciseToList);
          });
        });
        absoluteFirstExercise = snapshot.docs[0].data().name;
        firstVisibleExercise = snapshot.docs[0].data().name;
        lastVisibleExercise = snapshot.docs[snapshot.docs.length - 1].data()
          .name;
        exercisePrev.disabled = true;
        exerciseNext.disabled = false;
      });
  } else {
    addScroll('exercise');
    query
      .limit(searchLimit)
      .get()
      .then(function (querySnapshot) {
        clearExerciseList();
        querySnapshot.forEach(function (doc) {
          renderExerciseList(doc);
          const addIcons = document.querySelectorAll('.exercise-plus');
          addIcons.forEach((icon) => {
            icon.addEventListener('click', addExerciseToList);
          });
        });
      })
      .catch((error) => {
        console.log(error);
        // exerciseList.textContent =
        // 'No item found, please try searching with different terms.';
      });
  }
}

function patientSearch() {
  let searchInput = patientSearchbar.value;
  // let searchInputLower = searchInput.toString().toLowerCase();
  // console.log(searchInputLower);
  let query = patientRef.where('lastName', '==', `${searchInput}`);

  if (searchInput == '' || searchInput == null) {
    clearPatientList();
    removeScroll('patient');
    patientRef
      .orderBy('lastName', 'asc')
      .limit(patientPageSize)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          renderPatientList(doc);
          //Adds query selector and event listener after patient list is finished rendering
          delPatientIcon = document.querySelectorAll('.pt-delete');
          delPatientIcon.forEach((icon) => {
            icon.addEventListener('click', deletePatient);
          });
        });
        absoluteFirstPatient = snapshot.docs[0].data().name;
        firstVisiblePatient = snapshot.docs[0].data().name;
        lastVisiblePatient = snapshot.docs[snapshot.docs.length - 1].data()
          .name;
        patientPrev.disabled = true;
        patientNext.disabled = false;
      });
  } else {
    addScroll('patient');
    query
      .limit(searchLimit)
      .get()
      .then(function (querySnapshot) {
        clearPatientList();
        querySnapshot.forEach(function (doc) {
          renderPatientList(doc);
          //Adds query selector and event listener after patient list is finished rendering
          delPatientIcon = document.querySelectorAll('.pt-delete');
          delPatientIcon.forEach((icon) => {
            icon.addEventListener('click', deletePatient);
          });
        });
      })
      .catch((error) => {
        console.log(error);
        // exerciseList.textContent =
        // 'No item found, please try searching with different terms.';
      });
  }
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
      exerciseRef
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
      exerciseRef
        .where('name', '==', dataID)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.data().instructions);
            exerciseViewText.textContent = doc.data().instructions;
          });
        });
    }
  }
});

//WIP Work in Progress TODO
// Print single exercise, needed still?

// listAddedExercises.addEventListener('click', function (e) {
//   target = e.currentTarget.children[0];
//   console.log(target.children[1]);
// });

// const printButton = document.querySelector('.button__print');
// printButton.addEventListener('click', function () {
//   let width = modalInnerExerciseView.style.width;
//   let height = modalInnerExerciseView.style.height;

//   modalInnerExerciseView.style.width = '100vw';
//   modalInnerExerciseView.style.height = '100vh';
//   modalInnerExerciseView.style.top = 0;
//   modalInnerExerciseView.style.left = 0;
//   printButton.style.opacity = 0;

//   // window.print();

//   // modalInnerExerciseView.style.width = width;
//   // modalInnerExerciseView.style.height = height;
//   // modalInnerExerciseView.style.top = '6%';
//   // modalInnerExerciseView.style.left = '25%';
//   // printButton.style.opacity = 1;
//   // modalExit.style.opacity = 1;
// });

const btnPrintList = document.getElementById('printAddedExercises');
const btnSaveList = document.getElementById('saveAddedExercises');
const btnClearList = document.getElementById('clearAddedExercises');

const printModal = document.getElementById('workoutPrintModal');
const printWorkoutModal = document.getElementById('printWorkoutModal');
btnPrintList.addEventListener('click', printExercises);
btnSaveList.addEventListener('click', saveAddExerciseList);
btnClearList.addEventListener('click', clearAddExerciseList);

function openPrintModal() {
  //Base values - must edit when there is a change to styling.
  // let baseWidth = '97%';
  // let baseHeight = '85%';

  //Open print modal
  printModal.style.display = 'block';
}

function openPrintWorkoutModal() {
  printWorkoutModal.style.display = 'block';
  const printWorkoutBack = document.getElementById('printWorkoutBack');
  printWorkoutBack.addEventListener('click', closePrintWorkoutModal);
}

function closePrintModal() {
  printModal.style.display = 'none';
  printList.innerHTML = '';
}

function closePrintWorkoutModal() {
  printWorkoutBack.removeEventListener('click', closePrintWorkoutModal);
  printWorkoutModal.style.display = 'none';
  printWorkoutList.innerHTML = '';
}

function generatePrintItems(exerciseID, img, instructions) {
  let li = document.createElement('li');
  let heading = document.createElement('h3');
  let div = document.createElement('div');
  let image = document.createElement('img');
  let p = document.createElement('p');

  heading.classList.add('list__print--heading');
  div.classList.add('list__print--row');
  image.classList.add('list__print--img');
  p.classList.add('list__print--instructions');

  heading.textContent = exerciseID;
  image.src = `${img.src}`;
  image.alt = `${exerciseID}`;

  exerciseRef
    .where('instructions', '==', instructions)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        p.textContent = doc.data().instructions;
      });
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error);
    });

  div.appendChild(p);
  div.appendChild(image);
  li.appendChild(heading);
  li.appendChild(div);
  printList.appendChild(li);
  // console.log(exerciseID, img, instructions);
}

function generatePrintWorkoutItems(exerciseID, img, instructions) {
  let li = document.createElement('li');
  let heading = document.createElement('h3');
  let div = document.createElement('div');
  let image = document.createElement('img');
  let p = document.createElement('p');

  heading.classList.add('list__print--heading');
  div.classList.add('list__print--row');
  image.classList.add('list__print--img');
  p.classList.add('list__print--instructions');

  heading.textContent = exerciseID;
  image.src = `${img.src}`;
  image.alt = `${exerciseID}`;

  exerciseRef
    .where('instructions', '==', instructions)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        p.textContent = doc.data().instructions;
      });
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error);
    });

  div.appendChild(p);
  div.appendChild(image);
  li.appendChild(heading);
  li.appendChild(div);
  printWorkoutList.appendChild(li);
  // console.log(exerciseID, img, instructions);
}

function generatePtExercises(exerciseID, img, instructions) {
  let li = document.createElement('li');
  let heading = document.createElement('h3');
  let div = document.createElement('div');
  let image = document.createElement('img');
  let p = document.createElement('p');

  heading.classList.add('list__print--heading');
  div.classList.add('list__print--row');
  image.classList.add('list__print--img');
  p.classList.add('list__print--instructions');

  heading.textContent = exerciseID;
  image.src = img;
  image.alt = `${exerciseID}`;
  p.textContent = instructions;

  div.appendChild(p);
  div.appendChild(image);
  li.appendChild(heading);
  li.appendChild(div);
  console.log(li);
  ptPrintList.appendChild(li);
}

function printExercises() {
  //Grab all current LIs within list of added exercises
  list = listAddedExercises.getElementsByTagName('li');
  for (let i = 0; i < list.length; i++) {
    let img = list[i].children[0];
    let exerciseID = list[i].children[1].children[0].textContent;
    let exerciseDoc = exerciseRef.doc(`${exerciseID}`);
    let instructions;

    exerciseDoc
      .get()
      .then(function (doc) {
        if (doc.exists) {
          instructions = doc.data().instructions;
          openPrintModal();

          //Fill modal with list items
          generatePrintItems(exerciseID, img, instructions);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
  }
}

ptPrintBack.addEventListener('click', closePtPrintModal);

function enterClearModal() {
  modalPatientDeleteOuter.style.display = 'block';
  clearExerciseModal.style.display = 'block';
}

function exitClearModal() {
  modalPatientDeleteOuter.style.display = 'none';
  clearExerciseModal.style.display = 'none';
}

function clearAddExerciseList() {
  enterClearModal();
  confirmClearList.addEventListener(
    'click',
    function () {
      listAddedExercises.innerHTML = '';
      exitClearModal();
    },
    { once: true }
  );
  cancelClearList.addEventListener('click', exitClearModal);
}

const printBack = document.getElementById('printBack');

printBack.addEventListener('click', closePrintModal);

function enterSaveWorkoutModal() {
  modalOuterPatient.style.display = 'block';
  saveWorkoutModal.style.display = 'block';
}

function copyAddedExercisesList() {
  //Clears workout list upon entering, to allow for new render.
  saveWorkoutList.innerHTML = '';
  let copyChildren = listAddedExercises.children;
  // console.log(copyChildren);
  for (let i = 0; i < copyChildren.length; i++) {
    //returns actual node
    // console.log(copyChildren[i]);

    //make copy
    let copyIMG = copyChildren[i].children[0].src;
    let copyName = copyChildren[i].textContent;

    //create new list item
    let li = document.createElement('li');
    let img = document.createElement('img');
    let name = document.createElement('p');

    img.src = copyIMG;
    img.classList.add('list__workout--image');
    name.textContent = copyName;
    name.classList.add('list__workout--text');
    li.appendChild(img);
    li.appendChild(name);

    li.classList.add('list__workout--item');
    //display copied list in modal
    saveWorkoutList.appendChild(li);
  }
  // let copy = listAddedExercises.cloneNode();
  // console.log(copy);
}

let workoutRef = db.collection('Workouts');

function submitSaveWorkout(e) {
  e.preventDefault();
  //Get workout name
  let workoutName = workoutNameInput.value;
  let workoutArray = [];
  //save doc ref of execise name
  let saveItems = listAddedExercises.children;
  for (let i = 0; i < saveItems.length; i++) {
    let exerciseName = saveItems[i].children[1].children[0].textContent;
    workoutArray.push(exerciseName);
  }
  console.log('This workout is called: ' + workoutName);
  console.table(workoutArray);

  workoutRef.doc(`${workoutName}`).set({
    name: workoutName,
    exerciseList: workoutArray,
  });

  setTimeout(exitModal, 1000);
  alert('upload complete!');

  //look at this https://stackoverflow.com/questions/50012956/firestore-how-to-store-reference-to-document-how-to-retrieve-it
}

function submitSaveWorkoutPatient(e) {
  e.preventDefault();
  if (workoutNameInput.value == '') {
    return;
  } else {
    let workoutName = workoutNameInput.value;
    let workoutArray = [];
    //save doc ref of execise name
    let saveItems = listAddedExercises.children;
    for (let i = 0; i < saveItems.length; i++) {
      let exerciseName = saveItems[i].children[1].children[0].textContent;
      workoutArray.push(exerciseName);
    }
    console.log('This workout is called: ' + workoutName);
    console.table(workoutArray);

    patientRef
      .doc(patientIDAddWorkout)
      .collection('workouts')
      .doc(`${workoutName}`)
      .set({
        name: workoutName,
        exerciseList: workoutArray,
      });

    setTimeout(exitModal, 1000);
    alert('upload complete!');
    btnSaveWorkoutPatient.style.display = 'none';
  }
  //
}

btnSaveWorkout.addEventListener('click', submitSaveWorkout);
btnSaveWorkoutPatient.addEventListener('click', submitSaveWorkoutPatient);

function saveAddExerciseList() {
  enterSaveWorkoutModal();
  copyAddedExercisesList();
}

function renderWorkoutList(doc) {
  let li = document.createElement('li');
  let editIcon = document.createElement('i');
  let deleteIcon = document.createElement('i');
  li.classList.add('patientLI');
  li.classList.add('workout-li');

  li.setAttribute('data-id', doc.id);
  li.textContent = `${doc.data().name}`;
  // editIcon.setAttribute('class', 'fas fa-edit');
  deleteIcon.setAttribute('class', 'fas fa-trash-alt workout-delete');

  li.appendChild(deleteIcon);
  // li.appendChild(editIcon);

  workoutList.appendChild(li);
}

//Workouts//
function enterDeleteWorkoutModal() {
  modalPatientDeleteOuter.style.display = 'block';
  modalWorkoutDelete.style.display = 'block';
}

function exitDeleteWorkoutModal() {
  modalPatientDeleteOuter.style.display = 'none';
  modalWorkoutDelete.style.display = 'none';
}

function deleteWorkout(event) {
  let listItem = event.currentTarget.parentNode;
  let id = event.currentTarget.parentNode.getAttribute('data-id');
  // let name = event.currentTarget.parentNode.textContent;
  // //Open Modal -- applied once on function click to fix repeating previous deletes, before logging newest delete.
  enterDeleteWorkoutModal();

  // //Display "Are you sure you want to remove xxxx, xxx?" Delete Cancel
  delWorkoutText.textContent = `Are you sure you want to delete ${id}? If deleted, the workout will be removed and can not be reversed.`;

  //Confirm delete
  yesWorkoutDel.addEventListener(
    'click',
    function () {
      db.collection('Workouts')
        .doc(id)
        .delete()
        .then(function () {
          console.log('Workout successfully deleted!');
        })
        .catch(function (error) {
          console.error('Error removing workout: ', error);
        });
      workoutList.removeChild(listItem);
      exitDeleteWorkoutModal();
    },
    { once: true }
  );
  //Exit Modal on "No"
  noWorkoutDel.addEventListener('click', exitDeleteWorkoutModal);
}
let firstVisibleWorkout;
let lastVisibleWorkout;
let absoluteFirstWorkout;

// Callback function to execute when mutations are observed
const workoutCallback = function (mutationsList, observer) {
  if (workoutContent.classList.contains('active')) {
    // console.log('This tab is activated!');
    workoutRef
      .orderBy('name', 'asc')
      .limit(patientPageSize)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          renderWorkoutList(doc);
          //Adds query selector and event listener after patient list is finished rendering
          delWorkoutIcon = document.querySelectorAll('.workout-delete');
          delWorkoutIcon.forEach((icon) => {
            icon.addEventListener('click', deleteWorkout);
          });
        });
        absoluteFirstWorkout = snapshot.docs[0].data().name;
        firstVisibleWorkout = snapshot.docs[0].data().name;
        lastVisibleWorkout = snapshot.docs[snapshot.docs.length - 1].data()
          .name;
        workoutPrev.disabled = true;
      });
    //Stop observing after tab is clicked for the first time
    workoutLoadOb.disconnect();
  }
  //optional else if condition
  //  else if (mutation.type === 'attributes') {
  //   console.log(
  //     'The ' + mutation.attributeName + ' attribute was modified.'
  // );
};

// Create an observer instance linked to the callback function
const workoutLoadOb = new MutationObserver(workoutCallback);

// Start observing the target node for configured mutations
workoutLoadOb.observe(workoutContent, obConfig);

function nextWorkoutPage() {
  console.log('next workout page');
  //clear patient list
  workoutRef
    .orderBy('name', 'asc')
    .limit(patientPageSize)
    .startAfter(lastVisibleWorkout)
    .get()
    .then((snapshot) => {
      //Disable next button on last page,
      //case for when length of list matches page size
      //TODO -- query for pageSize + 1, display pageSize # of items only.
      // if length of query list < pageSize + 1, disable fwd button
      if (snapshot.docs.length == 0) {
        workoutNext.disabled = true;
        return;
      } else {
        clearWorkoutList();
        snapshot.docs.forEach((doc) => {
          renderWorkoutList(doc);
          //Adds query selector and event listener after patient list is finished rendering
          delWorkoutIcon = document.querySelectorAll('.workout-delete');
          delWorkoutIcon.forEach((icon) => {
            icon.addEventListener('click', deleteWorkout);
          });
        });
        firstVisibleWorkout = snapshot.docs[0].data().name;
        // }
        lastVisibleWorkout = snapshot.docs[snapshot.docs.length - 1].data()
          .name;
        workoutPrev.disabled = false;
        //disable if query render list is any less than maximum page # allowed.
        if (snapshot.docs.length < patientPageSize) {
          workoutNext.disabled = true;
        } else return;
      }
    })
    .catch((error) => {});
}

function prevWorkoutPage() {
  console.log('prev pt page');
  //clear patient list
  clearWorkoutList();
  workoutRef
    .orderBy('name', 'asc')
    .endBefore(firstVisibleWorkout)
    .limitToLast(patientPageSize)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        renderWorkoutList(doc);
        //Adds query selector and event listener after patient list is finished rendering
        delWorkoutIcon = document.querySelectorAll('.workout-delete');
        delWorkoutIcon.forEach((icon) => {
          icon.addEventListener('click', deleteWorkout);
        });
      });
      firstVisibleWorkout = snapshot.docs[0].data().name;
      lastVisibleWorkout = snapshot.docs[snapshot.docs.length - 1].data().name;
      console.log('last workout =', lastVisibleWorkout);

      workoutNext.disabled = false;
      //prettier-ignore
      if (absoluteFirstWorkout == workoutList.children[0].textContent) {
          workoutPrev.disabled = true;
        } else workoutPrev.disabled = false;
    });
}
const workoutNext = document.getElementById('workoutNextPage');
const workoutPrev = document.getElementById('workoutPrevPage');

workoutNext.addEventListener('click', nextWorkoutPage);
workoutPrev.addEventListener('click', prevWorkoutPage);

function enterWorkoutModal() {
  modalOuterPatient.style.display = 'block';
  workoutViewModal.style.display = 'block';
}

function openWorkoutModal(e) {
  let target = e.target;
  if (target.classList.contains('workout-li')) {
    enterWorkoutModal();
    let id = e.target.getAttribute('data-id');
    console.log(id);
    headingWorkoutView.textContent = id;
    //get array from db
    let docRef = db.collection('Workouts').doc(id);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log('Document data:', doc.data().exerciseList);
          let exerciseArr = doc.data().exerciseList;
          // console.log(exerciseArr);
          for (let i = 0; i < exerciseArr.length; i++) {
            let id = exerciseArr[i];
            // console.log(`Exercise #${i + 1} is ${id}`);
            exerciseRef
              .doc(id)
              .get()
              .then(function (doc) {
                if (doc.exists) {
                  let li = document.createElement('li');
                  let name = document.createElement('p');
                  let img = document.createElement('img');

                  let exerName = doc.data().name;
                  let exerImg = doc.data().image;

                  li.classList.add('list__workout--item');
                  img.classList.add('list__workout--image');
                  img.setAttribute('src', exerImg);
                  img.alt = exerName;
                  name.classList.add('list__workout--text');
                  name.textContent = exerName;

                  li.appendChild(img);
                  li.appendChild(name);
                  workoutListView.appendChild(li);
                } else {
                  // doc.data() will be undefined in this case
                  console.log('No such document!');
                }
              })
              .catch(function (error) {
                console.log('Error getting document:', error);
              });
          }
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });

    //Loop through array, using name/id as docref.
    //Read and use img and name to generate list items.
  } else return;
}

workoutList.addEventListener('click', openWorkoutModal);

btnPrintWorkout.addEventListener('click', function () {
  list = workoutListView.getElementsByTagName('li');
  for (let i = 0; i < list.length; i++) {
    let img = list[i].children[0];
    let exerciseID = list[i].children[1].textContent;
    console.log(exerciseID);
    let exerciseDoc = exerciseRef.doc(`${exerciseID}`);
    let instructions;

    exerciseDoc
      .get()
      .then(function (doc) {
        if (doc.exists) {
          instructions = doc.data().instructions;
          openPrintWorkoutModal();

          //Fill modal with list items
          generatePrintWorkoutItems(exerciseID, img, instructions);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
  }
});
