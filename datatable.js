/*
 *THIS FUNCTION CALL THE getData() FUNCTION IN THE Code.gs FILE,
 *AND PASS RETURNED DATA TO showData() FUNCTION
 */

google.script.run
  .withSuccessHandler(showData)
  .withFailureHandler(openFailure)
  .datatableView()

function openFailure() {
  console.log('ERROR ERROR')
}

//THIS FUNCTION GENERATE THE DATA TABLE FROM THE DATA ARRAY
function showData(dataArray) {
  $(document).ready(function () {
    $('#data-table').DataTable({
      data: dataArray,
      autoWidth: 'false',
      //   search: {
      //   return: true,
      // },
      // rowGroup: {
      // dataSrc: dataArray,
      // },
      // ordering: false,
      responsive: 'true',
      pageLength: 100,
      language: {
        decimal: ',',
        thousands: '.',
      },
      //CHANGE THE TABLE HEADINGS BELOW TO MATCH WITH YOUR SELECTED DATA RANGE
      columns: [
        { title: 'Tanggal' },
        { title: 'No. Nota' },
        { title: 'Nama Nasabah' },
        { title: 'Passport/ID' },
        { title: 'Local Address' },
        { title: 'CCY' },
        { title: 'Amount' },
        { title: 'Rate' },
        { title: 'Total' },
        { title: 'Staff' },
        { title: 'Counter' },
      ],
      // COLUMN CLASS
      columnDefs: [
        { className: 'dt-body-center', targets: [0, 1, 5] },
        { className: 'dt-body-right', targets: [6, 7, 8] },
        { className: 'column-render', targets: [5] },
      ],
    })
  })
}
