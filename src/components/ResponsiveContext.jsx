import React from "react";

const ResponsiveContext = React.createContext({});

function ResponsiveProvider({ children }) {
  const [isMobileView, setMobileView] = React.useState(false);

  React.useEffect(() => {
    const setResponsiveness = () => setMobileView(window.innerWidth < 900);

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  return (
    <ResponsiveContext.Provider value={{ isMobileView }}>
      {children}
    </ResponsiveContext.Provider>
  );
}

export { ResponsiveContext, ResponsiveProvider };
