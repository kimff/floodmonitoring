import React, { useEffect, useState } from "react";




const Live = () => {

    const BaseURL: string = "https://iotproject-sample.herokuapp.com/streams/live";
    let deviceid: string = "ESP32V1"

    interface floodData {
        waterLevel: string,
        warningLevel: string,
        otherData: string
    }

    interface allFloodData extends floodData {
        created_at: Date,
        device_id: string,
        stream_id: string,
    }



    const [data, setData] = useState<floodData>(Object);

    useEffect(() => {
        let sse = new EventSource(`${BaseURL}/${deviceid}`);
        const handleStream = (e: MessageEvent) => {
            let stringData = JSON.parse((e.data.slice(1, -1).replace(/'/g, '"').split(", {"))[0]);
            let stringData2 = JSON.parse(("{").concat((e.data.slice(1, -1).replace(/'/g, '"').split(", {"))[1]));
            console.log(stringData2)
            const streamData: floodData = {
                waterLevel: stringData["water level"],
                warningLevel: stringData["flood warning"],
                otherData: stringData["other sensor data"]
            }
            console.log(streamData)
            //console.log((stringData2["date"]))

            setData(streamData);

        }

        sse.onmessage = (e) => { handleStream(e) }
    }, [])





    return (

        <div>
            <h1>Live Data</h1>
            <h1 className="data">Flood water level: {data.waterLevel}</h1>
        </div>
    )
}

export default Live;