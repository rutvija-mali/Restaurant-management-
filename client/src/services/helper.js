export const formatRevenue = (revenue) => {
    console.log("formate revenue");
    
  if (revenue >= 1_00_00_000) {
    return (revenue / 1_00_00_000).toFixed(1).replace(/\.0$/, '') + ' Crore';
  } else if (revenue >= 1_00_000) {
    return (revenue / 1_00_000).toFixed(1).replace(/\.0$/, '') + ' Lakh';
  } else if (revenue >= 1_000) {
    console.log('revenue grater');
    
    return (revenue / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return revenue.toString();
};

function getStartAndEndOfWeek(){
    const currentDate = new Date()
    const day = currentDate.getDay()

    const start = new Date(currentDate)
    start.setDate(currentDate.getDate()-day)
    start.setHours(0,0,0,0)

    const end = new Date(start)
    end.setDate(start.getDate() +6)
    end.setHours(23,59,59,999)

    return [start,end]
}

function getLastSevenMonthsRange() {
  const date = new Date();
  const start = new Date(date.getFullYear(), date.getMonth() - 6, 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);

  return[start,end]
}
function getLastSevenYearsRange(){
  const date = new Date();
  const start = new Date(date.getFullYear()-7, date.getMonth() , 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date.getFullYear(), date.getMonth()+1 , 0);
  end.setHours(23, 59, 59, 999);
  
  return [start,end]
}

export const getRange=(range)=>{
    if(range ==='daily'){
       return getStartAndEndOfWeek()
    }else if(range==='monthly'){
      return getLastSevenMonthsRange()
    }else{
      return getLastSevenYearsRange()
    }
}


const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function generateRangeLabels(range, startDate, endDate) {
  const labels = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    if (range === "daily") {
      labels.push(weekdays[current.getDay()]);
      current.setDate(current.getDate() + 1);
    } else if (range === "monthly") {
      labels.push(months[current.getMonth()]);
      current.setMonth(current.getMonth() + 1);
    } else if (range === "yearly") {
      labels.push(`${current.getFullYear()}`);
      current.setFullYear(current.getFullYear() + 1);
    }
  }

  return labels;
}
