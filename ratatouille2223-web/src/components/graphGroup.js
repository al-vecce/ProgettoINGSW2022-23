'use client'

import GraphComponentApex from '@/components/graphComponentApex';
import ButtonRefresh from './buttons/buttonRefresh';
import { Datepicker, Select } from 'flowbite-react';
import { Button } from 'flowbite-react';
import TopStatistiche from '@/components/topStatistiche'
import React, { Component } from "react";
import useSWR from 'swr'
import { useState } from 'react';
import { StatisticsService } from '@/services/statisticsService';
import { FaSearch } from "react-icons/fa";

import ReactApexChart from 'react-apexcharts';
import useCurrentUserData from '@/hooks/useCurrentUserData';

const customTheme = {
    popup: {
        footer: {
            button: {
                today: "text-white bg-primary-2 hover:bg-primary-3 enabled:focus:ring-transparent",
                clear: "border border-gray-300 bg-white text-gray-900 enabled:focus:ring-transparent hover:bg-gray-100 "
            }
        }
    },
    views: {
        days: {
            items: {
                item: {
                    selected: "bg-primary-2 text-white hover:bg-primary-3"
                }
            }
        },
        months: {
            items: {
                item: {
                    selected: "bg-primary-2 text-white hover:bg-primary-3"
                }
            }
        },
        years: {
            items: {
                item: {
                    selected: "bg-primary-2 text-white hover:bg-primary-3"
                }
            }
        },
        decades: {
            items: {
                item: {
                    selected: "bg-primary-2 text-white hover:bg-primary-3"
                }
            }
        },
    }
}

export default function GraphGroup() {
    const today = new Date();
    const lowerBound = new Date(0);
    const [searchCategory, setSearchCategory] = useState("BYTOTALPROFIT");
    const [searchScope, setSearchScope] = useState("DAILY");
    const [selectorCategory, setSelectorCategory] = useState("Incasso Complessivo");
    const [selectorScope, setSelectorScope] = useState("Giornaliero");
    const userData = useCurrentUserData();

    const refreshLowerBound = () => {
        let year = lowerBound.getFullYear().toString();
        let month = (lowerBound.getMonth() + 1).toString();
        let day = (lowerBound.getDate()).toString()
        switch (month) {
            case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9":
                month = "0" + month;
                break;
        }
        switch (day) {
            case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9":
                day = "0" + day;
                break;
        }
        return (year + "-" + month + "-" + day);
    }
    const refreshToday = () => {
        let year = today.getFullYear().toString();
        let month = (today.getMonth() + 1).toString();
        let day = (today.getDate()).toString()
        switch (month) {
            case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9":
                month = "0" + month;
                break;
        }
        switch (day) {
            case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9":
                day = "0" + day;
                break;
        }
        return (year + "-" + month + "-" + day);
    }

    const [minData, setMinData] = useState("1970-01-01");
    const [maxData, setMaxData] = useState("2024-01-01");

    const [graphActive, setGraphActive] = useState(false);
    const [chartState, setChartState] = useState(
        {
            options: {
                chart: {
                    id: "basic-bar",
                    toolbar: {
                      show: false
                    },
                    redrawOnParentResize: true,
                    redrawOnWindowResize: true,
                    width: '100%',
                    height: 'auto',
                    selection: {
                        enabled: true,
                    }
                },
                stroke: {
                    curve: "smooth",
                    width: [6, 0, 0],
                    color: "#F87F01",
                },
                xaxis: {
                    categories: []
                },
                legend: {
                    showForSingleSeries: true,
                    position: "top",
                    horizontalAlign: "center"
                },
                markers: {
                    size: 8,
                    strokeWidth: 3,
                    fillOpacity: 0,
                    strokeOpacity: 0,
                    hover: {
                      size: 8
                    },
                    colors:['#2CA062', '#14894A', '#F87F01']
                },
                dataLabels: {
                    showOn: "always",
                    name: {
                      offsetY: -20,
                      show: true,
                      color: "#444453",
                      fontSize: "13px"
                    },
                    value: {
                      formatter: function (val) {
                        return val;
                      },
                      color: "#444453",
                      fontSize: "30px",
                      show: true
                    },
                    style: {
                        colors:['#2CA062', '#14894A', '#F87F01']
                    }
                },
                title: {
                    text: 'Statistiche dell\'attività',
                    align: 'left',
                    color: "#444453",
                },
                    subtitle: {
                    text: 'Selezionare un range di valori e premere il pulsante Ricerca.',
                    align: 'left',
                    color: "#444453",
                },
                colors:['#2CA062', '#14894A', '#F87F01']
            },
            series: [
                {
                    name: "Guadagni in Euro",
                    data: []
                },
            ],
        }
    );
    const handleMinDateChange = (date) => {
        const temp = JSON.stringify(date).split('T');
        const temp2 = temp[0].replace('"', '');
        setMinData(temp2);
    };
    const handleMaxDateChange = (date) => {
        const temp = JSON.stringify(date).split('T');
        const temp2 = temp[0].replace('"', '');
        setMaxData(temp2);
    };
    const handleSearchCategory = (input) => {
        switch (input) {
            case "Incasso Complessivo":
                setSearchCategory("BYTOTALPROFIT");
                setSelectorCategory("Incasso Complessivo");
                break;
            case "Incasso Medio":
                setSearchCategory("BYAVERAGEPROFIT");
                setSelectorCategory("Incasso Medio");
                break;
            case "Valore Medio dei Conti":
                setSearchCategory("BYAVERAGEVALUE");
                setSelectorCategory("Valore Medio dei Conti");
                break;

        }
    };
    const handleSearchScope = (input) => {
        switch (input) {
            case "Giornaliero":
                setSearchScope("DAILY");
                setSelectorScope("Giornaliero");
                break;
            case "Settimanale":
                setSearchScope("WEEKLY");
                setSelectorScope("Settimanale");
                break;
            case "Mensile":
                setSearchScope("MONTHLY");
                setSelectorScope("Mensile");
                break;
            case "Annuale":
                setSearchScope("YEARLY");
                setSelectorScope("Annuale");
                break;
        }
    };

    const dud = "bread";
    const statServ = new StatisticsService(userData ? userData.token : "");
    const fetchConti = useSWR([searchScope, searchCategory,
        `${minData + "T00:00:00"}`,
        `${maxData + "T23:59:59"}`],
        statServ.getFilteredStatisticsOrderedByMode);

    const useUpdateData = () => {
        fetchConti.mutate([searchScope, searchCategory,
            `${minData + "T00:00:00"}`,
            `${maxData + "T23:59:59"}`],
            statServ.getFilteredStatisticsOrderedByMode);
    };

    function unpackValues(data) {
        let keys = [];
        let values = [];
        if (data && data.statistics && data.statistics != "null") {
            console.log(data);
            keys = data.statistics.map((obj) => obj.key);
            values = data.statistics.map((obj) => obj.value);
        }
        setChartState(
            {
                options: {
                    chart: {
                        id: "basic-bar"
                    },
                    xaxis: {
                        categories: keys
                    },
                },
                series: [
                    {
                        name: "Guadagni in Euro",
                        data: values
                    }
                ]
            }
        );
    }

    const refreshAction = () => {
        setSearchCategory("BYTOTALPROFIT");
        setSearchScope("DAILY");
        setSelectorCategory("Incasso Complessivo");
        setSelectorScope("Giornaliero");
        setMinData(refreshLowerBound);
        setMaxData(refreshToday);
        setChartState(
            {
                options: {
                    chart: {
                        id: "basic-bar"
                    },
                    xaxis: {
                        categories: []
                    }
                },
                series: [
                    {
                        name: "Guadagni in Euro",
                        data: []
                    }
                ]
            }
        );
        useUpdateData();
    };

    return (
        <div className='flex-1 flex-row p-4'>
            <div className='relative flex flex-nowrap text-primary-icon justify-between bg-gray-200 rounded-t-lg p-4 size-[120%]'
            style={{zIndex: '2'}}>
                <div className='flex flex-row'>
                    <div className='flex flex-row object-scale-down items-center gap-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]'>
                        <Select
                            id="Categoria"
                            value={selectorCategory}
                            onChange={(e) => handleSearchCategory(e.target.value)}
                            required>{/**  */}
                            <option>Incasso Complessivo</option>
                            <option>Incasso Medio</option>
                            <option>Valore Medio dei Conti</option>
                        </Select> {/*  */}
                        <Select
                            id="Scope"
                            value={selectorScope}
                            onChange={(e) => handleSearchScope(e.target.value)}
                            required>{/**  */}
                            <option>Giornaliero</option>
                            <option>Settimanale</option>
                            <option>Mensile</option>
                            <option>Annuale</option>
                        </Select> {/*  */}
                    </div>
                </div>
                <div>
                    <div className='relative flex flex-row items-center gap-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]'>
                        <div className='flex block text-primary-icon flex flex-rows items-center gap-2 justify-end'>
                            <div className='drop-shadow-none'>Da:</div>
                            {/**/}<Datepicker onSelectedDateChanged={handleMinDateChange}
                                language="it-IT" labelTodayButton="Oggi" labelClearButton="Annulla" weekStart={2}
                                theme={ customTheme } />
                            <div className='drop-shadow-none'>A:</div>
                            {/**/}<Datepicker onSelectedDateChanged={handleMaxDateChange}
                                language="it-IT" labelTodayButton="Oggi" labelClearButton="Annulla" weekStart={2}
                                theme={ customTheme } />
                        </div>
                        <ButtonRefresh onClickAction={refreshAction} />
                        <Button className='text-lg text-primary-icon body-font rounded-r-lg font-quicksand tracking-widest bg-white
                        border border-none  enabled:hover:bg-primary-icon enabled:hover:text-white focus:bg-primary-icon focus:border-transparent focus:ring-transparent focus:text-white'
                        style={{width:"2.3em", height:"2.3em"}}
                            onClick={()=>{unpackValues(fetchConti.data); setGraphActive(!graphActive);}}>
                            <FaSearch className='text-xl'/>
                        </Button>
                    </div>
                </div>
            </div>
            <div className='relative flex order-2 top-[20px] text-primary-icon gap-5 items-center justify-center bg-gray-200 rounded-b-lg p-4'
            style={{zIndex: '1'}}>
                <div className='w-[576px] h-[360px] md:w-[800px] md:h-[500px] lg:w-[1024px] lg:h-[640px] xl:w-[1280px] xl:h-[800px] items-center justify-center bg-white rounded-lg p-4'>
                    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
                    <script src="https://cdn.jsdelivr.net/npm/react-apexcharts"></script>
                    <GraphComponentApex chartState={chartState} />
                </div>
            </div>
        </div>
    );
}
/*

<div className='flex flex-rows items-center justify-center p-4'>
                        <Button theme={{
                            pill: { 
                                off: "rounded-lg", 
                                on: "rounded-lg"}}}
                            className='text-lg shadow-md body-font font-quicksand tracking-widest bg-primary-icon
                            border border-none enabled:hover:bg-gray-800 focus:bg-gray-800 focus:border-transparent focus:ring-transparent'
                            style={{width:"2.3em", height:"2.3em"}}
                            pill={false}
                            onClick={()=>{unpackValues(fetchConti.data); setGraphActive(!graphActive);}}>
                            <FaSearch className='text-xl'/>
                        </Button>
                        <p className='p-2 text-xl text-primary-icon body-font font-quicksand font-normal tracking-widest'>
                            Ricerca
                        </p>
                    </div>

<div>
            <GraphComponentApex chartState={chartState} />
            <p className="col">
                <Button onClick={() => {setState({
                    options: {
                        chart: {
                            id: "basic-bar"
                        },
                        xaxis: {
                            categories: [1,2,3,4]
                        },
                    },
                    series: [
                        {
                            name: "series-1",
                            data: [50,50,7,0]
                        }
                    ]
                })}}>Update!</Button>
            </p>
        </div>
*/
//<Button onClick={()=>{test.updateCharts()}}>Update!</Button>