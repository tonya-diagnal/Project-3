// import React from "react";
import styles from "./Dropdown.module.css";

const Dropdown = ({
    open,
    trigger,
    menu,
}: {
    open: boolean;
    trigger: React.ReactNode;
    menu: React.ReactNode[];
}) => {
    return (
        <div className={styles.dropdown}>
            {trigger}
            {open ? (
                <ul className={styles.menu}>
                    {menu.map((menuItem, index) => (
                        <li key={index} className={styles.menuItem}>
                            {menuItem}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

export default Dropdown;
