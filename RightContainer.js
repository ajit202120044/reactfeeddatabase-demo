import React from "react";
import Person from "./Person";
export default function RightContainer({ personList }) {
  return (
    <div className="right-container">
      <h2>YOUR THOUGHTS MATTER</h2>

      {React.Children.toArray(
        personList.map((person) => <Person obj={person} />)
      )}
    </div>
  );
}
