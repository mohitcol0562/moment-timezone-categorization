var UtilsFunctions = {

  getArrayMapOnParam: function (data) {
    var filteredData = {customer: [] , chatbot: [] , admin: [] , system: [] };
    if(data.length>0){
      data.forEach(item=>{
        if(filteredData[item.sender]){
          filteredData[item.sender].push(item)
        }
      })
    }
    return filteredData;
  }
}

module.exports = UtilsFunctions;