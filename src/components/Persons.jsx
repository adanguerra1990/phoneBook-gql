import { useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { FIND_PERSON } from '../queries'

const Persons = ({ persons }) => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON)
  const [person, setPerson] = useState(null)

  const showPerson = name => {
    getPerson({ variables: { nameToSearch: name } })
  }

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson)
    }
  }, [result])

  if (person) {
    return (
      <div>
        <h2>{person.name}</h2>
        <div>phone: {person.phone}</div>
        <div>street: {person.address.street}</div>
        <div>city: {person.address.city}</div>
        <button onClick={() => setPerson(null)}>Close</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Persons</h2>
      {persons.map(p => (
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => showPerson(p.name)}>show address</button>
        </div>
      ))}
    </div>
  )
}
export default Persons
