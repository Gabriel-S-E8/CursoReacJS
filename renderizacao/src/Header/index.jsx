import { memo } from 'react'

import './header.css'

export const Header = memo( ({ name }) => {
  console.log("COMPONENTE HEADER RENDERIZOU")

  return (
   <h3 className="header">Bem-vindo {name}</h3>
  )
})

