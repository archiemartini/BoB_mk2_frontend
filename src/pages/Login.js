import { useRef, useState, useEffect } from "react"
import { useDispatch } from "react-redux"

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// must start with lower or upper case, then must be followed from anywhere between three to 23 characters that cna be lower/upper/digits/hyphens/underscores
const PWD_REGEX = /^.{4,24}$/;
// password must contain one upper case, one lower case one digit and one special character

export default function Login() {

  // https://www.youtube.com/watch?v=brcHK3P6ChQ&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&ab_channel=DaveGray

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  const dispatch = useDispatch()

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
      
  }

  return (
      <div className="signup-login--page">
          <section>
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Login</h1>
                <form onSubmit={handleSubmit} autoComplete="off">
                <label htmlFor="username">
                  Username:
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
                  <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign In</button>
                </form>
              </section>
      </div>
  )
}