import React, { Component } from "react";
import Moment from "moment";
import { MDBDataTableV5 } from "mdbreact";

export default class ClientsTableList extends Component {
  constructor() {
    super();
    this.state = {
      dataTable: null,
    };
  }

  foo(id) {
    window.location.href = `/#/admin/client/${id}`;
  }

  render() {
    const clients = this.props.clientss;
    this.state.dataTable = {
      columns: [
        {
          label: "Имя клиента",
          field: "клиента",
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "Имя клиента",
          },
        },
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
          label: "Клиент кода",
          field: "кода",
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "Клиент кода",
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
          label: "Дата регистрации",
          field: "регистрации",
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "запрос",
          },
        },
      ],
      rows: clients.map((client) => {
        let date = client.registeredAt;
        date = Moment(date).format("YYYY-MM-DD");
        return {
          клиента: client.fullname,
          пользователя: client.phone,
          кода: client.codeClient,
          статус: client.status === 0 ? "Неактив" : "Актив",
          регистрации: date,
          clickEvent: () => this.foo(client.userId),
        };
      }),
    };

    return (
      <div style={{ cursor: "pointer" }}>
        {
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
        }
      </div>
    );
  }
}
