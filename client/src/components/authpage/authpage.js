import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import './authpage.css'

function Authpage () {
    const[ signup ,setSignup ] = useState(true);
    return (
    <div>
        <div className="auth-container py-2 px-3">
            { signup ? <RegisterForm setSignup={setSignup} /> : <LoginForm /> }

        <p className="text-center  mt-3 mb-0 small">
            By continuing you agree to our Terms &amp; Privacy Policy.
        </p>
        <div className="card-footer bg-transparent border-0 text-center py-4">
            <small className="text-muted" onClick={  ()=>{ setSignup(!signup) } }>
               {signup ? <>
                    Already have an account? <span className="link-primary  cursor-ptr">Log in</span>
               </> : (
                <>
                    Not registered yet ?  <span className="link-primary cursor-ptr">Sign up</span>
                </>
               )}
            </small>
        </div>

        </div>
    </div>
  );
}

export default Authpage;