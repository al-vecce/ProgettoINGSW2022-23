
export class openFoodFactsService{

    getElementoPerCodiceABarre = (barcode) => fetch(process.env.NEXT_PUBLIC_OPENFOODFACTSAPI + barcode + "?fields=product_name,ingredients,allergens&lc=it", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        }
        ).then((res) => res.json());
   
}