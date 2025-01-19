import React from 'react'
import Render1 from './Render1'
import Render2 from './Render2'


const handlesend = () => {
  const render1 = localStorage.getItem("render1");
  const render2 = localStorage.getItem("render2");
  const data = {
    render1,
    render2
  }
  fetch("http://127.0.0.1:8000/predict", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
const Renders = () => {
  return (
    <div>
    <div className=" mt-3">
  <div className="px-4">
    <Render1 originalCode={localStorage.getItem("originalCode")} />
  </div>
  <div className="px-4 mt-2">
    <Render2 updatedCode={localStorage.getItem("updatedCode")} />
  </div>
  <button onClick={handlesend()}></button>
</div>

    </div>
  )
}

export default Renders
