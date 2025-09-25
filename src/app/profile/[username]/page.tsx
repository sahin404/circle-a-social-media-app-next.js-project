import React from 'react'

const page = async({params}:{params:{username:string}}) => {

  // const profile =

  return (
    <div>{params.username}</div>
  )
}

export default page