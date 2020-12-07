import React, { useEffect, useState } from 'react'

const Fundraiser = ({
  match: {
    params: { shortUrl },
  },
}) => {
  useEffect(() => {
    fetchFundraiser()
  })

  const [fundraiser, setFundraiser] = useState(null)

  const fetchFundraiser = async () => {
    const response = await fetch(`/api/fundraisers/${shortUrl}`)
    const data = await response.json()
    if (response.ok) {
      setFundraiser(data.fundraiser)
    }
  }
  return (
    <>
      <h4>this is fundraiser component</h4>
      <p>{fundraiser ? fundraiser.title : 'not found'}</p>
    </>
  )
}

export default Fundraiser
