
export class openFoodFactsService{

    getElementoPerCodiceABarre = (barcode) => fetch(process.env.NEXT_PUBLIC_OPENFOODFACTSAPI + barcode + "?fields=product_name_it,product_name,ingredients_text_with_allergens_it,allergens&lc=it", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        }
        ).then((res) => res.json());
   
}