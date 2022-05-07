const tailwindStyles = require('@/output.css');

// delete css conflicts
GM_addStyle(
  tailwindStyles
    .replace(/\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n/, '')
    .replace(
      /\*,\n::before,\n::after \{\n  box-sizing: border-box;\n  \/\* 1 \*\/\n  border-width: 0;\n  \/\* 2 \*\/\n  border-style: solid;\n  \/\* 2 \*\/\n  border-color: #e5e7eb;\n  \/\* 2 \*\/\n}/,
      ''
    )
    .replace(
      /-webkit-appearance: button;\n  \/\* 1 \*\/\n  background-color: transparent;\n  \/\* 2 \*\/\n  background-image: none;\n  \/\* 2 \*\//,
      ''
    )
    .replace(/display: block;\n  \/\* 1 \*\//, '')
    .replace(/padding-top: 0.5rem;\n  padding-right: 0.75rem;\n  padding-bottom: 0.5rem;\n  padding-left: 0.75rem;/, '')
    .replace(/font-size: inherit;\n  font-weight: inherit;/, '')
);