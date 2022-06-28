import Airtable from "airtable"

export default class FestivalAirtable {
  constructor(apiKey, baseKey, tableName) {
    this.base = new Airtable({apiKey}).base(baseKey)
    this.table = this.base(tableName)
  }

  getRecords(filterFormula = "") {
    return new Promise((resolve, reject) => {
      console.log("filterFormula in getRecords:", filterFormula)
      let recordList = []
      this.table
        .select({
          view: "Grid view",
          filterByFormula: filterFormula,
        })
        .eachPage(function Page(records, fetchNextPage) {
          recordList = [...recordList, ...records.map(item => item.fields)]
          fetchNextPage()
        }, function done(err) {
          err? reject(err): resolve(recordList)
        })
    })
  }

  addRecord(record) {
    return new Promise((resolve, reject) => {
      this.table
        .create(record, (err, record) => {
          if(err) {
            reject(err)
          }
          let recordId = record.getId()
          this
            .updateRecord(recordId, {id: recordId})
            .catch(err => reject(err))
          resolve(recordId)
        })
    })
  }

  updateRecord(id, change) {
    return new Promise((resolve, reject) => {
      this.table
        .update(id, change, (err) => {
          err? reject(err): resolve(true)
        })
    })
  }

  deleteRecord(ids) {
    return new Promise((resolve, reject) => {
      if(!Array.isArray(ids)) {
        reject("ids should be an array!")
      }
      this.table
        .destroy(ids, (err, records) => {
          err? reject(err): resolve(records)
        })
    })
  }
}