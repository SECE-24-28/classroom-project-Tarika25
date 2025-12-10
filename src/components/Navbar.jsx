import React from "react";

export default function Navbar(){
    return(
        <nav style={styles.nav}>
            <div style={styles.logo}>RechargeNow</div>
            <div style={styles.right}>
                <button style={styles.btn}>Login</button>
            </div>
                </nav>
    );
}

const styles ={
    nav:{
        padding:"1rem",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        background:"#1976d2",
        color:"white"

    },
    logo:{
        fontsize:"1.3rem",
        fontWeight:"700"
    },
    btn:{
        background:"white",
        border:"none",
        padding:"0.5rem 1rem",
        borderRadius:"6px",
        cursor:"pointer"
    }

    
};
    
