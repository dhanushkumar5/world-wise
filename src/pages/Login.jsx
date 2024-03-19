import { Link, useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useAuth } from "../context/LogAuthContext";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const {login,isAuthenticated}=useAuth();
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();

  useEffect(function(){
    if(isAuthenticated=== true) navigate("/app",{replace : true})
  },[navigate,isAuthenticated])


  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" onClick={(e)=> {e.preventDefault() ; login(email,password)}}>Login</Button>
        </div>
      </form>
    </main>
  );
}