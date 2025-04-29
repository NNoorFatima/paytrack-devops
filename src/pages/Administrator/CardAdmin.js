import React from "react";
import { Badge } from "../../components/badge"; // adjust the path as needed


const HRCard = ({ hr }) => {
  return (
    <div className="hr-card">
        <Badge className="name-badge">{hr.name}👀</Badge>

      <div>
        <span className="font-semibold">User ID:</span> {hr.userid}
      </div>
      <div>
        <span className="font-semibold">Dept ID:</span> {hr.deptid}
      </div>
      <div>
        <span className="font-semibold">Email:</span>{" "}
        <a href={`mailto:${hr.email}`}>{hr.email}</a>
      </div>
      
      <div>
        <span className="font-semibold">Date of Join:</span> {hr.dateofjoin}
      </div>
    </div>
  );
};

export default HRCard;
