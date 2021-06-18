import React from 'react'

// 未被包含在内部列表中的、或者在 assetsInclude 中的资源，可以使用 ?url 后缀显式导入为一个 URL。这十分有用，
// 例如，要导入 Houdini Paint Worklets 时：
// import workletURL from 'extra-scalloped-border/worklet.js?url'
// CSS.paintWorklet.addModule(workletURL)
// 资源可以使用 ?raw 后缀声明作为字符串引入。
// 脚本可以通过 ?worker 后缀导入为 web worker。
// 内联为 base64 字符串
// import InlineWorker from './shader.js?worker&inline'