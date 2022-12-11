import type { NextPage } from "next"
import styles from "../styles/Home.module.css"
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";

const auth = getAuth();

const Logout: NextPage = () => {

    const router = useRouter();

    useEffect(()=>{
        auth.signOut();
        router.push("/login")
    },[])

    return (
        <div className={styles.container}>
            Logout...
        </div>
    )
}

export default Logout
