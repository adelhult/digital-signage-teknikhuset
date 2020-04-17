import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './Display.css';

export default function Display(props) {
    const imageStyles = {
        backgroundImage: `url("${window.API_URL}/get-image/${props.image}")`,
        backgroundSize: window.IMAGE_COVER ? "cover" : "contain"
    }
    
    return (
        <div className="Display" style={{background: window.BACKGROUND_COLOR || "white"}}>
            { 
            props.info && (
                    <div className="infoBox" style={{color: window.TEXT_COLOR || "black"}} >
                        <div>
                            <ReactMarkdown source={props.info.content} />
                        </div>
                    </div>
                )
            }
            { props.image && <div className="imageBox" style={imageStyles}></div> }
        </div>
    );
}