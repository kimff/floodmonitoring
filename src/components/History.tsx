import { useEffect, useState } from "react";
import HistoryTabs from "./HistoryTabs";


export let forTable: DataRow[] = []
export interface StreamContent {
    "water level": string,
    "other sensor data": string,
    "flood warning": string,
}

export interface DataRow {
    stream_id: string,
    device_id: string,
    developer_id: string,
    data: StreamContent,
    created_at: string
}



const History = () => {
    const BaseURL: string = "http://18.136.210.234/streams";
    let deviceid: string = "ESP32V1"
    useEffect(() => {
        fetch(`${BaseURL}/${deviceid}`, {
            method: 'get',
            headers: {
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbWZvbGxvc29AZ21haWwuY29tIiwidXNlcl9pZCI6ImtpbWZmIiwiaWF0IjoxNjU0MTY0OTQ5fQ.IaQrPAmmWNhbMcmcrwX-CRvoCiuGT0Hrd8XriP-hrug'
            }
        }).then(response => response.json()).then(jsonentry => {
            console.log(jsonentry)
            forTable = jsonentry
        })

    }, [])

    return (
        <div>

            <h1>History</h1>
            <div>
                <HistoryTabs />
            </div>
        </div>

    )
}

export default History;
