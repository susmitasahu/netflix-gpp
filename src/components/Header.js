import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { LOGO } from "../utils/constant";

export const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const disPatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth).then(() => {}).catch(error => {
      // An error happened.
      navigate("/error");
    });
  };

  useEffect(
    () => {
      const unSubscribe = onAuthStateChanged(auth, user => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const { uid, email, displayName } = user;
          disPatch(
            addUser({ uid: uid, email: email, displayName: displayName })
          );
          navigate("/browse");
        } else {
          // User is signed out
          disPatch(removeUser());
          navigate("/");
        }
      });
      return () => unSubscribe();
    },
    [disPatch, navigate]
  );

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black">
      <img className="w-44" src={LOGO} alt="logo" />
      {user &&
        <div className="flex items-center justify-end space-x-4">
          <button className="py:4 px:2 my:4 mx:4 text-white rounded-lg bg-purple-800 hover:cursor-pointer">
            GPT Search
          </button>
          <img
            alt="userIcon"
            src="https://occ-0-2482-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229"
          />
          <button
            onClick={handleSignOut}
            className="text-white font:bold hover:cursor-pointer"
          >
            Sign Out
          </button>
        </div>}
    </div>
  );
};

export default Header;
