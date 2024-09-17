import { windowSize } from "@/functions/windowSizes";
import { useContext, useEffect, useState } from "react";
import { GlobalValueContext, useGlobalValue } from "./GlobalValueProvider";

export const LoadingModule = () => {
  const [isThirdDot, setThirdDot] = useState<boolean>(false);
  useEffect(() => {
    setInterval(() => {
      setThirdDot(true);
    }, 500);
    setInterval(() => {
      setThirdDot(false);
    }, 1000);
  }, []);
  const { globalValue } = useGlobalValue();
  return (
    <>
      <h3
        style={
          globalValue?.breakpoint === "XS" || globalValue?.breakpoint === "S"
            ? { marginLeft: "1.25rem" }
            : { marginLeft: "0" }
        }
      >
        Loading..
        {isThirdDot ? <>.</> : null}
      </h3>
    </>
  );
};
