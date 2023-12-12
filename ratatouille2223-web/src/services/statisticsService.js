export class StatisticsService{
    getFilteredStatisticsOrderedByMode = ([scope,ordinamento, filterStart, filterEnd]) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + 
        "/statistics/filtered?mode="+ ordinamento + "&filterstart=" + filterStart + "&filterend=" + filterEnd + "&scope=" + scope, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        }
        ).then((res) => res.json());
}