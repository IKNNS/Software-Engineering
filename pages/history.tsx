import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import styles from "../styles/Home.module.css"
import Typography from "@mui/material/Typography";
import Image from "next/image"
import Button from "@mui/material/Button";
import { Accordion, AccordionDetails, AccordionSummary, Drawer } from "@mui/material";
import { Opacity } from "@mui/icons-material";
import { useAuth } from "@libs/firebase/useAuth";
import { useEffect, useState } from "react";
import { getHistory } from "@libs/database/food";
import { FoodHistory } from "@models/Food_Model";
import moment from "moment";
import { map } from "@firebase/util";
import { PageStart } from "components/common/Page";
import EditHisotryForm from "components/history/EditMenu";
import Account from "@libs/database/user";
import { UserAccount } from "@models/User_Model";
import HistoryItem from "components/history/HistoryItem";
import PieChart, {
    Legend,
    Series,
    Tooltip,
    Format,
    Label,
    Connector,
    Export,
} from "devextreme-react/pie-chart";
import { NextPage } from "next";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

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
        <PageStart className="p-4 gap-3">
            <div className="text-center">
                <h2>History</h2>
            </div>
            <div className="w-full flex flex-col gap-5 pb-10">
                {history.sort((a, b) => compareDate(a.date, b.date)).map((data, index) => (
                    <div key={index} className={`w-full`}>
                        <h4 className="text-left mb-2">
                            วันที่ {data.date.format("DD/MM/YYYY")}
                        </h4>
                        <Accordion>
                            <AccordionSummary>
                                <div className={styles.listContainer} >
                                    <PieChart
                                        id="pie"
                                        type="doughnut"
                                        palette="Soft Blue"
                                        dataSource={[...data.list.map(v => ({ region: v.thaiName, val: v.foodEnergy })), { region: "พลังงานที่เหลือ", val: calcBMR(userData?.info?.weight ?? 0, userData?.info?.height ?? 0, userData?.info?.age ?? 0, userData?.info?.gender ?? "") - data.total }]}
                                    >
                                        <Series argumentField="region"
                                            valueField="val">
                                            <Label
                                                visible={true}
                                                format="fixedPoint"
                                                customizeText={customizeLabel([...data.list.map(v => ({ region: v.thaiName, val: v.foodEnergy })), { region: "พลังงานที่เหลือ", val: calcBMR(userData?.info?.weight ?? 0, userData?.info?.height ?? 0, userData?.info?.age ?? 0, userData?.info?.gender ?? "") - data.total }])}
                                            ></Label>

                                        </Series>
                                        <Legend horizontalAlignment="center" verticalAlignment="bottom" />
                                    </PieChart>
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
function customizeLabel(listofdata: any) {
    return `${listofdata.region}: ${listofdata.val}kcals`;
}