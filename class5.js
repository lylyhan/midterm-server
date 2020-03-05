
//find max value
let maxValue = myArray.reduce((a,b) => a>b?a:b)

//bunyun logger
const log = bunyan.createLogger({
	name:
	streams:[
	{
		leve:'info',
		path:
	}
	]
})

log.info("some string")
log.info({key:value, key2:value2})


//moment.js
//work with time, can take strings and convert to time/compare them
const moment = require("moment");
let dateString = "2020-03-04T16:32:38Z";
moment(dateString).isSame(moment(new Date().now()));