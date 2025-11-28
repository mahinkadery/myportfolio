#!/bin/bash
# Script to add mobile menus with dark mode toggle to all tool pages

cd tools

for file in *.html; do
  # Skip if already has mobile menu
  if grep -q "mobileMenu" "$file"; then
    continue
  fi
  
  # Check if file has the header pattern
  if grep -q "Back to Tools" "$file" && grep -q "darkModeToggle" "$file"; then
    echo "Updating $file..."
    
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Use awk to add mobile menu after header closing tag
    awk '
      /<\/header>/ {
        print $0
        print ""
        print "    <!-- Mobile Menu -->"
        print "    <div id=\"mobileMenu\" class=\"hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm sm:hidden\">"
        print "      <div class=\"fixed right-0 top-0 h-full w-64 bg-white dark:bg-background-dark shadow-xl p-6 flex flex-col gap-6\">"
        print "        <div class=\"flex justify-end\">"
        print "          <button id=\"closeMobileMenu\" class=\"p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5\">"
        print "            <span class=\"material-symbols-outlined text-text-light dark:text-text-dark\">close</span>"
        print "          </button>"
        print "        </div>"
        print "        <nav class=\"flex flex-col gap-4\">"
        print "          <a href=\"/tools\" class=\"text-text-light dark:text-text-dark text-base font-medium hover:text-primary transition-colors\">⬅ Back to Tools</a>"
        print "          <a href=\"/\" class=\"text-text-light dark:text-text-dark text-base font-medium hover:text-primary transition-colors\">Home</a>"
        print "          <a href=\"/tools\" class=\"text-text-light dark:text-text-dark text-base font-medium hover:text-primary transition-colors\">All Tools</a>"
        print "        </nav>"
        print "        <button id=\"darkModeToggleMobile\" class=\"flex items-center gap-2 p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors\">"
        print "          <span class=\"material-symbols-outlined text-text-light dark:text-text-dark\">dark_mode</span>"
        print "          <span class=\"text-text-light dark:text-text-dark text-sm font-medium\">Toggle Theme</span>"
        print "        </button>"
        print "      </div>"
        print "    </div>"
        next
      }
      {
        print $0
      }
    ' "$file" > "$temp_file" && mv "$temp_file" "$file"
    
    # Replace the header buttons div to add mobile menu button
    sed -i '' 's|<div class="flex items-center gap-4">|<div class="hidden sm:flex items-center gap-4">|g' "$file"
    sed -i '' 's|</div>|      <button id="mobileMenuBtn" class="sm:hidden p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">\n        <span class="material-symbols-outlined text-text-light dark:text-text-dark">menu</span>\n      </button>\n    </div>|g' "$file"
  fi
done

echo "Done updating tool pages!"

