import React, { Component } from "react";
import { getSingleClient } from "../actions/ClientsAction.js";
import { getSingleClientCards } from "../actions/ClientsAction.js";
import { getSingleClientLoans } from "../actions/ClientsAction.js";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import Moment from "moment";
import PaymentCard from "react-payment-card-component";
import "./style.css";
import ClientLoans from "./ClientLoans.js";

class ClientDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getSingleClient(id);
    this.props.getSingleClientCards(id);
    this.props.getSingleClientLoans(id);
  }

  render() {
    const client = this.props.clients.client;
    const { cards } = this.props.cards;

    let uzcard = [];
    let humo = [];
    let visa = [];

    cards.map((card) => {
      if (card.typeId === 1) {
        uzcard.push(card);
      } else if (card.typeId === 2) {
        humo.push(card);
      } else if (card.typeId === 3) {
        visa.push(card);
      }
    });
    const loans = this.props.loans.loans;

    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md="8">
              <Card
                style={{
                  boxShadow: "0 0 13px 2px CadetBlue",
                  borderRadius: "10px",
                }}
              >
                <CardHeader>
                  <h4 className="title">Детали клиента</h4>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="px-1">
                        <FormGroup>
                          <label style={{ marginLeft: "210px" }}>
                            Номер клиента
                          </label>
                          <Input
                            style={{
                              boxShadow: "0 0 1px 1px red",
                              backgroundColor: "white",
                              textAlign: "center",
                              fontSize: "22px",
                              textShadow: "0.5px 0.5px black",
                            }}
                            defaultValue={client.phone}
                            placeholder="Имя клиента"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1">
                        <FormGroup>
                          <label style={{ marginLeft: "200px" }}>
                            Дата регистрации
                          </label>
                          <Input
                            style={{
                              boxShadow: "0 0 1px 1px red",
                              backgroundColor: "white",
                              textAlign: "center",
                              fontSize: "22px",
                              textShadow: "0.5px 0.5px black",
                            }}
                            defaultValue={
                              client.registeredAt === undefined
                                ? ""
                                : client.registeredAt.substring(0, 10)
                            }
                            placeholder="Имя клиента"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <Card
                style={{
                  boxShadow: "0 0 13px 2px CadetBlue",
                  borderRadius: "10px",
                }}
              >
                <CardHeader>
                  <h4 className="title" style={{ textAlign: "center" }}>
                    Кредиты
                  </h4>
                </CardHeader>
                <ClientLoans loanss={loans} />
              </Card>
              <button
                className="btn btn-primary"
                onClick={() => (window.location.href = "/")}
              >
                Назад
              </button>
            </Col>

            <Col md="4">
              <Card
                className="card-body"
                style={{
                  backgroundColor: "AliceBlue",
                  boxShadow: "0 0 13px 2px CadetBlue",
                  borderRadius: "10px",
                }}
              >
                {uzcard.length === 0 && visa.length === 0 && humo.length === 0 && (
                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "28%" }}
                  >
                    У клиента нет карт
                  </button>
                )}
                <div className="row_1" style={{ marginLeft: "-12px" }}>
                  {uzcard.map((item) => {
                    return (
                      <div class="center">
                        <div
                          class="front-face"
                          style={{
                            backgroundImage:
                              "url(" + require("assets/img/UzCard.png") + ")",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "28px",
                              marginTop: "200px",
                              textShadow: "0 5px 5px white",
                            }}
                          >
                            {item.cardBin}
                          </p>
                        </div>
                        <div class="back-face" style={{ color: "white" }}>
                          <div className="contents back">
                            <p className="m-1 h5">
                              Срок действия : {item.expiryDate}
                            </p>
                            <p className="m-1 h5">
                              Тип карты : {item.cardType}
                            </p>
                            <p className="m-1 h5">Ид банка : {item.bankId}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {humo.map((item) => {
                    return (
                      <div className="row_2">
                        <div class="center">
                          <div
                            class="front-face"
                            style={{
                              backgroundImage:
                                "url(" +
                                require("assets/img/HumoCard.png") +
                                ")",
                            }}
                          >
                            <div class="contents front">
                              <p
                                style={{
                                  fontSize: "28px",
                                  marginTop: "200px",
                                  textShadow: "0 5px 5px black",
                                }}
                              >
                                {item.cardBin}
                              </p>
                            </div>
                          </div>
                          <div class="back-face">
                            <div class="contents back">
                              <p className="m-1 h5">
                                Срок действия : {item.expiryDate}
                              </p>
                              <p className="m-1 h5">
                                Тип карты : {item.cardType}
                              </p>
                              <p className="m-1 h5">Ид банка : {item.bankId}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {visa.map((item) => {
                    return (
                      <div className="row_3">
                        <div class="center">
                          <div
                            class="front-face"
                            style={{
                              backgroundImage:
                                "url(" +
                                require("assets/img/VisaGold.png") +
                                ")",
                            }}
                          >
                            <div class="contents front">
                              <p
                                style={{
                                  fontSize: "28px",
                                  marginTop: "200px",
                                  textShadow: "0 5px 5px black",
                                }}
                              >
                                {item.cardBin}
                              </p>
                            </div>
                          </div>

                          <div class="back-face">
                            <div class="contents back">
                              <p className="m-1 h5">
                                Срок действия : {item.expiryDate}
                              </p>
                              <p className="m-1 h5">
                                Тип карты : {item.cardType}
                              </p>
                              <p className="m-1 h5">Ид банка : {item.bankId}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

ClientDetail.propTypes = {
  getSingleClient: PropTypes.func.isRequired,
  getSingleClientLoans: PropTypes.func.isRequired,
  getSingleClientCards: PropTypes.func.isRequired,
  loans: PropTypes.object.isRequired,
  cards: PropTypes.object.isRequired,
  clients: PropTypes.object.isRequired,
  imagess: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  loans: state.loans,
  cards: state.cards,
  clients: state.clients,
  imagees: state.imagess,
});

export default connect(mapStateToProps, {
  getSingleClient,
  getSingleClientCards,
  getSingleClientLoans,
})(ClientDetail);
