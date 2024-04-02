import { ChangeEvent } from "react";
import bgDesktop from "../assets/pattern-bg-desktop.png";
import arrow from "../assets/icon-arrow.svg";
import { FormEvent, useState } from "react";
import { HeaderProps } from "./types";

const Header = ({ fetchData, data }: HeaderProps) => {
    // console.log("data from header" + data);
    const topBgStyle = {
        backgroundImage: `url(${bgDesktop})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    };

    const [userInput, setUserInput] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchData(userInput);
    };

    return (
        <header style={topBgStyle}>
            <h1>IP Address Tracker</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search for any IP address or domain"
                    name="userInput"
                    value={userInput}
                    onChange={handleChange}
                />
                <button type="submit">
                    <img src={arrow} alt="" />
                </button>
            </form>

            <div className="info-field">
                <div className="bloc-1">
                    <h3>ip address</h3>
                    <p>{data?.ip || "-"}</p>
                </div>
                <div className="bloc-2">
                    <h3>location</h3>
                    <p>
                        {data
                            ? data?.location.region + ", " + data?.location.city
                            : "-"}
                    </p>
                </div>
                <div className="bloc-3">
                    <h3>Timezone</h3>
                    <p>{data ? "UTC" + data?.location.timezone : "-"}</p>
                </div>
                <div className="bloc-4">
                    <h3>isp</h3>
                    <p>{data?.isp || "-"}</p>
                </div>
            </div>
        </header>
    );
};

export default Header;
