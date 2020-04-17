import React from 'react';

export default function Logo() {

    const styles = {
        position:"absolute",
        height:130,
        right: "2rem",
        bottom: "2rem"
    }
    // if the image mode is not "cover" (which means contains), use the logo for black backgrounds if such a one exists
    const source = (!window.IMAGE_COVER && window.LOGO_FOR_BLACK_BACKGROUND) ? window.LOGO_FOR_BLACK_BACKGROUND : window.LOGO;
    return window.LOGO && (
        <img src={source} alt="Logo" style={styles}/>
    );
}