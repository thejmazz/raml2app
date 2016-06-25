import React, { Component } from 'react'

export default class List extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { items } = this.props

    return(
      <ul>
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    )
  }
}
