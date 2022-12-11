import { PageCenter } from "@components/common/Page";
import { UserAccount } from "@models/User_Model";
import { checkAccount, register } from "@libs/database/login";
import Cover from 'assets/images/Cover.svg'
import InputText from "@components/common/TextInput";

import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { useState } from "react";

import { Alert, Button, Snackbar } from "@mui/material";
import EmailIcon from '@mui/icons-material/AlternateEmailOutlined';
import PasswordIcon from '@mui/icons-material/VpnKeyOutlined'
import UserIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';



const RegisterPage: NextPage = () => {

    const router = useRouter();
    const [errMessage, setErrorMessage] = useState("")
    const [err, setError] = useState({ email: false, pass: false, confirm: false })
    const [password, setPassword] = useState({
        main: "",
        confirm: ""
    })
    const [data, setData] = useState<UserAccount>({
        uid: "",
        email: "",
        firstname: "",
        lastname: ""
    });

    const handleForm = async () => {
        const err = { email: false, pass: password.main.length < 8, confirm: password.main != password.confirm }
        setError(err)
        if (err.pass) {
            setErrorMessage("รหัสต้องมีมากกว่า 8 ตัวอักษร")
            return;
        }
        else if (err.confirm) {
            setErrorMessage("รหัสไม่ตรงกัน")
            return;
        }

        const login = await checkAccount(data.email).catch(() => null)

        if (!login) {
            setErrorMessage("เกิดข้อผิดพลาด โปรดลองอีกครั้ง")
            return;
        } else if (login.length > 0) {
            setErrorMessage("อีเมลนี้ถูกใช้ไปแล้ว โปรดเปลี่ยนอีเมล")
            setError({ ...err, email: true })
            return;
        }

        register(data, password.main)
            .then(() => {

            })
            .catch(() => {

            })
    }

    return (
        <PageCenter className="p-4">
            <form className="w-full flex flex-col gap-5 text-center p-2" onSubmit={(e) => { e.preventDefault(); handleForm() }}>
                <Image src={Cover} width={250} height={250} alt="Cover" />
                <div className="text-left">
                    <h2>สมัครสมาชิก</h2>
                </div>
                <InputText label="ชื่อ"
                    value={data.firstname}
                    onChange={(value) => setData({ ...data, firstname: value })}
                    required
                    onlyText
                    icon={<UserIcon color="secondary" sx={{ mt: 3 }} />}
                />
                <InputText label="นามสกุล"
                    value={data.lastname}
                    onChange={(value) => setData({ ...data, lastname: value })}
                    required
                    onlyText
                    icon={<UserIcon color="secondary" sx={{ mt: 3 }} />}
                />
                <InputText label="อีเมล"
                    type="email"
                    value={data.email}
                    onChange={(value) => setData({ ...data, email: value })}
                    required
                    icon={<EmailIcon color="secondary" sx={{ mt: 3 }} />}
                />
                <InputText label="รหัสผ่าน"
                    err={err.pass}
                    type="password"
                    value={password.main}
                    onChange={(value) => setPassword({ ...password, main: value })}
                    required
                    icon={<PasswordIcon color="secondary" sx={{ mt: 3 }} />}
                />
                <InputText label="ยืนยันรหัสผ่าน"
                    err={err.confirm}
                    type="password"
                    value={password.confirm}
                    onChange={(value) => setPassword({ ...password, confirm: value })}
                    required
                    icon={<PasswordIcon color="secondary" sx={{ mt: 3 }} />}
                />
                <span></span>
                <Button type="submit" variant="contained" color="info" fullWidth>เข้าสู่ระบบ</Button>
                <p className=" text-sm my-2">
                    มีบัญชีอยู่แล้วใช่ไหม?
                    <span className=' text-link hover:cursor-pointer' onClick={() => router.push('/login')}> เข้าสู่ระบบเลย</span>
                </p>
            </form>
            <Snackbar open={errMessage != ""} autoHideDuration={6000} onClose={() => setErrorMessage("")}>
                <Alert className="w-full" severity="error">{errMessage}</Alert>
            </Snackbar>
        </PageCenter>
    )
}

export default RegisterPage;