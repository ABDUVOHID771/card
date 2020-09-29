import React, { Component } from "react";
import Moment from "moment";
import { MDBDataTableV5 } from "mdbreact";
export default class ClientLoans extends Component {
  constructor() {
    super();
    this.state = {
      dataTable: null,
    };
  }
  render() {
    const loans = this.props.loanss;
    this.state.dataTable = {
      columns: [
        {
          label: "ID филиала",
          field: "филиала",
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "ID филиала",
          },
        },
        {
          label: "Основной телефон",
          field: "телефон",
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "Основной телефон",
          },
        },

        {
          label: "Тип",
          field: "тип",
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "Тип",
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
          label: "Стратегия подсчета",
          field: "подсчета",
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "Стратегия подсчета",
          },
        },
        {
          label: "Запрашиваемая сумма",
          field: "сумма",
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "Запрашиваемая сумма",
          },
        },
        {
          label: "Дата принята",
          field: "принята",
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "Дата принята",
          },
        },
      ],
      rows: loans.map((loan) => {
        let status = "";
        let date = loan.receiptTime;
        if (loan.status === 0) {
          status = "принять";
        } else if (loan.status === 1) {
          status = "в процессе";
        } else if (loan.status === 2) {
          status = "готово";
        } else if (loan.status === 3) {
          status = "отказано";
        }
        let accounting = "";
        if (loan.countingStrategy === "1") {
          accounting = "Annuitet";
        } else if (loan.countingStrategy === "2") {
          accounting = "Differential";
        } else if (loan.countingStrategy === "-1") {
          accounting = "-1";
        }
        date = Moment(date).format("YYYY-MM-DD");
        return {
          филиала: loan.branchId,
          телефон: loan.additionalPhone,
          тип: loan.loanId === 1 ? "Online Kredit 15" : "Avtokredit",
          статус: status,
          подсчета: accounting,
          сумма: loan.requestedAmount,
          принята: date,
        };
      }),
    };

    return (
      <div
        style={{
          cursor: "pointer",
          margin: "10px",
          borderRadius: "10px",
          boxShadow: "0 0 1px 1px grey",
        }}
      >
        {loans.length === 0 && (
          <button
            class="btn btn-block btn-danger"
            style={{ marginLeft: "-0.8px", borderRadius: "10px" }}
          >
            У клиента нет кредитов
          </button>
        )}
        {loans.length !== 0 && (
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
        )}
      </div>
    );
  }
}
