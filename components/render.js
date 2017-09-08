import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import _ from 'lodash'

class WithContext extends React.Component {
  static childContextTypes = {
    req: React.PropTypes.object,
    account: React.PropTypes.object,
    debug: React.PropTypes.array,
  }

  getChildContext() {
    return {
      req: this.props.req,
      account: this.props.account,
      debug: this.props.debug,
    }
  }

  render() {
    return this.props.children
  }
}

const getDataField = (args, field) => {
  if (args[field]) {
    return args[field]
  }
  return _.mapValues(args, field)
}

export default function render(res, Component, args = {}, extra = {}) {
  const body = _.assign({}, getDataField(args, 'body'), extra)
  const meta = getDataField(args, 'meta')

  const a = (
    <WithContext>
      <Component {...body} {...res.locals} meta={meta} />
    </WithContext>
  )

  let html = renderToStaticMarkup(a)

  const { xhr } = res.req
  if (!xhr) {
    html = `<!DOCTYPE html>\n${html}`
  }
  res.send(html)
}
