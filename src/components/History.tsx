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
    const BaseURL: string = "https://iotproject-sample.herokuapp.com/streams";
    let deviceid: string = "ESP32V1"
    useEffect(() => {
        fetch(`${BaseURL}/${deviceid}`, {
            method: 'get',
            headers: {
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbWZvbGxvc29AZ21haWwuY29tIiwidXNlcl9pZCI6ImtpbWZmIiwiaWF0IjoxNjQ3MjM0NjYwfQ.jGfiA8toi4v_8AYP6ohu9qWExEaxmLsQ3sLFtSBZTeU'
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
