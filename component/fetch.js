import {
    API_KEY,
    getApiUrl,
    PERPAGE,
    CURRENT_PAGE,
    load,
    searchTerm,
    getApiUrl_SEARCH
} from  "./common.js";



export const getData = async (searchTerm = "") => {
    try {
        load.textContent = "Loading...";
        
        
        let url;
        if (searchTerm.trim() !== "") {
            // اگر متنی برای سرچ وجود داشت
            url = getApiUrl_SEARCH(searchTerm, CURRENT_PAGE, PERPAGE);
        } else {
            // اگر سرچ خالی بود، عکس‌های پیشنهادی روز را بیاور
            url = getApiUrl(CURRENT_PAGE, PERPAGE);
        }

        // ۲. انجام درخواست Fetch با URL انتخاب شده
        const response = await fetch(url, {
            headers: { Authorization: API_KEY }
        });

        if (!response.ok) {
            throw new Error("فتچ مشکل داشت");
        }

        const data = await response.json();
        console.log("ترکوندی");
        console.log(data.photos);
        
        load.textContent = "Load More";
        return data.photos;

    } catch (error) {
        console.log(error.message);
        load.textContent = "Error loading images";
        throw error; 
    }
};



export default getData;
