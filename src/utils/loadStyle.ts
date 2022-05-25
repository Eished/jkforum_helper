const tailwindStyles = require('@/output.css');

// 导出的是 GM_addStyle 的值
// delete css conflicts
export default GM_addStyle(
  tailwindStyles
    .replace(/\nimg,\nvideo {\n {2}max-width: 100%;\n {2}height: auto;\n}\n/, '')
    .replace(
      /\*,\n::before,\n::after \{\n {2}box-sizing: border-box;\n {2}\/\* 1 \*\/\n {2}border-width: 0;\n {2}\/\* 2 \*\/\n {2}border-style: solid;\n {2}\/\* 2 \*\/\n {2}border-color: #e5e7eb;\n {2}\/\* 2 \*\/\n}/,
      ''
    )
    .replace(
      /-webkit-appearance: button;\n {2}\/\* 1 \*\/\n {2}background-color: transparent;\n {2}\/\* 2 \*\/\n {2}background-image: none;\n {2}\/\* 2 \*\//,
      ''
    )
    .replace(/display: block;\n {2}\/\* 1 \*\//, '')
    .replace(
      /padding-top: 0.5rem;\n {2}padding-right: 0.75rem;\n {2}padding-bottom: 0.5rem;\n {2}padding-left: 0.75rem;/,
      ''
    )
    .replace(/font-size: inherit;\n {2}font-weight: inherit;/, '')
);
