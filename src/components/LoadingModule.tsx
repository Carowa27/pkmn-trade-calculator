import { useEffect, useState } from "react";
import { useGlobalValue } from "./GlobalValueProvider";

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
          globalValue?.screen.breakpoint === "XS" ||
          globalValue?.screen.breakpoint === "S"
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
