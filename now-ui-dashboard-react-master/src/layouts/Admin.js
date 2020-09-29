import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Route, Switch, Redirect } from "react-router-dom";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import routes from "routes.js";
var ps;

class Dashboard extends React.Component {
  state = {
    backgroundColor: "blue",
    valid: false,
  };
  mainPanel = React.createRef();
  componentDidMount() {
    const validToken = this.props.security.validToken;
    this.setState({ valid: validToken });

    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.mainPanel.current.scrollTop = 0;
    }
  }
  handleColorClick = (color) => {
    this.setState({ backgroundColor: color });
  };
  render() {
    const authority = this.props.security.user.authorities;
    var routess = "";
    if (authority === "[CARDADMIN]") {
      routess = [routes[0], routes[1]];
    } else if (authority === "[CENTERADMIN]") {
      routess = [routes[3], routes[4]];
    }
    let board = () => {
      if (this.state.valid) {
        return (
          <div>
            <Sidebar
              {...this.props}
              routes={routess}
              backgroundColor={this.state.backgroundColor}
            />
            <div
              className="main-panel"
              ref={this.mainPanel}
              style={{
                backgroundColor: "whitesmoke",
              }}
            >
              <DemoNavbar {...this.props} />
              <Switch>
                {routes.map((prop, key) => {
                  return (
                    <Route
                      path={prop.layout + prop.path}
                      component={prop.component}
                      key={key}
                    />
                  );
                })}
                {authority === "[CARDADMIN]" ? (
                  <Redirect from="/admin" to="/admin/dashboard" />
                ) : (
                  <Redirect from="/admin" to="/admin/users" />
                )}
              </Switch>
              <Footer fluid />
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <div
              className="main-panel"
              ref={this.mainPanel}
              style={{
                backgroundColor: "#e9f2f5",
                width: "100%",
              }}
            >
              <DemoNavbar {...this.props} />
              <Switch>
                {routes.map((prop, key) => {
                  return (
                    <Route
                      path={prop.layout + prop.path}
                      component={prop.component}
                      key={key}
                    />
                  );
                })}
                {authority === "[CARDADMIN]" ? (
                  <Redirect from="/admin" to="/admin/dashboard" />
                ) : (
                  <Redirect from="/admin" to="/admin/users" />
                )}
              </Switch>
              <Footer fluid />
            </div>
          </div>
        );
      }
    };

    return (
      <div className="wrapper" ref={this.mainPanel}>
        {board()}
      </div>
    );
  }
}
Dashboard.propTypes = {
  security: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, {})(Dashboard);
