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
        maxWidth: "120rem",
        background: color.black,
        paddingBottom: "0.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        gap: "0.5rem",
        paddingTop: "0.5rem",
        marginTop: "auto",
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
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <h3>Information</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h4 style={{ marginTop: "0.2rem" }}>Apis used:</h4>
            <ul
              style={
                globalValue?.screen.breakpoint === "XS" ||
                globalValue?.screen.breakpoint === "S"
                  ? {
                      marginLeft: "1rem",
                      marginBottom: "0.5rem",
                    }
                  : { marginLeft: "2rem" }
              }
            >
              <li style={{ marginTop: "0.5rem" }}>
                Pokemon TCG API - https://docs.pokemontcg.io/
              </li>
              <li>Open Exchange Rates API - https://openexchangerates.org/</li>
            </ul>
          </div>
          <div
            style={{
              width:
                globalValue?.screen.breakpoint === "XS" ||
                globalValue?.screen.breakpoint === "S"
                  ? "100%"
                  : "50%",
            }}
          >
            <h4>Card Values</h4>
            <p>
              Card values come from the Pokemon TCG API and if there is no TCG
              Player info on the card, you will see "No info found"
            </p>
          </div>
        </div>
        <div>
          <h4>Disclaimer</h4>
          <p
            style={{
              textAlign: "justify",
            }}
          >
            No Affiliation with Pokémon This website is a private project
            created by Carolina and is not affiliated, endorsed, or sponsored by
            Pokémon or any of its affiliated companies. The content presented on
            this site is purely for personal and non-commercial purposes. I want
            to clarify that this website is not an official Pokémon platform and
            does not engage in any collaborative or official partnership with
            the Pokémon brand. All trademarks, logos, and images related to
            Pokémon are the property of their respective owners. While I strive
            to provide accurate and enjoyable content, I encourage users to
            refer to the official Pokémon website and sources for the latest and
            most accurate information about Pokémon. If you have any questions
            or concerns regarding the content on this website, please feel free
            to contact me at carolina.ikw(@)outlook.com. Thank you for your
            understanding.
          </p>
        </div>
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
