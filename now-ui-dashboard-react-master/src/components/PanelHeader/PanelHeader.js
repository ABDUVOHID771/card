import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class PanelHeader extends React.Component {
  render() {
    let validToken = this.props.security.validToken;
    return (
      <>
        <div
          className={
            "panel-header " +
            (this.props.size !== undefined
              ? "panel-header-" + this.props.size
              : "")
          }
        >
          {this.props.content}
        </div>
      </>
    );
  }
}
PanelHeader.propTypes = {
  security: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, {})(PanelHeader);
