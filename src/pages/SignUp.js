import { useRef, useState, useEffect } from "react"
import {faCheck, faTimes, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { axios } from "axios"

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// must start with lower or upper case, then must be followed from anywhere between three to 23 characters that cna be lower/upper/digits/hyphens/underscores
const PWD_REGEX = /^.{4,24}$/;
// password must contain one upper case, one lower case one digit and one special character
const REGISTER_URL = '/signup'

export default function SignUp() {

  // https://www.youtube.com/watch?v=brcHK3P6ChQ&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&ab_channel=DaveGray

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
      userRef.current.focus();
  }, [])

  useEffect(() => {
      setValidName(USER_REGEX.test(user));
  }, [user])

  useEffect(() => {
      setValidPwd(PWD_REGEX.test(pwd));
      setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  useEffect(() => {
      setErrMsg('');
  }, [user, pwd, matchPwd])

  const handleSubmit = async (e) => {
      e.preventDefault();
      // if button enabled with JS hack
      const v1 = USER_REGEX.test(user);
      const v2 = PWD_REGEX.test(pwd);
      if (!v1 || !v2) {
          setErrMsg("Invalid Entry");
          return;
      }
      try {
          const response = await axios.post(REGISTER_URL,
              JSON.stringify({ user, pwd }),
              {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
              }
          );
          console.log(response?.data);
          console.log(response?.accessToken);
          console.log(JSON.stringify(response))
          setSuccess(true);
          //clear state and controlled inputs
          //need value attrib on inputs for this
          setUser('');
          setPwd('');
          setMatchPwd('');
      } catch (err) {
          if (!err?.response) {
              setErrMsg('No Server Response');
          } else if (err.response?.status === 409) {
              setErrMsg('Username Taken');
          } else {
              setErrMsg('Registration Failed')
          }
          errRef.current.focus();
      }
  }

  return (
      <div className="signup-login--page">
        {success ? (
          <section>
            <h1>Success!</h1>
              <p>
                <a href="/login">Sign In</a>
              </p>
          </section>
        ) : (
          <section>
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Register</h1>
                <form onSubmit={handleSubmit} autoComplete="off">
                <label htmlFor="username">
                  Username:
                  <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                  <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                </label>
                  <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                  />
                  
                  <label htmlFor="password">
                      Password:
                      <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                      <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                  </label>
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    autoComplete="off"
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                  />
                  <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                  </label>
                  <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                  />
                  <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                  </p>

                  <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                </form>
                  <p>
                   Already registered?<br />
                   <span className="line">
                   <a href="/login">Sign In</a>
                   </span>
                  </p>
              </section>
          )}
      </div>
  )
}