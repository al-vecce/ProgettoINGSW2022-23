export class contiChiusiService{

    getClosedChecksOrderedBy = ([page,ordinamento]) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/history?mode="+ ordinamento + "&page=" + page, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        }
        ).then((res) => res.json());
    getClosedChecksFilteredOrderedBy = ([page, ordinamento, filterStart, filterEnd]) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + 
        "/history/filter?mode="+ ordinamento+ "&filterstart=" +filterStart+ "&filterend=" + filterEnd+ "&page=" + page, 
        {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        }
        ).then((res) => res.json());
    getNumberOfPages = () => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/history/pages", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        }
        ).then((res) => res.json());
    getNumberOfPagesFiltered = ([filterStart, filterEnd]) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/history/pages?filterstart=" +filterStart+ "&filterend=" + filterEnd, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        }
        ).then((res) => res.json());
    deleteClosedCheckById = (contoID) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/history/" + contoID , {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        }
        ).then((res) => res.json());
    getAllClosedChecksOrdersOrderedByMode = (conto, ordinamento) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/history/" + conto + "/orders?mode="+ ordinamento, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        }
        ).then((res) => res.json());
}