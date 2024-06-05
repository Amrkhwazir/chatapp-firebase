import React, { useEffect, useState } from 'react'
import { db, doc, onSnapshot, setDoc, onAuthStateChanged, auth, getDoc, getDocs, query, collection, where } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const ChatRoom = () => {

  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [loggedUser, setLoggedUser] = useState("")
  const [logUser, setLogUser] = useState(null)
  const [getusers, setGetUsers] = useState([])
  const navigate = useNavigate();
  
  /// send message to db
 async function sendMessage (message) {
  await setDoc(doc(db, "messages", "1"), {
    message
  });

  readData("1")
  }


  /// read message from db
  function readData (id) {

    const unsub = onSnapshot(doc(db, "messages", id), (doc) => {
      // console.log("Current data: ", doc.data);

      setData(doc.data());
  })};


  /// get logged in user id
onAuthStateChanged(auth, async (user) => {
  if (user) {
 
    const uid = user.uid;
    setLoggedUser(uid)

  } else {
    // User is signed out
    // ...
  }
});


/// logged in user data get from db
useEffect( () => {

async function getUserData () {

    const docRef = doc(db, "users", loggedUser);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      
      setLogUser(docSnap.data() )

    } else {

      console.log("No such document!");
    }
  }
  getUserData()
},[loggedUser])


// SignOut user
function signOut () {

  signOut(auth).then(() => {
    console.log("Sign-out successful.");
    navigate("/")
    
  }).catch((error) => {
    console.log(error);
  })}


  useEffect(() => {

    async function getAllusers () {
      const q = query(collection(db, "users"), where("email", "!=", logUser?.email));    
   const querySnapshot = await getDocs(q);
     setGetUsers((querySnapshot.docs.map((doc)=> ({...doc.data(), id: doc.id}))))

  }
  getAllusers();
     }, [logUser])


  return (
    <div className='flex justify-center w-full h-screen bg-slate-200 relative'>
      <div className='absolute left-8 top-16'>
      <p>Username: {logUser?.username.toUpperCase()}</p>
      <p>Email: {logUser?.email}</p>
      <button className='bg-blue-900 w-20 h-10 text-white rounded-md mt-4' onClick={signOut}>SignOut</button>
      </div>
      <div className='w-40 h-[550px] bg-slate-50 mt-8 px-3 '>
        { getusers.map((user) => (
          <li className='list-none bg-slate-300 rounded-md h-20 mt-5 p-2 pt-5 text-sm cursor-pointer' key={user.id}>
          <p>{user?.username}</p>
          <p>{user?.email}</p>
        </li>
        ))}
        
      </div>
    <div className='w-[600px] h-[550px] bg-gray-800 mt-8'>
      <div>
        <div className='w-ful h-[50px] bg-slate-300 p-2'>
          sdsd
        </div>
        <div className='w-full h-[450px] p-4 relative overflow-y-scroll'>

          {/* left */}
            <div className='bg-slate-300 w-24 h-10 rounded-md p-2 mt-5'>
            <p>{data.message}</p>
            </div>   

          {/* right */}
            <div className='bg-slate-300 w-24 h-10 rounded-md p-2 absolute right-5 mt-5'>
            <p>ddd</p>
              </div>   
        </div>
        <div className='bg-slate-300 w-full h-[50px]'>
            <input type="text" placeholder='Enter your message' className='w-5/6 h-[48px] text-zinc-800 bg-slate-300 focus:outline-none pl-4' onChange={(e) => setMessage(e.target.value)} />
            <button className='bg-blue-900 w-20 h-10 text-white rounded-md' onClick={() => sendMessage(message)} >Send</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ChatRoom
