import React from "react";
import "../../styles/mypage.css"

class MyPageHeader extends React.Component {
  render () {
    const pageInfo = this.props.pageInfo
    return (
      <div className="my-page-header">
        <h4>{pageInfo}</h4>
      </div>
    )
  }
}

export default MyPageHeader;