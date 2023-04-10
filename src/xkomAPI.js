export async function getHotShot() {
    const headers = { "x-api-key": "jfsTOgOL23CN2G8Y", "User-Agent": "wybran" };
    const response = await fetch(
        "https://mobileapi.x-kom.pl/api/v1/xkom/hotShots/current",
        { headers }
    );
    const data = await response.json();
    console.log(data);
    return data;
}
