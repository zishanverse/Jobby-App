import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'
import {FaStar, FaBriefcase, FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import Header from '../Header'
import './index.css'

class JobItemDetails extends Component {
  state = {list: [], isLoading: 'INITIAL'}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({isLoading: 'IN-PROGRESS'})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwt = Cookie.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const url = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(url, options)
    const data = await response.json()
    const update = this.pascalCaseData(data)
    console.log(data)

    if (response.ok) {
      this.setState({list: update, isLoading: 'SUCCESS'})
    } else {
      this.setState({isLoading: 'FAILURE'})
    }
  }

  pascalCaseData = list => ({
    jobDetails: {
      companyLogoUrl: list.job_details.company_logo_url,
      companyWebsiteUrl: list.job_details.company_website_url,
      employmentType: list.job_details.employment_type,
      jobDescription: list.job_details.job_description,
      id: list.job_details.id,
      skills: list.job_details.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      })),
      title: list.job_details.title,
      lifeAtCompany: {
        description: list.job_details.life_at_company.description,
        imageUrl: list.job_details.life_at_company.image_url,
      },
      location: list.job_details.location,
      packagePerAnnum: list.job_details.package_per_annum,
      rating: list.job_details.rating,
    },
    similarJobs: list.similar_jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      jobDescription: each.job_description,
      location: each.location,
      rating: each.rating,
      title: each.title,
      id: each.id,
    })),
  })

  loader = () => (
    <div className="job-item-details-loader-failure">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  similarJobItem = item => {
    console.log(item)
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      rating,
      title,
    } = item

    return (
      <li className="similar-card">
        <div className="job-item-card ">
          <div className="job-item-logo-card">
            <img
              src={companyLogoUrl}
              alt="similar job company logo"
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
          <h1 className="job-item-description">Description</h1>

          <p className="job-item-description-para">{jobDescription}</p>

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
        </div>
      </li>
    )
  }

  success = () => {
    const {list} = this.state
    const {jobDetails, similarJobs} = list

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="job-item-details-container">
        <div className="job-item-card details-card">
          <div className="job-item-logo-card">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
          <div className="flex">
            <h1 className="job-item-description">Description</h1>
            <a href={companyWebsiteUrl} className="anchor visit">
              Visit
              <FaExternalLinkAlt className="visit-icon" />
            </a>
          </div>

          <p className="job-item-description-para">{jobDescription}</p>

          <h1 className="job-item-description skills">Skills</h1>

          <div className="">
            <ul className="job-item-skills-card">
              {skills.map(each => (
                <li className="job-item-details-skills-item" key={each.name}>
                  <img
                    src={each.imageUrl}
                    alt={each.name}
                    className="job-item-details-skill-img"
                  />
                  <p className="job-item-details-skill-para">{each.name}</p>
                </li>
              ))}
            </ul>
          </div>

          <h1 className="job-item-description">Life at Company</h1>
          <div className="job-item-details-lifeAtCompany-card">
            <p className="job-item-description-para">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="job-item-details-lifeAtCompany-img"
            />
          </div>
        </div>

        <h1 className="job-item-description similar-jobs">Similar Jobs</h1>
        <ul className="job-item-details-similar-job-card">
          {similarJobs.map(each => this.similarJobItem(each))}
        </ul>
      </div>
    )
  }

  failure = () => (
    <div className="job-item-details-loader-failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-item-failure-img"
      />
      <h1 className="job-item-failure-head">Oops! Something Went Wrong</h1>
      <p className="job-item-failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="job-item-failure-btn"
        onClick={this.getData}
      >
        Retry
      </button>
    </div>
  )

  renderContent = () => {
    const {isLoading} = this.state

    switch (isLoading) {
      case 'IN-PROGRESS':
        return this.loader()
      case 'SUCCESS':
        return this.success()
      case 'FAILURE':
        return this.failure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderContent()}
      </>
    )
  }
}

export default JobItemDetails
