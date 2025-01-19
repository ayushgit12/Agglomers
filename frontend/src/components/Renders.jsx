import React from 'react'
import Render1 from './Render1'
import Render2 from './Render2'

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
</div>

    </div>
  )
}

export default Renders
