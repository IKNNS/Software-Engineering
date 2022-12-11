import { PageCenter, PageEnd, PageStart } from "components/common/Page";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Alert, Button, Snackbar } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/AlternateEmailOutlined";
import PasswordIcon from "@mui/icons-material/VpnKeyOutlined"

import { login, loginGoogle } from "@libs/database/login";
import Google from "assets/images/google.svg"
import InputText from "components/common/TextInput";
import Cover from "assets/images/Cover.svg"

const LoginPage: NextPage = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setError] = useState({ email: false, pass: false })
    const [errMessage, setErrorMessage] = useState("")

    const handleForm = () => {
        login(email, password)
            .then(() => { })
            .catch(() => {
                setErrorMessage("โปรดตรวจสอบอีเมลและรหัสผ่าน");
            })
    }

    const handleGoogle = () => {
        loginGoogle()
            .then(() => { })
            .catch(() => {
                setErrorMessage("เข้าสู่ระบบไม่สำเร็จ");
            })
    }

    return (
        <PageEnd className="p-4 pt-10">
            <form className=" w-full flex flex-col gap-4 text-center p-2" onSubmit={(e) => { e.preventDefault(); handleForm() }}>
                <Image src={Cover} width={512} height={512} alt="Cover" />
                <div className="text-left">
                    <h2>ลงชื่อเข้าใช้</h2>
                </div>
                <InputText label="อีเมล"
                    type="email"
                    required
                    icon={<EmailIcon color="secondary" sx={{ mt: 3 }} />}
                    value={email}
                    onChange={(v) => setEmail(v)}
                />
                <InputText label="รหัสผ่าน"
                    type="password"
                    required
                    icon={<PasswordIcon color="secondary" sx={{ mt: 3 }} />}
                    value={password}
                    onChange={(v) => setPassword(v)}
                />
                <div className="text-right text-sm">
                    <span className=" text-link hover:cursor-pointer">ลืมรหัสใช่ไหม?</span>
                </div>
                <Button type="submit" variant="contained" color="info" fullWidth>เข้าสู่ระบบ</Button>
                <p>or</p>
                <div className="flex flex-row justify-center items-center gap-3 p-2 bg-action rounded-lg"
                    onClick={handleGoogle}
                >
                    <Image src={Google} width={20} height={20} alt="google-logo" />
                    <span className=" hover:cursor-pointer"> เข้าสู่ระบบด้วย Google</span>
                </div>
                <p className=" text-sm my-2">
                    ไม่มีบัญชีใช่ไหม?
                    <span className=" text-link hover:cursor-pointer" onClick={() => router.push("/register")}> ลงทะเบียนที่นี่</span>
                </p>
            </form>
            <Snackbar open={errMessage != ""} autoHideDuration={6000} onClose={() => setErrorMessage("")}>
                <Alert className="w-full" severity="error">{errMessage}</Alert>
            </Snackbar>
        </PageEnd>
    )
}

export default LoginPage;