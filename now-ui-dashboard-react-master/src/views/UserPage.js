import React from "react";
import {
  getCardReqeust,
  getCardReqeustImage,
  changeCardRequestStatus,
} from "../actions/CardRequestsAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Row,
  Col,
} from "reactstrap";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";

import Carousel from "react-bootstrap/Carousel";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
//  //////////////////////////////////////////////////////////////////
class User extends React.Component {
  onDismiss() {}
  notify(place) {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      default:
        type = "info";
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>Статус успешно изменен.</div>
        </div>
      ),
      type: type,
      icon: "now-ui-icons ui-1_bell-53",
      autoDismiss: 7,
    };
    this.refs.notificationAlert.notificationAlert(options);
  }
  constructor() {
    super();
    this.onDismiss = this.onDismiss.bind(this);
    this.notify = this.notify.bind(this);
    this.state = {
      visible: true,
      statuss: "",
      process: false,
      ready: false,
      cancel: false,
      passport1: null,
      passport2: null,
      selfie: null,
      typeCard: null,
      purpose: null,
    };
  }
  componentDidMount() {
    const { request } = this.props.requests;
    this.fixStatus(request);
    const { id } = this.props.match.params;
    this.props.getCardReqeustImage(id);
    this.props.getCardReqeust(id);
    // this.createImageFromBlobForSelfie(this.state.photo.imagees);
  }

  fixStatus(request) {
    if (request.status === 0) {
      this.state.process = true;
      this.state.ready = false;
      this.state.cancel = false;
      this.state.statuss = "В ПРОЦЕССЕ ";
    } else if (request.status === 1) {
      this.state.ready = true;
      this.state.process = false;
      this.state.cancel = false;
      this.state.statuss = "ГОТОВО";
    } else if (request.status === 2) {
      this.state.cancel = true;
      this.state.ready = false;
      this.state.process = false;
      this.state.statuss = " Отказано";
    }
  }

  render() {
    const { request } = this.props.requests;
    this.state.passport1 = "";
    this.state.passport2 = "";
    this.state.selfie = "";
    this.state.passport1 = this.props.imagees.imagees[0];
    this.state.passport2 = this.props.imagees.imagees[1];
    this.state.selfie = this.props.imagees.imagees[2];
    this.fixStatus(request);
    let readyStatus = () => {
      this.props.changeCardRequestStatus(request.id, 1, request);
      this.notify("tc");
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    };
    let cancelStatus = () => {
      this.props.changeCardRequestStatus(request.id, 2, request);
      this.notify("tc");
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    };

    // CARD TYPE

    if (request.cardType === 1) {
      this.state.typeCard = "Uzcard";
    } else if (request.cardType === 2) {
      this.state.typeCard = "Humo";
    } else if (request.cardType === 3) {
      this.state.typeCard = "Visa";
    }

    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <NotificationAlert ref="notificationAlert" />

          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h4 className="title">Детали запроса</h4>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup className="row ml-1">
                          <p
                            className="text-muted "
                            style={{
                              marginTop: "10px",
                              fontSize: "16px",
                              marginRight: "70px",
                            }}
                          >
                            Тип карты
                          </p>
                          <p
                            className="text-center"
                            style={{
                              width: "180px",
                              padding: "10px",
                              borderRadius: "10px",
                              boxShadow: "0 0 1px 1px #c2c2a3",
                            }}
                          >
                            {this.state.typeCard}
                          </p>
                        </FormGroup>
                        <FormGroup className="row ml-1">
                          <p
                            className="text-muted "
                            style={{
                              marginRight: "43px",
                              marginTop: "10px",
                              fontSize: "16px",
                            }}
                          >
                            Цель запроса
                          </p>
                          <p
                            className="text-center"
                            style={{
                              width: "180px",
                              padding: "10px",
                              borderRadius: "10px",
                              boxShadow: "0 0 1px 1px #c2c2a3",
                            }}
                          >
                            {request.requestPurpose === 1
                              ? "Открыт"
                              : "Перевипуск"}
                          </p>
                        </FormGroup>

                        <FormGroup className="row ml-1">
                          <p
                            className="text-muted "
                            style={{
                              marginRight: "20px",
                              marginTop: "10px",
                              fontSize: "16px",
                            }}
                          >
                            Номер телефона
                          </p>
                          <p
                            className="text-center"
                            style={{
                              width: "180px",
                              padding: "10px",
                              borderRadius: "10px",
                              boxShadow: "0 0 1px 1px #c2c2a3",
                            }}
                          >
                            {request.additionalPhone}
                          </p>
                        </FormGroup>
                        <FormGroup className="row ml-1">
                          <p
                            className="text-muted"
                            style={{
                              marginRight: "45px",
                              marginTop: "10px",
                              fontSize: "16px",
                            }}
                          >
                            БИН для карт
                          </p>
                          <p
                            className="text-center"
                            style={{
                              width: "180px",
                              padding: "10px",
                              borderRadius: "10px",
                              boxShadow: "0 0 1px 1px #c2c2a3",
                            }}
                          >
                            {request.cardBin}
                          </p>
                        </FormGroup>
                        <FormGroup className="row ml-1">
                          <p
                            className="text-muted mr-2"
                            style={{
                              marginTop: "10px",
                              fontSize: "16px",
                            }}
                          >
                            Номер паспорта
                          </p>
                          <p
                            className="text-center"
                            style={{
                              width: "180px",
                              padding: "10px",
                              marginLeft: "18px",
                              borderRadius: "10px",
                              boxShadow: "0 0 1px 1px #c2c2a3",
                            }}
                          >
                            {request.passportSerie} {request.passportNumber}
                          </p>
                        </FormGroup>
                        <FormGroup
                          className="row ml-1"
                          style={{ width: "800px" }}
                        >
                          <p
                            className="text-muted "
                            style={{ marginTop: "10px", fontSize: "16px" }}
                          >
                            Адресс
                          </p>
                          <p
                            className="text-center"
                            style={{
                              width: "600px",
                              padding: "10px",
                              borderRadius: "10px",
                              marginLeft: "92px",
                              boxShadow: "0 0 1px 1px #c2c2a3",
                            }}
                          >
                            {request.deliveryAddress}
                          </p>
                        </FormGroup>

                        <FormGroup className="row ml-1">
                          <p
                            className="text-muted "
                            style={{
                              marginRight: "93px",
                              marginTop: "10px",
                              fontSize: "16px",
                            }}
                          >
                            Статус
                          </p>
                          <p
                            className="text-center"
                            style={{
                              width: "180px",
                              padding: "10px",
                              borderRadius: "10px",
                              boxShadow: "0 0 1px 1px #c2c2a3",
                            }}
                          >
                            {this.state.statuss}
                          </p>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <button
                className="btn btn-lg btn-primary m-3"
                onClick={() => (window.location.href = "/")}
              >
                Назад
              </button>
              {this.state.process && (
                <>
                  <button
                    className="btn btn-lg btn-success block m-3"
                    onClick={readyStatus}
                  >
                    Готова к выдачу
                  </button>
                  <button
                    className="btn btn-lg btn-danger block m-3"
                    onClick={cancelStatus}
                  >
                    Отказатъ
                  </button>
                </>
              )}
            </Col>

            <Col md="4">
              <Card
                className="card-user"
                style={{ height: "82%", backgroundColor: "#F0F8FF" }}
              >
                <Carousel>
                  <Carousel.Item>
                    {!this.state.passport1 && (
                      <p
                        className="btn btn-danger"
                        style={{ marginTop: "250px", marginLeft: "120px" }}
                      >
                        Фото паспорта 1 недоступно
                      </p>
                    )}

                    {this.state.passport1 && (
                      <>
                        <img
                          style={{
                            boxShadow: "0 0 14px 1px azure",
                            borderRadius: "2%",
                          }}
                          className="caro d-block w-100"
                          alt="First slide"
                          width="100%"
                          height="600px"
                          src={`data:image/png;base64,${this.state.passport1}`}
                        />
                        <div class="container">
                          <div
                            class="carousel-caption"
                            style={{
                              marginTop: "200px",
                            }}
                          >
                            <p style={{ textShadow: "2px 2px black" }}>
                              Фото на паспорт 1
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                    {this.state.passport1 && (
                      <>
                        <a
                          className="btn btn-primary "
                          style={{
                            color: "white",
                            width: "50%",
                            marginLeft: "130px",
                          }}
                          href={`data:image/png;base64,${this.state.passport1}`}
                          download
                        >
                          СКАЧАТЬ
                        </a>
                      </>
                    )}
                  </Carousel.Item>
                  <Carousel.Item>
                    {!this.state.passport2 && (
                      <p
                        className="btn btn-danger"
                        style={{ marginTop: "250px", marginLeft: "120px" }}
                      >
                        Фото паспорта 2 недоступно
                      </p>
                    )}

                    {this.state.passport2 && (
                      <>
                        <img
                          style={{
                            boxShadow: "0 0 14px 1px azure",
                            borderRadius: "2%",
                          }}
                          className="caro d-block w-100"
                          alt="Second slide"
                          width="100%"
                          height="600px"
                          src={`data:image/png;base64,${this.state.passport2}`}
                        />
                        <div class="container">
                          <div
                            class="carousel-caption"
                            style={{
                              marginTop: "200px",
                            }}
                          >
                            <p style={{ textShadow: "2px 2px black" }}>
                              Фото на паспорт 2
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                    {this.state.passport1 && (
                      <>
                        <a
                          className="btn btn-primary "
                          style={{
                            color: "white",
                            width: "50%",
                            marginLeft: "130px",
                          }}
                          href={`data:image/png;base64,${this.state.passport2}`}
                          download
                        >
                          СКАЧАТЬ
                        </a>
                      </>
                    )}
                  </Carousel.Item>
                  <Carousel.Item>
                    {!this.state.selfie && (
                      <p
                        className="btn btn-danger"
                        style={{ marginTop: "250px", marginLeft: "150px" }}
                      >
                        Селфи недоступно
                      </p>
                    )}

                    {this.state.selfie && (
                      <>
                        <img
                          style={{
                            boxShadow: "0 0 14px 1px azure",
                            borderRadius: "2%",
                          }}
                          className="caro d-block w-100"
                          alt="Third slide"
                          width="100%"
                          height="600px"
                          src={`data:image/png;base64,${this.state.selfie}`}
                        />
                        <div class="container">
                          <div
                            class="carousel-caption"
                            style={{
                              marginTop: "200px",
                            }}
                          >
                            <p style={{ textShadow: "2px 2px black" }}>Селфи</p>
                          </div>
                        </div>
                      </>
                    )}
                    {this.state.selfie && (
                      <>
                        <a
                          className="btn btn-primary "
                          style={{
                            color: "white",
                            width: "50%",
                            marginLeft: "130px",
                          }}
                          href={`data:image/png;base64,${this.state.selfie}`}
                          download
                        >
                          СКАЧАТЬ
                        </a>
                      </>
                    )}
                  </Carousel.Item>
                </Carousel>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

User.propTypes = {
  cardRequests: PropTypes.object.isRequired,
  imagess: PropTypes.object.isRequired,
  getCardRequest: PropTypes.func.isRequired,
  getCardReqeustImage: PropTypes.func.isRequired,
  changeCardRequestStatus: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  requests: state.cardRequests,
  imagees: state.imagess,
});

export default connect(mapStateToProps, {
  getCardReqeust,
  getCardReqeustImage,
  changeCardRequestStatus,
})(User);
