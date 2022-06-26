document.addEventListener("DOMContentLoaded",pageLoad) function pageLoad()
  {loadData()}
  function loadData()
  {google.script.run
    .withSuccessHandler((jsData) => {
      const table = new Tabulator('#cust-table', {
        //  this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        height: 205, // set height of table (in CSS or here),
        data: jsData, //assign data to table
        layout: 'fitColumns', //fit columns to width of table (optional)
        columns: [
          //Define Table Columns
          { title: 'Date', field: 'Date', width: 150 },
          { title: 'Receipt Num.', field: 'Receipt' },
          { title: 'Name', field: 'Name' },
          { title: 'Id', field: 'Id' },
          { title: 'Address', field: 'Address' },
          { title: 'CCY', field: 'CCY' },
          {
            title: 'Amount',
            field: 'Amount',
            sorter: 'number',
            sorterParams: {
              thousandSeparator: '.',
              decimalSeparator: ',',
              alignEmptyValues: 'top',
            },
          },
          {
            title: 'Rate',
            field: 'Rate',
            sorter: 'number',
            sorterParams: {
              thousandSeparator: ',',
              decimalSeparator: ',',
              alignEmptyValues: 'top',
            },
          },
          {
            title: 'Total',
            field: 'Total',
            sorter: 'number',
            sorterParams: {
              thousandSeparator: ',',
              decimalSeparator: ',',
              alignEmptyValues: 'top',
            },
          },
          { title: 'Employee', field: 'Employe' },
          { title: 'Branch', field: 'Branch' },
        ],
      })

      //trigger an alert message when the row is clicked
      table.on('rowClick', function (e, row) {
        alert('Row ' + row.getData().Date + ' Clicked!!!!')
      })
    })
    .withFailureHandler((er) => {})
    .datatableView()}

