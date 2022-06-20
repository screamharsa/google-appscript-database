function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate()
}

function compiledData() {
  // https://drive.google.com/drive/folders/1aS1u5EnHOPXn4B4Jp0Jat8ojFP1eW4t6?usp=sharing
  // 12LtzPYt-VHefODXcmZ9l3wm2YpDfFWITTxOIqiHW1Uw

  var folder = DriveApp.getFolderById('1Stnm5-uMSCy42jE5BcwRBhkpB-vM1XkC')
  var fileIterator = folder.getFiles()

  var file
  var fileType
  var sheetsID
  var data
  var combinedData = []
  // var filterString = 'BACKUP PT. KASIH SEJAHTERA BALI - ';
  // var filterData;

  while (fileIterator.hasNext()) {
    file = fileIterator.next()
    fileType = file.getMimeType()
    if (fileType === 'application/vnd.google-apps.spreadsheet') {
      sheetsID = file.getId()
      data = getDataFromSpreadsheet(sheetsID)
      data = data.map(function (r) {
        return r.concat([file.getName()])
      })
      combinedData = combinedData.concat(data)
      // console.log(combinedData.length);
    } //if Function
  } //while function

  var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Master')
  ws.getRange('A3:Q').clearContent()
  ws.getRange(3, 1, combinedData.length, combinedData[0].length).setValues(
    combinedData
  )
} //compiledData Function

// 1rkHgVXYF85jU3fnbgGHf4MaoM5CxVLa7yeIGQsVg2hg

function getDataFromSpreadsheet(sheetsID) {
  const ss = SpreadsheetApp.openById(sheetsID)
  const ws = ss.getSheets()
  const templateExclude = ['Template']
  let data = []
  ws.forEach((sheet) => {
    if (!templateExclude.includes(sheet.getName())) {
      var lastrowNum = sheet.getLastRow()
      var rowValues = sheet.getRange('A8:P' + lastrowNum).getDisplayValues()
      // console.log(rowValues);
      data = data.concat(rowValues)
    } // IF STATEMENT INSIDE FOR EACH
  }) // SHEETSID FUNCTION END
  // console.log(data)
  return data
}

function datatableView() {
  const ss =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('MasterFilter')
  const ws = ss.getDataRange().getDisplayValues()
  return ws

  // const customers = {};
  // for (const transaction of ws) {
  //   const name = transaction[2];
  //   const customerTransactions = customers[name]?.ws || [];
  //   const updatedCustomerTransactions = [transaction, ...customerTransactions]
  //   customers[name] = { ws: updatedCustomerTransactions };
  // }

  // for (const customerName in customers) {
  //   const total = customers[customerName].ws.reduce((acc, transaction) => {
  //     const transactionTotal = Number(transaction[8].replaceAll('.', ''))
  //     return acc + transactionTotal;
  //   }, 0)
  //   customers[customerName].total = total;
  // }

  // const sortedCustomerNames = Object.keys(customers);
  // sortedCustomerNames.sort((a, b) => {
  //   const aTotal = customers[a].total;
  //   const bTotal = customers[b].total;
  //   return bTotal - aTotal
  // })

  // const sortedTransactions = sortedCustomerNames.reduce((acc, customerName) => {
  //   const customerTransactions = customers[customerName].ws;
  //   return [...acc, ...customerTransactions];
  // }, []);

  // console.log('sorted transactions: ', sortedTransactions.length);
  // console.log(sortedCustomerNames.map(name => {
  //   return [customers[name].total, customers[name].ws.length]
  // }))
  // return sortedTransactions
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}
