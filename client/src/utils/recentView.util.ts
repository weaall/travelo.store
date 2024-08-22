import Cookies from "js-cookie";

export default function recentViewHotels(hotelId: string): void {
    const hotelIdsCookie: string | undefined = Cookies.get("recentHotels");
    let hotelIds: string[] = hotelIdsCookie ? JSON.parse(hotelIdsCookie) : [];

    if (hotelIds.includes(hotelId)) {
        hotelIds = hotelIds.filter(id => id !== hotelId);
    }
    hotelIds.unshift(hotelId);

    if (hotelIds.length > 3) {
        hotelIds.pop();
    }

    Cookies.set("recentHotels", JSON.stringify(hotelIds), { expires: 1 });
}