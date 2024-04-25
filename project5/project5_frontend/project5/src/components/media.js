import { useState, useEffect } from "react"; 
import { mediaStore } from "../stores/ResponsiveStore"; 
 
function MediaType() { 
    const updateMediatype = mediaStore((state) => state.updateMediatype); 
 
    const [mediaType, setMediaType] = useState({ 
        isDesktopOrLaptop: false, 
        isBigScreen: false, 
        isTabletOrMobile: false, 
        isPortrate: false, 
        isRetina: false 
    }); 
 
    const handleResize = () => { 
        setMediaType({ 
            isDesktopOrLaptop: window.matchMedia('(min-width: 1224px)').matches, 
            isTabletOrMobile: window.matchMedia('(max-width: 1224px)').matches, 
            isPortrate: window.matchMedia('(orientation: portrait)').matches, 
            isRetina: window.matchMedia('(min-resolution: 2pppx)').matches 
        }); 
    }; 
 
    useEffect(() => { 
    
        handleResize(); 
        // Add event listener  
        window.addEventListener("resize", handleResize); 
        // Cleanup 
        return () => { 
            window.removeEventListener("resize", handleResize); 
        }; 
    }, []); 
 
    useEffect(() => { 
        updateMediatype(mediaType); 
    }, [mediaType, updateMediatype]); 
 
} 
 
export default MediaType; 