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
      <h3>
        Loading..
        {isThirdDot ? <>.</> : null}
      </h3>
    </>
  );
};
