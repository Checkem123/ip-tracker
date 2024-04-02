import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Map from "./components/Map";
import { Fetch } from "./components/types";

function App() {
    const [data, setData] = useState<Fetch | null>({
        ip: "8.8.8.8",
        location: {
            country: "US",
            region: "California",
            city: "Mountain View",
            lat: 37.40599,
            lng: -122.078514,
            postalCode: "94043",
            timezone: "-07:00",
            geonameId: 5375481,
        },
        domains: [
            "0d2.net",
            "003725.com",
            "0f6.b0094c.cn",
            "007515.com",
            "0guhi.jocose.cn",
        ],
        as: {
            asn: 15169,
            name: "Google LLC",
            route: "8.8.8.0/24",
            domain: "https://about.google/intl/en/",
            type: "Content",
        },
        isp: "Google LLC",
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean | null>(null);

    const fetchData = async (userInput: string): Promise<void> => {
        const isDomain = (input: string) => {
            const domainRegex = /^[a-zA-Z]+$/;
            return domainRegex.test(input);
        };

        const isIPAddress = (input: string) => {
            const ipRegex = /^[0-9.]+$/;
            return ipRegex.test(input);
        };

        try {
            setLoading(true);
            const apiKey = import.meta.env.VITE_SOME_KEY;
            let apiUrl = "";
            if (isDomain(userInput)) {
                apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&domain=${userInput}.com`;
            } else if (isIPAddress(userInput)) {
                apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${userInput}`;
            } else {
                setError("Please select a valid Ipv4, Ipv6 or domain.");
                setData(null);
                setLoading(null);
                return;
            }

            const result = await fetch(apiUrl);
            if (!result.ok) {
                throw new Error("Problem fetching...");
            }

            const data = await result.json();

            setData(data);
            setLoading(false);
            setError("");
        } catch (error) {
            if (error instanceof TypeError) {
                setError(
                    "Network error. Please check your internet connection."
                );
            } else {
                setError("An error occurred while fetching data");
            }
        }
    };

    useEffect(() => {
        fetchData;
    }, [data]);

    return (
        <>
            <Header fetchData={fetchData} data={data} />
            {loading && <h3 className="state">Loading please wait...</h3>}
            {error && <h3 className="state">{error}</h3>}
            {!loading && !error && <Map data={data} />}
        </>
    );
}

export default App;
