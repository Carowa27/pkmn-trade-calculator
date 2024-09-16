import { windowSize } from "@/functions/windowSizes";
import { useEffect, useState } from "react";

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
  return (
    <>
      <h3
        style={
          windowSize() === "XS" || windowSize() === "S"
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
