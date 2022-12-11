import { getAuth } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { useAuth } from "@libs/firebase/useAuth"
import { useRouter } from "next/router";

import Loading from "./loading"
import LabelBottomNavigation from "./navbar"

const MENU_PATH = ["/home", "/_error", "/user-info","/history","/notification", "/404"]
const USER_PATH = ["/home", "/register-info", "/user-info","/history","/notification", "/logout", "/_error","/404"]
const NOT_USER_PATH = ["/login", "/register", "/_error","/404"]

const Controller: React.FC = () => {

    const [user, loading] = useAuth()
    const router = useRouter()

    const isPath = (path: string[]) => {
        return path.includes(router.pathname);
    }

    useEffect(() => {

        if (loading) return;

        if (!user && !isPath(NOT_USER_PATH)) {
            router.push("/login");
        } else if (user && !isPath(USER_PATH)) {
            router.push("/home")
        }
        return () => { }

    }, [user, loading, router])

    return (
        <React.Fragment>
            {loading && <Loading screen />}
            {isPath(MENU_PATH) && <LabelBottomNavigation />}
        </React.Fragment>
    )
}

export default Controller;