import React from "react";
import { getCardReqeust } from "../actions/CardRequestsAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { MDBDataTableV5 } from "mdbreact";
import UserPage from "../views/UserPage";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Moment from "moment";
class RegularTables extends React.Component {
  constructor() {
    super();
    this.state = {
      dataTable: null,
    };
  }

  foo(id) {
    window.location.href = `/#/admin/details/${id}`;
  }
  render() {
    const requests_ = this.props.requests.requests;
    this.state.dataTable = {
      columns: [
        {
          label: "Телефон пользователя",
          field: "пользователя",
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "Телефон пользователя",
          },
        },
        {
          label: "Тип карты",
          field: "типкарты",
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "Тип карты",
          },
        },
        {
          label: "Цель запроса",
          field: "цельзапроса",
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "Цель запроса",
          },
        },
        {
          label: "БИН карты",
          field: "БИНдлякарт",
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "БИН карта",
          },
        },
        {
          label: "Паспортная серия",
          field: "паспортнаясерия",
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "Паспортная серия",
          },
        },
        {
          label: "Адресс ",
          field: "адрессдоставки",
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "Адресс доставки",
          },
        },
        {
          label: "Cтатус",
          field: "статус",
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "Cтатус",
          },
        },
        {
          label: "Дата запроса ",
          field: "запрос",
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "запрос",
          },
        },
      ],
      rows: requests_.map((req) => {
        let date = req.requestDatetime;
        date = Moment(date).format("YYYY-MM-DD");
        // CARD TYPE
        let cardType_ = "";
        if (req.cardType === 1) {
          cardType_ = "Uzcard";
        } else if (req.cardType === 2) {
          cardType_ = "Humo";
        } else if (req.cardType === 3) {
          cardType_ = "Visa";
        }
        // REQUEST PURPOSE
        let purpose = "";
        purpose = req.requestPurpose === 1 ? "Открыт" : "Перевипуск";
        // STATUS
        let status = "";
        if (req.status === 0) {
          status = "Принять";
        } else if (req.status === 1) {
          status = "Готов";
        } else if (req.status === 2) {
          status = "Отказано";
        }
        return {
          пользователя: req.additionalPhone,
          типкарты: cardType_,
          цельзапроса: purpose,
          БИНдлякарт: req.cardBin,
          паспортнаясерия: `${req.passportSerie}` + ` ${req.passportNumber}`,
          адрессдоставки: req.deliveryAddress,
          статус: status,
          запрос: date,
          clickEvent: () => this.foo(req.id),
        };
      }),
    };

    return (
      <>
        <div style={{ cursor: "pointer" }}>
          <MDBDataTableV5
            responsive
            hover
            searchLabel="Поиск:"
            entriesOptions={[10, 20, 25]}
            infoLabel={["Показано", "в", "из", "записей"]}
            entries={10}
            pagesAmount={4}
            searchTop
            searchBottom={false}
            data={this.state.dataTable}
            striped
          />
        </div>
      </>
    );
  }
}

RegularTables.propTypes = {
  cardRequests: PropTypes.object.isRequired,
  getCardRequest: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  requests: state.cardRequests,
});

export default connect(mapStateToProps, { getCardReqeust })(RegularTables);
