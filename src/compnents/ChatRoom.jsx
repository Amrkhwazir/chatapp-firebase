import React, { useEffect, useState } from 'react'
import { db, doc, onSnapshot,  onAuthStateChanged, auth, getDoc,  addDoc, serverTimestamp, collection, query, where, getDocs, orderBy, signOut } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { TopbarInfo } from './TopbarInfo';


const ChatRoom = () => {

  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState([]);
  const [listUser, setListUser] = useState({});
  const [logUser, setLogUser] = useState(null)
  const [getusers, setGetUsers] = useState([])
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const navigate = useNavigate(); 



  /// get logged in user id
onAuthStateChanged(auth, async (user) => {
  if (user) {
 
    const loggeduser = {
      id: user.uid,
      email: user.email
    };
    localStorage.setItem("currentUser", JSON.stringify(loggeduser))
  } else {
  
  }
});


/// logged in user data get from db
useEffect( () => {

async function getUserData () {

    const docRef = doc(db, "users", currentUser.id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      
      setLogUser(docSnap.data())

    } else {

      console.log("No such document!");
    }
  }
  getUserData()
},[])


  
/// get all users
useEffect(() => {

  async function getAllusers () {
    const q = query(collection(db, "users"), where("email", "!=", currentUser?.email));    
 const querySnapshot = await getDocs(q);
   setGetUsers((querySnapshot.docs.map((doc)=> ({...doc.data(), id: doc.id}))))

}
getAllusers();
   }, []);


     /// send message to db
  async function sendMessage (message) {

    let chatID; 
 if(currentUser.id < listUser.id){
   chatID = currentUser.id + listUser.id
 }else{
   chatID = listUser.id + currentUser.id
 }
 
 const docRef = await addDoc(collection(db, "messages"), {
   message,
   chatID,
   timestamp: serverTimestamp(),
   sender: currentUser.id,
   receiver: listUser.id
 });
 
 console.log("message sent");
 setMessage("")

}
 

   // open chat for single user

 function singleListUser (user) {     
     let chatID; 
     if(currentUser.id < listUser.id){
       chatID = currentUser.id + listUser.id
 }else{
   chatID = listUser.id + currentUser.id
 }
 
 const q = query(collection (db, "messages"), orderBy("timestamp"), where("chatID", "==", chatID));
 const unsubscribe = onSnapshot(q, (querySnapshot) => {
   const messages = [];
   querySnapshot.forEach((doc) => {
     messages.push(doc.data());
     });
     setShowMessage(messages)
     });

     setListUser(user)
     
  } ;
  
// log out user


function logoutHandler(){
  signOut(auth).then(() => {

    console.log("signout successfully")
    navigate("/")

}).catch((error) => {
    console.log(error);
});

}

  return (
    <div className='flex justify-center w-full h-screen  relative bg-gray-200'>
      <div className='absolute left-8 top-16'>
      <p>Username: {logUser?.username.toUpperCase()}</p>
      <p>Email: {logUser?.email}</p>
      <button className='bg-blue-900 w-20 h-10 text-white rounded-md mt-4' onClick={logoutHandler}>SignOut</button>
      </div>
      <div className='w-40 h-[550px] bg-white mt-8 px-3 overflow-y-scroll rounded-md '>
    { getusers.map((user) => (
      <li className='list-none bg-blue-900 text-white rounded-md h-20 mt-5 p-2 pt-5 text-sm cursor-pointer text-wrap' key={user.id} onClick={() => singleListUser(user)}>
      <p>{user?.username}</p>
      <p>{user?.email}</p>
    </li>
    ))}
    
  </div>
    <div className='w-[600px] h-[550px] bg-white mt-8'>
      <div>
     <TopbarInfo listUser={listUser} />
        <div className='w-full h-[450px] p-4 relative overflow-y-scroll'>
        
          {/* left */}
          {
            showMessage.map((data, indx) => {
              
              if(currentUser.id == data.sender){

                return  <div key={indx} className='bg-blue-900 text-white w-36 h-10 rounded-md p-2 mt-5 ml-[380px]'>
                <p>{data.message}</p>
                  </div>
                } else{
                  
            return  <div key={indx} className='bg-white text-blue-900 w-24 h-10 rounded-md p-2 mt-5'>
              <p>{data.message}</p>
              </div>
  
                }
                 
            })}

            
        </div>
        <div className='bg-blue-900 w-full h-[50px] rounded-br-md'>
            <input type="text" placeholder='Enter your message' value={message} className='w-5/6 h-[48px] bg-transparent text-white focus:outline-none pl-4' onChange={(e) => setMessage(e.target.value)} />
            <button className='bg-blue-900 w-20 h-10 text-white rounded-md' onClick={() => sendMessage(message)} >Send</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ChatRoom
