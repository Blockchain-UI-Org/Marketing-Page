import React from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import { splitNavbarItems, useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import NavbarItem from "@theme/NavbarItem";
import SearchBar from "@theme/SearchBar";
import NavbarMobileSidebarToggle from "@theme/Navbar/MobileSidebar/Toggle";
import NavbarLogo from "@theme/Navbar/Logo";
import NavbarSearch from "@theme/Navbar/Search";
import styles from "./styles.module.css";
import NavbarColorModeToggle from "../ColorModeToggle";
import useRouteContext from "@docusaurus/useRouteContext";
import { useLocation } from "@docusaurus/router";
import clsx from "clsx";
function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items;
}
function NavbarItems({ items }) {
  return (
    <>
      {items.map((item, i) => (
        <NavbarItem {...item} key={i} />
      ))}
    </>
  );
}
function NavbarContentLayout({ left, right }) {
  const { pathname } = useLocation();
  const isHome = pathname === "/" || pathname === "/blog";
  return (
    <div className={clsx("navbar__inner ", { home: isHome })}>
      <div className="navbar__items">
        <div style={{ flex: 1 }}></div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>{left}</div>

        <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>{right}</div>
      </div>
    </div>
  );
}
export default function NavbarContent() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);

  const searchBarItem = items.find((item) => item.type === "search");
  return (
    <NavbarContentLayout
      left={
        // TODO stop hardcoding items?
        // revert !! to ! to unhide the nav bar below
        <>
          {!!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          <NavbarItems items={leftItems} />
        </>
      }
      right={
        // TODO stop hardcoding items?
        // Ask the user to add the respective navbar items => more flexible
        <>
          <NavbarColorModeToggle className={styles.colorModeToggle} />
          <NavbarItems items={rightItems} />
          {!searchBarItem && (
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          )}
        </>
      }
    />
  );
}
