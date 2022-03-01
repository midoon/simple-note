import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, push, onValue, set, remove } from "firebase/database";

export const actionUserName = () => (dispatch) => {
  setTimeout(() => {
    return dispatch({ type: "CHANGE_USER", value: "Midun Ok" });
  }, 2000);
};

//reghister

const fireBaseRegister = (data, dispatch, res, rej) => {
  dispatch({ type: "CHANGE_LOADING", value: true });
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      dispatch({ type: "CHANGE_LOADING", value: false });
      // ...
      res(true);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      dispatch({ type: "CHANGE_LOADING", value: false });
      // ..
      rej(false);
    });
};

export const registerUserAPI = (data) => (dispatch) => {
  return new Promise((respon, reject) => {
    fireBaseRegister(data, dispatch, respon, reject);
  });
};

//login

const fireBaseLogin = (data, dispatch, res, rej) => {
  dispatch({ type: "CHANGE_LOADING", value: true });
  const auth = getAuth();
  signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      console.log(user);
      const dataUser = {
        email: user.email,
        uid: user.uid,
        emailVErified: user.emailVerified,
        refreshToken: user.refreshToken,
      };
      dispatch({ type: "CHANGE_LOADING", value: false });
      dispatch({ type: "CHANGE_LOGIN", value: true });
      dispatch({ type: "CHANGE_USER", value: dataUser });
      res(dataUser);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorCode, errorMessage);
      dispatch({ type: "CHANGE_LOADING", value: false });
      dispatch({ type: "CHANGE_LOGIN", value: false });
      rej(false);
    });
};

export const loginUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fireBaseLogin(data, dispatch, resolve, reject);
  });
};

//add data to firebase
export const addDataToAPI = (data) => (dispatch) => {
  const db = getDatabase();
  push(ref(db, "notes/" + data.userId), {
    title: data.title,
    content: data.content,
    date: data.date,
  });
};

//listening data
export const getDAtaFromApi = (userId) => (dispatch) => {
  const db = getDatabase();
  const urlNotes = ref(db, "notes/" + userId);
  return new Promise((resolve, reject) => {
    onValue(urlNotes, (snapshot) => {
      const data = snapshot.val();
      // console.log("Get Data : ", data);
      const dataArr = [];
      Object.keys(data).map((key) => {
        dataArr.push({
          id: key,
          data: snapshot.val()[key],
        });
      });
      dispatch({ type: "SET_NOTES", value: dataArr });
      resolve(dataArr);
    });
  });
};

//updateNote

export const updateDataAPI = (data) => (dispatch) => {
  const db = getDatabase();
  const urlNotes = ref(db, `notes/${data.userId}/${data.noteId}`);
  return new Promise((resolve, reject) => {
    set(
      urlNotes,
      {
        title: data.title,
        content: data.content,
        date: data.date,
      },
      (err) => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};

//remove

export const deleteDataAPI = (data) => (dispatch) => {
  const db = getDatabase();
  const urlNotes = ref(db, `notes/${data.userId}/${data.noteId}`);
  return new Promise((resolve, reject) => {
    remove(urlNotes);
  });
};
