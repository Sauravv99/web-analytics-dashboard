import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

function MonthlyCard( {cardDetails} ){
    const { data,title,percentage,icon,chartData } = cardDetails
    
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="monthly-card d-flex justify-content-between">
            <div className="d-block">
                <span className="monthly-card-text mb-1"><i className={`${icon}`}></i></span>
                <span  className="monthly-card-text mb-1">{data}</span>
                <span  className="monthly-card-text mb-1">{title}</span>
            </div>
            <div className="d-flex flex-column align-items-center">
                 <div style={{ width: 50, height: 50 }}>
                    <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            innerRadius={15}
                            outerRadius={20}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                            <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                 </div>
                {/* <PieChart width={100} height={100}>
                <Pie
                    data={chartData}
                    cx={120}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {chartData.map((entry, index) => (
                    <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                </PieChart> */}
                <span className="fst-italic monthly-card-text mb-1">{percentage}</span>
            </div>
        </div>
    );
}

export default MonthlyCard;