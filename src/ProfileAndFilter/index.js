import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const ProfileAndFilter = props => {
  const {funcCheckedType, funcSelectedType} = props
  const profileCard = () => {
    const {profile} = props
    const {name, profileImageUrl, shortBio} = profile

    return (
      <div className="profile-card">
        <img src={profileImageUrl} alt="profile" className="profile-logo" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-para">{shortBio}</p>
      </div>
    )
  }

  const profileRender = () => {
    const {profileStatus, funcLoader, funcFailure} = props

    switch (profileStatus) {
      case 'IN-PROGRESS':
        return funcLoader('profile-loader')
      case 'SUCCESS':
        return profileCard()
      case 'FAILURE':
        return funcFailure()
      default:
        return null
    }
  }

  const checkedType = event => funcCheckedType(event)

  const selectedType = event => funcSelectedType(event)

  return (
    <div className="profile-filter-card">
      {profileRender()}
      <hr className="line" />
      <p className="filter-type">Type of Employment</p>
      <ul className="list">
        {employmentTypesList.map(each => (
          <li className="list-item" key={each.employmentTypeId}>
            <input
              id={each.label}
              type="checkbox"
              value={each.employmentTypeId}
              onChange={checkedType}
            />
            <label htmlFor={each.label} className="label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="line" />
      <p className="filter-type">Salary Range</p>
      <ul className="list">
        {salaryRangesList.map(each => (
          <li className="list-item" key={each.salaryRangeId}>
            <input
              id={each.label}
              type="radio"
              value={each.salaryRangeId}
              onChange={selectedType}
              name="range"
            />
            <label htmlFor={each.label} className="label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProfileAndFilter
