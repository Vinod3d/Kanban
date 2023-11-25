import React, { useEffect, useRef } from 'react';

const Dropdown = (props) => {
    const dropdownRef = useRef();

    const handleClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            // Clicked outside of the dropdown, close it
            if (props.onClose) props.onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick, { capture: true });

        return () => {
            document.removeEventListener("click", handleClick, { capture: true });
        };
    });

    return (
        <div
            ref={dropdownRef}
            className='dropdown'
            style={{
                position: 'absolute',
                top: '80%',
                right: '0',
            }}
        >
            {props.children}
        </div>
    );
};

export default Dropdown;
