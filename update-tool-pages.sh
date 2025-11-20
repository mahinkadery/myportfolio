#!/bin/bash

# Script to add dark mode toggle to all tool pages

for file in tools/*.html; do
    # Skip if file doesn't exist
    [ -f "$file" ] || continue
    
    # Check if dark mode toggle already exists
    if grep -q "darkModeToggle" "$file"; then
        echo "Skipping $file - already has dark mode toggle"
        continue
    fi
    
    # Check if it's a tool page (has "Back to Tools")
    if ! grep -q "Back to Tools" "$file"; then
        echo "Skipping $file - not a tool page"
        continue
    fi
    
    # Add Material Symbols font link if missing
    if ! grep -q "Material+Symbols+Outlined" "$file"; then
        sed -i.bak '/<link rel="icon"/a\
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
' "$file"
    fi
    
    # Update header to include dark mode toggle
    sed -i.bak 's|<a href="\.\./tools\.html" class="text-sm font-semibold text-primary">⬅ Back to Tools</a>|<div class="flex items-center gap-4">\
        <a href="../tools.html" class="text-sm font-semibold text-primary">⬅ Back to Tools</a>\
        <button id="darkModeToggle" class="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">\
          <span class="material-symbols-outlined text-text-light dark:text-text-dark">dark_mode</span>\
        </button>\
      </div>|' "$file"
    
    # Add shared script before closing body tag
    if ! grep -q "tools-shared-script.js" "$file"; then
        sed -i.bak 's|</body>|  <script src="../tools-shared-script.js"></script>\
</body>|' "$file"
    fi
    
    # Remove backup files
    rm -f "${file}.bak"
    
    echo "Updated $file"
done

echo "Done!"

