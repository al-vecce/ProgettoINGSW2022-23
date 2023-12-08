
export default class elementiService{
    getElementiCategoriaOrdinatiPerNome = (args) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/menu/editor/categories/"+ args.name + "?mode=BYNAME&page=" + args.page, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        }
        ).then((res) => res.json());
}
