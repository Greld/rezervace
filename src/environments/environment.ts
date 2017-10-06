// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// Firebase:
// no struktura je DEN - HALA - HODINA  - KURTOGRUPA - OBSAZENO/CENA/a dalsi parametry

export const environment = {
  production: false,
  firebase: {
	apiKey: "AIzaSyCKKIwGD24wrWiOlp1Lj8h2pqj9X1b2tfI",
    authDomain: "skymsk.firebaseapp.com",
    databaseURL: "https://skymsk.firebaseio.com",
    projectId: "firebase-skymsk",
    storageBucket: "firebase-skymsk.appspot.com",
    messagingSenderId: "701919856399"
  }
};
