import React from 'react'
import assets from '../webpack-assets.json'

const Layout = ({ title, children }) => {
  const testCss = assets.web.css
  const testJs = assets.web.js
  console.log(testJs)
  return (
    <html lang="zh-CN">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
      <meta name="renderer" content="webkit" />
      <title>website-cli</title>
      <link rel="stylesheet" href={testCss} />
    </head>
    <body>
    <div className="wrap">
      {children}
    </div>
    <script src={testJs} />
    </body>
    </html>
  )
}

export default Layout
