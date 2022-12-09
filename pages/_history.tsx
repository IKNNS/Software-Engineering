import { getHistory } from "@libs/database/food"
import { useAuth } from "@libs/firebase/useAuth"
import { FoodHistory } from "@models/Food_Module"
import { PageStart } from "components/common/Page"
import FoodItem from "components/home/FoodItem"
import HistoryItem from "components/home/HistoryItem"

import { NextPage } from "next"
import { useEffect, useState } from "react"

const HomePage: NextPage = () => {

    const [history, setHistory] = useState<FoodHistory[]>([])
    const [user] = useAuth()

    useEffect(() => {
        if (!user) return () => { }

        getHistory(user?.uid)
            .then(value => setHistory(value))
            .catch(e => console.log(e))
    }, [user])

    return (
        <PageStart className="p-4 gap-3">
            <div className="text-center">
                <h2>History</h2>
            </div>
            <div className="flex w-full flex-col gap-3">
                {
                    history?.map((v, i) => <HistoryItem food={v} key={i} />)
                }
            </div>
        </PageStart>
    )
}