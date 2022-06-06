import { forTable, DataRow } from '../History';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    TimeScale,
    PointElement,
    ChartOptions,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { enGB } from 'date-fns/locale';





ChartJS.register(
    CategoryScale,
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);



const ChartTab = () => {
    const options = {
        responsive: true,
        cubicInterpolationMode: 'monotone',
        pointBorderColor: '#E64A19',
        pointBackgroundColor: '#FFA726',
        pointRadius: 5,
        pointHoverRadius: 10,
        pointHitRadius: 30,
        pointBorderWidth: 4,
        scales: {
            y:
            {
                min: 0,
                max: 100,
            },
            x: {
                type: 'time' as any,
                // min: new Date('2022-05-19T11:35:54.212654+00:00').getTime() / 1000,
                // max: new Date('2022-05-22T16:35:54.212654+00:00').getTime() / 1000,
            }
        },
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: ' ',
            },
        },

    };

    //const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const getTimeStamps = (entry: DataRow[]) => {
        let labels: Date[] = []
        for (let i = 0; i < entry.length; i++) {
            labels.push(new Date(entry[i].created_at))
        }
        return labels
    }

    const getFloodLevels = (entry: DataRow[]) => {
        let values: number[] = []
        for (let i = 0; i < entry.length; i++) {
            const floodLevel = entry[i].data["water level"]
            if (floodLevel.length < 13) {
                values.push(parseInt(floodLevel.split(" ")[1].split("c")[0]))
            } else {
                values.push(0)
            }
        }
        return values
    }

    function custom_sort(a: any, b: any) {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
    forTable.sort(custom_sort)
    const label = getTimeStamps(forTable)
    const levels = getFloodLevels(forTable)
    console.log(levels)
    console.log(label)



    const data = {

        labels: label,
        datasets: [
            {
                label: 'Flood Levels',
                data: levels,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',


            },

        ],
    };
    return (
        <div className="SecondTab">
            <p>Flood Levels</p>
            <Line options={options} data={data} />
        </div>
    );
};
export default ChartTab;