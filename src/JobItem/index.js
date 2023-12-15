import {Link} from 'react-router-dom'
import {FaStar, FaBriefcase} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobItem = props => {
  const {item} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    id,
    packagePerAnnum,
    rating,
    title,
  } = item

  return (
    <li>
      <Link to={`/jobs/${id}`} className="link">
        <div className="job-item-card">
          <div className="job-item-logo-card">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="job-item-logo"
            />
            <div className="job-item-logo-content-card">
              <h1 className="job-item-title">{title}</h1>
              <div className="job-item-rating-card">
                <FaStar className="star" />
                <p className="job-item-rating">{rating}</p>
              </div>
            </div>
          </div>

          <div className="job-item-location-package-card">
            <div className="job-item-location-intership">
              <div className="job-item-flex">
                <MdLocationOn className="logo" />
                <p className="job-item-location-internship">{location}</p>
              </div>

              <div className="job-item-flex">
                <FaBriefcase className="logo" />
                <p className="job-item-location-internship">{employmentType}</p>
              </div>
            </div>

            <div className="job-item-package-card">
              <p className="job-item-package">{packagePerAnnum}</p>
            </div>
          </div>

          <hr className="line" />
          <h1 className="job-item-description">Description</h1>
          <p className="job-item-description-para">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
