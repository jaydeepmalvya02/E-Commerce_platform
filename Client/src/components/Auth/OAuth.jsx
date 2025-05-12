import {getAuth,GoogleAuthProvider,signInWithPopup} from 'firebase/auth';
import {app} from '../../firebase.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { Google } from '../../redux/slices/authSlice.js';


const OAuth = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleGoogleClick=async()=>{
    try {
      const provider=new GoogleAuthProvider()
      const auth=getAuth(app)
      const result=await signInWithPopup(auth,provider)
      const googleUser = {
        name: result.user.displayName,
        email: result.user.email,
      
      };
      await dispatch(Google(googleUser))
      navigate('/')
      
    } catch (error) {
      console.log("Could not sign in with Google", error);
      
    }
  }

  return (
    <button
    onClick={handleGoogleClick}
      type="button"
      className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-black p-2 mt-2 rounded-lg uppercase hover:bg-gray-100 transition-all"
    >
      <FcGoogle size={24} />
      Continue with Google
    </button>
  );
}

export default OAuth
