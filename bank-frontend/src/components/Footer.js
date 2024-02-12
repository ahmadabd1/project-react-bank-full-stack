import React from 'react'
import './styles/Footer.css'
export default function Footer() {
  return (
    
    <footer style={{backgroundColor:"rgb(241, 137, 0)", color:"white" ,position: 'fixed', bottom: 0, width: '100%',fontSize:"small" }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', overflow: 'hidden' }}>
        {/* Footer content */}
        <p>&copy; 2024 Bank North. All rights reserved.</p>
        <p>Address: 31, Halisa, Haifa, Israel</p>
        <p>Phone: +972-8596-1112</p>
        <p>Email: NorthBAnk11@North.com</p>
      </div>
    </footer>
    
  )
}
