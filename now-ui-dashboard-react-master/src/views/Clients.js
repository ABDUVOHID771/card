import React, { Component } from "react";
import { getAllClients } from "../actions/ClientsAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ClientsTableList from "./ClientsTableList";
class Clients extends Component {
  constructor() {
    super();
    this.state = {
      dataTable: null,
    };
  }
  componentDidMount() {
    this.props.getAllClients();
  }

  render() {
    const clients = this.props.clients.clients;
    return (
      <>
        <div style={{ backgroundColor: "#0ca9f1", paddingBottom: "20px" }}>
          <div
            style={{
              paddingTop: "80px",
              margin: "0 10px 0 10px",
            }}
          ></div>
        </div>
        <div className="content m-1">
          <Row>
            <Col xs={12} md={12}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4" className="text-center ">
                    Список всех клиентов
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <ClientsTableList clientss={clients} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
Clients.propTypes = {
  clients: PropTypes.object.isRequired,
  getAllClients: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  clients: state.clients,
});

export default connect(mapStateToProps, { getAllClients })(Clients);
