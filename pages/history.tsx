import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import styles from "../styles/Home.module.css"
import { Accordion, AccordionDetails, AccordionSummary, Drawer } from "@mui/material";
import { useAuth } from "@libs/firebase/useAuth";
import { useEffect, useState } from "react";
import { getHistory } from "@libs/database/food";
import { FoodHistory } from "@models/Food_Model";
import moment from "moment";
import { PageStart } from "components/common/Page";
import EditHisotryForm from "components/history-page/EditMenu";
import Account from "@libs/database/user";
import { UserAccount } from "@models/User_Model";
import EnergyIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import HistoryItem from "components/history-page/HistoryItem";
import PieChart, {
    Legend,
    Series,
    Label,
} from "devextreme-react/pie-chart";
import { NextPage } from "next";

interface HistoryGroup {
    total: number;
    date: moment.Moment;
    list: FoodHistory[];
    time: string[];
}

const HistoryPage: NextPage = () => {

    const [userData, setUserData] = useState<UserAccount>()

    const [history, setHistory] = useState<HistoryGroup[]>([])

    const [foodSelect, setFoodSelect] = useState<FoodHistory>();
    const [openMenu, setOpenMenu] = useState(false);

    const [user] = useAuth()

    useEffect(() => {
        if (!user) return () => { }

        Account.get(user.uid)
            .then(res => res)
            .then(data => setUserData(data))
            .catch(e => console.log(e))
    }, [user])

    useEffect(() => {
        if (!user) return () => { }
        loadData()
    }, [user])

    const loadData = async () => {

        if (!user) return;

        const value = await getHistory(user?.uid).catch(e => { console.log(e); return null })

        if (!value) return;

        let map: Map<string, HistoryGroup> = new Map();
        value.forEach(v => {

            const date = moment(v.datetime);
            const key = date.format("DD/MM/YYYY");

            const temp = map.get(key);
            if (temp) {
                temp.total = (temp.total ?? 0) + v.foodEnergy;
                temp.list.push(v);
                temp.time.push(date.format("HH:mm"));
            } else {
                map.set(key, {
                    total: v.foodEnergy,
                    date: date,
                    list: [v],
                    time: [date.format("HH:mm")]
                })
            }
        })

        setHistory(Array.from(map.values()));
    }

    const compareDate = (a: moment.Moment, b: moment.Moment) => {
        if (a < b)
            return 1;
        if (a > b)
            return -1;

        return 0;
    }


    const handleEdit = (i: number, j: number) => {
        setFoodSelect(history[i].list[j]);
        setOpenMenu(true);
    }

    return (
        <PageStart className="p-4 gap-3 pt-10">
            <div className="text-center">
                <h2>History</h2>
            </div>
            <div className="w-full flex flex-col gap-5 pb-14">
                {!history || history.length == 0 && (<div><p className="mx-5 text-center">ยังไม่มีข้อมูล</p><p className="text-center">ลองเพิ่มอาหารที่คุณทานที่หน้า home ดูสิ</p></div>)}
                {history.sort((a, b) => compareDate(a.date, b.date)).map((data, index) => (
                    <div key={index} className={`w-full`}>
                        <h4 className="text-left mb-2">
                            วันที่ {data.date.format("DD/MM/YYYY")}
                        </h4>
                        <Accordion>
                            <AccordionSummary>

                                <div className="flex flex-col justify-start items-center gap-3" >
                                    <div className="flex justify-start items-center gap">
                                        <EnergyIcon fontSize="small" sx={{ color: "#FF7878" }} />
                                        <p>{data?.total} Kcal</p>
                                    </div>
                                    <PieChart
                                        id="pie"
                                        type="doughnut"
                                        palette="Soft Blue"
                                        dataSource={dataSource(userData, data.total, data.list)}
                                        className=""
                                    >
                                        <Series argumentField="region"
                                            valueField="val"
                                        >
                                            <Label visible={true}
                                                format="fixedPoint"
                                                customizeText={customizeLabel}
                                            />
                                        </Series>
                                        <Legend horizontalAlignment="center" verticalAlignment="bottom" />
                                    </PieChart>
                                    <p className="text-link">รายละเอียด</p>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Stack spacing={2}
                                    alignItems="center"
                                    direction="column"
                                    justifyContent="flex-end"
                                >
                                    {data.list.sort((a, b) => compareDate(moment(a.datetime), moment(b.datetime))).map((food, i) => (
                                        <HistoryItem key={i} food={food} onClick={() => handleEdit(index, i)} />
                                    ))}
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                ))}
            </div>
            <Drawer
                anchor={"bottom"}
                open={openMenu}
                className="relative"
            >
                <EditHisotryForm food={foodSelect}
                    uid={user?.uid}
                    onClose={() => setOpenMenu(false)}
                    userData={userData}
                    onChange={() => loadData()}
                />
            </Drawer>
        </PageStart>
    );
}

export default HistoryPage;

const dataSource = (userData: UserAccount | undefined, total: number, list: FoodHistory[]): { region: string, val: number }[] => {

    const info = {
        weight: userData?.info?.height ?? 0,
        height: userData?.info?.height ?? 0,
        age: userData?.info?.age ?? 0,
        gender: userData?.info?.gender ?? "other"
    }

    const bmr = calcBMR(info.weight, info.height, info.age, info.gender) - total
    const foodData = list.map(v => ({ region: v.thaiName, val: v.foodEnergy }))
    return [{ region: "พลังงานที่เหลือ", val: bmr > 0 ? bmr : 0 }, ...foodData];
}

function calcBMR(weight: number, height: number, age: number, gender: string) {
    if (gender === "male") {
        return 5 + (10 * weight!!) + (6.25 * height!!) - (5 * age!!)
    }
    else if (gender === "female") {
        return -161 + (10 * weight!!) + (6.25 * height!!) - (5 * age!!)
    }
    else {
        return 5 + (10 * weight!!) + (6.25 * height!!) - (5 * age!!)
    }
}

function customizeLabel(data: any) {
    return `${data.value} kcals`;
}