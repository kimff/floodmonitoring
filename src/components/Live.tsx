import { dir } from "console";
import { useEffect, useState } from "react";




const Live = () => {

    const BaseURL: string = "http://18.136.210.234/streams/live";
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
    const [redWarning, setRedWarning] = useState(true)
    const [orangeWarning, setOrangeWarning] = useState(true)
    const [yellowWarning, setYellowWarning] = useState(true)
    const [noWarning, setNoWarning] = useState(true)

    useEffect(() => {
        const setArrowDirection = (direction: string) => {
            let setDirection: string = "0px"
            let warningColor: string = "gray"
            if (direction === "Flood Level is Decreasing") {
                setDirection = "197px"
                warningColor = "gray"
            }
            if (direction === "Red Warning") {
                setDirection = "-197px"
                warningColor = "red"
            }
            if (direction === "Orange Warning") {
                setDirection = "-197px"
                warningColor = "orange"
            }
            if (direction === "Yellow Warning") {
                setDirection = "-197px"
                warningColor = "yellow"
            }
            document.documentElement.style.setProperty('--warning-color', warningColor);
            document.documentElement.style.setProperty('--arrow-direction', setDirection);
        }
        const setArrowOrientation = (arrowOrientation: string) => {
            let setArrowOrientation: string = "rotate(0deg)"
            if (arrowOrientation === "Flood Level is Decreasing") {
                setArrowOrientation = "rotate(180deg)"
            }
            document.documentElement.style.setProperty('--arrow-orientation', setArrowOrientation);
        }
        const setCurrentWarning = (newWarning: string) => {

            if (newWarning === "Red Warning") {
                if (redWarning === true) {
                    setRedWarning(false)
                    setOrangeWarning(true)
                    setYellowWarning(true)
                    setNoWarning(true)
                }
            }
            if (newWarning === "Orange Warning") {
                if (redWarning === true) {
                    setRedWarning(true)
                    setOrangeWarning(false)
                    setYellowWarning(true)
                    setNoWarning(true)
                }
            }
            if (newWarning === "Yellow Warning") {
                if (redWarning === true) {
                    setRedWarning(true)
                    setOrangeWarning(true)
                    setYellowWarning(false)
                    setNoWarning(true)
                }
            }
            if (newWarning === "Flood Level is Decreasing" || newWarning === "No Current Data for Flood Rate") {
                if (redWarning === true) {
                    setRedWarning(true)
                    setOrangeWarning(true)
                    setYellowWarning(true)
                    setNoWarning(false)
                }
            }

        }
        const setWaterLevelDisplay = (height: string) => {
            let setHeight: string = "";
            if (height === "Around 10cm") {
                setHeight = "0.78rem"
            }
            if (height === "Around 20cm") {
                setHeight = "1.9em"
            }
            if (height === "Around 30cm") {
                setHeight = "3.1rem"
            }
            if (height === "Around 40cm") {
                setHeight = "4.3rem"
            }
            if (height === "Around 50cm") {
                setHeight = "5.5rem"
            }
            if (height === "Around 60cm") {
                setHeight = "6.7rem"
            }
            if (height === "Around 70cm") {
                setHeight = "7.85em"
            }
            if (height === "Around 80cm") {
                setHeight = "9.05rem"
            }
            if (height === "Around 90cm") {
                setHeight = "10.25rem"
            }
            if (height === "Around 100cm") {
                setHeight = "11.4rem"
            }
            document.documentElement.style.setProperty('--water-height', setHeight);
        }
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
            setWaterLevelDisplay(streamData.waterLevel)
            setArrowDirection(streamData.warningLevel)
            setArrowOrientation(streamData.warningLevel)
            setCurrentWarning(streamData.warningLevel)
            setData(streamData);

        }

        sse.onmessage = (e) => { handleStream(e) }
    }, [])





    return (
        <div>
            <div>
                <div className="live-data-container">
                    <h1 className="data">Flood level(cm): {data.waterLevel}</h1>
                    <h1 className="data">Flood Rate Category: {data.warningLevel}</h1>
                    <h1 className="data">Flood rate: {data.otherData} mm/hr</h1>
                </div>
            </div>
            <div id="container" className="container">
                <div id="glass" className="watercontainer">
                    <div id="water" className="water" ></div>
                </div>
                <div id="glass-3" >
                    <div className={`red-warning${redWarning ? "" : " current-warning"}`}>atleast 10cm increase in less than 3 Hours</div>
                    <div className={`orange-warning${orangeWarning ? "" : " current-warning"}`}>atleast 10cm increase in 3-6 Hours</div>
                    <div className={`yellow-warning${yellowWarning ? "" : " current-warning"}`}>atleast 10cm increase in the last 6 Hours</div>
                    <div className={`no-warning${noWarning ? "" : " current-warning"}`} >Flood Level is Deacreasing/No Flood Detected</div>
                </div>
                <div id="glass-2" >
                    <div className="arrow-div">
                        <div className="arrow"></div>
                    </div>
                    <div className="flood-rate-details">
                        <h2>Flood Level is increasing at the rate of {data.otherData} mm/hr</h2>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Live;