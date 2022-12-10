import React from "react";
  
const Definition = ({ all }) => {
  return (
    <>
      {all.map((Val) => {
        return Val.meanings.map((Means) => {
          return Means.definitions.map((Def, id) => {
            return (
              <>
                <li className="list-group-item text-capitalize fs-5 text-start" key={id}>
                  {Def.definition}
                </li>
                <hr />
              </>
            );
          });
        });
      })}
    </>
  );
};
  
export default Definition;