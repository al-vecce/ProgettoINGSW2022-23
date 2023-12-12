import React from "react";
import Chart from "react-apexcharts";

export default function GraphComponentApex({ chartState }) {
    return (
        <Chart
            options={chartState.options}
            series={chartState.series}
            type="line"
        />
    );
}

/*
const [arrayDate, setArrayDate] = useState(date ?? []);
    const [arrayValori, setArrayValori] = useState(valori ?? []);

    const [state, setState] = useState(
        {
            optionsMixedChart: {
                chart: {
                    id: "basic-bar",
                    toolbar: {
                        show: false
                    }
                },
                plotOptions: {
                    bar: {
                        columnWidth: "50%"
                    }
                },
                stroke: {
                    width: [4, 0, 0]
                },
                xaxis: {
                    categories: []
                },
                markers: {
                    size: 6,
                    strokeWidth: 3,
                    fillOpacity: 0,
                    strokeOpacity: 0,
                    hover: {
                        size: 8
                    }
                },
                yaxis: {
                    tickAmount: 5,
                    min: 0,
                    max: 100
                }
            },
            seriesMixedChart: [
                {
                    name: "series-1",
                    type: "line",
                    data: []
                },
            ],
        }
    );

    useEffect(() => {
        let tmpState = { ...state };
        tmpState.optionsMixedChart.xaxis.categories = arrayDate;
        setState(tmpState);
    }, [arrayDate]);
    useEffect(() => { 
        let tmpState = { ...state };
        tmpState.seriesMixedChart.data = arrayValori;
        setState(tmpState);
    }, [arrayValori]);

*/
/*function updateCharts({date, valori}) {
    const max = 90;
    const min = 30;
    const newMixedSeries = [];

    this.state.seriesMixedChart.forEach((s) => {
        const data = s.data.map(() => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
        });
        newMixedSeries.push({ data: data, type: s.type });
    });

    this.setState({
        seriesMixedChart: newMixedSeries,
    });
    }
    
                <div className="row">
                    <p className="col">
                        <Button onClick={updateCharts}>Update!</Button>
                    </p>
                </div>*/