import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDataAction } from '../actions/index';
import { getData, throttle } from '../utils/index';
import Table from '../components/Table';

class App extends Component {
  state = {
    columns: [
      { title: 'Date', dataIndex: 'date' },
      { title: 'Hits', dataIndex: 'hits' },
      { title: 'Unique', dataIndex: 'unique' },
      { title: 'Registrations', dataIndex: 'registrations' },
      { title: 'Demo Registrations', dataIndex: 'demoRegistrations' },
      { title: 'Conversion', dataIndex: 'conversion' },
      { title: 'Deposit', dataIndex: 'deposit' },
      { title: 'Ftd', dataIndex: 'ftd' },
      { title: 'Deals', dataIndex: 'deals' },
      { title: 'Profit', dataIndex: 'profit' }
    ],
    hideColumns: []
  };

  componentWillMount() {
    this.checkSize();
  }

  componentDidMount() {
    this.props.getDataAction(getData());
    window.addEventListener('resize', throttle(this.checkSize, 100));
  }

  checkSize = () => {
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const { columns, hideColumns } = { ...this.state };

    if (columns.length * 140 > viewportWidth) {
      this.hideColumn(columns, hideColumns);
    } else if (columns.length * 140 + 140 < viewportWidth) {
      this.showColumn(columns, hideColumns);
    }
  };

  hideColumn = (columns, hideColumns) => {
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const columnIndex = columns.length - 2;
    const column = columns.splice(columnIndex, 1);

    hideColumns.unshift(column[0]);

    if (columns.length * 140 > viewportWidth) {
      return this.hideColumn(columns, hideColumns);
    }

    return this.setState({
      columns,
      hideColumns
    });
  };

  showColumn = (columns, hideColumns) => {
    if (hideColumns.length === 0) return;

    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const column = hideColumns.splice(0, 1);
    const columnIndex = columns.length - 1;

    columns.splice(columnIndex, 0, column[0]);

    if (columns.length * 140 + 140 < viewportWidth) {
      this.showColumn(columns, hideColumns);
    }

    this.setState({
      columns,
      hideColumns
    });
  };

  sortData = column => {
    const data = { ...this.props.tableState.data };
    data[1].sort((a, b) => {
      return data[0][b][0][column] - data[0][a][0][column];
    });

    this.props.getDataAction(data);
  };

  toggleMoreDetails = rowKey => {
    const data = { ...this.props.tableState.data };
    const rowItem = data[0][rowKey];
    rowItem[0].expand = !rowItem[0].expand;

    this.props.getDataAction(data);
  };

  render() {
    return (
      <Table
        {...this.props}
        {...this.state}
        toggleMoreDetails={this.toggleMoreDetails}
        sortData={this.sortData}
      />
    );
  }
}

const mapStateToProps = state => ({
  tableState: state.tableState
});

const mapDispatchToProps = dispatch => ({
  getDataAction: bindActionCreators(getDataAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
