import Employee from "./Employee"

export default function Employees(){
    //This component is for utility filter all employees who are not managers and loop it over for Employee component
    return <div className="row">
        <Employee/>
        <Employee/>
    </div>
}