import React from 'react';
// Import all icons from the 'lucide-react' library
import * as lucide from 'lucide-react';

/**
 * Renders a Lucide icon based on a string name.
 * This avoids needing to import each icon individually in every component.
 * Example: <Icon name="Trophy" size={24} />
 */
const Icon = ({ name, ...props }) => {
    // Get the icon component from the imported library by its name
    const LucideIcon = lucide[name];
    
    // Render the icon if it exists, otherwise render null
    return LucideIcon ? <LucideIcon {...props} /> : null;
};

export default Icon;

