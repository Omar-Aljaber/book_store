import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Books from "./views/Books";
import Contact from "./views/Contact";
import "./style/index.scss";

function App() {

  const [isMobile, setIsMobile] = useState(false);

  // Checking if the device is a mobile phone or tablet (screen width < 1500px)
  useEffect(() => {
    const checkIsMobile = () => {
        if (window.innerWidth < 1500) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    checkIsMobile();

    // Add an event listener to respond to window size changes
    window.addEventListener('resize', checkIsMobile);

    // Clean up the event listener when the component is unloaded
      return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  if (isMobile) {
      return (
          <div className="mobile-message">
              <h1>Mobile version not available yet</h1>
              <p>The version for mobile phones and tablets is still in development. Please visit the site on a desktop.</p>
          </div>
      );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/books/category=:category&publisher=:publisher">
          <Books />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
