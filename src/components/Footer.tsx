import { color } from "@/utils/color";
import Link from "next/link";
import { useGlobalValue } from "./GlobalValueProvider";

export const Footer = () => {
  const { globalValue } = useGlobalValue();
  const thisYear = new Date().getFullYear();

  return (
    <footer
      style={{
        width: "100%",
        background: color.black,
        paddingBottom: "0.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        marginTop: "0.5rem",
      }}
    >
      <div
        style={{
          width:
            globalValue?.screen.breakpoint === "XS" ||
            globalValue?.screen.breakpoint === "S"
              ? "100%"
              : "75%",
          padding: "0 1rem",
          textAlign: "justify",
        }}
      >
        Disclaimer: No Affiliation with Pokémon This website is a private
        project created by Carolina and is not affiliated, endorsed, or
        sponsored by Pokémon or any of its affiliated companies. The content
        presented on this site is purely for personal and non-commercial
        purposes. I want to clarify that this website is not an official Pokémon
        platform and does not engage in any collaborative or official
        partnership with the Pokémon brand. All trademarks, logos, and images
        related to Pokémon are the property of their respective owners. While I
        strive to provide accurate and enjoyable content, I encourage users to
        refer to the official Pokémon website and sources for the latest and
        most accurate information about Pokémon. If you have any questions or
        concerns regarding the content on this website, please feel free to
        contact me at carolina.ikw(@)outlook.com. Thank you for your
        understanding.
      </div>
      <div>
        &copy; {thisYear} Carolina (
        <Link href="https://github.com/Carowa27">Carowa27</Link>)
      </div>
      <span
        style={{
          marginLeft: "1rem",
          fontSize: "14px",
          color: "#8D858C",
          fontWeight: "lighter",
        }}
      >
        V 0.1.4 ( {globalValue?.screen.breakpoint} )
      </span>
    </footer>
  );
};
