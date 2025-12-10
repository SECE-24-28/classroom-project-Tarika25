import React from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div className="app-content" style={styles.container}>
        <Sidebar />
        <main style={styles.main}>
          <h2> Welcome to RecahrgeNow</h2>
          <p> Recharge your mobile quickly with secure payment options.</p>
        </main>
      </div>
      <footer className="footer">
        <p>{new Date().getFullYear()} RecahrgeNow - ALL Rights Reserved</p>
      </footer>
    </div>
  );
}

const styles = {
  container:{
    display:"flex"
  },
  main:{
    padding:"1.5rem",
    flex:1
  }
};