import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { NaeApiRest } from '../service/NaeApiRest'

interface Props {
  id: number
  module: string
  path: string
  lang: string
}

const texts = {
  lt: {
    confirm: 'Ar tikrai norite ištrinti elementą?',
    btn: 'Ištrinti'
  },
  en: {
    confirm: 'Are you sure?',
    btn: 'Remove'
  }
}

export default function NaeRestRemoveBtn(props: Props) {
  const history = useHistory()
  const { id, module, path, lang } = props

  const doDelete = () => {
    if (!window.confirm(texts[lang].confirm)) return false

    const ApiRest = new NaeApiRest()

    ApiRest.deleteElement(module, id).then(() => {
      history.push(path)
    })
    return true
  }

  return (
    <Button variant='danger' onClick={doDelete}>
      {texts[lang].btn}
    </Button>
  )
}
