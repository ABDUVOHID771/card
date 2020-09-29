// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

import TableList from "./TableList";

// react plugin used to create charts
import { getCardReqeusts } from "../actions/CardRequestsAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import React from "react";
import CanvasJSReact from "../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getCardReqeusts();
  }

  addSymbols(e) {
    var suffixes = ["", "K", "M", "B"];
    var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
    if (order > suffixes.length - 1) order = suffixes.length - 1;
    var suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  }

  render() {
    const requests_ = this.props.requests.requests;
    let humo = 0;
    let uzcard = 0;
    let visa = 0;

    requests_.map((req) => {
      if (req.cardType === 1) {
        uzcard++;
      } else if (req.cardType === 2) {
        humo++;
      } else if (req.cardType === 3) {
        visa++;
      }
    });
    // BAR CHART
    const options = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: " Гистограмма запросов на карты",
      },
      axisX: {
        title: "Карты",
        reversed: true,
      },
      axisY: {
        title: " Количество запросов",
        labelFormatter: this.addSymbols,
      },
      data: [
        {
          type: "bar",
          dataPoints: [
            { y: uzcard, label: "UZCARD" },
            { y: humo, label: "HUMO" },
            { y: visa, label: "VISA" },
          ],
        },
      ],
    };
    ///////////////////////////////////////////
    return (
      <>
        <div style={{ backgroundColor: "#0ca9f1", paddingBottom: "20px" }}>
          <div
            style={{
              paddingTop: "80px",
              margin: "0 10px 0 10px",
            }}
          >
            <CanvasJSChart
              options={options}
              /* onRef={ref => this.chart = ref} */
            />
          </div>
        </div>
        <div className="content m-1">
          <Row>
            <Col xs={12} md={12}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4" className="text-center ">
                    Список запросов на карты
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <TableList requests={requests_} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

Dashboard.propTypes = {
  cardRequests: PropTypes.object.isRequired,
  getCardRequests: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  requests: state.cardRequests,
});

export default connect(mapStateToProps, { getCardReqeusts })(Dashboard);
