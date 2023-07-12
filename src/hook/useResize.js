import { useCallback, useEffect, useState } from "react";

const useResize = (myRef) => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = useCallback(() => {
    setWidth(myRef.current.offsetWidth);
  }, [myRef]);

  useEffect(() => {
    window.addEventListener("load", handleResize);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("load", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, [myRef, handleResize]);
  return { width, handleResize };
};

export default useResize;
