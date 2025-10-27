import React from 'react';

// Simple SVG Icon component
// Add more icons here as needed
const icons = {
  // --- Heroicons (MIT License) ---
  // https://heroicons.com/

  // Existing Icons
  trash: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
  ),
  sun: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M12 2.25c-.414 0-.75.336-.75.75v1.5a.75.75 0 0 0 1.5 0v-1.5a.75.75 0 0 0-.75-.75Zm0 17.25c-.414 0-.75.336-.75.75v1.5a.75.75 0 0 0 1.5 0v-1.5a.75.75 0 0 0-.75-.75ZM4.102 4.102a.75.75 0 0 0-1.061 0l-1.06 1.061a.75.75 0 1 0 1.06 1.06l1.061-1.06a.75.75 0 0 0 0-1.061ZM19.898 19.898a.75.75 0 0 0-1.061 0l-1.06 1.061a.75.75 0 1 0 1.06 1.06l1.061-1.06a.75.75 0 0 0 0-1.061ZM3.041 12.75a.75.75 0 0 0 0-1.5H1.5a.75.75 0 0 0 0 1.5h1.541ZM22.5 12.75a.75.75 0 0 0 0-1.5H20.96a.75.75 0 0 0 0 1.5h1.54ZM4.102 19.898a.75.75 0 0 0 1.06 0l1.061-1.06a.75.75 0 1 0-1.06-1.061l-1.06 1.06a.75.75 0 0 0 0 1.061ZM19.898 4.102a.75.75 0 0 0 1.06 0l1.061-1.06a.75.75 0 1 0-1.06-1.061l-1.06 1.06a.75.75 0 0 0 0 1.061ZM12 6.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5Z" clipRule="evenodd" />
    </svg>
  ),
  moon: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69a.75.75 0 0 1 .981.981A10.503 10.503 0 0 1 18 19.5a10.5 10.5 0 0 1-10.5-10.5A10.503 10.503 0 0 1 9.528 1.718Z" clipRule="evenodd" />
    </svg>
  ),
  shield: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  ),
   x: ( // Lowercase 'x' to avoid conflicts
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  ),

  // --- Newly Added Icons (Outline Style) ---
  trophy: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-4.5A3.375 3.375 0 0 0 12.75 9.75H11.25a3.375 3.375 0 0 0-3.5 3.5v4.5m9 0h-9" />
    </svg>
  ),
  layoutdashboard: ( // Note: lowercase for lookup
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
    </svg>
  ),
  users: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 1.5 1.5 0 0 0 .937-1.492l-.048-2.613A15.75 15.75 0 0 0 18 10.5m-6 8.22a9.094 9.094 0 0 1 3.741-.479 1.5 1.5 0 0 1 .937-1.492l-.048-2.613A15.75 15.75 0 0 1 12 10.5m-6 8.22a9.094 9.094 0 0 1 3.741-.479 1.5 1.5 0 0 1 .937-1.492l-.048-2.613A15.75 15.75 0 0 1 6 10.5m12 0c0-3.86-3.582-7.07-8-7.07S4 6.64 4 10.5m14 0a15.75 15.75 0 0 1-8 2.614m8 0a15.75 15.75 0 0 0-8 2.614m0 0a15.75 15.75 0 0 1-8-2.614M12 8.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5ZM7.5 8.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Zm9 0a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" />
    </svg>
  ),
   megaphone: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 3.06a.75.75 0 0 1 .5.72v1.5a.75.75 0 0 1-.74.74H7.5a.75.75 0 0 0-.75.75v1.5a.75.75 0 0 0 .75.75H9.74a.75.75 0 0 1 .72.5l.34 1.03a3.75 3.75 0 1 0 6.38-.975l.34-1.03a.75.75 0 0 1 .72-.5H21a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75h-2.24a.75.75 0 0 1-.74-.74v-1.5a.75.75 0 0 1 .5-.72 4.5 4.5 0 0 0-9.66 0ZM15.75 15.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>
  ),
   scroll: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  ),
   login: ( // Renamed from LogIn
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
    </svg>
  ),
   userplus: ( // Renamed from UserPlus
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.5 21.75c-2.676 0-5.216-.584-7.499-1.636Z" />
    </svg>
  ),
   menu: ( // Added Menu icon (often used for mobile nav toggles)
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  ),

};

const Icon = ({ name, className = '', size }) => {
    // Standardize name to lowercase for reliable lookup
    const lowerCaseName = name ? name.toLowerCase() : '';
    const SvgIcon = icons[lowerCaseName];

    if (!SvgIcon) {
        console.warn(`Icon "${name}" not found.`);
        return null; // Render nothing if icon not found
    }

    // Determine size class - default uses SVG's inherent size if defined, fallback w-5 h-5
    const defaultSizeClass = SvgIcon.props.className?.match(/(w-\d+|h-\d+)/g)?.join(' ') || 'w-5 h-5';
    const sizeClass = size ? `w-${size} h-${size}` : '';

    // Clone the SVG element to add the custom className and potentially size
    // Combine existing className from SVG definition, passed className, and sizeClass
    const combinedClassName = [
        SvgIcon.props.className?.replace(/(w-\d+|h-\d+)/g, ''), // Remove existing size classes from definition
        className,              // Class passed via props
        sizeClass || defaultSizeClass // Use size prop if provided, else default
    ].filter(Boolean).join(' '); // Filter out empty strings and join

    return React.cloneElement(SvgIcon, {
        className: combinedClassName.trim() || undefined // Use undefined if empty to avoid empty class attribute
    });
};

export default Icon;

