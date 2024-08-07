import { useState } from "react";
import { Link } from "react-router-dom";

import { useScreenSize } from "../hook/useScreenSize";

import styles from "./hamburger.module.css";
import { IoIosSearch } from "react-icons/io";

import avatar from "../assets/react.svg";
function Header() {
    const { screenSize: isSmallScreen } = useScreenSize(768);
    return (
        <header className="container flex flex-col gap-y-5 items-center  py-3">
            <div className="flex justify-between items-center w-full">
                <h1 className="font-extrabold text-xl xs:text-3xl">
                    <Link to={"/home"}>
                        <span className="capitalize text-colored">dash</span>
                        <span>bord</span>
                    </Link>
                </h1>
                {!isSmallScreen && (
                    <div className="flex items-center gap-x-4 lg:gap-x-8 xl:gap-x-10">
                        <HamburgerIcon />
                        <SearchBar />
                    </div>
                )}
                <div className="flex items-center gap-x-2">
                    <img
                        src={avatar}
                        alt=""
                        className="rounded-full size-7 xs:size-10"
                    />
                    <div className="sm:space-y-[2px]">
                        <h3 className="capitalize text-sm xs:text-base font-semibold">
                            name
                        </h3>
                        <p className="text-content text-[10px] font-light xs:text-sm ">
                            Admin
                        </p>
                    </div>
                </div>
            </div>
            {isSmallScreen && (
                <div className="flex items-center gap-x-4 sm:gap-x-10  w-full">
                    <HamburgerIcon />
                    <SearchBar />
                </div>
            )}
        </header>
    );
}
function HamburgerIcon() {
    const [open, setOpen] = useState(false);
    return (
        <label className={styles.buttonsBurger} htmlFor={styles.burger}>
            <input
                type="checkbox"
                id={styles.burger}
                checked={open}
                onChange={(event) => {
                    setOpen(event.target.checked);
                }}
            />
            <span></span>
            <span></span>
            <span></span>
        </label>
    );
}
function SearchBar() {
    const [value, setValue] = useState("");
    return (
        <form
            className="flex-1 md:flex-auto"
            onSubmit={(e) => {
                e.preventDefault();
                console.log(value);
            }}
        >
            <div className="flex w-full gap-x-2 items-center py-2 md:py-2.5 px-3 rounded-full border border-content bg-input">
                <IoIosSearch className="text-lg" />
                <input
                    value={value}
                    type="text"
                    placeholder="Search..."
                    id="search"
                    className="w-full md:w-72 lg:w-80 xl:w-96 bg-input outline-none text-sm xs:text-base"
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </form>
    );
}

export default Header;
