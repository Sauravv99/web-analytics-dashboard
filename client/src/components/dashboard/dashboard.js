import Header from "../header/header";
import MonthlyCard from "../monthlycard/monthlycard";
import "./dashboard.css"

function Dashboard() {

  var monthlyData = [
    {
      "data":"12,316",
      "title" : "Emails sent",
      "percentage" :"+14%",
      "icon" :"bi bi-envelope-fill",
       "chartData" : [
        { name: 'previous', value: 3316 },
        { name: 'current', value: 9000 }
        ]
    },
    {
       "data":"431,225",
      "title" : "Sales obtained",
      "percentage" :"+21%",
      "icon" :"bi bi-receipt",
       "chartData" : [
        { name: 'previous', value: 331225 },
        { name: 'current', value: 100000 }
        ]
    },
    {
      "data":"32,441",
      "title" : "New Clients",
      "percentage" :"+5%",
      "icon" :"bi bi-person-plus",
       "chartData" : [
        { name: 'previous', value: 16441 },
        { name: 'current', value: 16000 }
        ]
    },
    {
      "data":"132,342",
      "title" : "Traffic received",
      "percentage" :"43%",
      "icon" :"bi bi-stoplights",
       "chartData" : [
        { name: 'previous', value: 32340 },
        { name: 'current', value: 100000 }
        ]
    }
  ]
  return (
    <div className="ms-md-4">
      {/* <div className="ms-5 ms-md-4 flex-grow-1">
       <Header/>
      </div> */}
      <div className="monthlycard-cont">
          {monthlyData.map((eachdata,index)=>{
           return (
              <MonthlyCard cardDetails={eachdata} key={index}/>
          );
        })}
       </div>
    </div>
  );
}

export default Dashboard;
